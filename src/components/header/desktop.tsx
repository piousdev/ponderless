"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import {
	filterNavigationByRole,
	type INavigationItem,
	primaryNavItems,
	secondaryNavItems,
	type UserRole,
} from "@/config/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

interface INavigation {
	readonly className?: string;
}

const PrimaryNav: React.FC<INavigation> = ({ className }) => {
	const pathname = usePathname();
	const { data: session } = authClient.useSession();

	const userRoles: ReadonlyArray<UserRole> = session?.user
		? ["authenticated"]
		: ["guest"];

	const filteredNavItems = filterNavigationByRole(primaryNavItems, userRoles);

	const isActive = (
		href: string | null | undefined,
		exact?: boolean | null | undefined,
	): boolean => {
		if (!href) return false;
		if (exact || href === "/") return pathname === href;
		return pathname.startsWith(href);
	};

	return (
		<nav
			className={cn("hidden md:flex md:grow", className)}
			aria-label="Primary navigation"
		>
			<ul className="flex grow flex-wrap items-center justify-center gap-4 text-sm lg:gap-8">
				{filteredNavItems.map((item) => {
					if (!item.hrefOrExternalUrl) return null;

					const active = isActive(
						item.hrefOrExternalUrl,
						item.exact ?? undefined,
					);

					return (
						<li className="px-3 py-1" key={item.id}>
							<Link
								className={cn(
									"flex items-center duration-200 text-sm font-medium transition-all",
									active
										? "text-foreground hover:text-foreground"
										: "text-muted-foreground/70 hover:text-foreground",
								)}
								href={item.hrefOrExternalUrl}
								aria-current={active ? "page" : undefined}
							>
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

const SecondaryNav: React.FC<INavigation> = ({ className }) => {
	const { data: session } = authClient.useSession();

	const userRoles: ReadonlyArray<UserRole> = session?.user
		? ["authenticated"]
		: ["guest"];

	const filteredNavItems = filterNavigationByRole(
		secondaryNavItems,
		userRoles,
	).filter((item) => {
		// Hide login/register when authenticated
		if (item.meta?.hideWhenAuthenticated && session?.user) {
			return false;
		}
		return true;
	});

	const getButtonVariant = (item: INavigationItem) => {
		// Use variant from metadata if available, otherwise default to "primary"
		return (
			(item.meta?.variant as
				| "primary"
				| "secondary"
				| "ghost"
				| "destructive"
				| null) || "primary"
		);
	};

	return (
		<nav
			className={cn("hidden md:flex items-center gap-2", className)}
			aria-label="Secondary navigation"
		>
			<div className="flex items-center gap-2">
				{filteredNavItems.map((item) => {
					// Handle items with onClick and no navigation
					if (item.meta?.noNavigation && item.onClick) {
						return (
							<Button
								key={item.id}
								onClick={item.onClick}
								className="flex items-center px-2 py-2 text-muted-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
								variant="ghost"
								aria-label={item.ariaLabel || item.title}
							>
								{item.title}
							</Button>
						);
					}

					// Handle regular navigation items
					if (!item.hrefOrExternalUrl) return null;

					return (
						<Button key={item.id} asChild variant={getButtonVariant(item)}>
							<Link href={item.hrefOrExternalUrl}>{item.title}</Link>
						</Button>
					);
				})}

				<ThemeToggleButton className="ml-2" />
			</div>
		</nav>
	);
};

interface IDesktopNavigation {
	readonly primaryNavClassName?: string;
	readonly secondaryNavClassName?: string;
}

const DesktopNavigation: React.FC<IDesktopNavigation> = ({
	primaryNavClassName,
	secondaryNavClassName,
}) => {
	return (
		<>
			<PrimaryNav className={primaryNavClassName} />
			<SecondaryNav className={secondaryNavClassName} />
		</>
	);
};

export default DesktopNavigation;
