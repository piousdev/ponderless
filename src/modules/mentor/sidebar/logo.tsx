import { LogoIcon } from "@/components/icons";

export default function SidebarLogo() {
	return (
		<>
			<div className="bg-sidebar-secondary text-sidebar-secondary-foreground flex aspect-square size-14 items-center justify-center rounded-lg">
				<LogoIcon className="size-10" />
			</div>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-medium">Ponderless</span>
				<span className="truncate text-xs">Your Personal Mentor</span>
			</div>
		</>
	);
}
