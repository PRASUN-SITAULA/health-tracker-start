import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityOverviewProps {
	weeklyActivity: Array<{ day: string; steps: number }>
}

export function ActivityOverview({ weeklyActivity }: ActivityOverviewProps) {
	const currentDayName = new Date().toLocaleDateString("en-US", { weekday: "short" })

	return (
		<Card className="col-span-full lg:col-span-4 shadow-sm border-slate-200">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Activity Overview</CardTitle>
						<CardDescription>
							Your step count for the past 7 days.
						</CardDescription>
					</div>
					<Badge variant="outline" className="font-normal text-xs">
						Last 7 Days
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pt-6">
				<div className="flex h-[280px] w-full items-end justify-between px-2 gap-2 sm:gap-4">
					{weeklyActivity.map((day) => {
						const maxSteps = 12000
						const height = (day.steps / maxSteps) * 100
						const isToday = day.day === currentDayName

						return (
							<div
								key={day.day}
								className="flex flex-1 flex-col items-center gap-3 group"
							>
								<div className="relative w-full max-w-[40px] flex-1 flex flex-col justify-end min-h-[40px]">
									<div
										className={`w-full rounded-t-lg transition-all duration-500 ease-out relative group-hover:scale-x-105 ${
											isToday
												? "bg-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
												: "bg-slate-200 group-hover:bg-slate-300"
										}`}
										style={{ height: `${Math.max(height, 5)}%` }}
									>
										<div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-20 pointer-events-none mb-1 shadow-xl">
											{day.steps.toLocaleString()}
											<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900" />
										</div>
									</div>
								</div>
								<span
									className={`text-xs font-semibold ${
										isToday ? "text-primary" : "text-slate-500"
									}`}
								>
									{day.day}
								</span>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
