"use client";

import {
	Calendar,
	HelpCircle,
	History,
	Send,
	Users,
	Users2,
} from "lucide-react";
import Link from "next/link";
import type * as React from "react";
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
import SidebarLogo from "@/modules/mentor/sidebar/logo";
import SidebarMainNav from "@/modules/mentor/sidebar/main-nav";
import SecondaryNav from "@/modules/mentor/sidebar/secondary-nav";
import ThemeSwitcher from "@/modules/mentor/sidebar/theme-switcher";
import TrialCard from "@/modules/mentor/sidebar/trial-card";
import UserNav from "@/modules/mentor/sidebar/user-nav";

const data = {
	mainNav: [
		{
			title: "Mentors",
			url: "/mentor",
			icon: Users,
		},
		{
			title: "Meetings",
			url: "/mentor/meetings",
			icon: Calendar,
		},
		{
			title: "Community",
			url: "/mentor/community",
			icon: Users2,
		},
		{
			title: "History",
			url: "/mentor/history",
			icon: History,
		},
	],
	secondaryNav: [
		{
			title: "Help",
			url: "/mentor/help",
			icon: HelpCircle,
		},
		{
			title: "Feedback",
			url: "/mentor/feedback",
			icon: Send,
		},
	],
};

export default function MentorSidebar({
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
							<SidebarLogo />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMainNav items={data.mainNav} />
				<TrialCard
					currentMentors={2}
					maxMentors={5}
					currentMeetings={3}
					maxMeetings={10}
				/>
				<SecondaryNav items={data.secondaryNav} className="mt-auto" />
				<ThemeSwitcher />
			</SidebarContent>
			<SidebarFooter>
				<UserNav user={session.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
