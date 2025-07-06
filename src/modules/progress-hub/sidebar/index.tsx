"use client";

import { HelpCircle, Send } from "lucide-react";
import type * as React from "react";
import {
	BarChartIcon,
	BookOpenIcon,
	CrosshairIcon,
	FileChartLineIcon,
	LineChartIcon,
} from "@/components/icons";
import SidebarLogo from "@/components/logo-sidebar";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar";
import { authClient } from "@/lib/auth/auth-client";
import UserNav from "@/modules/mentors/sidebar/user-nav";
import ProgressHubMainNav from "@/modules/progress-hub/sidebar/main-nav";
import ProgressHubProgressCard from "@/modules/progress-hub/sidebar/progress-card";
import ProgressHubSecondaryNav from "@/modules/progress-hub/sidebar/secondary-nav";

const data = {
	mainNav: [
		{
			title: "Overview",
			url: "/progress",
			icon: LineChartIcon,
		},
		{
			title: "Assessments",
			url: "/progress/assessments",
			icon: FileChartLineIcon,
			items: [
				{
					title: "Schedule",
					url: "/progress/assessments/schedule",
				},
				{
					title: "Results",
					url: "/progress/assessments/results",
				},
				{
					title: "Library",
					url: "/progress/assessments/library",
				},
			],
		},
		{
			title: "Progress",
			url: "/progress/my-progress",
			icon: BarChartIcon,
			items: [
				{
					title: "Performance Analytics",
					url: "/progress/my-progress/analytics",
				},
				{
					title: "Cognitive Profile",
					url: "/progress/my-progress/cognitive-profile",
				},
			],
		},
		{
			title: "Goals",
			url: "/progress/goals",
			icon: CrosshairIcon,
			items: [
				{
					title: "Active Goals",
					url: "/progress/goals/active",
				},
				{
					title: "Achievements",
					url: "/progress/goals/achievements",
				},
			],
		},
		{
			title: "Learning",
			url: "/progress/learning",
			icon: BookOpenIcon,
			items: [
				{
					title: "Exercise History",
					url: "/progress/learning/history",
				},
			],
		},
	],
	secondaryNav: [
		{
			title: "Help",
			url: "/progress/help",
			icon: HelpCircle,
		},
		{
			title: "Feedback",
			url: "/progress/feedback",
			icon: Send,
		},
	],
};

export default function ProgressHubSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { data: session } = authClient.useSession();

	// Don't render sidebar if user is not logged in
	if (!session?.user) {
		return null;
	}

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<SidebarLogo subTitle="Track Your Growth" />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<ScrollArea className="flex-1">
					<ProgressHubMainNav items={data.mainNav} />
					<ProgressHubProgressCard
						currentStreak={12}
						weeklyGoal={5}
						completedThisWeek={3}
						totalAssessments={47}
					/>
					<ProgressHubSecondaryNav
						items={data.secondaryNav}
						className="mt-auto"
					/>
				</ScrollArea>
			</SidebarContent>
			<SidebarFooter>
				<UserNav user={session.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
