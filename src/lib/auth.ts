import { prismaAdapter } from "better-auth/adapters/prisma"
import { betterAuth } from "better-auth/minimal"
import { haveIBeenPwned } from "better-auth/plugins"
import { tanstackStartCookies } from "better-auth/tanstack-start"
import { prisma } from "./db"

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
			strategy: "jwe",
		},
	},
	advanced: {
		cookiePrefix: "health-tracker",
	},
	user: {
		additionalFields: {
			onboardingCompleted: {
				type: "boolean",
				// input: false,
			},
		},
	},
	plugins: [
		haveIBeenPwned({
			customPasswordCompromisedMessage: "Please choose a more secure password.",
		}),
		tanstackStartCookies(), // make sure this is the last plugin in the array
	],
})

export type Session = typeof auth.$Infer.Session
