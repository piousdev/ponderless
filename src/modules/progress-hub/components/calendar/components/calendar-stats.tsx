import {
	Calendar,
	CheckCircle2,
	TrendingUp,
	type LucideIcon,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/calendar";

interface MetricCardProps {
	title: string;
	value: string;
	change?: string;
	icon: LucideIcon;
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
		</CardContent>
	</Card>
);

interface CalendarStatsProps {
	events: CalendarEvent[];
	currentDate: Date;
}

export const CalendarStats = ({ events, currentDate }: CalendarStatsProps) => {
	// Calculate stats from events
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	// Upcoming assessments this month
	const upcomingThisMonth = events.filter((event) => {
		const eventDate = event.date;
		return (
			eventDate.getMonth() === currentMonth &&
			eventDate.getFullYear() === currentYear &&
			eventDate > new Date() &&
			event.status !== "completed" &&
			event.status !== "cancelled"
		);
	}).length;

	// Completed assessments (all time)
	const completedAssessments = events.filter(
		(event) => event.status === "completed",
	);
	const completedCount = completedAssessments.length;

	// Calculate average score
	const scoresArray = completedAssessments
		.filter((event) => event.score !== undefined)
		.map((event) => event.score!);
	const averageScore =
		scoresArray.length > 0
			? Math.round(
					scoresArray.reduce((sum, score) => sum + score, 0) /
						scoresArray.length,
				)
			: 0;

	// Calculate improvement trend
	const recentCompleted = completedAssessments
		.filter((event) => event.score !== undefined)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 5);

	let improvementPercentage = 0;
	if (recentCompleted.length >= 2) {
		const recentScores = recentCompleted.map((e) => e.score!);
		const recentAvg =
			recentScores.slice(0, 3).reduce((sum, score) => sum + score, 0) / 3;
		const olderAvg =
			recentScores.slice(-2).reduce((sum, score) => sum + score, 0) / 2;
		improvementPercentage = Math.round(((recentAvg - olderAvg) / olderAvg) * 100);
	}

	return (
		<div className="grid gap-4 md:grid-cols-3 mb-6">
			<MetricCard
				title="Upcoming Assessments"
				value={upcomingThisMonth.toString()}
				change={`This ${currentDate.toLocaleDateString("en-US", { month: "long" })}`}
				icon={Calendar}
				cardClassName="bg-blue-50 dark:bg-blue-950/50"
				cardTitleClassName="text-blue-800 dark:text-blue-200"
				iconClassName="text-blue-800 dark:text-blue-300"
				cardContentClassName="text-blue-900 dark:text-blue-100"
			/>
			<MetricCard
				title="Completed"
				value={completedCount.toString()}
				change={`Avg Score: ${averageScore}%`}
				icon={CheckCircle2}
				cardClassName="bg-green-50 dark:bg-green-950/50"
				cardTitleClassName="text-green-800 dark:text-green-200"
				iconClassName="text-green-800 dark:text-green-300"
				cardContentClassName="text-green-900 dark:text-green-100"
			/>
			<MetricCard
				title="Performance Trend"
				value={
					improvementPercentage > 0
						? `+${improvementPercentage}%`
						: improvementPercentage < 0
							? `${improvementPercentage}%`
							: "Stable"
				}
				change={recentCompleted.length >= 2 ? "Last 5 assessments" : "More data needed"}
				icon={TrendingUp}
				cardClassName={cn(
					improvementPercentage > 0
						? "bg-purple-50 dark:bg-purple-950/50"
						: improvementPercentage < 0
							? "bg-red-50 dark:bg-red-950/50"
							: "bg-gray-50 dark:bg-gray-950/50",
				)}
				cardTitleClassName={cn(
					improvementPercentage > 0
						? "text-purple-800 dark:text-purple-200"
						: improvementPercentage < 0
							? "text-red-800 dark:text-red-200"
							: "text-gray-800 dark:text-gray-200",
				)}
				iconClassName={cn(
					improvementPercentage > 0
						? "text-purple-800 dark:text-purple-300"
						: improvementPercentage < 0
							? "text-red-800 dark:text-red-300"
							: "text-gray-800 dark:text-gray-300",
				)}
				cardContentClassName={cn(
					improvementPercentage > 0
						? "text-purple-900 dark:text-purple-100"
						: improvementPercentage < 0
							? "text-red-900 dark:text-red-100"
							: "text-gray-900 dark:text-gray-100",
				)}
			/>
		</div>
	);
};