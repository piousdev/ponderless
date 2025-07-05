import MentorLayoutWrapper from "@/modules/mentor/components/mentor-layout-wrapper";
import { HydrateClient, caller } from "@/trpc/server";

interface IMentorLayout {
	children: React.ReactNode;
}

export default async function MentorLayout({ children }: IMentorLayout) {
	// Prefetch sidebar state on the server
	const serverCaller = await caller();
	await serverCaller.preferences.getSidebarState();

	return (
		<HydrateClient>
			<MentorLayoutWrapper>{children}</MentorLayoutWrapper>
		</HydrateClient>
	);
}
