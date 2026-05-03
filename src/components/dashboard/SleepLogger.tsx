import { useForm } from "@tanstack/react-form"
import { useRouter } from "@tanstack/react-router"
import { format } from "date-fns"
import { CalendarIcon, Moon, Plus } from "lucide-react"
import { useState } from "react"
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
import { FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { LogSleepSchema } from "@/lib/schema/sleep"
import { cn } from "@/lib/utils"
import { logSleep } from "@/server/dashboard"

export function SleepLogger() {
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const form = useForm({
		defaultValues: {
			duration: 0,
			date: new Date(),
		},
		validators: {
			onSubmit: LogSleepSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await logSleep({
				data: { duration: value.duration, date: value.date },
			})
			if (res.success) {
				toast.success("Sleep duration logged successfully!")
				router.invalidate()
				form.reset()
			} else {
				toast.error("Failed to log sleep duration")
			}
		},
	})

	const quickAdd = (amount: number) => {
		const current = form.getFieldValue("duration")
		const next = Math.min(24, current + amount)
		form.setFieldValue("duration", next)
	}

	return (
		<Card className="col-span-full lg:col-span-3 shadow-md border-slate-200/60 overflow-hidden">
			<CardHeader className="flex flex-row items-center justify-between pb-6 bg-slate-50/50 border-b border-slate-100">
				<div className="space-y-1.5">
					<CardTitle className="text-xl font-bold tracking-tight">
						Log Sleep
					</CardTitle>
					<CardDescription className="text-slate-500 font-medium">
						Record your rest duration for better recovery.
					</CardDescription>
				</div>
				<div className="hidden sm:block">
					<div className="p-3 bg-purple-50 rounded-2xl border border-purple-100/50 shadow-sm">
						<Moon className="h-6 w-6 text-purple-500" />
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
									<Popover modal={true} open={open} onOpenChange={setOpen}>
										<PopoverTrigger
											render={
												<Button
													variant="outline"
													className={cn(
														"w-full h-12 justify-start text-left font-medium bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/10 focus:ring-2 focus:ring-purple-500/20 transition-all text-base",
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
												onSelect={(newDate) => {
													if (newDate) {
														field.handleChange(newDate)
														setOpen(false)
													}
												}}
												disabled={(date) => {
													const tomorrow = new Date()
													tomorrow.setHours(0, 0, 0, 0)
													tomorrow.setDate(tomorrow.getDate() + 1)
													return (
														date >= tomorrow || date < new Date("1900-01-01")
													)
												}}
												autoFocus
											/>
										</PopoverContent>
									</Popover>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>

						<form.Field name="duration">
							{(field) => (
								<div className="flex flex-col gap-2">
									<FieldLabel
										htmlFor={field.name}
										className="text-sm font-bold text-slate-700 uppercase tracking-wider"
									>
										Sleep (Hours)
									</FieldLabel>
									<div className="relative">
										<Input
											type="number"
											step="0.1"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) =>
												field.handleChange(Number(e.target.value))
											}
											placeholder="e.g. 7.5"
											className="h-12 w-full bg-white border-slate-200 focus:ring-2 focus:ring-purple-500/20 transition-all text-lg font-semibold pr-10"
										/>
										<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
											<Moon className="h-4 w-4 text-slate-300" />
										</div>
									</div>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					<div className="space-y-3">
						<p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
							Quick Add Hours
						</p>
						<div className="flex flex-wrap gap-2">
							{[0.5, 1, 2, 8].map((amount) => (
								<Button
									key={amount}
									type="button"
									variant="outline"
									size="sm"
									onClick={() => quickAdd(amount)}
									className="rounded-full border-slate-200 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600 transition-colors font-semibold"
								>
									+{amount}h
								</Button>
							))}
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => form.setFieldValue("duration", 0)}
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
								className="h-14 w-full text-lg font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all active:scale-[0.99] bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
							>
								<Plus className="mr-2 h-6 w-6 stroke-3" />
								Save Sleep Duration
							</SubmitButton>
						)}
					</form.Subscribe>
				</form>
			</CardContent>
		</Card>
	)
}
