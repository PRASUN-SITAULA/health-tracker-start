import { z } from "zod"

export const LogStepsSchema = z.object({
	count: z
		.number()
		.int()
		.min(0, "Steps cannot be negative")
		.max(100000, "That's a lot of steps!"),
	date: z.date("Please select a date"),
})

export type LogStepsInput = z.infer<typeof LogStepsSchema>
