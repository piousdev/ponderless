import type { HTMLAttributes } from "react";
import DesktopNavigation from "@/components/header/desktop";
import MobileNavigation from "@/components/header/mobile";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
	readonly className?: string;
	readonly containerClassName?: string;
	readonly innerClassName?: string;
}

const Header: React.FC<HeaderProps> = ({
	className,
	containerClassName,
	innerClassName,
	...htmlProps
}) => {
	return (
		<header
			className={cn(
				"sticky z-50 w-full top-2 md:top-6",
				className,
			)}
			{...htmlProps}
		>
			<div
				className={cn(
					"mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
					containerClassName,
				)}
			>
				<div
					className={cn(
						"relative flex h-14 items-center justify-between rounded-2xl bg-background/90 px-6",
						"shadow-lg shadow-foreground/[0.03] backdrop:blur-xs",
						"before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
						"before:border before:border-transparent",
						"before:[background:linear-gradient(var(--color-accent),var(--color-muted))_border-box]",
						"before:[mask-composite:exclude_!important]",
						"before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]",
						innerClassName,
					)}
				>
					{/* Site branding */}
					<div className="flex items-center">
						<Logo />
					</div>

					{/* Desktop navigation */}
					<DesktopNavigation />

					{/* Mobile navigation */}
					<MobileNavigation />
				</div>
			</div>
		</header>
	);
};

Header.displayName = "Header";

export default Header;
