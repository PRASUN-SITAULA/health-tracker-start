import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface StatCardProps {
	title: string
	value: string | number
	unit?: string
	goal: string | number
	trend: string
	icon: LucideIcon
	colorClass: string
	bgClass: string
	iconColorClass: string
	progressValue: number
	indicatorClassName: string
}

export function StatCard({
	title,
	value,
	unit,
	goal,
	trend,
	icon: Icon,
	colorClass,
	bgClass,
	iconColorClass,
	progressValue,
	indicatorClassName,
}: StatCardProps) {
	return (
		<Card className="shadow-sm border-slate-200 overflow-hidden group">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-slate-600">
					{title}
				</CardTitle>
				<div className={cn("p-2 rounded-lg transition-colors", bgClass)}>
					<Icon className={cn("h-4 w-4", iconColorClass)} />
				</div>
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold text-slate-900">
					{value}
					{unit && (
						<span className="text-lg ml-1 font-normal text-slate-500">
							{unit}
						</span>
					)}
				</div>
				<div className="flex items-center justify-between mt-1">
					<p className="text-xs text-slate-500">
						Goal: {goal} {unit}
					</p>
					<span className={cn("text-xs font-medium", colorClass)}>{trend}</span>
				</div>
				<Progress
					value={progressValue}
					className="mt-3 h-2 bg-slate-100"
					indicatorClassName={indicatorClassName}
				/>
			</CardContent>
		</Card>
	)
}
