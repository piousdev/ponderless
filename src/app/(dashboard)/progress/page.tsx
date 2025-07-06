"use client";

import type { IconProps } from "@tabler/icons-react";
import { type Icon, IconFlask } from "@tabler/icons-react";
import {
	BarChart,
	Calendar,
	CheckCircle,
	Flame,
	type LucideIcon,
	TrendingUp,
	Zap,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrainIcon, ScalesLineIcon } from "@/components/icons";
import { RealTimeClock } from "@/components/real-time-clock";
import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import {
	Timeline,
	TimelineDescription,
	TimelineItem,
	TimelineTitle,
} from "@/components/timeline";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

interface MetricCardProps {
	title: string;
	value: string;
	change?: string;
	icon: LucideIcon | Icon;
	iconProps?: IconProps;
	children?: ReactNode;
	cardClassName?: string;
	iconClassName?: string;
	cardTitleClassName?: string;
	cardContentClassName?: string;
}

const MetricCard = ({
	title,
	value,
	change,
	icon: Icon,
	children,
	cardClassName,
	cardTitleClassName,
	iconClassName,
	cardContentClassName,
}: MetricCardProps) => (
	<Card className={cardClassName}>
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle
				className={cn(
					"text-sm font-medium text-muted-foreground",
					cardTitleClassName,
				)}
			>
				{title}
			</CardTitle>
			<Icon className={cn("h-5 w-5 text-muted-foreground", iconClassName)} />
		</CardHeader>
		<CardContent className={cardContentClassName}>
			<div className="text-2xl font-bold">{value}</div>
			{change && (
				<p className="text-xs text-green-500 flex items-center">{change}</p>
			)}
			{children}
		</CardContent>
	</Card>
);

// Helper function to get personalized welcome message
const getPersonalizedWelcomeMessage = (userName?: string | null) => {
	const hour = new Date().getHours();

	// Properly capitalize the first name
	const firstName = userName?.split(" ")[0] || "there";
	const capitalizedFirstName =
		firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

	// Time-based greetings with concise messages
	let greeting = "Hello";
	if (hour < 12) greeting = "Good morning";
	else if (hour < 17) greeting = "Good afternoon";
	else greeting = "Good evening";

	// Concise but meaningful messages for cognitive training
	const messages = [
		`${greeting}, ${capitalizedFirstName}! Ready to think sharper?`,
		`${capitalizedFirstName}, time to challenge your biases`,
		`${capitalizedFirstName}, let's boost your decision-making`,
		`${capitalizedFirstName}, your cognitive journey continues`,
		`${capitalizedFirstName}, ready for today's mental workout?`,
	];

	// Select message based on day of week to add some variety
	const dayIndex = new Date().getDay();
	return messages[dayIndex % messages.length];
};

// Helper function to get streak badge styling based on streak length
const getStreakBadgeVariant = (streakDays: number) => {
	if (streakDays >= 30) {
		return {
			containerClass:
				"bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse dark:from-purple-600 dark:to-pink-600",
			icon: Zap,
			iconClass: "text-white",
			label: "🔥 Epic Streak!",
		};
	} else if (streakDays >= 14) {
		return {
			containerClass:
				"bg-gradient-to-r from-orange-400 to-red-500 text-white dark:from-orange-500 dark:to-red-600",
			icon: Flame,
			iconClass: "text-white",
			label: "🚀 Hot Streak!",
		};
	} else if (streakDays >= 7) {
		return {
			containerClass:
				"bg-gradient-to-r from-amber-400 to-orange-500 text-white dark:from-amber-500 dark:to-orange-600",
			icon: Flame,
			iconClass: "text-white",
			label: "🌟 Great Streak!",
		};
	} else {
		return {
			containerClass:
				"bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 dark:from-amber-900/50 dark:to-amber-800/50 dark:text-amber-200",
			icon: Flame,
			iconClass: "text-amber-600 dark:text-amber-400",
			label: "💪 Keep Going!",
		};
	}
};

// Helper function to calculate streak start date
const getStreakStartDate = (streakDays: number) => {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - streakDays + 1);
	return startDate.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
};

// Enhanced Streak Badge Component
const StreakBadge = ({ streakDays = 12 }: { streakDays?: number }) => {
	const variant = getStreakBadgeVariant(streakDays);
	const streakStartDate = getStreakStartDate(streakDays);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					className={cn(
						"relative mt-2 sm:mt-0 inline-flex items-center space-x-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
						variant.containerClass,
					)}
					aria-label={`Current streak: ${streakDays} days`}
					onClick={() => {
						// Could navigate to streak details or show more info
						console.log("Streak badge clicked");
					}}
				>
					<variant.icon className={cn("h-4 w-4", variant.iconClass)} />
					<span className="text-sm font-semibold">
						{streakDays} day{streakDays !== 1 ? "s" : ""}
					</span>
					<span className="text-xs opacity-80 font-normal hidden sm:inline">
						streak
					</span>

					{/* Sparkle effect for high streaks */}
					{streakDays >= 30 && (
						<div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full animate-ping"></div>
					)}
				</button>
			</TooltipTrigger>
			<TooltipContent
				side="bottom"
				className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 border-gray-700 dark:border-gray-600"
			>
				<div className="flex items-center space-x-2 mb-1">
					<Calendar className="h-3 w-3" />
					<span className="font-medium">{variant.label}</span>
				</div>
				<div className="text-center text-gray-300 dark:text-gray-400">
					Started {streakStartDate}
				</div>
			</TooltipContent>
		</Tooltip>
	);
};

export default function OverviewPage() {
	const { data: session } = authClient.useSession();
	const user = session?.user;

	// Mock streak data - in real app, this would come from your backend
	const currentStreak = 12;

	// Handle loading state - now handled by loading.tsx
	if (!user) {
		return null;
	}

	const welcomeMessage = getPersonalizedWelcomeMessage(user.name);

	return (
		<div className="space-y-6">
			<div className="flex flex-col mb-12 sm:flex-row justify-between items-start sm:items-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold">{welcomeMessage}</h1>
					<RealTimeClock />
				</div>
				<StreakBadge streakDays={currentStreak} />
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<MetricCard
					title="Decision Making"
					value="85%"
					change="+12%"
					icon={ScalesLineIcon}
					cardClassName="bg-sky-50 dark:bg-sky-950/50"
					cardTitleClassName="text-sky-800 dark:text-sky-200"
					iconClassName="text-sky-800 dark:text-sky-300"
					cardContentClassName="text-sky-900 dark:text-sky-100"
				/>
				<MetricCard
					title="Critical Thinking"
					value="Level 3"
					icon={BrainIcon}
					cardClassName="bg-rose-50 dark:bg-rose-950/50"
					cardTitleClassName="text-rose-800 dark:text-rose-200"
					iconClassName="text-rose-800 dark:text-rose-300"
					cardContentClassName="text-rose-900 dark:text-rose-100"
				>
					<Progress
						value={60}
						className="h-1.5 mt-2 [&>div]:bg-rose-900 dark:[&>div]:bg-rose-400"
					/>
				</MetricCard>
				<MetricCard
					title="Bias Awareness"
					value="7.5/10"
					icon={IconFlask}
					cardClassName="bg-green-50 dark:bg-green-950/50"
					cardTitleClassName="text-green-800 dark:text-green-200"
					iconClassName="text-green-800 dark:text-green-300"
					cardContentClassName="text-green-900 dark:text-green-100"
				>
					<div className="flex space-x-1 mt-2">
						{[...Array(10)].map((_, i) => (
							<div
								key={crypto.randomUUID()}
								className={`h-2 w-full rounded-full ${i < 8 ? "bg-spec-primary" : "bg-muted/20"}`}
							></div>
						))}
					</div>
				</MetricCard>
				<MetricCard
					title="Learning Velocity"
					value="+23%"
					icon={TrendingUp}
					cardClassName="bg-yellow-50 dark:bg-yellow-950/50"
					cardTitleClassName="text-yellow-800 dark:text-yellow-200"
					iconClassName="text-yellow-800 dark:text-yellow-300"
					cardContentClassName="text-yellow-900 dark:text-yellow-100"
				/>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="flex flex-col justify-between bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/50 dark:to-sky-900/30">
					<CardHeader>
						<CardTitle className="dark:text-sky-100">Today's Focus</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<h3 className="text-xl font-bold text-sky-900 dark:text-sky-100">
								🎯 Recommended: Watson-Glaser Critical Thinking Test
							</h3>
							<p className="text-sm text-sky-700 dark:text-sky-300">
								Last taken: 14 days ago | Estimated: 25 mins
							</p>
						</div>
					</CardContent>
					<div className="p-6 pt-0">
						<Button size="lg" className="w-full font-semibold">
							Start Assessment
						</Button>
					</div>
				</Card>

				<Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="text-purple-900 dark:text-purple-100">
							Recent Activity
						</CardTitle>
						<Link
							href="#"
							className="text-sm text-purple-700 dark:text-purple-300 font-medium hover:underline"
						>
							View All →
						</Link>
					</CardHeader>
					<CardContent>
						<Timeline>
							<TimelineItem
								icon={
									<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
								}
							>
								<TimelineTitle className="text-purple-900 dark:text-purple-100">
									Completed "Anchoring Bias Test" - Score: 88%
								</TimelineTitle>
								<TimelineDescription className="text-purple-700 dark:text-purple-300">
									2 hours ago
								</TimelineDescription>
							</TimelineItem>
							<TimelineItem
								icon={
									<Flame className="h-5 w-5 text-amber-600 dark:text-amber-400" />
								}
							>
								<TimelineTitle className="text-purple-900 dark:text-purple-100">
									Achievement Unlocked: "Bias Buster"
								</TimelineTitle>
								<TimelineDescription className="text-purple-700 dark:text-purple-300">
									Yesterday at 3:45 PM
								</TimelineDescription>
							</TimelineItem>
							<TimelineItem
								icon={
									<BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
								}
							>
								<TimelineTitle className="text-purple-900 dark:text-purple-100">
									Weekly Report Available
								</TimelineTitle>
								<TimelineDescription className="text-purple-700 dark:text-purple-300">
									<Link
										href="#"
										className="text-purple-600 dark:text-purple-400 hover:underline"
									>
										View your progress summary →
									</Link>
								</TimelineDescription>
							</TimelineItem>
						</Timeline>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
