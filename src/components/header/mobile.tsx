"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import { UserProfileDropdown } from "@/components/user-profile-dropdown";
import {
	filterNavigationByRole,
	type INavigationItem,
	primaryNavItems,
	secondaryNavItems,
	type UserRole,
} from "@/config/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

// Custom hook for delayed unmount to handle exit animations
function useDelayedUnmount(isMounted: boolean, delayTime: number) {
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (isMounted && !shouldRender) {
			setShouldRender(true);
		} else if (!isMounted && shouldRender) {
			timeoutId = setTimeout(() => setShouldRender(false), delayTime);
		}
		return () => clearTimeout(timeoutId);
	}, [isMounted, delayTime, shouldRender]);

	return shouldRender;
}

const MobileNavigation = () => {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const shouldRenderNav = useDelayedUnmount(mobileNavOpen, 200);
	const navId = useId();
	const pathname = usePathname();
	const { data: session } = authClient.useSession();

	const trigger = useRef<HTMLButtonElement>(null);
	const mobileNav = useRef<HTMLDivElement>(null);

	const userRoles: ReadonlyArray<UserRole> = session?.user
		? ["authenticated"]
		: ["guest"];

	const filteredNavItems = filterNavigationByRole(primaryNavItems, userRoles);
	const filteredSecondaryNavItems = filterNavigationByRole(
		secondaryNavItems,
		userRoles,
	).filter((item) => {
		// Hide login/register when authenticated
		if (item.meta?.hideWhenAuthenticated && session?.user) {
			return false;
		}
		return true;
	});

	const isActive = (
		href: string | null | undefined,
		exact?: boolean | null | undefined,
	): boolean => {
		if (!href) return false;
		if (exact || href === "/") return pathname === href;
		return pathname.startsWith(href);
	};

	const getButtonVariant = (item: INavigationItem) => {
		// Use variant from metadata if available, otherwise default to "ghost"
		return (item.meta?.variant as string) || "ghost";
	};

	useEffect(() => {
		const clickHandler = ({ target }: { target: EventTarget | null }): void => {
			if (!mobileNav.current || !trigger.current) return;
			if (
				!mobileNavOpen ||
				mobileNav.current.contains(target as Node) ||
				trigger.current.contains(target as Node)
			)
				return;
			setMobileNavOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	useEffect(() => {
		const keyHandler = ({ keyCode }: { keyCode: number }): void => {
			if (!mobileNavOpen || keyCode !== 27) return;
			setMobileNavOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<div className="flex justify-end md:hidden">
			{/* Hamburger button */}
			<Button
				ref={trigger}
				variant="ghost"
				size="icon"
				className={`group inline-flex size-8 items-center justify-center bg-background text-center text-foreground transition ${mobileNavOpen && "active"}`}
				aria-controls={`mobile-nav-${navId}`}
				aria-expanded={mobileNavOpen}
				onClick={() => setMobileNavOpen(!mobileNavOpen)}
			>
				<span className="sr-only">Menu</span>
				<svg
					aria-hidden="true"
					className="pointer-events-none fill-current"
					width={16}
					height={16}
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] translate-x-[7px] group-aria-expanded:rotate-[315deg] group-aria-expanded:translate-y-0 group-aria-expanded:translate-x-0"
						y="7"
						width="9"
						height="2"
						rx="1"
					></rect>
					<rect
						className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
						y="7"
						width="16"
						height="2"
						rx="1"
					></rect>
					<rect
						className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-aria-expanded:rotate-[135deg] group-aria-expanded:translate-y-0"
						y="7"
						width="9"
						height="2"
						rx="1"
					></rect>
				</svg>
			</Button>

			{/*Mobile navigation */}
			<div ref={mobileNav}>
				{shouldRenderNav && (
					<nav
						id={`mobile-nav-${navId}`}
						className={`absolute left-0 top-full z-20 w-full rounded-xl bg-background shadow-lg shadow-foreground/[0.03] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-accent),var(--color-muted))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] transform transition-all duration-200 ease-out ${
							mobileNavOpen
								? "translate-y-0 opacity-100"
								: "-translate-y-2 opacity-0 pointer-events-none"
						}`}
						aria-label="Mobile navigation"
					>
						<div className="p-4">
							{/* Primary Navigation */}
							<ul className="flex flex-col space-y-2">
								{filteredNavItems.map((item) => {
									if (!item.hrefOrExternalUrl) return null;

									const active = isActive(
										item.hrefOrExternalUrl,
										item.exact ?? undefined,
									);

									return (
										<li key={item.id}>
											<Link
												href={item.hrefOrExternalUrl}
												className={cn(
													"flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] relative",
													active
														? "bg-accent text-accent-foreground shadow-sm"
														: "text-muted-foreground hover:text-foreground hover:bg-accent/50",
												)}
												aria-current={active ? "page" : undefined}
												onClick={() => setMobileNavOpen(false)}
											>
												{item.title}
												{active && (
													<div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full" />
												)}
											</Link>
										</li>
									);
								})}
							</ul>

							{/* Separator */}
							{filteredSecondaryNavItems.length > 0 && (
								<div className="border-t border-border/50 my-4" />
							)}

							{/* Secondary Navigation - Login/Register and Theme Toggle */}
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-2 flex-1">
									{/* Show login button when not authenticated */}
									{!session?.user &&
										filteredSecondaryNavItems.map((item) => {
											// Handle items with onClick and no navigation
											if (item.meta?.noNavigation && item.onClick) {
												return (
													<Button
														key={item.id}
														onClick={(event) => {
															item.onClick?.(event);
															setMobileNavOpen(false);
														}}
														variant="ghost"
														size="sm"
														className="flex-1"
														aria-label={item.ariaLabel || item.title}
													>
														{item.title}
													</Button>
												);
											}

											// Handle regular navigation items
											if (!item.hrefOrExternalUrl) return null;

											return (
												<Button
													key={item.id}
													asChild
													variant={getButtonVariant(item)}
													size="sm"
													className="flex-1"
												>
													<Link
														href={item.hrefOrExternalUrl}
														onClick={() => setMobileNavOpen(false)}
													>
														{item.title}
													</Link>
												</Button>
											);
										})}

									{/* Show user profile dropdown when authenticated */}
									{session?.user && (
										<div className="flex justify-center">
											<UserProfileDropdown user={session.user} />
										</div>
									)}
								</div>

								{/* Theme Toggle */}
								<div className="flex items-center">
									<ThemeToggleButton
										size="icon"
										variant="ghost"
										className="size-9"
									/>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<span>
											Ponderless &copy; {new Date().getFullYear()}. All rights
											reserved
										</span>
									</div>
								</div>
							</div>
						</div>
					</nav>
				)}
			</div>
		</div>
	);
};

export default MobileNavigation;
