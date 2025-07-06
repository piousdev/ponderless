"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/shadcn/ui/sidebar";

interface Item {
	readonly title: string;
	readonly url: string;
}

interface IProgressHubMainNav {
	readonly title: string;
	readonly url: string;
	readonly icon: LucideIcon;
	readonly isActive?: boolean;
	readonly items?: readonly Item[];
}

export default function ProgressHubMainNav({
	items,
}: {
	items: IProgressHubMainNav[];
}) {
	const pathname = usePathname();

	const isActiveItem = (url: string) => {
		if (url === "/progress-hub") return pathname === "/progress-hub";
		return pathname.startsWith(url);
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Progress Hub</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					const isActive = isActiveItem(item.url);
					return (
						<Collapsible key={item.title} asChild defaultOpen={isActive}>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									tooltip={item.title}
									isActive={isActive}
								>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
								{item.items?.length ? (
									<>
										<CollapsibleTrigger asChild>
											<SidebarMenuAction className="data-[state=open]:rotate-90">
												<ChevronRight />
												<span className="sr-only">Toggle</span>
											</SidebarMenuAction>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton
															asChild
															isActive={pathname === subItem.url}
														>
															<Link href={subItem.url}>
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
