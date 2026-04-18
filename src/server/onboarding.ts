import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { zodValidator } from "@tanstack/zod-adapter"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { OnboardingSchema } from "@/lib/schema/onboarding"
import { authMiddleware } from "@/middleware/auth"

export const updateProfile = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(zodValidator(OnboardingSchema))
	.handler(async ({ data }) => {
		const headers = getRequestHeaders()
		const session = await auth.api.getSession({ headers })

		if (!session) {
			return { success: false }
		}

		await prisma.$transaction([
			prisma.user.update({
				where: { id: session.user.id },
				data: { onboardingCompleted: true },
			}),
			prisma.userProfile.upsert({
				where: { userId: session.user.id },
				update: {
					height: data.height,
					weight: data.weight,
				},
				create: {
					userId: session.user.id,
					height: data.height,
					weight: data.weight,
				},
			}),
		])

		return { success: true }
	})
