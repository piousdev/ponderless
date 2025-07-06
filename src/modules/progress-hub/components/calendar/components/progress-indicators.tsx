import { Check, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/calendar";

interface CompletionBadgeProps {
	status?: CalendarEvent["status"];
	score?: number;
	maxScore?: number;
	size?: "sm" | "md";
}

export const CompletionBadge = ({
	status,
	score,
	maxScore = 100,
	size = "sm",
}: CompletionBadgeProps) => {
	if (status !== "completed") return null;

	const percentage = score ? (score / maxScore) * 100 : 100;
	const isExcellent = percentage >= 90;
	const isGood = percentage >= 70;

	const sizeClasses = {
		sm: "w-5 h-5",
		md: "w-6 h-6",
	};

	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-full",
				sizeClasses[size],
				isExcellent
					? "bg-green-500 text-white"
					: isGood
						? "bg-blue-500 text-white"
						: "bg-gray-500 text-white",
			)}
			title={score ? `Score: ${score}/${maxScore}` : "Completed"}
		>
			<Check className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
		</div>
	);
};

interface ProgressBarProps {
	sessionNumber?: number;
	totalSessions?: number;
	className?: string;
}

export const ProgressBar = ({
	sessionNumber,
	totalSessions,
	className,
}: ProgressBarProps) => {
	if (!sessionNumber || !totalSessions) return null;

	const percentage = (sessionNumber / totalSessions) * 100;

	return (
		<div className={cn("w-full", className)}>
			<div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
				<span>
					Session {sessionNumber}/{totalSessions}
				</span>
				<span>{Math.round(percentage)}%</span>
			</div>
			<div className="w-full bg-secondary rounded-full h-1.5">
				<div
					className="bg-primary rounded-full h-1.5 transition-all duration-300"
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};

interface TrendIndicatorProps {
	trend?: "up" | "down" | "stable";
	previousScore?: number;
	currentScore?: number;
	size?: "sm" | "md";
}

export const TrendIndicator = ({
	trend,
	previousScore,
	currentScore,
	size = "sm",
}: TrendIndicatorProps) => {
	if (!trend && (!previousScore || !currentScore)) return null;

	const calculatedTrend =
		trend ||
		(currentScore! > previousScore!
			? "up"
			: currentScore! < previousScore!
				? "down"
				: "stable");

	const improvement =
		previousScore && currentScore
			? Math.round(((currentScore - previousScore) / previousScore) * 100)
			: 0;

	const sizeClasses = {
		sm: "text-xs",
		md: "text-sm",
	};

	if (calculatedTrend === "stable") {
		return (
			<span
				className={cn(
					"text-muted-foreground",
					sizeClasses[size],
					"font-medium",
				)}
			>
				→ 0%
			</span>
		);
	}

	return (
		<div
			className={cn(
				"flex items-center gap-0.5",
				calculatedTrend === "up" ? "text-green-600" : "text-red-600",
				sizeClasses[size],
			)}
		>
			{calculatedTrend === "up" ? (
				<TrendingUp className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
			) : (
				<TrendingDown className={cn(size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
			)}
			<span className="font-medium">
				{improvement > 0 ? "+" : ""}
				{improvement}%
			</span>
		</div>
	);
};

interface StreakIndicatorProps {
	events: CalendarEvent[];
	currentDate: Date;
}

export const StreakIndicator = ({
	events,
	currentDate,
}: StreakIndicatorProps) => {
	// Calculate streak for completed assessments
	const completedEvents = events
		.filter((e) => e.status === "completed" && e.type === "assessment")
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	if (completedEvents.length === 0) return null;

	let streak = 0;
	let lastDate: Date | null = null;

	// Calculate consecutive days/weeks with completed assessments
	for (const event of completedEvents) {
		if (!lastDate) {
			streak = 1;
			lastDate = event.date;
		} else {
			const daysDiff = Math.floor(
				(lastDate.getTime() - event.date.getTime()) / (1000 * 60 * 60 * 24),
			);
			// Allow up to 7 days between assessments to maintain streak
			if (daysDiff <= 7) {
				streak++;
				lastDate = event.date;
			} else {
				break;
			}
		}
	}

	if (streak < 2) return null;

	return (
		<div className="flex items-center gap-1 text-orange-600">
			<div className="relative">
				<CheckCircle2 className="w-5 h-5" />
				<span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
					{streak}
				</span>
			</div>
			<span className="text-xs font-medium">streak</span>
		</div>
	);
};