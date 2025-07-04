"use client";

import { useEffect } from "react";
import {
	checkPerformanceBudget,
	initWebVitals,
	observePerformance,
} from "@/lib/performance/web-vitals";

export function WebVitalsReporter() {
	useEffect(() => {
		// Initialize Web Vitals tracking
		initWebVitals();

		// Observe additional performance metrics
		observePerformance();

		// Check performance budgets
		checkPerformanceBudget();
	}, []);

	// This component doesn't render anything
	return null;
}
