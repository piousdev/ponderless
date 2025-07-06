"use client";

import { SidebarInset } from "@/components/shadcn/ui/sidebar";
import { SidebarProvider } from "@/components/shadcn/ui/sidebar-with-trpc";
import MentorMainHeader from "@/modules/mentors/components/mentor-main-header";
import MentorSidebar from "@/modules/mentors/sidebar";

interface IMentorLayoutWrapper {
	children: React.ReactNode;
}

export default function MentorLayoutWrapper({
	children,
}: IMentorLayoutWrapper) {
	// Mock notification state - in a real app, this would come from a context or API
	const notificationCount = 3; // You can implement real notification logic here

	const handleCreateMentor = () => {
		// TODO: Implement create mentor functionality
		console.log("Create mentor clicked");
	};

	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<MentorSidebar />
				<SidebarInset>
					<MentorMainHeader
						notificationCount={notificationCount}
						onCreateMentor={handleCreateMentor}
					/>
					<div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
