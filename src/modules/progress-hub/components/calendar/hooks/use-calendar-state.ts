import React from "react";
import type { CalendarEvent, ViewMode } from "@/types/calendar";
import { defaultSampleEvents } from "../constants";

interface UseCalendarStateProps {
	events?: CalendarEvent[];
	initialDate?: Date;
	initialViewMode?: ViewMode;
}

export const useCalendarState = ({
	events = defaultSampleEvents,
	initialDate = new Date(),
	initialViewMode = "stacked",
}: UseCalendarStateProps) => {
	const [currentDate, setCurrentDate] = React.useState(initialDate);
	const [viewMode, setViewMode] = React.useState<ViewMode>(initialViewMode);
	const [eventsData, setEventsData] = React.useState(events);
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [currentWeekStart, setCurrentWeekStart] = React.useState<Date>(() => {
		const date = new Date(initialDate);
		const day = date.getDay();
		const diff = date.getDate() - day;
		return new Date(date.setDate(diff));
	});

	// Update events when prop changes
	React.useEffect(() => {
		setEventsData(events);
	}, [events]);

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

	return {
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
	};
};