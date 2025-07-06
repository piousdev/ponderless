"use client";

import { ArrowRight, Flame, Target, TrendingUp } from "lucide-react";
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

interface ProgressCardProps {
	currentStreak: number;
	weeklyGoal: number;
	completedThisWeek: number;
	totalAssessments: number;
}

export default function ProgressHubProgressCard({
	currentStreak = 12,
	weeklyGoal = 5,
	completedThisWeek = 3,
	totalAssessments = 47,
}: ProgressCardProps) {
	const weeklyProgress = (completedThisWeek / weeklyGoal) * 100;

	return (
		<Card className="mx-4 mb-2 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
			<CardHeader className="px-3">
				<CardTitle className="flex items-center gap-1.5 text-base font-medium text-accent-foreground">
					<Target className="size-3" />
					Progress Tracker
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 px-3 pb-3">
				{/* Current Streak */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<Flame className="size-3 text-amber-500" />
						<span>Current Streak</span>
					</div>
					<span className="font-medium text-xs text-amber-600">
						{currentStreak} days
					</span>
				</div>

				{/* Weekly Progress */}
				<div className="space-y-1">
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Weekly Goal</span>
						<span className="font-medium text-[10px]">
							{completedThisWeek}/{weeklyGoal}
						</span>
					</div>
					<Progress
						value={weeklyProgress}
						className="h-1 bg-blue-500/20 [&>*]:bg-blue-500"
					/>
				</div>

				{/* Total Assessments */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<TrendingUp className="size-3 text-green-500" />
						<span>Total Completed</span>
					</div>
					<span className="font-medium text-xs text-green-600">
						{totalAssessments}
					</span>
				</div>

				<Separator className="my-2" />

				{/* Quick Assessment Button */}
				<Button asChild variant="secondary" className="w-full text-[14px]">
					<Link
						href="/progress-hub/assessments"
						className="flex items-center justify-center gap-1"
					>
						Take Assessment
						<ArrowRight className="size-2.5" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
