"use client";

import { SidebarInset } from "@/components/shadcn/ui/sidebar";
import { SidebarProvider } from "@/components/shadcn/ui/sidebar-with-trpc";
import ProgressHubMainHeader from "@/modules/progress-hub/components/progress-hub-main-header";
import ProgressHubSidebar from "@/modules/progress-hub/sidebar";

interface IProgressHubLayoutWrapper {
	children: React.ReactNode;
}

export default function ProgressHubLayoutWrapper({
	children,
}: IProgressHubLayoutWrapper) {
	// Mock notification state - in a real app, this would come from a context or API
	const notificationCount = 2; // You can implement real notification logic here

	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<ProgressHubSidebar />
				<SidebarInset>
					<ProgressHubMainHeader notificationCount={notificationCount} />
					<div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
