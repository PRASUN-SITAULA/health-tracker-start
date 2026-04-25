import { createFileRoute, useRouter } from "@tanstack/react-router"
import { StatCard } from "@/components/dashboard/StatCard"
import { StepLogger } from "@/components/dashboard/StepLogger"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { getDashboardData } from "@/server/dashboard"
import { Activity, Footprints, LogOut, Moon, Settings, User } from "lucide-react"
import { ProfileSummary } from "@/components/dashboard/ProfileSummary"
import { ActivityOverview } from "@/components/dashboard/ActivityOverview"

export const Route = createFileRoute("/_authenticated/dashboard")({
	loader: () => getDashboardData(),
	errorComponent: () => {
		return <h2>Something went wrong</h2>
	},
	component: DashboardComponent,
})

function DashboardComponent() {
	const { user, profile, stats, weeklyActivity } = Route.useLoaderData()
	const router = useRouter()

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

	return (
		<div className="flex min-h-screen w-full flex-col bg-slate-50/50">
			{/* Dashboard Header */}
			<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 md:px-6 shadow-sm">
				<div className="flex items-center gap-2">
					<div className="bg-primary rounded-lg p-1.5 shadow-sm">
						<Activity className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="text-xl font-bold tracking-tight">
						HealthTracker
					</span>
				</div>
				<div className="ml-auto flex items-center gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button
								variant="ghost"
								className="relative h-9 w-9 rounded-full ring-offset-background transition-colors hover:bg-slate-100"
							>
								<Avatar className="h-9 w-9 border shadow-sm">
									<AvatarImage src={user.image || ""} alt={user.name} />
									<AvatarFallback className="bg-primary/5 text-primary font-bold">
										{user.name.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-semibold leading-none text-slate-900">
										{user.name}
									</p>
									<p className="text-xs leading-none text-slate-500">
										{user.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="cursor-pointer font-medium">
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer font-medium">
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={handleLogout}
								className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer font-medium"
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			<main className="flex-1 space-y-8 p-4 pt-6 md:p-8 max-w-7xl mx-auto w-full">
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-slate-900">
							Welcome back, {user.name.split(" ")[0]}!
						</h1>
						<p className="text-slate-500 font-medium">
							Here's what's happening with your health today.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							variant="secondary"
							className="px-4 py-1.5 text-sm font-semibold bg-white shadow-sm border-slate-200 text-slate-700"
						>
							{new Date().toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</Badge>
					</div>
				</div>

				<div className="space-y-6">
					{/* Top Grid: Main Stats */}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<StatCard
							title="Daily Steps"
							value={stats.steps.current.toLocaleString()}
							goal={stats.steps.goal.toLocaleString()}
							trend={stats.steps.trend.split(" ")[0]}
							icon={Footprints}
							bgClass="bg-emerald-50"
							iconColorClass="text-emerald-600"
							colorClass="text-emerald-600"
							progressValue={(stats.steps.current / stats.steps.goal) * 100}
							indicatorClassName="bg-emerald-500"
						/>

						{/*<StatCard
							title="Water Intake"
							value={stats.water.current}
							unit="L"
							goal={stats.water.goal}
							trend={stats.water.trend}
							icon={Droplets}
							bgClass="bg-blue-50"
							iconColorClass="text-blue-600"
							colorClass="text-slate-500 italic"
							progressValue={(stats.water.current / stats.water.goal) * 100}
							indicatorClassName="bg-blue-500"
						/>*/}

						<StatCard
							title="Sleep Duration"
							value={stats.sleep.current}
							unit="h"
							goal={stats.sleep.goal}
							trend={stats.sleep.trend}
							icon={Moon}
							bgClass="bg-purple-50"
							iconColorClass="text-purple-600"
							colorClass="text-slate-500 italic"
							progressValue={(stats.sleep.current / stats.sleep.goal) * 100}
							indicatorClassName="bg-purple-500"
						/>
					</div>

					{/* Middle Grid: Action & Performance */}
					<div >
						<StepLogger />
					</div>

					{/* Bottom Grid: Detailed Insights */}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
						<ActivityOverview weeklyActivity={weeklyActivity} />
						<ProfileSummary
							bmi={bmi}
							height={profile?.height}
							weight={profile?.weight}
							currentSteps={stats.steps.current}
						/>
					</div>
				</div>
			</main>
		</div>
	)
}
