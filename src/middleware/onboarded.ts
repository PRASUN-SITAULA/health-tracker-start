import { redirect } from "@tanstack/react-router"
import { createMiddleware } from "@tanstack/react-start"
import { getSession } from "@/lib/auth-functions"

export const onboardedMiddleware = createMiddleware().server(
	async ({ next }) => {
		const session = await getSession()

		if (!session) {
			throw redirect({ to: "/login" })
		}

		if (!session.user.onboardingCompleted) {
			throw redirect({ to: "/onboarding" })
		}

		return await next()
	},
)
