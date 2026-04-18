import { Link } from "@tanstack/react-router"
import { Activity } from "lucide-react"
import { Button } from "./ui/button"

export const Header = () => {
	return (
		<>
			<div className="flex items-center gap-2">
				<Activity className="h-6 w-6 text-primary" />
				<span className="text-lg font-bold">HealthTracker</span>
			</div>
			<nav className="hidden gap-6 md:flex">
				<Link
					to="."
					className="text-sm font-medium hover:text-primary transition-colors"
				>
					Features
				</Link>
				<Link
					to="."
					className="text-sm font-medium hover:text-primary transition-colors"
				>
					Testimonials
				</Link>
				<Link
					to="."
					className="text-sm font-medium hover:text-primary transition-colors"
				>
					Pricing
				</Link>
			</nav>
			<div className="flex items-center gap-4">
				<Link
					to="/login"
					className="text-sm font-medium hover:text-primary transition-colors hidden md:block"
				>
					Log in
				</Link>
				<Button size="sm" render={<Link to="/sign-up">Get Started</Link>} />
			</div>
		</>
	)
}
