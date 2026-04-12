import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { getSession } from "@/lib/auth-functions"
import { onboardedMiddleware } from "@/middleware/onboarded"

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async () => {
		const session = await getSession()

		if (!session) {
			throw redirect({ to: "/login" })
		}

		if (!session.user.onboardingCompleted) {
			throw redirect({ to: "/onboarding" })
		}

		return { user: session.user }
	},
	server: { middleware: [onboardedMiddleware] },
	component: RouteComponent,
})

function RouteComponent() {
	return <Outlet />
}
