"use client";

import * as React from "react";
import { trpc } from "@/trpc/client";
import { SidebarProvider as BaseSidebarProvider } from "./sidebar";

export function SidebarProvider({
	children,
	...props
}: React.ComponentProps<typeof BaseSidebarProvider>) {
	// Get initial state from server
	const { data: sidebarState, isLoading } = trpc.preferences.getSidebarState.useQuery(undefined, {
		staleTime: Infinity, // Don't refetch on window focus
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	const setSidebarStateMutation = trpc.preferences.setSidebarState.useMutation();

	// Use the server state as initial state, fallback to true
	const [localOpen, setLocalOpen] = React.useState<boolean | undefined>(
		undefined,
	);

	React.useEffect(() => {
		if (sidebarState && localOpen === undefined) {
			setLocalOpen(sidebarState.isOpen);
		}
	}, [sidebarState, localOpen]);

	const handleOpenChange = React.useCallback(
		(open: boolean) => {
			setLocalOpen(open);
			// Update server state
			setSidebarStateMutation.mutate({ isOpen: open });
		},
		[setSidebarStateMutation],
	);

	// Show a subtle loading state or use default while loading
	if (isLoading || localOpen === undefined) {
		return (
			<BaseSidebarProvider
				{...props}
				defaultOpen={true}
				open={true}
				onOpenChange={() => {}}
			>
				{children}
			</BaseSidebarProvider>
		);
	}

	return (
		<BaseSidebarProvider
			{...props}
			defaultOpen={localOpen}
			open={localOpen}
			onOpenChange={handleOpenChange}
		>
			{children}
		</BaseSidebarProvider>
	);
}
