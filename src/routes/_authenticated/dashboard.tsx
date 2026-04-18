import { useForm } from "@tanstack/react-form"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import {
	Activity,
	Droplets,
	Flame,
	Footprints,
	LayoutDashboard,
	LogOut,
	Moon,
	Plus,
	Scale,
	Settings,
	TrendingUp,
	User,
} from "lucide-react"
import { toast } from "sonner"
import { SubmitButton } from "@/components/SubmitButton"
import { authClient } from "@/lib/auth-client"
import { LogStepsSchema } from "@/lib/schema/steps"
import { getDashboardData, logSteps } from "@/server/dashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Route = createFileRoute("/_authenticated/dashboard")({
	loader: () => getDashboardData(),
	component: DashboardComponent,
})

function DashboardComponent() {
	const { user, profile, stats, weeklyActivity } = Route.useLoaderData()
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			count: 0,
		},
		validators: {
			onSubmit: LogStepsSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await logSteps({ data: value })
			if (res.success) {
				toast.success("Steps logged successfully!")
				router.invalidate()
				form.reset()
			} else {
				toast.error("Failed to log steps")
			}
		},
	})

	const handleLogout = async () => {
		await authClient.signOut()
		router.navigate({ to: "/login" })
	}

	const calculateBMI = (w?: number | null, h?: number | null) => {
		if (!w || !h) return null
		const bmi = w / (h / 100) ** 2
		return bmi.toFixed(1)
	}

	const bmi = calculateBMI(profile?.weight, profile?.height)
	const getBMICategory = (val: string | null) => {
		if (!val) return "Unknown"
		const v = Number.parseFloat(val)
		if (v < 18.5) return "Underweight"
		if (v < 25) return "Normal"
		if (v < 30) return "Overweight"
		return "Obese"
	}

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/20">
			{/* Dashboard Header */}
			<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<div className="flex items-center gap-2">
					<Activity className="h-6 w-6 text-primary" />
					<span className="text-lg font-bold">HealthTracker</span>
				</div>
				<div className="ml-auto flex items-center gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage src={user.image || ""} alt={user.name} />
									<AvatarFallback>
										{user.name.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								Settings
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout} className="text-red-500">
								<LogOut className="mr-2 h-4 w-4" />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			<main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<div className="flex items-center space-x-2">
						<Badge variant="outline" className="px-3 py-1">
							{new Date().toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</Badge>
					</div>
				</div>

				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="analytics" disabled>
							Analytics
						</TabsTrigger>
						<TabsTrigger value="reports" disabled>
							Reports
						</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-4 shadow-sm">
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<div className="space-y-1">
										<CardTitle className="text-xl">Log Today's Steps</CardTitle>
										<CardDescription>
											Keep track of your daily progress.
										</CardDescription>
									</div>
									<Footprints className="h-5 w-5 text-primary" />
								</CardHeader>
								<CardContent>
									<form
										onSubmit={(e) => {
											e.preventDefault()
											e.stopPropagation()
											form.handleSubmit()
										}}
										className="flex items-end gap-4"
									>
										<form.Field name="count">
											{(field) => (
												<div className="flex-1 space-y-1">
													<Input
														type="number"
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) =>
															field.handleChange(Number(e.target.value))
														}
														placeholder="Enter step count (e.g. 8500)"
														className={
															field.state.meta.errors.length
																? "border-destructive"
																: ""
														}
													/>
													{field.state.meta.errors ? (
														<em className="text-[10px] text-destructive">
															{field.state.meta.errors.join(", ")}
														</em>
													) : null}
												</div>
											)}
										</form.Field>
										<form.Subscribe
											selector={(state) => [state.canSubmit, state.isSubmitting]}
										>
											{([canSubmit, isSubmitting]) => (
												<SubmitButton
													pending={isSubmitting}
													disabled={!canSubmit}
													size="default"
													className="px-8"
												>
													<Plus className="mr-2 h-4 w-4" />
													Log Steps
												</SubmitButton>
											)}
										</form.Subscribe>
									</form>
								</CardContent>
							</Card>

							<Card className="col-span-3 shadow-sm bg-primary text-primary-foreground overflow-hidden relative">
								<div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-white/10" />
								<CardHeader className="pb-2">
									<CardTitle className="text-lg font-medium opacity-90">
										Weekly Average
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-4xl font-bold">
										{Math.round(
											weeklyActivity.reduce((acc, curr) => acc + curr.steps, 0) /
												weeklyActivity.filter((d) => d.steps > 0).length || 0,
										).toLocaleString()}
									</div>
									<p className="mt-1 text-sm opacity-80">
										steps per active day
									</p>
									<div className="mt-4 flex items-center gap-2">
										<div className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium">
											Level 2
										</div>
										<span className="text-xs opacity-80">
											Keep going, you're doing great!
										</span>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card className="shadow-sm">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Steps</CardTitle>
									<Footprints className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats.steps.current.toLocaleString()}
									</div>
									<p className="text-xs text-muted-foreground">
										Goal: {stats.steps.goal.toLocaleString()}
									</p>
									<Progress
										value={(stats.steps.current / stats.steps.goal) * 100}
										className="mt-3 h-2"
									/>
									<div className="mt-2 flex items-center text-xs text-green-500">
										<TrendingUp className="mr-1 h-3 w-3" />
										{stats.steps.trend}
									</div>
								</CardContent>
							</Card>

							<Card className="shadow-sm">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Calories</CardTitle>
									<Flame className="h-4 w-4 text-orange-500" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stats.calories.current} kcal
									</div>
									<p className="text-xs text-muted-foreground">
										Goal: {stats.calories.goal} kcal
									</p>
									<Progress
										value={(stats.calories.current / stats.calories.goal) * 100}
										className="mt-3 h-2"
									/>
									<p className="mt-2 text-xs text-muted-foreground">
										{stats.calories.trend}
									</p>
								</CardContent>
							</Card>

							<Card className="shadow-sm">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Water</CardTitle>
									<Droplets className="h-4 w-4 text-blue-500" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{stats.water.current}L</div>
									<p className="text-xs text-muted-foreground">
										Goal: {stats.water.goal}L
									</p>
									<Progress
										value={(stats.water.current / stats.water.goal) * 100}
										className="mt-3 h-2"
									/>
									<p className="mt-2 text-xs text-muted-foreground italic">
										{stats.water.trend}
									</p>
								</CardContent>
							</Card>

							<Card className="shadow-sm">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Sleep</CardTitle>
									<Moon className="h-4 w-4 text-purple-500" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{stats.sleep.current}h</div>
									<p className="text-xs text-muted-foreground">
										Goal: {stats.sleep.goal}h
									</p>
									<div className="mt-4 flex h-2 w-full gap-1 overflow-hidden rounded-full bg-secondary">
										<div className="h-full bg-purple-500 w-[90%]" />
									</div>
									<p className="mt-2 text-xs text-muted-foreground">
										{stats.sleep.trend}
									</p>
								</CardContent>
							</Card>
						</div>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-4 shadow-sm">
								<CardHeader>
									<CardTitle>Weekly Activity</CardTitle>
									<CardDescription>
										Your daily step count over the last 7 days.
									</CardDescription>
								</CardHeader>
								<CardContent className="pl-2">
									<div className="flex h-[240px] w-full items-end justify-between px-2 pt-4">
										{weeklyActivity.map((day) => {
											const height = (day.steps / 12000) * 100
											return (
												<div
													key={day.day}
													className="flex flex-col items-center gap-2 group w-full"
												>
													<div
														className="relative w-8 rounded-t-md bg-primary/20 group-hover:bg-primary/40 transition-all duration-300"
														style={{ height: `${height}%` }}
													>
														{day.steps > 0 && (
															<div className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-background px-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border shadow-sm">
																{day.steps.toLocaleString()}
															</div>
														)}
														<div
															className="absolute bottom-0 w-full rounded-t-md bg-primary transition-all duration-500"
															style={{ height: "100%" }}
														/>
													</div>
													<span className="text-[10px] font-medium text-muted-foreground">
														{day.day}
													</span>
												</div>
											)
										})}
									</div>
								</CardContent>
							</Card>

							<Card className="col-span-3 shadow-sm">
								<CardHeader>
									<CardTitle>Profile Summary</CardTitle>
									<CardDescription>
										Based on your latest measurements.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="flex items-center gap-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
											<Scale className="h-6 w-6 text-primary" />
										</div>
										<div className="space-y-1">
											<p className="text-sm font-medium leading-none">
												BMI Index
											</p>
											<div className="flex items-center gap-2">
												<span className="text-2xl font-bold">
													{bmi || "N/A"}
												</span>
												<Badge
													variant={
														getBMICategory(bmi) === "Normal"
															? "default"
															: "destructive"
													}
													className="text-[10px] h-4"
												>
													{getBMICategory(bmi)}
												</Badge>
											</div>
										</div>
									</div>

									<Separator />

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-1">
											<p className="text-xs text-muted-foreground uppercase tracking-wider">
												Height
											</p>
											<p className="text-lg font-semibold">
												{profile?.height || "--"} cm
											</p>
										</div>
										<div className="space-y-1">
											<p className="text-xs text-muted-foreground uppercase tracking-wider">
												Weight
											</p>
											<p className="text-lg font-semibold">
												{profile?.weight || "--"} kg
											</p>
										</div>
									</div>

									<div className="rounded-lg bg-muted/50 p-4 space-y-2">
										<h4 className="text-sm font-medium flex items-center gap-2">
											<Activity className="h-4 w-4 text-primary" />
											Quick Insight
										</h4>
										<p className="text-xs text-muted-foreground leading-relaxed">
											{bmi
												? `Your BMI of ${bmi} puts you in the "${getBMICategory(bmi)}" category. To maintain health, aim for a balanced diet and consistent activity.`
												: "Complete your profile to get personalized health insights and BMI calculation."}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	)
}
