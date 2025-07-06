import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

export default function ProgressHubLogo() {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const handleMouseEnter = () => {
		setTooltipOpen(true);
		setTimeout(() => {
			setTooltipOpen(false);
		}, 1500);
	};

	return (
		<TooltipProvider>
			<Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
				<TooltipTrigger asChild>
					<Link
						href="/progress"
						className="flex items-center gap-4"
						onMouseEnter={handleMouseEnter}
					>
						<div className="bg-sidebar-secondary text-sidebar-secondary-foreground flex aspect-square size-14 items-center justify-center rounded-lg">
							<BarChart3 className="size-10" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">Progress Hub</span>
							<span className="truncate text-xs">Track Your Growth</span>
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Go to Progress Hub</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
