"use client";

import {
	BarChart3,
	BookOpen,
	ChevronDown,
	ClipboardCheck,
	Home,
	LogOut,
	type LucideIcon,
	Settings,
	Target,
	User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/shadcn/ui/sidebar";
import { cn } from "@/lib/utils";

type NavItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	children?: Omit<NavItem, "icon" | "children">[];
};

const navItems: NavItem[] = [
	{ title: "Overview", href: "/", icon: Home },
	{
		title: "Assessments",
		href: "/assessments",
		icon: ClipboardCheck,
		children: [
			{ title: "Test Library", href: "/assessments" },
			{ title: "My Results", href: "/assessments/my-results" },
			{ title: "Schedule", href: "/assessments/schedule" },
		],
	},
	{
		title: "My Progress",
		href: "/progress",
		icon: BarChart3,
		children: [
			{ title: "Performance Analytics", href: "/progress" },
			{ title: "Cognitive Profile", href: "/progress/cognitive-profile" },
		],
	},
	{
		title: "Goals & Milestones",
		href: "/goals",
		icon: Target,
		children: [
			{ title: "Active Goals", href: "/goals" },
			{ title: "Achievements", href: "/goals/achievements" },
		],
	},
	{
		title: "My Learning",
		href: "/learning",
		icon: BookOpen,
		children: [{ title: "Exercise History", href: "/learning" }],
	},
];

export function DashboardSidebar() {
	const pathname = usePathname();
	const { state } = useSidebar();

	const isSectionActive = (item: NavItem) => {
		if (item.href === "/") return pathname === "/";
		return pathname.startsWith(item.href);
	};

	return (
		<Sidebar>
			<SidebarHeader>
				<h1
					className={cn(
						"text-2xl font-bold text-center text-white transition-all",
						state === "collapsed" && "text-base",
					)}
				>
					{state === "expanded" ? "Progress Hub" : "PH"}
				</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					{navItems.map((item) => (
						<SidebarMenuItem key={item.title}>
							{item.children ? (
								<Collapsible defaultOpen={isSectionActive(item)}>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											isActive={isSectionActive(item)}
											tooltip={item.title}
										>
											<item.icon />
											<span
												className={cn(
													"transition-opacity",
													state === "collapsed" && "opacity-0 w-0",
												)}
											>
												{item.title}
											</span>
											<ChevronDown
												className={cn(
													"ml-auto h-4 w-4 shrink-0 transition-transform duration-200",
													state === "collapsed" && "opacity-0",
													"[.group[data-state=open]_&]:rotate-180",
												)}
											/>
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.children.map((child) => (
												<SidebarMenuSubItem key={child.title}>
													<SidebarMenuButton
														asChild
														isActive={pathname === child.href}
													>
														<Link href={child.href}>{child.title}</Link>
													</SidebarMenuButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</Collapsible>
							) : (
								<SidebarMenuButton
									asChild
									isActive={pathname === item.href}
									tooltip={item.title}
								>
									<Link href={item.href}>
										<item.icon />
										<span
											className={cn(
												"transition-opacity",
												state === "collapsed" && "opacity-0 w-0",
											)}
										>
											{item.title}
										</span>
									</Link>
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="View Profile">
							<User />
							<span
								className={cn(
									"transition-opacity",
									state === "collapsed" && "opacity-0 w-0",
								)}
							>
								View Profile
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Settings">
							<Settings />
							<span
								className={cn(
									"transition-opacity",
									state === "collapsed" && "opacity-0 w-0",
								)}
							>
								Settings
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Logout">
							<LogOut />
							<span
								className={cn(
									"transition-opacity",
									state === "collapsed" && "opacity-0 w-0",
								)}
							>
								Logout
							</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
