import { useRouter } from "@tanstack/react-router"
import { Activity, LogOut, Settings, User } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export const DashboardHeader = async () => {
	const { data } = authClient.useSession()
	const router = useRouter()
	const handleLogout = async () => {
		await authClient.signOut()
		router.navigate({ to: "/login" })
	}

	return (
		<>
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-slate-900">
						Welcome back, {data?.user.name.split(" ")[0]}!
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
						<DropdownMenuTrigger
							render={
								<Button
									variant="ghost"
									className="relative h-9 w-9 rounded-full ring-offset-background transition-colors hover:bg-slate-100"
								>
									<Avatar className="h-9 w-9 border shadow-sm">
										<AvatarImage
											src={data?.user.image || ""}
											alt={data?.user.name}
										/>
										<AvatarFallback className="bg-primary/5 text-primary font-bold">
											{data?.user.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Button>
							}
						/>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuGroup>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-semibold leading-none text-slate-900">
											{data?.user.name}
										</p>
										<p className="text-xs leading-none text-slate-500">
											{data?.user.email}
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
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</>
	)
}
