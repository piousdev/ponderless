"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";

const recentMentorActivity = [
	{
		title: "Connected with Dr. Reed",
		description: "Session on Cognitive Biases completed",
		type: "connected" as const,
		timestamp: "2 hours ago",
	},
	{
		title: "Scheduled meeting",
		description: "With Marcus Thorne for tomorrow",
		type: "scheduled" as const,
		timestamp: "Yesterday",
	},
	{
		title: "New Mentor Available",
		description: "Dr. Anya Sharma joined your network",
		type: "new_mentor" as const,
		timestamp: "2 days ago",
	},
	{
		title: "Pending request",
		description: "Waiting for Dr. Smith's response",
		type: "pending" as const,
		timestamp: "3 days ago",
	},
	{
		title: "Session reminder",
		description: "Marcus Thorne - Friday 2:00 PM",
		type: "scheduled" as const,
		timestamp: "3 days ago",
	},
];

export default function RecentActivity() {
	const router = useRouter();

	return (
		<div className="sticky top-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="font-semibold text-sm">Recent Activity</h3>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<MoreHorizontal className="h-4 w-4 text-muted-foreground" />
				</Button>
			</div>
			<div className="space-y-2">
				{recentMentorActivity.slice(0, 4).map((item, index) => {
					const getStatusBadge = (type: string) => {
						switch (type) {
							case "connected":
								return (
									<Badge
										variant="secondary"
										className="text-green-600 bg-green-50"
									>
										Complete
									</Badge>
								);
							case "scheduled":
								return (
									<Badge
										variant="secondary"
										className="text-blue-600 bg-blue-50"
									>
										Upcoming
									</Badge>
								);
							case "new_mentor":
								return (
									<Badge
										variant="secondary"
										className="text-purple-600 bg-purple-50"
									>
										New
									</Badge>
								);
							case "pending":
								return (
									<Badge
										variant="secondary"
										className="text-yellow-600 bg-yellow-50"
									>
										Pending
									</Badge>
								);
							default:
								return null;
						}
					};

					return (
						<div
							key={item.title}
							className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
						>
							<div className="flex items-start justify-between gap-2 mb-1">
								<p className="font-medium text-sm leading-tight">
									{item.title}
								</p>
								{getStatusBadge(item.type || "default")}
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed mb-1">
								{item.description}
							</p>
							{item.timestamp && (
								<p className="text-xs text-muted-foreground/60">
									{item.timestamp}
								</p>
							)}
						</div>
					);
				})}
				{recentMentorActivity.length > 4 && (
					<div className="pt-2">
						<Button
							variant="secondary"
							size="sm"
							className="w-full text-xs cursor-pointer"
							onClick={() => router.push("/mentor/activity")}
						>
							View All Activity
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
