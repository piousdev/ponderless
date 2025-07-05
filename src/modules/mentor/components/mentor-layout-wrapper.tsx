"use client";

import MentorSidebar from "@/modules/mentor/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/shadcn/ui/sidebar";

interface IMentorLayoutWrapper {
	children: React.ReactNode;
}

export default function MentorLayoutWrapper({ children }: IMentorLayoutWrapper) {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<MentorSidebar />
				<SidebarInset>
					<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}