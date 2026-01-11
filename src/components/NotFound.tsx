import { Link } from "@tanstack/react-router"
import { Activity, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
	return (
		<main className="min-h-screen bg-linear-to-br from-background via-background to-muted flex items-center justify-center px-4">
			<div className="w-full max-w-2xl mx-auto">
				{/* Animated background element */}
				<div className="absolute inset-0 -z-10 overflow-hidden">
					<div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
				</div>

				<div className="text-center space-y-8">
					{/* Icon with animation */}
					<div className="flex justify-center">
						<div className="relative">
							<div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
								<Activity
									className="w-12 h-12 text-green-600"
									strokeWidth={1.5}
								/>
							</div>
						</div>
					</div>

					{/* 404 message */}
					<div className="space-y-4">
						<h1 className="text-6xl md:text-7xl font-bold text-foreground font-sans">
							404
						</h1>
						<p className="text-xl md:text-2xl text-foreground/80 font-medium">
							Looks like you've wandered off the fitness trail
						</p>
						<p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
							This page doesn't exist, but your health goals do! Let's get you
							back on track and heading toward your wellness destination.
						</p>
					</div>

					{/* Action buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
						<Link to="/">
							<Button
								size="lg"
								className="bg-green-600 hover:bg-green-700 text-white gap-2"
							>
								<Home className="w-5 h-5" />
								Back to Dashboard
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
