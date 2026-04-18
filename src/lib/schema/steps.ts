import { z } from "zod"

export const LogStepsSchema = z.object({
	count: z
		.number()
		.int()
		.min(0, "Steps cannot be negative")
		.max(100000, "That's a lot of steps!"),
	date: z.date().optional().default(() => new Date()),
})

export type LogStepsInput = z.infer<typeof LogStepsSchema>
