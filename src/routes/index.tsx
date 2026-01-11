import { createFileRoute, Link } from "@tanstack/react-router"
import {
	Activity,
	ArrowRight,
	CheckCircle2,
	LayoutDashboard,
	LineChart,
	Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute("/")({
	component: LandingPage,
})

function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			{/* Navigation */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
					<div className="flex items-center gap-2">
						<Activity className="h-6 w-6 text-primary" />
						<span className="text-lg font-bold">HealthTracker</span>
					</div>
					<nav className="hidden gap-6 md:flex">
						<Link
							to="."
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Features
						</Link>
						<Link
							to="."
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Testimonials
						</Link>
						<Link
							to="."
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							Pricing
						</Link>
					</nav>
					<div className="flex items-center gap-4">
						<Link
							to="."
							className="text-sm font-medium hover:text-primary transition-colors hidden md:block"
						>
							Log in
						</Link>
						<Button size="sm">Get Started</Button>
					</div>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section className="py-24 md:py-32 lg:py-40">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-col items-center space-y-8 text-center max-w-3xl mx-auto">
							<div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
								<span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
								New Features Available
							</div>
							<h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
								Master Your Health Journey
							</h1>
							<p className="max-w-[700px] text-xl text-muted-foreground">
								Track your workouts, monitor your progress, and achieve your
								fitness goals with our comprehensive health tracking platform.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
								<Button size="lg" className="h-12 px-8">
									Start for Free
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
								<Button size="lg" variant="outline" className="h-12 px-8">
									View Demo
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Social Proof / Stats */}
				<section className="border-y bg-muted/50 py-12">
					<div className="container mx-auto px-4 md:px-6">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
							<div className="space-y-2">
								<h3 className="text-3xl font-bold">10k+</h3>
								<p className="text-sm text-muted-foreground font-medium">
									Active Users
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-3xl font-bold">500k+</h3>
								<p className="text-sm text-muted-foreground font-medium">
									Workouts Logged
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-3xl font-bold">98%</h3>
								<p className="text-sm text-muted-foreground font-medium">
									Goal Achievement
								</p>
							</div>
							<div className="space-y-2">
								<h3 className="text-3xl font-bold">4.9/5</h3>
								<p className="text-sm text-muted-foreground font-medium">
									User Rating
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-24 bg-background">
					<div className="container mx-auto px-4 md:px-6">
						<div className="text-center mb-16 space-y-4">
							<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
								Everything You Need
							</h2>
							<p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
								Powerful tools to help you stay on top of your fitness game.
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-3">
							<Card className="border-none shadow-none bg-muted/30">
								<CardHeader>
									<div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
										<LayoutDashboard className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Intuitive Dashboard</CardTitle>
									<CardDescription>
										Get a clear overview of your daily activities and progress
										at a glance.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li className="flex items-center">
											<CheckCircle2 className="mr-2 h-4 w-4 text-primary" />{" "}
											Daily summary
										</li>
										<li className="flex items-center">
											<CheckCircle2 className="mr-2 h-4 w-4 text-primary" />{" "}
											Customizable widgets
										</li>
									</ul>
								</CardContent>
							</Card>
							<Card className="border-none shadow-none bg-muted/30">
								<CardHeader>
									<div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
										<LineChart className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Advanced Analytics</CardTitle>
									<CardDescription>
										Deep dive into your health data to find patterns and improve
										performance.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li className="flex items-center">
											<CheckCircle2 className="mr-2 h-4 w-4 text-primary" />{" "}
											Trend analysis
										</li>
										<li className="flex items-center">
											<CheckCircle2 className="mr-2 h-4 w-4 text-primary" />{" "}
											Exportable reports
										</li>
									</ul>
								</CardContent>
							</Card>
							<Card className="border-none shadow-none bg-muted/30">
								<CardHeader>
									<div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
										<Trophy className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Gamification</CardTitle>
									<CardDescription>
										Stay motivated with achievements, streaks, and community
										challenges.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li className="flex items-center">
											<CheckCircle2 className="mr-2 h-4 w-4 text-primary" />{" "}
											Badges & Rewards
										</li>
										<li className="flex items-center">
											<CheckCircle2 className="mr-2 h-4 w-4 text-primary" />{" "}
											Friend leaderboards
										</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-24 border-t bg-muted/30">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-col items-center space-y-8 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
									Ready to transform your health?
								</h2>
								<p className="max-w-[600px] text-muted-foreground md:text-lg">
									Join thousands of users who have already taken control of
									their fitness journey.
								</p>
							</div>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button size="lg" className="h-12 px-8">
									Get Started Now
								</Button>
								<Button size="lg" variant="outline" className="h-12 px-8">
									Contact Sales
								</Button>
							</div>
							<p className="text-xs text-muted-foreground">
								No credit card required for 14-day free trial.
							</p>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t py-12 bg-background">
				<div className="container mx-auto px-4 md:px-6">
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<Activity className="h-5 w-5 text-primary" />
								<span className="text-lg font-bold">HealthTracker</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Empowering you to live a healthier, more active life through
								data-driven insights.
							</p>
						</div>
						<div className="space-y-4">
							<h4 className="text-sm font-semibold">Product</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Features
									</Link>
								</li>
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Pricing
									</Link>
								</li>
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Integrations
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-4">
							<h4 className="text-sm font-semibold">Company</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										About
									</Link>
								</li>
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Blog
									</Link>
								</li>
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Careers
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-4">
							<h4 className="text-sm font-semibold">Legal</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Privacy
									</Link>
								</li>
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Terms
									</Link>
								</li>
								<li>
									<Link to="." className="hover:text-primary transition-colors">
										Cookie Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-xs text-muted-foreground">
							© {new Date().getFullYear()} HealthTracker Inc. All rights
							reserved.
						</p>
						<div className="flex gap-4">
							<Link
								to="."
								className="text-muted-foreground hover:text-primary transition-colors"
							>
								<span className="sr-only">Twitter</span>
								{/* Placeholder for social icon */}
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									className="h-4 w-4"
									aria-hidden="true"
								>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</Link>
							{/* Add other social icons as needed */}
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
