/**
 * Calendar Event Types
 * Shared type definitions for calendar events across the application
 */

export type EventType = "assessment" | "exam" | "review" | "meeting";
export type EventPriority = "low" | "medium" | "high";
export type EventColor = "blue" | "green" | "red" | "yellow" | "purple";
export type EventStatus = "scheduled" | "completed" | "cancelled";
export type ViewMode = "compact" | "stacked" | "details" | "list";

export interface CalendarEvent {
	id: string;
	date: Date;
	title: string;
	description?: string;
	time: string;
	duration?: string;
	type: EventType;
	priority: EventPriority;
	color: EventColor;
	status?: EventStatus;
	// Progress tracking
	score?: number; // Score achieved (0-100)
	maxScore?: number; // Maximum possible score
	completedAt?: Date; // When the event was completed
	// Multi-session tracking
	sessionNumber?: number; // Current session number
	totalSessions?: number; // Total number of sessions
	seriesId?: string; // ID to link related sessions
	// Performance tracking
	previousScore?: number; // Previous attempt score for comparison
	improvementTrend?: "up" | "down" | "stable"; // Performance trend
}

export interface CalendarComponentProps {
	events?: CalendarEvent[];
	initialDate?: Date;
	initialViewMode?: ViewMode;
	onEventClick?: (event: CalendarEvent) => void;
	onDateClick?: (date: Date) => void;
}

export interface ViewProps {
	currentDate: Date;
	days: number[];
	leadingEmptyDays: unknown[];
	weekDays: string[];
	getEventsForDate: (day: number) => CalendarEvent[];
	getAllEventsForMonth: () => CalendarEvent[];
}

/**
 * Utility function to create a calendar event
 */
export function createCalendarEvent(
	event: Omit<CalendarEvent, "id"> & { id?: string },
): CalendarEvent {
	return {
		id: event.id || crypto.randomUUID(),
		...event,
	};
}

/**
 * Utility function to create multiple calendar events
 */
export function createCalendarEvents(
	events: (Omit<CalendarEvent, "id"> & { id?: string })[],
): CalendarEvent[] {
	return events.map(createCalendarEvent);
}
