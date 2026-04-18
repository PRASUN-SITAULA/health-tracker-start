import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { zodValidator } from "@tanstack/zod-adapter"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
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

		const date = data.date || new Date()
		date.setHours(0, 0, 0, 0)

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

export const getDashboardData = createServerFn({ method: "GET" })
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

		const today = new Date()
		today.setHours(0, 0, 0, 0)

		const sevenDaysAgo = new Date(today)
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

		const logs = await prisma.stepLog.findMany({
			where: {
				userId: session.user.id,
				date: {
					gte: sevenDaysAgo,
					lte: today,
				},
			},
			orderBy: { date: "asc" },
		})

		const currentSteps =
			logs.find((l) => l.date.getTime() === today.getTime())?.count || 0

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

		// Calculate trend
		const yesterday = new Date(today)
		yesterday.setDate(yesterday.getDate() - 1)
		const yesterdayLog = logs.find((l) => l.date.getTime() === yesterday.getTime())
		const yesterdaySteps = yesterdayLog?.count || 0
		
		let trend = "No data from yesterday"
		if (yesterdaySteps > 0) {
			const diff = ((currentSteps - yesterdaySteps) / yesterdaySteps) * 100
			trend = `${diff >= 0 ? "+" : ""}${Math.round(diff)}% from yesterday`
		}

		// Mock health stats (except steps)
		const stats = {
			steps: {
				current: currentSteps,
				goal: 10000,
				trend: trend,
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
				current: 7.2,
				goal: 8,
				trend: "Better than last night",
			},
		}

		return {
			user: session.user,
			profile,
			stats,
			weeklyActivity,
		}
	})
