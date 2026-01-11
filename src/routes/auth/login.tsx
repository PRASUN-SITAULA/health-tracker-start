import { createFileRoute, Link } from "@tanstack/react-router"
import { Activity, Quote } from "lucide-react"
import { LoginForm } from "@/components/auth/LoginForm"

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
})

function LoginPage() {
	return (
		<div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
			<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="mx-auto grid w-full max-w-[400px] gap-6">
					<div className="flex flex-col space-y-2 text-center">
						<div className="flex justify-center mb-4 lg:hidden">
							<div className="flex items-center gap-2 font-bold text-xl">
								<Activity className="h-6 w-6 text-primary" />
								<span>HealthTracker</span>
							</div>
						</div>
						<h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
						<p className="text-muted-foreground">
							Enter your credentials to access your account
						</p>
					</div>
					<LoginForm />
					<div className="text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link
							to="/auth/sign-up"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							Sign up
						</Link>
					</div>
					<p className="px-8 text-center text-xs text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							to="."
							className="underline underline-offset-4 hover:text-primary"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							to="."
							className="underline underline-offset-4 hover:text-primary"
						>
							Privacy Policy
						</Link>
						.
					</p>
				</div>
			</div>
			<div className="hidden bg-muted lg:flex lg:flex-col lg:justify-between lg:p-10 relative overflow-hidden">
				{/* Abstract Background Pattern */}
				<div className="absolute inset-0 bg-zinc-900">
					<div className="absolute inset-0 bg-linear-to-br from-primary/20 via-zinc-900 to-zinc-900" />
					<div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute top-1/2 right-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
				</div>

				<div className="relative z-20 flex items-center gap-2 text-lg font-bold text-white">
					<Activity className="h-6 w-6 text-primary" />
					<span>HealthTracker</span>
				</div>

				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<div className="mb-4 rounded-full bg-white/10 w-10 h-10 flex items-center justify-center backdrop-blur-sm">
							<Quote className="h-5 w-5 text-white" />
						</div>
						<p className="text-xl font-medium leading-relaxed text-white">
							&ldquo;This platform has completely transformed how I track my
							fitness goals. The analytics are intuitive and the community keeps
							me motivated every single day.&rdquo;
						</p>
						<footer className="text-sm font-medium text-zinc-400">
							Sofia Davis, Professional Athlete
						</footer>
					</blockquote>
				</div>
			</div>
		</div>
	)
}
