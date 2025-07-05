import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/shadcn/ui/button";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function Home() {
	// Prefetch data on the server
	await prefetch(trpc.hello.queryOptions({ text: "world" }));

	return (
		<HydrateClient>
			<div>Home Page Greetings</div>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<div className="p-4 space-y-4 flex flex-col max-w-[200px]">
						<Button>Default</Button>
						<Button variant="primary">Primary</Button>
						<Button variant="primaryOutline">Primary Outline</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="secondaryOutline">Secondary Outline</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="destructiveOutline">Destructive Outline</Button>
						<Button variant="super">Super</Button>
						<Button variant="superOutline">Super Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="sidebar">Sidebar</Button>
						<Button variant="sidebarOutline">Sidebar Outline</Button>
					</div>
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	);
}
