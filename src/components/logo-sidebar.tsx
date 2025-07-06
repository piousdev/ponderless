import Link from "next/link";
import { useState } from "react";
import { LogoIcon } from "@/components/icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

interface ISidebarLogoProps {
	subTitle: string;
}

export default function SidebarLogo({ subTitle }: ISidebarLogoProps) {
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
						href="/"
						className="flex items-center gap-4"
						onMouseEnter={handleMouseEnter}
					>
						<div className="bg-sidebar-secondary text-sidebar-secondary-foreground flex aspect-square size-14 items-center justify-center rounded-lg">
							<LogoIcon className="size-10" />
						</div>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">Ponderless</span>
							<span className="truncate text-xs">{subTitle}</span>
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Go to homepage</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
