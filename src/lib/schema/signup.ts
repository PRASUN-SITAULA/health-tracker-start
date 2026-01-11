import { z } from "zod"

export const SignUpSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.email("Invalid email address"),
		password: z
			.string()
			.min(12, "Password must be at least 12 characters")
			.max(100, "Password is too long")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})
