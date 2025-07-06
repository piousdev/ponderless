import React from "react";

interface UseCalendarNavigationProps {
	currentDate: Date;
	setCurrentDate: (date: Date) => void;
	currentWeekStart: Date;
	setCurrentWeekStart: (date: Date) => void;
}

export const useCalendarNavigation = ({
	currentDate,
	setCurrentDate,
	currentWeekStart,
	setCurrentWeekStart,
}: UseCalendarNavigationProps) => {
	const handlePrevMonth = React.useCallback(() => {
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
	}, [currentDate, setCurrentDate, setCurrentWeekStart]);

	const handleNextMonth = React.useCallback(() => {
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
	}, [currentDate, setCurrentDate, setCurrentWeekStart]);

	const handlePrevWeek = React.useCallback(() => {
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
	}, [currentWeekStart, setCurrentWeekStart, currentDate, setCurrentDate]);

	const handleNextWeek = React.useCallback(() => {
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
	}, [currentWeekStart, setCurrentWeekStart, currentDate, setCurrentDate]);

	return {
		handlePrevMonth,
		handleNextMonth,
		handlePrevWeek,
		handleNextWeek,
	};
};