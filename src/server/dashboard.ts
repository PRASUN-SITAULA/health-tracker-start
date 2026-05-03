import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { zodValidator } from "@tanstack/zod-adapter"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { LogSleepSchema } from "@/lib/schema/sleep"
import { LogStepsSchema } from "@/lib/schema/steps"
import { authMiddleware } from "@/middleware/auth"

export const logSteps = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(zodValidator(LogStepsSchema))
	.handler(async ({ data }) => {
		const headers = getRequestHeaders()
		const session = await auth.api.getSession({ headers })

		if (!session) {
			throw new Error("Unauthorized")
		}

		const date = data.date
		date.setHours(0, 0, 0, 0)

		const today = new Date()
		today.setHours(0, 0, 0, 0)

		if (date > today) {
			throw new Error("Cannot log steps for future dates")
		}

		const log = await prisma.stepLog.upsert({
			where: {
				userId_date: {
					userId: session.user.id,
					date: date,
				},
			},
			update: {
				count: data.count,
			},
			create: {
				userId: session.user.id,
				count: data.count,
				date: date,
			},
		})

		return { success: true, log }
	})

export const logSleep = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(zodValidator(LogSleepSchema))
	.handler(async ({ data }) => {
		const headers = getRequestHeaders()
		const session = await auth.api.getSession({ headers })

		if (!session) {
			throw new Error("Unauthorized")
		}

		const date = data.date
		date.setHours(0, 0, 0, 0)

		const today = new Date()
		today.setHours(0, 0, 0, 0)

		if (date > today) {
			throw new Error("Cannot log sleep for future dates")
		}

		const log = await prisma.sleepLog.upsert({
			where: {
				userId_date: {
					userId: session.user.id,
					date: date,
				},
			},
			update: {
				duration: data.duration,
			},
			create: {
				userId: session.user.id,
				duration: data.duration,
				date: date,
			},
		})

		return { success: true, log }
	})

export const getDashboardData = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async () => {
		const headers = getRequestHeaders()
		const session = await auth.api.getSession({ headers })

		if (!session) {
			throw new Error("Unauthorized")
		}

		const today = new Date()
		today.setHours(0, 0, 0, 0)

		const sevenDaysAgo = new Date(today)
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

		const [logs, sleepLogs] = await Promise.all([
			prisma.stepLog.findMany({
				where: {
					userId: session.user.id,
					date: {
						gte: sevenDaysAgo,
						lte: today,
					},
				},
				orderBy: { date: "asc" },
			}),
			prisma.sleepLog.findMany({
				where: {
					userId: session.user.id,
					date: {
						gte: sevenDaysAgo,
						lte: today,
					},
				},
				orderBy: { date: "asc" },
			}),
		])

		const currentSteps =
			logs.find((l) => l.date.getTime() === today.getTime())?.count || 0

		const currentSleep =
			sleepLogs.find((l) => l.date.getTime() === today.getTime())?.duration || 0

		// Generate 7 days of activity
		const weeklyActivity = []
		for (let i = 6; i >= 0; i--) {
			const d = new Date(today)
			d.setDate(d.getDate() - i)
			const log = logs.find((l) => l.date.getTime() === d.getTime())
			weeklyActivity.push({
				day: d.toLocaleDateString("en-US", { weekday: "short" }),
				steps: log?.count || 0,
				fullDate: d,
			})
		}

		// Calculate step trend
		const yesterday = new Date(today)
		yesterday.setDate(yesterday.getDate() - 1)
		const yesterdayLog = logs.find(
			(l) => l.date.getTime() === yesterday.getTime(),
		)
		const yesterdaySteps = yesterdayLog?.count || 0

		let stepTrend = "No data from yesterday"
		if (yesterdaySteps > 0) {
			const diff = ((currentSteps - yesterdaySteps) / yesterdaySteps) * 100
			stepTrend = `${diff >= 0 ? "+" : ""}${Math.round(diff)}% from yesterday`
		}

		// Calculate sleep trend
		const yesterdaySleepLog = sleepLogs.find(
			(l) => l.date.getTime() === yesterday.getTime(),
		)
		const yesterdaySleep = yesterdaySleepLog?.duration || 0

		let sleepTrend = "No data from yesterday"
		if (yesterdaySleep > 0) {
			const diff = ((currentSleep - yesterdaySleep) / yesterdaySleep) * 100
			sleepTrend = `${diff >= 0 ? "+" : ""}${Math.round(diff)}% from yesterday`
		}

		// Mock health stats (except steps and sleep)
		const stats = {
			steps: {
				current: currentSteps,
				goal: 10000,
				trend: stepTrend,
			},
			calories: {
				current: 1850,
				goal: 2200,
				trend: "-5% from yesterday",
			},
			water: {
				current: 1.5,
				goal: 2.5,
				trend: "Keep drinking!",
			},
			sleep: {
				current: currentSleep,
				goal: 8,
				trend: sleepTrend,
			},
		}

		return {
			user: session.user,
			stats,
			weeklyActivity,
		}
	})

export const getProfile = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async () => {
		const headers = getRequestHeaders()
		const session = await auth.api.getSession({ headers })

		if (!session) {
			throw new Error("Unauthorized")
		}

		const profile = await prisma.userProfile.findUnique({
			where: { userId: session.user.id },
		})

		return {
			user: session.user,
			profile,
		}
	})
