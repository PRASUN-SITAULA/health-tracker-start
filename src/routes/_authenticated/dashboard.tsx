import { createFileRoute } from "@tanstack/react-router"
import { Footprints, Moon } from "lucide-react"
import { ActivityOverview } from "@/components/dashboard/ActivityOverview"
import { DashboardHeader } from "@/components/dashboard/Header"
import { ProfileSummary } from "@/components/dashboard/ProfileSummary"
import { SleepLogger } from "@/components/dashboard/SleepLogger"
import { StatCard } from "@/components/dashboard/StatCard"
import { StepLogger } from "@/components/dashboard/StepLogger"
import { Badge } from "@/components/ui/badge"
import { getDashboardData } from "@/server/dashboard"

export const Route = createFileRoute("/_authenticated/dashboard")({
	loader: () => getDashboardData(),
	errorComponent: () => {
		return <h2>Something went wrong</h2>
	},
	component: DashboardComponent,
})

function DashboardComponent() {
	const { stats, weeklyActivity } = Route.useLoaderData()

	// const calculateBMI = (w?: number | null, h?: number | null) => {
	// 	if (!w || !h) return null
	// 	const bmi = w / (h / 100) ** 2
	// 	return bmi.toFixed(1)
	// }

	// const bmi = calculateBMI(profile?.weight, profile?.height)

	return (
		<div className="flex min-h-screen w-full flex-col bg-slate-50/50">
			<main className="flex-1 space-y-8 p-4 pt-6 md:p-8 max-w-7xl mx-auto w-full">
				<DashboardHeader />
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
					<div className="grid gap-6 lg:grid-cols-6">
						<StepLogger />
						<SleepLogger />
					</div>

					{/* Bottom Grid: Detailed Insights */}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
						<ActivityOverview weeklyActivity={weeklyActivity} />
						{/*<ProfileSummary
							bmi={bmi}
							height={profile?.height}
							weight={profile?.weight}
							currentSteps={stats.steps.current}
						/>*/}
					</div>
				</div>
			</main>
		</div>
	)
}
