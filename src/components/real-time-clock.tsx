"use client";

import { useEffect, useState } from "react";

export function RealTimeClock() {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatDateTime = (date: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		const timeOptions: Intl.DateTimeFormatOptions = {
			hour: "numeric",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
		};

		const dateString = date.toLocaleDateString("en-US", options);
		const timeString = date.toLocaleTimeString("en-US", timeOptions);

		return `${dateString} | ${timeString}`;
	};

	return <p className="text-muted-foreground">{formatDateTime(currentTime)}</p>;
}
