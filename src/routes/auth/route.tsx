import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/auth")({
	component: AuthRouteLayout,
})

function AuthRouteLayout() {
	return (
		<div>
			<Outlet />
		</div>
	)
}
