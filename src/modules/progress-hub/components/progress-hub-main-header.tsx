"use client";

import { Bell, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Badge } from "@/components/shadcn/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { SidebarTrigger } from "@/components/shadcn/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { ThemeToggleButton } from "@/components/theme-toggle";

interface IProgressHubMainHeader {
	readonly notificationCount?: number;
}

// Route mapping for breadcrumbs
const routeMap: Record<string, string> = {
	"/progress-hub": "Overview",
	"/progress-hub/assessments": "Assessments",
	"/progress-hub/assessments/my-results": "My Results",
	"/progress-hub/assessments/schedule": "Schedule",
	"/progress-hub/progress": "My Progress",
	"/progress-hub/progress/cognitive-profile": "Cognitive Profile",
	"/progress-hub/goals": "Goals & Milestones",
	"/progress-hub/goals/achievements": "Achievements",
	"/progress-hub/learning": "My Learning",
};

export default function ProgressHubMainHeader({
	notificationCount = 0,
}: IProgressHubMainHeader) {
	const pathname = usePathname();

	// Generate breadcrumbs from current path
	const generateBreadcrumbs = () => {
		const segments = pathname.split("/").filter(Boolean);
		const breadcrumbs = [];

		// Always add Home as the first breadcrumb
		breadcrumbs.push({
			label: "Home",
			href: "/",
		});

		// Build path segments starting from progress-hub
		let currentPath = "";
		for (let i = 0; i < segments.length; i++) {
			currentPath += `/${segments[i]}`;
			const label = routeMap[currentPath] || segments[i];
			breadcrumbs.push({
				label,
				href: currentPath,
			});
		}

		return breadcrumbs;
	};

	const breadcrumbs = generateBreadcrumbs();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-14 items-center justify-between px-4 lg:px-6">
				{/* Left side - Sidebar trigger, separator, breadcrumbs */}
				<div className="flex items-center gap-2">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							{breadcrumbs.map((crumb) => {
								const isLast =
									crumb.href === breadcrumbs[breadcrumbs.length - 1].href;
								return (
									<React.Fragment key={crumb.href}>
										<BreadcrumbItem>
											{isLast ? (
												<BreadcrumbPage className="text-foreground font-semibold">
													{crumb.label}
												</BreadcrumbPage>
											) : (
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<BreadcrumbLink
																href={crumb.href}
																className="cursor-pointer hover:text-foreground transition-colors"
															>
																{crumb.label}
															</BreadcrumbLink>
														</TooltipTrigger>
														<TooltipContent>
															<p>Go to {crumb.label} page</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											)}
										</BreadcrumbItem>
										{!isLast && <BreadcrumbSeparator />}
									</React.Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>

				{/* Right side - Theme toggle, notifications, quick actions */}
				<div className="flex items-center gap-2">
					<ThemeToggleButton size="sm" variant="ghost" />

					{/* Notification Bell */}
					<Button
						variant="ghost"
						size="sm"
						className="relative cursor-pointer hover:bg-transparent"
					>
						<Bell className="size-4" />
						{notificationCount > 0 && (
							<Badge
								variant="destructive"
								className="absolute top-1.5 right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] font-medium bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white border-0 translate-x-1/2 -translate-y-1/2 rounded-full"
							>
								{notificationCount > 9 ? "9+" : notificationCount}
							</Badge>
						)}
						<span className="sr-only">
							{notificationCount > 0
								? `${notificationCount} notifications`
								: "No notifications"}
						</span>
					</Button>

					{/* Quick Action Button */}
					<Button size="sm" className="gap-2">
						<Plus className="size-4" />
						Quick Assessment
					</Button>
				</div>
			</div>
		</header>
	);
}