import { type ZodNumber, z } from "zod"

export const OnboardingSchema = z.object({
	height: z.coerce
		.number("Please enter a valid number for height")
		.min(1, "Height must be positive") as unknown as ZodNumber,
	weight: z.coerce
		.number("Please enter a valid number for weight")
		.min(1, "Weight must be positive") as unknown as ZodNumber,
})
