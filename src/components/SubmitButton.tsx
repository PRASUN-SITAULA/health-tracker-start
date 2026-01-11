import { Loader2 } from "lucide-react"
import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = Omit<ComponentProps<typeof Button>, "type"> & {
	pending?: boolean
	pendingText?: string
	className?: string
}

export function SubmitButton({
	children,
	pending,
	pendingText,
	className,
	...props
}: Props) {
	return (
		<Button
			type="submit"
			aria-disabled={pending}
			{...props}
			className={cn("w-full", className)}
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					{pendingText}
				</>
			) : (
				children
			)}
		</Button>
	)
}
