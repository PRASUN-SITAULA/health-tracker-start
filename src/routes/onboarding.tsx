import { useForm } from "@tanstack/react-form"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
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
import { getSession } from "@/lib/auth-functions"
import { OnboardingSchema } from "@/lib/schema/onboarding"
import { updateProfile } from "@/server/onboarding"
import { authClient } from "@/lib/auth-client"

export const Route = createFileRoute("/onboarding")({
	component: OnboardingPage,
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
  const navigate = useNavigate()
	const { refetch } = authClient.useSession()
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
        await refetch()
				toast.success("Profile updated!")
				navigate({ to: "/dashboard", replace: true })
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
												autoComplete="off"
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
												autoComplete="off"
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
