"use client";

import { ArrowRight, Crown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { trpc } from "@/trpc/client";

interface TrialCardProps {
	// Optional fallback props
	currentMentors?: number;
	maxMentors?: number;
	currentMeetings?: number;
	maxMeetings?: number;
}

export default function TrialCard({
	currentMentors: fallbackCurrentMentors = 2,
	maxMentors: fallbackMaxMentors = 5,
	currentMeetings: fallbackCurrentMeetings = 3,
	maxMeetings: fallbackMaxMeetings = 10,
}: TrialCardProps = {}) {
	// Fetch real user progress from tRPC
	const { data: progressData, isLoading } =
		trpc.mentor.getMentorProgress.useQuery(undefined, {
			// Client-side caching for frequently accessed data
			staleTime: 1 * 60 * 1000, // 1 minute
			gcTime: 5 * 60 * 1000, // 5 minutes
			retry: 2,
			// Use fallback data while loading
			placeholderData: {
				currentMentors: fallbackCurrentMentors,
				maxMentors: fallbackMaxMentors,
				currentMeetings: fallbackCurrentMeetings,
				maxMeetings: fallbackMaxMeetings,
				subscriptionTier: "free",
				userId: "",
			},
		});

	// Use real data if available, fallback to props
	const currentMentors = progressData?.currentMentors ?? fallbackCurrentMentors;
	const maxMentors = progressData?.maxMentors ?? fallbackMaxMentors;
	const currentMeetings =
		progressData?.currentMeetings ?? fallbackCurrentMeetings;
	const maxMeetings = progressData?.maxMeetings ?? fallbackMaxMeetings;

	const mentorProgress = (currentMentors / maxMentors) * 100;
	const meetingProgress = (currentMeetings / maxMeetings) * 100;

	if (isLoading) {
		return (
			<Card className="mx-4 mb-2 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
				<CardHeader className="pb-2 pt-3 px-3">
					<CardTitle className="flex items-center gap-1.5 text-xs font-medium text-accent-foreground">
						<Crown className="size-3" />
						Free Trial
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2 px-3 pb-3">
					<div className="space-y-1">
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Mentors</span>
							<Skeleton className="h-3 w-8" />
						</div>
						<Skeleton className="h-1 w-full" />
					</div>
					<div className="space-y-1">
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Meetings</span>
							<Skeleton className="h-3 w-8" />
						</div>
						<Skeleton className="h-1 w-full" />
					</div>
					<Separator className="my-2" />
					<Skeleton className="h-6 w-full" />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="mx-4 mb-2 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
			<CardHeader className="pb-2 pt-3 px-3">
				<CardTitle className="flex items-center gap-1.5 text-xs font-medium text-accent-foreground">
					<Crown className="size-3" />
					Free Trial
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 px-3 pb-3">
				{/* Mentors Progress */}
				<div className="space-y-1">
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Mentors</span>
						<span className="font-medium text-[10px]">
							{currentMentors}/{maxMentors}
						</span>
					</div>
					<Progress
						value={mentorProgress}
						className="h-1 bg-green-500/20 [&>*]:bg-green-500"
					/>
				</div>

				{/* Meetings Progress */}
				<div className="space-y-1">
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Meetings</span>
						<span className="font-medium text-[10px]">
							{currentMeetings}/{maxMeetings}
						</span>
					</div>
					<Progress
						value={meetingProgress}
						className="h-1 bg-green-500/20 [&>*]:bg-green-500"
					/>
				</div>

				<Separator className="my-2" />

				{/* Upgrade Button */}
				<Button
					asChild
					variant="secondary"
					size="sm"
					className="w-full text-[10px] h-6 py-1"
				>
					<Link
						href="/pricing"
						className="flex items-center justify-center gap-1"
					>
						Upgrade
						<ArrowRight className="size-2.5" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
