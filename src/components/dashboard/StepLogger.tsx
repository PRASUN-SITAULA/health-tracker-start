import { useForm } from "@tanstack/react-form"
import { useRouter } from "@tanstack/react-router"
import { format } from "date-fns"
import { CalendarIcon, Footprints, Plus } from "lucide-react"
import { toast } from "sonner"
import { SubmitButton } from "@/components/SubmitButton"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
  FieldError,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { LogStepsSchema } from "@/lib/schema/steps"
import { logSteps } from "@/server/dashboard"
import { cn } from "@/lib/utils"

export function StepLogger() {
	const router = useRouter()

	const form = useForm({
		defaultValues: {
			count: 0,
			date: new Date(),
		},
		validators: {
			onSubmit: LogStepsSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await logSteps({ data: { count: value.count, date: value.date } })
			if (res.success) {
				toast.success("Steps logged successfully!")
				router.invalidate()
				form.reset()
			} else {
				toast.error("Failed to log steps")
			}
		},
	})

	const quickAdd = (amount: number) => {
		const current = form.getFieldValue("count")
		form.setFieldValue("count", current + amount)
	}

	return (
		<Card className="col-span-full lg:col-span-3 shadow-md border-slate-200/60 overflow-hidden">
			<CardHeader className="flex flex-row items-center justify-between pb-6 bg-slate-50/50 border-b border-slate-100">
				<div className="space-y-1.5">
					<CardTitle className="text-xl font-bold tracking-tight">Log Progress</CardTitle>
					<CardDescription className="text-slate-500 font-medium">
						Keep track of your daily movement.
					</CardDescription>
				</div>
				<div className="hidden sm:block">
					<div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100/50 shadow-sm">
						<Footprints className="h-6 w-6 text-indigo-500" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-6">
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<form.Field name="date">
							{(field) => (
								<div className="flex flex-col gap-2">
									<FieldLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider">
										Date
									</FieldLabel>
									<Popover>
										<PopoverTrigger
											render={
												<Button
													variant="outline"
													className={cn(
														"w-full h-12 justify-start text-left font-medium bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/10 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base",
														!field.state.value && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="mr-3 h-4 w-4 text-slate-400" />
													{field.state.value ? (
														format(field.state.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											}
										/>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.state.value}
												onSelect={(newDate) =>
													newDate && field.handleChange(newDate)
												}
											/>
										</PopoverContent>
									</Popover>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>

						<form.Field name="count">
							{(field) => (
								<div className="flex flex-col gap-2">
									<FieldLabel
										htmlFor={field.name}
										className="text-sm font-bold text-slate-700 uppercase tracking-wider"
									>
										Step Count
									</FieldLabel>
									<div className="relative">
										<Input
											type="number"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(Number(e.target.value))}
											placeholder="e.g. 10000"
											className="h-12 w-full bg-white border-slate-200 focus:ring-2 focus:ring-indigo-500/20 transition-all text-lg font-semibold pr-10"
										/>
										<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
											<Plus className="h-4 w-4 text-slate-300" />
										</div>
                  </div>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					<div className="space-y-3">
						<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
							Quick Add
						</p>
						<div className="flex flex-wrap gap-2">
							{[1000, 2000, 5000, 10000].map((amount) => (
								<Button
									key={amount}
									type="button"
									variant="outline"
									size="sm"
									onClick={() => quickAdd(amount)}
									className="rounded-full border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-semibold"
								>
									+{amount.toLocaleString()}
								</Button>
							))}
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => form.setFieldValue("count", 0)}
								className="rounded-full text-slate-400 hover:text-destructive hover:bg-destructive/5 transition-colors font-medium ml-auto"
							>
								Reset
							</Button>
						</div>
					</div>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<SubmitButton
								pending={isSubmitting}
								disabled={!canSubmit}
								className="h-14 w-full text-lg font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all active:scale-[0.99] bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl"
							>
								<Plus className="mr-2 h-6 w-6 stroke-[3]" />
								Save Daily Steps
							</SubmitButton>
						)}
					</form.Subscribe>
				</form>
			</CardContent>
		</Card>
	)
}
