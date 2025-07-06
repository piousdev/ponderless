import type { CalendarEvent } from "@/types/calendar";

export const isDateInPast = (currentDate: Date, day: number) => {
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

export const isWeekDateInPast = (date: Date) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const targetDate = new Date(date);
	targetDate.setHours(0, 0, 0, 0);
	return targetDate < today;
};

export const getEventsForDate = (
	eventsData: CalendarEvent[],
	currentDate: Date,
	day: number,
) => {
	return eventsData.filter((event) => {
		const eventDate = event.date;
		return (
			eventDate.getFullYear() === currentDate.getFullYear() &&
			eventDate.getMonth() === currentDate.getMonth() &&
			eventDate.getDate() === day
		);
	});
};

export const getEventsForWeekDate = (
	eventsData: CalendarEvent[],
	date: Date,
) => {
	return eventsData.filter((event) => {
		const eventDate = event.date;
		return (
			eventDate.getFullYear() === date.getFullYear() &&
			eventDate.getMonth() === date.getMonth() &&
			eventDate.getDate() === date.getDate()
		);
	});
};

export const getAllEventsForMonth = (
	eventsData: CalendarEvent[],
	currentDate: Date,
) => {
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

export const getWeekDays = (currentWeekStart: Date) => {
	const weekDays = [];
	const currentWeek = new Date(currentWeekStart);

	for (let i = 0; i < 7; i++) {
		const day = new Date(currentWeek);
		day.setDate(currentWeek.getDate() + i);
		weekDays.push(day);
	}

	return weekDays;
};

export const formatWeekRange = (currentWeekStart: Date) => {
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

export const getCalendarData = (currentDate: Date) => {
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

	return {
		days,
		leadingEmptyDays,
		startOfMonth,
		endOfMonth,
		daysInMonth,
		startDayOfWeek,
	};
};