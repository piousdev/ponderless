"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import { CompactView } from "@/modules/progress-hub/components/calendar/components/compact-view";
import { DetailsView } from "@/modules/progress-hub/components/calendar/components/details-view";
import { ListView } from "@/modules/progress-hub/components/calendar/components/list-view";
import { StackedView } from "@/modules/progress-hub/components/calendar/components/stacked-view";
import { ViewToggle } from "@/modules/progress-hub/components/calendar/components/view-toggle";
import { StreakIndicator } from "@/modules/progress-hub/components/calendar/components/progress-indicators";
import { useCalendarNavigation } from "@/modules/progress-hub/components/calendar/hooks/use-calendar-navigation";
import { useCalendarState } from "@/modules/progress-hub/components/calendar/hooks/use-calendar-state";
import {
	formatWeekRange,
	getCalendarData,
	getEventsForDate,
	getEventsForWeekDate,
	getWeekDays,
	isDateInPast,
	isWeekDateInPast,
} from "@/modules/progress-hub/components/calendar/utils";
import type { CalendarComponentProps } from "@/types/calendar";
import EventDialog from "../event-dialog";

export default function CalendarComponent({
	events,
	initialDate,
	initialViewMode,
}: CalendarComponentProps) {
	const {
		currentDate,
		setCurrentDate,
		viewMode,
		setViewMode,
		eventsData,
		selectedDate,
		setSelectedDate,
		dialogOpen,
		setDialogOpen,
		currentWeekStart,
		setCurrentWeekStart,
		handleSaveEvent,
		handleDeleteEvent,
	} = useCalendarState({
		events,
		initialDate,
		initialViewMode,
	});

	const { handlePrevMonth, handleNextMonth, handlePrevWeek, handleNextWeek } =
		useCalendarNavigation({
			currentDate,
			setCurrentDate,
			currentWeekStart,
			setCurrentWeekStart,
		});

	const { days, leadingEmptyDays } = getCalendarData(currentDate);

	const handleDayClick = (day: number) => {
		if (isDateInPast(currentDate, day)) {
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
		if (isWeekDateInPast(date)) {
			return;
		}

		setSelectedDate(date);
		setDialogOpen(true);
	};

	const getSelectedDateEvents = () => {
		if (!selectedDate) return [];
		return getEventsForWeekDate(eventsData, selectedDate);
	};

	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const renderCalendarContent = () => {
		const monthViewProps = {
			currentDate,
			days,
			leadingEmptyDays,
			weekDays,
			getEventsForDate: (day: number) =>
				getEventsForDate(eventsData, currentDate, day),
			getAllEventsForMonth: () =>
				eventsData
					.filter((event) => {
						const eventDate = event.date;
						return (
							eventDate.getFullYear() === currentDate.getFullYear() &&
							eventDate.getMonth() === currentDate.getMonth()
						);
					})
					.sort((a, b) => a.date.getTime() - b.date.getTime()),
			onDayClick: handleDayClick,
			isDateInPast: (day: number) => isDateInPast(currentDate, day),
		};

		const weekViewProps = {
			currentDate,
			weekDays: getWeekDays(currentWeekStart),
			getEventsForDate: (date: Date) => getEventsForWeekDate(eventsData, date),
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
								? formatWeekRange(currentWeekStart)
								: currentDate.toLocaleString("default", {
										month: "long",
										year: "numeric",
									})}
						</CardTitle>
						<StreakIndicator events={eventsData} currentDate={currentDate} />
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
