import type { CalendarEvent, ViewProps } from "@/types/calendar";

export interface ViewPropsWithClick extends ViewProps {
	onDayClick: (day: number) => void;
	isDateInPast: (day: number) => boolean;
}

export interface WeekViewProps {
	currentDate: Date;
	weekDays: Date[];
	getEventsForDate: (date: Date) => CalendarEvent[];
	onDayClick: (date: Date) => void;
	isDateInPast: (date: Date) => boolean;
}