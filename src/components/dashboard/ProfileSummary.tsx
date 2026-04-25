import { Activity, Scale } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileSummaryProps {
	bmi: string | null
	height?: number | null
	weight?: number | null
	currentSteps: number
}

export function ProfileSummary({
	bmi,
	height,
	weight,
	currentSteps,
}: ProfileSummaryProps) {
	const getBMICategory = (val: string | null) => {
		if (!val) return "Unknown"
		const v = Number.parseFloat(val)
		if (v < 18.5) return "Underweight"
		if (v < 25) return "Normal"
		if (v < 30) return "Overweight"
		return "Obese"
	}

	const bmiCategory = getBMICategory(bmi)

	return (
		<Card className="col-span-full lg:col-span-3 shadow-sm border-slate-200">
			<CardHeader className="pb-4">
				<CardTitle>Health Profile</CardTitle>
				<CardDescription>
					Key metrics based on your latest measurements.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100">
						<Scale className="h-7 w-7 text-primary" />
					</div>
					<div className="space-y-1">
						<p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
							BMI Index
						</p>
						<div className="flex items-center gap-3">
							<span className="text-3xl font-bold text-slate-900">
								{bmi || "N/A"}
							</span>
							<Badge
								className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 ${
									bmiCategory === "Normal"
										? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none"
										: "bg-orange-100 text-orange-700 hover:bg-orange-100 border-none"
								}`}
							>
								{bmiCategory}
							</Badge>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
							Height
						</p>
						<p className="text-xl font-bold text-slate-900">
							{height || "--"}
							<span className="text-sm font-normal text-slate-500 ml-1">cm</span>
						</p>
					</div>
					<div className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
							Weight
						</p>
						<p className="text-xl font-bold text-slate-900">
							{weight || "--"}
							<span className="text-sm font-normal text-slate-500 ml-1">kg</span>
						</p>
					</div>
				</div>

				<div className="rounded-2xl bg-primary/5 p-5 border border-primary/10 relative overflow-hidden group">
					<div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
						<Activity className="h-12 w-12" />
					</div>
					<h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
						Quick Insight
					</h4>
					<p className="text-sm text-slate-600 leading-relaxed font-medium">
						{bmi
							? `Your BMI of ${bmi} indicates a "${bmiCategory}" status. Consistency in your ${currentSteps > 5000 ? "active" : "daily"} routine will help you reach your goals.`
							: "Provide your measurements in settings to unlock personalized BMI tracking and health recommendations."}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
