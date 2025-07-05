"use client";

import {
	BookOpen,
	Bot,
	Calendar,
	Command,
	Frame,
	History,
	LifeBuoy,
	MapPin,
	PieChart,
	Send,
	Settings2,
	SquareTerminal,
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
import SidebarLogo from "@/modules/mentor/sidebar/logo";
import SidebarMainNav from "@/modules/mentor/sidebar/main-nav";
import SecondaryNav from "@/modules/mentor/sidebar/secondary-nav";
import SettingsNav from "@/modules/mentor/sidebar/settings-nav";
import UserNav from "@/modules/mentor/sidebar/user-nav";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
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
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	settings: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapPin,
		},
	],
};

export default function MentorSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<SidebarLogo />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMainNav items={data.mainNav} />
				<SettingsNav settings={data.settings} />
				<SecondaryNav items={data.secondaryNav} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<UserNav user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
