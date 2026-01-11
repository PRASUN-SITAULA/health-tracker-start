import { useForm } from "@tanstack/react-form"
import { Link, useRouter } from "@tanstack/react-router"
import { Eye, EyeOff } from "lucide-react"
import { useId, useState } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { LoginSchema } from "@/lib/schema/login"
import { SubmitButton } from "../SubmitButton"
import { Button } from "../ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

export const LoginForm = () => {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const id = useId()
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: LoginSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: async () => {
						toast.success("Logged in successfully!")
						await router.invalidate()
						router.navigate({ to: "/" })
					},
					onError: (ctx) => {
						toast.error(ctx.error.message || "Failed to log in")
					},
				},
			)
		},
	})
	return (
		<form
			id={id}
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
			className="space-y-6"
		>
			<FieldGroup>
				<form.Field name="email">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder="name@example.com"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						)
					}}
				</form.Field>
				<form.Field name="password">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid

						return (
							<Field data-invalid={isInvalid}>
								<div className="flex items-center justify-between">
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<Link
										to="."
										className="text-xs font-medium text-muted-foreground hover:text-primary"
									>
										Forgot password?
									</Link>
								</div>
								<div className="relative">
									<Input
										id={field.name}
										name={field.name}
										type={showPassword ? "text" : "password"}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder="Enter your password"
										className="pr-10"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon-sm"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										tabIndex={-1}
									>
										{showPassword ? (
											<EyeOff className="size-4" />
										) : (
											<Eye className="size-4" />
										)}
										<span className="sr-only">
											{showPassword ? "Hide password" : "Show password"}
										</span>
									</Button>
								</div>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
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
						pendingText="Logging in..."
					>
						Login
					</SubmitButton>
				)}
			</form.Subscribe>
		</form>
	)
}
