import { useForm } from "@tanstack/react-form"
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { zodValidator } from "@tanstack/zod-adapter"
import { toast } from "sonner"
import { SubmitButton } from "@/components/SubmitButton"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/auth"
import { getSession } from "@/lib/auth-functions"
import { prisma } from "@/lib/db"
import { OnboardingSchema } from "@/lib/schema/onboarding"
import { authMiddleware } from "@/middleware/auth"

const updateProfile = createServerFn({ method: "POST" })
	.inputValidator(zodValidator(OnboardingSchema))
	.handler(async ({ data }) => {
		const headers = getRequestHeaders()
		const session = await auth.api.getSession({ headers })

		if (!session) {
			return { success: false }
		}

		await prisma.$transaction([
			prisma.user.update({
				where: { id: session.user.id },
				data: { onboardingCompleted: true },
			}),
			prisma.userProfile.upsert({
				where: { userId: session.user.id },
				update: {
					height: data.height,
					weight: data.weight,
				},
				create: {
					userId: session.user.id,
					height: data.height,
					weight: data.weight,
				},
			}),
		])

		return { success: true }
	})

export const Route = createFileRoute("/onboarding")({
	component: OnboardingPage,
	server: { middleware: [authMiddleware] },
	beforeLoad: async () => {
		const session = await getSession()

		if (!session) {
			throw redirect({ to: "/login" })
		}

		if (session.user.onboardingCompleted) {
			throw redirect({ to: "/dashboard" })
		}
	},
})

function OnboardingPage() {
	const router = useRouter()
	const form = useForm({
		defaultValues: {
			height: 0,
			weight: 0,
		},
		validators: {
			onSubmit: OnboardingSchema,
		},
		onSubmit: async ({ value }) => {
			const data = await updateProfile({ data: value })
			if (data.success) {
				toast.success("Profile updated!")
				await router.invalidate()
				router.navigate({ to: "/dashboard" })
			} else {
				toast.error("Failed to update profile")
			}
		},
	})

	return (
		<div className="flex min-h-screen items-center justify-center p-4 bg-muted/20">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className="text-center space-y-2">
					<CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
					<CardDescription>
						Let's customize your experience. Please tell us a bit about
						yourself.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							e.stopPropagation()
							form.handleSubmit()
						}}
						className="space-y-6"
					>
						<FieldGroup>
							<form.Field name="height">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid

									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Height (cm)</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(Number(e.target.value))
												}
												aria-invalid={isInvalid}
												placeholder="175"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							</form.Field>
							<form.Field name="weight">
								{(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid

									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Weight (kg)</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(Number(e.target.value))
												}
												aria-invalid={isInvalid}
												placeholder="70"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							</form.Field>
						</FieldGroup>

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<SubmitButton
									pending={isSubmitting}
									disabled={!canSubmit}
									pendingText="Saving..."
									className="w-full"
								>
									Complete Setup
								</SubmitButton>
							)}
						</form.Subscribe>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
