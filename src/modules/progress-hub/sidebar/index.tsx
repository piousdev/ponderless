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
			url: "/progress-hub",
			icon: LineChartIcon,
		},
		{
			title: "My Assessments",
			url: "/progress-hub/assessments",
			icon: FileChartLineIcon,
			items: [
				{
					title: "Test Library",
					url: "/progress-hub/assessments",
				},
				{
					title: "My Results",
					url: "/progress-hub/assessments/my-results",
				},
				{
					title: "Schedule",
					url: "/progress-hub/assessments/schedule",
				},
			],
		},
		{
			title: "My Progress",
			url: "/progress-hub/progress",
			icon: BarChartIcon,
			items: [
				{
					title: "Performance Analytics",
					url: "/progress-hub/progress",
				},
				{
					title: "Cognitive Profile",
					url: "/progress-hub/progress/cognitive-profile",
				},
			],
		},
		{
			title: "My Goals",
			url: "/progress-hub/goals",
			icon: CrosshairIcon,
			items: [
				{
					title: "Active Goals",
					url: "/progress-hub/goals",
				},
				{
					title: "Achievements",
					url: "/progress-hub/goals/achievements",
				},
			],
		},
		{
			title: "My Learning",
			url: "/progress-hub/learning",
			icon: BookOpenIcon,
			items: [
				{
					title: "Exercise History",
					url: "/progress-hub/learning",
				},
			],
		},
	],
	secondaryNav: [
		{
			title: "Help",
			url: "/progress-hub/help",
			icon: HelpCircle,
		},
		{
			title: "Feedback",
			url: "/progress-hub/feedback",
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
