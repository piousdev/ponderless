"use client";

import {
	Calendar,
	HelpCircle,
	History,
	Send,
	Users,
	Users2,
} from "lucide-react";
import type * as React from "react";
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
import SidebarMainNav from "@/modules/mentors/sidebar/main-nav";
import SecondaryNav from "@/modules/mentors/sidebar/secondary-nav";
import TrialCard from "@/modules/mentors/sidebar/trial-card";
import UserNav from "@/modules/mentors/sidebar/user-nav";

const data = {
	mainNav: [
		{
			title: "Mentors",
			url: "/mentors",
			icon: Users,
		},
		{
			title: "Meetings",
			url: "/mentors/meetings",
			icon: Calendar,
		},
		{
			title: "Community",
			url: "/mentors/community",
			icon: Users2,
		},
		{
			title: "History",
			url: "/mentors/history",
			icon: History,
		},
	],
	secondaryNav: [
		{
			title: "Help",
			url: "/mentors/help",
			icon: HelpCircle,
		},
		{
			title: "Feedback",
			url: "/mentors/feedback",
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
							<SidebarLogo subTitle="Your Personal Mentor" />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<ScrollArea className="flex-1">
					<SidebarMainNav items={data.mainNav} />
					<TrialCard
						currentMentors={2}
						maxMentors={5}
						currentMeetings={3}
						maxMeetings={10}
					/>
					<SecondaryNav items={data.secondaryNav} className="mt-auto" />
				</ScrollArea>
			</SidebarContent>
			<SidebarFooter>
				<UserNav user={session.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
