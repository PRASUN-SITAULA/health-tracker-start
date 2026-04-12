import { redirect } from "@tanstack/react-router"
import { createMiddleware } from "@tanstack/react-start"
import { ensureSession } from "@/lib/auth-functions"

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const session = await ensureSession()

	if (!session) {
		throw redirect({ to: "/login" })
	}

	return await next()
})
