"use client";
import {
	ChevronLeft,
	ChevronRight,
	Eye,
	Grid3X3,
	Layers,
	List,
	MousePointer2,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import type {
	CalendarComponentProps,
	CalendarEvent,
	ViewMode,
	ViewProps,
} from "@/types/calendar";
import EventDialog from "./event-dialog";

// Default sample events for fallback
const defaultSampleEvents: CalendarEvent[] = [
	{
		id: "1",
		date: new Date(2025, 0, 2),
		title: "Critical Reasoning Test",
		description: "Evaluate logical reasoning and decision-making skills",
		time: "10:00 AM",
		duration: "2 hours",
		type: "assessment",
		priority: "high",
		color: "blue",
		status: "scheduled",
	},
	{
		id: "2",
		date: new Date(2025, 0, 9),
		title: "Working Memory Assessment",
		description: "Test cognitive flexibility and memory capacity",
		time: "2:00 PM",
		duration: "1.5 hours",
		type: "assessment",
		priority: "medium",
		color: "green",
		status: "scheduled",
	},
	{
		id: "3",
		date: new Date(2025, 0, 17),
		title: "Bias Recognition Test",
		description: "Identify and mitigate cognitive biases",
		time: "11:00 AM",
		duration: "1 hour",
		type: "exam",
		priority: "high",
		color: "red",
		status: "scheduled",
	},
	{
		id: "4",
		date: new Date(2025, 0, 23),
		title: "Risk Assessment",
		description: "Evaluate risk assessment capabilities",
		time: "2:00 PM",
		duration: "3 hours",
		type: "assessment",
		priority: "medium",
		color: "purple",
		status: "scheduled",
	},
];

const colorClasses = {
	blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
	green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
	red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
	yellow:
		"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
	purple:
		"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const colorDots = {
	blue: "bg-blue-500",
	green: "bg-green-500",
	red: "bg-red-500",
	yellow: "bg-yellow-500",
	purple: "bg-purple-500",
};

const viewModeConfig = {
	compact: { icon: Grid3X3, label: "Compact" },
	stacked: { icon: Layers, label: "Stacked" },
	details: { icon: Eye, label: "Details" },
	list: { icon: List, label: "List" },
};

const ViewToggle = ({
	viewMode,
	setViewMode,
}: {
	viewMode: ViewMode;
	setViewMode: (mode: ViewMode) => void;
}) => (
	<div className="flex items-center gap-1 border rounded-lg p-1">
		{Object.entries(viewModeConfig).map(([mode, config]) => {
			const Icon = config.icon;
			return (
				<Button
					key={mode}
					variant={viewMode === mode ? "default" : "ghost"}
					size="sm"
					onClick={() => setViewMode(mode as ViewMode)}
					className="gap-1"
				>
					<Icon className="h-4 w-4" />
					<span className="hidden sm:inline">{config.label}</span>
				</Button>
			);
		})}
	</div>
);

interface ViewPropsWithClick extends ViewProps {
	onDayClick: (day: number) => void;
	isDateInPast: (day: number) => boolean;
}

interface WeekViewProps {
	currentDate: Date;
	weekDays: Date[];
	getEventsForDate: (date: Date) => CalendarEvent[];
	onDayClick: (date: Date) => void;
	isDateInPast: (date: Date) => boolean;
}

const CompactView = ({
	currentDate,
	days,
	leadingEmptyDays,
	weekDays,
	getEventsForDate,
	onDayClick,
	isDateInPast,
}: ViewPropsWithClick) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-2 p-2 sm:p-4 lg:p-6">
		{/* Week day headers - hidden on mobile, shown on larger screens */}
		<div className="hidden lg:contents">
			{weekDays.map((day) => (
				<div
					key={day}
					className="text-center font-medium text-muted-foreground p-2 text-sm border-b"
				>
					{day}
				</div>
			))}
		</div>

		{/* Leading empty days - only on large screens */}
		<div className="hidden lg:contents">
			{leadingEmptyDays.map(() => (
				<div key={crypto.randomUUID()} className="min-h-[120px]" />
			))}
		</div>

		{days.map((day) => {
			const isToday =
				new Date().toDateString() ===
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					day,
				).toDateString();
			const isPast = isDateInPast(day);
			const events = getEventsForDate(day);
			return (
				<button
					key={day}
					type="button"
					onClick={() => onDayClick(day)}
					disabled={isPast}
					className={cn(
						"min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] border rounded-lg p-2 sm:p-3 transition-all duration-200",
						isPast
							? "opacity-50 cursor-not-allowed bg-muted/20"
							: "hover:bg-muted/50 cursor-pointer bg-card",
						isToday && "ring-2 ring-primary",
					)}
				>
					<div className="flex flex-col h-full">
						<div className="flex items-center justify-between mb-1 sm:mb-2">
							<div
								className={cn(
									"font-medium text-sm sm:text-base",
									isToday
										? "bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs sm:text-sm"
										: isPast
											? "text-muted-foreground"
											: "text-foreground",
								)}
							>
								{day}
							</div>
							{/* Show day name on mobile/tablet */}
							<div className="lg:hidden text-xs text-muted-foreground">
								{
									weekDays[
										new Date(
											currentDate.getFullYear(),
											currentDate.getMonth(),
											day,
										).getDay()
									]
								}
							</div>
							{/* Hover indicator - only show for future dates */}
							{!isPast && (
								<div className="opacity-0 group-hover:opacity-100 transition-opacity">
									<MousePointer2 className="h-3 w-3 text-muted-foreground" />
								</div>
							)}
						</div>
						<div className="flex-1 space-y-1 overflow-hidden">
							{events.length === 0 ? (
								<div className="text-xs text-muted-foreground text-center py-2">
									{isPast ? "No events" : "Click to add"}
								</div>
							) : (
								<div className="space-y-1">
									{events.slice(0, 3).map((event) => (
										<div
											key={event.id}
											className={cn(
												"text-xs px-2 py-1 rounded text-left border-l-2 pointer-events-none",
												colorClasses[event.color],
												isPast && "opacity-60",
											)}
										>
											<p className="font-medium truncate" title={event.title}>
												{event.title}
											</p>
											<p className="text-xs opacity-75 truncate">
												{event.time}
											</p>
										</div>
									))}
									{events.length > 3 && (
										<div className="text-xs text-muted-foreground text-center py-1">
											+{events.length - 3} more
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</button>
			);
		})}
	</div>
);

const StackedView = ({
	currentDate,
	days,
	leadingEmptyDays,
	weekDays,
	getEventsForDate,
	onDayClick,
	isDateInPast,
}: ViewPropsWithClick) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-2 p-2 sm:p-4 lg:p-6">
		{/* Week day headers - hidden on mobile, shown on larger screens */}
		<div className="hidden lg:contents">
			{weekDays.map((day) => (
				<div
					key={day}
					className="text-center font-medium text-muted-foreground p-2 text-sm border-b"
				>
					{day}
				</div>
			))}
		</div>

		{/* Leading empty days - only on large screens */}
		<div className="hidden lg:contents">
			{leadingEmptyDays.map(() => (
				<div key={crypto.randomUUID()} className="min-h-[120px]" />
			))}
		</div>

		{days.map((day) => {
			const isToday =
				new Date().toDateString() ===
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					day,
				).toDateString();
			const isPast = isDateInPast(day);
			const events = getEventsForDate(day);
			return (
				<button
					key={day}
					type="button"
					onClick={() => onDayClick(day)}
					disabled={isPast}
					className={cn(
						"min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] border rounded-lg p-2 sm:p-3 transition-all duration-200",
						isPast
							? "opacity-50 cursor-not-allowed bg-muted/20"
							: "hover:bg-muted/50 cursor-pointer bg-card group",
						isToday && "ring-2 ring-primary",
					)}
				>
					<div className="flex flex-col h-full">
						<div className="flex items-center justify-between mb-2">
							<div
								className={cn(
									"font-medium text-base sm:text-lg",
									isToday
										? "bg-primary text-primary-foreground rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
										: isPast
											? "text-muted-foreground"
											: "text-foreground",
								)}
							>
								{day}
							</div>
							{/* Show day name on mobile/tablet */}
							<div className="lg:hidden text-xs text-muted-foreground">
								{
									weekDays[
										new Date(
											currentDate.getFullYear(),
											currentDate.getMonth(),
											day,
										).getDay()
									]
								}
							</div>
							{/* Hover indicator - only show for future dates */}
							{!isPast && (
								<div className="opacity-0 group-hover:opacity-100 transition-opacity">
									<MousePointer2 className="h-3 w-3 text-muted-foreground" />
								</div>
							)}
						</div>
						<div className="flex-1 space-y-1 sm:space-y-2 overflow-hidden">
							{events.length === 0 ? (
								<div className="text-xs text-muted-foreground text-center py-2">
									{isPast ? "No events" : "Click to add"}
								</div>
							) : (
								<div className="space-y-1 sm:space-y-2">
									{events.map((event) => (
										<div
											key={event.id}
											className={cn(
												"text-xs sm:text-sm rounded px-2 sm:px-3 py-1 sm:py-2 border-l-4 text-left pointer-events-none",
												colorClasses[event.color],
												isPast && "opacity-60",
											)}
										>
											<p className="font-semibold truncate" title={event.title}>
												{event.title}
											</p>
											<p className="text-xs opacity-75 truncate">
												{event.time}
											</p>
											{event.duration && (
												<p className="text-xs opacity-60 truncate">
													{event.duration}
												</p>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</button>
			);
		})}
	</div>
);

const DetailsView = ({
	currentDate,
	weekDays,
	getEventsForDate,
	onDayClick,
	isDateInPast,
}: WeekViewProps) => (
	<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-7 gap-4">
		{weekDays.map((dayDate) => {
			const isToday = dayDate.toDateString() === new Date().toDateString();
			const isPast = isDateInPast(dayDate);
			const events = getEventsForDate(dayDate);
			return (
				<button
					key={dayDate.getTime()}
					type="button"
					onClick={() => onDayClick(dayDate)}
					disabled={isPast}
					className={cn(
						"h-fit min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] max-h-[300px] sm:max-h-[350px] lg:max-h-[400px] transition-all duration-200",
						isPast
							? "opacity-50 cursor-not-allowed"
							: "hover:ring-2 hover:ring-primary/50 cursor-pointer group",
					)}
				>
					<Card className={cn("h-full", isToday && "ring-2 ring-primary")}>
						<CardHeader className="p-2 sm:p-3">
							<div className="flex items-center justify-between">
								<div
									className={cn(
										"font-semibold text-lg flex items-center justify-center min-w-[32px] h-8",
										isToday
											? "bg-primary text-primary-foreground rounded-full px-3"
											: isPast
												? "text-muted-foreground"
												: "text-foreground",
									)}
								>
									{dayDate.getDate()}
								</div>
								{/* Show day name on mobile/tablet */}
								<div
									className={cn(
										"lg:hidden text-xs",
										isPast ? "text-muted-foreground" : "text-muted-foreground",
									)}
								>
									{dayDate.toLocaleDateString("en-US", { weekday: "short" })}
								</div>
								{/* Hover indicator - only show for future dates */}
								{!isPast && (
									<div className="opacity-0 group-hover:opacity-100 transition-opacity">
										<MousePointer2 className="h-3 w-3 text-muted-foreground" />
									</div>
								)}
							</div>
						</CardHeader>
						<CardContent className="p-2 sm:p-3 pt-0 space-y-1 sm:space-y-2 overflow-y-auto max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]">
							{events.length === 0 ? (
								<div
									className={cn(
										"text-xs py-2",
										isPast ? "text-muted-foreground" : "text-muted-foreground",
									)}
								>
									{isPast ? "No events" : "Click to add event"}
								</div>
							) : (
								events.map((event) => (
									<div
										key={event.id}
										className={cn(
											"text-xs sm:text-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2 border-l-4 pointer-events-none",
											colorClasses[event.color],
											isPast && "opacity-60",
										)}
									>
										<p className="font-semibold truncate" title={event.title}>
											{event.title}
										</p>
										<p className="text-xs opacity-75 truncate">{event.time}</p>
										{event.duration && (
											<p className="text-xs opacity-60 truncate">
												{event.duration}
											</p>
										)}
										{event.description && (
											<p
												className="text-xs opacity-60 mt-1 line-clamp-2 sm:line-clamp-3"
												title={event.description}
											>
												{event.description}
											</p>
										)}
										{/* Show priority and type on mobile/tablet */}
										<div className="lg:hidden flex items-center gap-1 mt-1">
											<span className="text-xs px-1 py-0.5 rounded bg-secondary text-secondary-foreground">
												{event.type}
											</span>
											<span
												className={cn(
													"text-xs px-1 py-0.5 rounded",
													event.priority === "high"
														? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
														: event.priority === "medium"
															? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
															: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
												)}
											>
												{event.priority}
											</span>
										</div>
									</div>
								))
							)}
						</CardContent>
					</Card>
				</button>
			);
		})}
	</div>
);

const ListView = ({
	currentDate,
	weekDays,
	getEventsForDate,
	onDayClick,
	isDateInPast,
}: WeekViewProps) => {
	return (
		<div className="space-y-2">
			{weekDays.map((dayDate) => {
				const isToday = dayDate.toDateString() === new Date().toDateString();
				const isPast = isDateInPast(dayDate);
				const events = getEventsForDate(dayDate);

				return (
					<button
						key={dayDate.getTime()}
						type="button"
						onClick={() => onDayClick(dayDate)}
						disabled={isPast}
						className={cn(
							"w-full text-left transition-colors border rounded-lg group",
							isPast
								? "opacity-50 cursor-not-allowed bg-muted/20"
								: "hover:bg-muted/50 cursor-pointer bg-card",
							isToday && "ring-2 ring-primary",
						)}
					>
						<div className="p-4">
							{/* Day Header */}
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<div
										className={cn(
											"font-semibold text-lg flex items-center justify-center min-w-[32px] h-8",
											isToday
												? "bg-primary text-primary-foreground rounded-full px-3"
												: isPast
													? "text-muted-foreground"
													: "text-foreground",
										)}
									>
										{dayDate.getDate()}
									</div>
									<div className="flex flex-col">
										<h3
											className={cn(
												"font-medium",
												isPast ? "text-muted-foreground" : "text-foreground",
											)}
										>
											{dayDate.toLocaleDateString("en-US", {
												weekday: "long",
												month: "long",
												day: "numeric",
											})}
										</h3>
										<p className="text-xs text-muted-foreground">
											{events.length === 0
												? isPast
													? "No events"
													: "Click to add event"
												: `${events.length} event${events.length > 1 ? "s" : ""}`}
										</p>
									</div>
								</div>

								{/* Click indicator */}
								{!isPast && (
									<div className="opacity-0 group-hover:opacity-100 transition-opacity">
										<MousePointer2 className="h-4 w-4 text-muted-foreground" />
									</div>
								)}
							</div>

							{/* Events */}
							{events.length > 0 && (
								<div className="space-y-2 ml-11">
									{events.map((event) => (
										<div
											key={event.id}
											className={cn(
												"p-3 rounded-lg border-l-4 pointer-events-none",
												colorClasses[event.color],
												isPast && "opacity-60",
											)}
										>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-3">
														<h4 className="font-medium">{event.title}</h4>
														<div className="flex items-center gap-2 text-xs text-muted-foreground">
															<span>{event.time}</span>
															{event.duration && (
																<>
																	<span>•</span>
																	<span>{event.duration}</span>
																</>
															)}
														</div>
													</div>
													{event.description && (
														<p className="text-sm text-muted-foreground mt-1 line-clamp-2">
															{event.description}
														</p>
													)}
													<div className="flex items-center gap-2 mt-2">
														<span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
															{event.type}
														</span>
														<span
															className={cn(
																"text-xs px-2 py-1 rounded-full",
																event.priority === "high"
																	? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
																	: event.priority === "medium"
																		? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
																		: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
															)}
														>
															{event.priority}
														</span>
													</div>
												</div>
												<div
													className={cn(
														"w-3 h-3 rounded-full ml-3 mt-1",
														colorDots[event.color],
													)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</button>
				);
			})}
		</div>
	);
};

export default function CalendarComponent({
	events = defaultSampleEvents,
	initialDate = new Date(),
	initialViewMode = "stacked",
}: CalendarComponentProps) {
	const [currentDate, setCurrentDate] = React.useState(initialDate);
	const [viewMode, setViewMode] = React.useState<ViewMode>(initialViewMode);
	const [eventsData, setEventsData] = React.useState(events);
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [currentWeekStart, setCurrentWeekStart] = React.useState<Date>(() => {
		// Initialize with the start of the week containing initialDate
		const date = new Date(initialDate);
		const day = date.getDay();
		const diff = date.getDate() - day;
		return new Date(date.setDate(diff));
	});

	// Update events when prop changes
	React.useEffect(() => {
		setEventsData(events);
	}, [events]);

	// Helper function to check if a date is in the past
	const isDateInPast = (day: number) => {
		const today = new Date();
		const dayDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day,
		);

		// Set both dates to start of day for accurate comparison
		today.setHours(0, 0, 0, 0);
		dayDate.setHours(0, 0, 0, 0);

		return dayDate < today;
	};

	// Helper function to get week days for List and Details views
	const getWeekDays = () => {
		const weekDays = [];
		const currentWeek = new Date(currentWeekStart);

		for (let i = 0; i < 7; i++) {
			const day = new Date(currentWeek);
			day.setDate(currentWeek.getDate() + i);
			weekDays.push(day);
		}

		return weekDays;
	};

	// Helper function to check if a date is in the past (for week view)
	const isWeekDateInPast = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const targetDate = new Date(date);
		targetDate.setHours(0, 0, 0, 0);
		return targetDate < today;
	};

	// Helper function to get events for a specific date (for week view)
	const getEventsForWeekDate = (date: Date) => {
		return eventsData.filter((event) => {
			const eventDate = event.date;
			return (
				eventDate.getFullYear() === date.getFullYear() &&
				eventDate.getMonth() === date.getMonth() &&
				eventDate.getDate() === date.getDate()
			);
		});
	};

	const startOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	);
	const endOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0,
	);
	const daysInMonth = endOfMonth.getDate();
	const startDayOfWeek = startOfMonth.getDay();

	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	const leadingEmptyDays = Array.from({ length: startDayOfWeek });

	const handlePrevMonth = () => {
		const newDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() - 1,
			1,
		);
		setCurrentDate(newDate);

		// Update week start to first week of new month
		const firstDay = new Date(newDate);
		const day = firstDay.getDay();
		const diff = firstDay.getDate() - day;
		setCurrentWeekStart(new Date(firstDay.setDate(diff)));
	};

	const handleNextMonth = () => {
		const newDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			1,
		);
		setCurrentDate(newDate);

		// Update week start to first week of new month
		const firstDay = new Date(newDate);
		const day = firstDay.getDay();
		const diff = firstDay.getDate() - day;
		setCurrentWeekStart(new Date(firstDay.setDate(diff)));
	};

	const handlePrevWeek = () => {
		const newWeekStart = new Date(currentWeekStart);
		newWeekStart.setDate(currentWeekStart.getDate() - 7);
		setCurrentWeekStart(newWeekStart);

		// Update month if we've moved to a different month
		if (
			newWeekStart.getMonth() !== currentDate.getMonth() ||
			newWeekStart.getFullYear() !== currentDate.getFullYear()
		) {
			setCurrentDate(
				new Date(newWeekStart.getFullYear(), newWeekStart.getMonth(), 1),
			);
		}
	};

	const handleNextWeek = () => {
		const newWeekStart = new Date(currentWeekStart);
		newWeekStart.setDate(currentWeekStart.getDate() + 7);
		setCurrentWeekStart(newWeekStart);

		// Update month if we've moved to a different month
		if (
			newWeekStart.getMonth() !== currentDate.getMonth() ||
			newWeekStart.getFullYear() !== currentDate.getFullYear()
		) {
			setCurrentDate(
				new Date(newWeekStart.getFullYear(), newWeekStart.getMonth(), 1),
			);
		}
	};

	const handleDayClick = (day: number) => {
		// Prevent clicking on past days
		if (isDateInPast(day)) {
			return;
		}

		const clickedDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day,
		);
		setSelectedDate(clickedDate);
		setDialogOpen(true);
	};

	const handleWeekDayClick = (date: Date) => {
		// Prevent clicking on past days
		if (isWeekDateInPast(date)) {
			return;
		}

		setSelectedDate(date);
		setDialogOpen(true);
	};

	const getEventsForDate = (day: number) => {
		return eventsData.filter((event) => {
			const eventDate = event.date;
			return (
				eventDate.getFullYear() === currentDate.getFullYear() &&
				eventDate.getMonth() === currentDate.getMonth() &&
				eventDate.getDate() === day
			);
		});
	};

	const getAllEventsForMonth = () => {
		return eventsData
			.filter((event) => {
				const eventDate = event.date;
				return (
					eventDate.getFullYear() === currentDate.getFullYear() &&
					eventDate.getMonth() === currentDate.getMonth()
				);
			})
			.sort((a, b) => a.date.getTime() - b.date.getTime());
	};

	const handleSaveEvent = (
		eventData: Omit<CalendarEvent, "id"> & { id?: string },
	) => {
		if (eventData.id) {
			// Update existing event
			setEventsData((prev) =>
				prev.map((event) =>
					event.id === eventData.id
						? { ...eventData, id: eventData.id }
						: event,
				),
			);
		} else {
			// Create new event
			const newEvent: CalendarEvent = {
				...eventData,
				id: crypto.randomUUID(),
			};
			setEventsData((prev) => [...prev, newEvent]);
		}
	};

	const handleDeleteEvent = (eventId: string) => {
		setEventsData((prev) => prev.filter((event) => event.id !== eventId));
	};

	const getSelectedDateEvents = () => {
		if (!selectedDate) return [];
		return getEventsForWeekDate(selectedDate);
	};

	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	// Format week range for display
	const formatWeekRange = () => {
		const weekStart = new Date(currentWeekStart);
		const weekEnd = new Date(currentWeekStart);
		weekEnd.setDate(weekStart.getDate() + 6);

		const startMonth = weekStart.toLocaleDateString("en-US", {
			month: "short",
		});
		const endMonth = weekEnd.toLocaleDateString("en-US", { month: "short" });
		const startDay = weekStart.getDate();
		const endDay = weekEnd.getDate();
		const year = weekStart.getFullYear();

		if (startMonth === endMonth) {
			return `${startMonth} ${startDay}-${endDay}, ${year}`;
		} else {
			return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
		}
	};

	const renderCalendarContent = () => {
		const monthViewProps = {
			currentDate,
			days,
			leadingEmptyDays,
			weekDays,
			getEventsForDate,
			getAllEventsForMonth,
			onDayClick: handleDayClick,
			isDateInPast,
		};

		const weekViewProps = {
			currentDate,
			weekDays: getWeekDays(),
			getEventsForDate: getEventsForWeekDate,
			onDayClick: handleWeekDayClick,
			isDateInPast: isWeekDateInPast,
		};

		switch (viewMode) {
			case "compact":
				return <CompactView {...monthViewProps} />;
			case "stacked":
				return <StackedView {...monthViewProps} />;
			case "details":
				return <DetailsView {...weekViewProps} />;
			case "list":
				return <ListView {...weekViewProps} />;
			default:
				return <StackedView {...monthViewProps} />;
		}
	};

	const isWeekView = viewMode === "details" || viewMode === "list";

	return (
		<div className="bg-background text-foreground">
			<Card className="w-full overflow-hidden">
				<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b gap-4">
					<div className="flex items-center gap-3">
						<CardTitle className="text-lg sm:text-xl font-semibold">
							{isWeekView
								? formatWeekRange()
								: currentDate.toLocaleString("default", {
										month: "long",
										year: "numeric",
									})}
						</CardTitle>
					</div>
					<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
						<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
						<div className="flex items-center gap-2 justify-center sm:justify-start">
							{isWeekView ? (
								<>
									<Button
										variant="secondary"
										size="icon"
										onClick={handlePrevWeek}
									>
										<ChevronLeft className="h-4 w-4" />
										<span className="sr-only">Previous week</span>
									</Button>
									<Button
										variant="secondary"
										size="icon"
										onClick={handleNextWeek}
									>
										<ChevronRight className="h-4 w-4" />
										<span className="sr-only">Next week</span>
									</Button>
								</>
							) : (
								<>
									<Button
										variant="secondary"
										size="icon"
										onClick={handlePrevMonth}
									>
										<ChevronLeft className="h-4 w-4" />
										<span className="sr-only">Previous month</span>
									</Button>
									<Button
										variant="secondary"
										size="icon"
										onClick={handleNextMonth}
									>
										<ChevronRight className="h-4 w-4" />
										<span className="sr-only">Next month</span>
									</Button>
								</>
							)}
						</div>
					</div>
				</CardHeader>
				<CardContent className={cn("p-0", viewMode === "list" && "p-4")}>
					<div className="w-full overflow-hidden">
						{renderCalendarContent()}
					</div>
				</CardContent>
			</Card>

			<EventDialog
				isOpen={dialogOpen}
				onCloseAction={() => setDialogOpen(false)}
				selectedDate={selectedDate}
				existingEvents={getSelectedDateEvents()}
				onSaveAction={handleSaveEvent}
				onDeleteAction={handleDeleteEvent}
			/>
		</div>
	);
}
