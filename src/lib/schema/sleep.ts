import { z } from "zod"

export const LogSleepSchema = z.object({
	duration: z
		.number()
		.min(0, "Duration cannot be negative")
		.max(24, "You can't sleep more than 24 hours in a day!"),
	date: z.date("Please select a date").refine((date) => {
		const today = new Date()
		today.setHours(23, 59, 59, 999)
		return date <= today
	}, "Future dates are not allowed"),
})

export type LogSleepInput = z.infer<typeof LogSleepSchema>
