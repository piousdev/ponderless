import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

interface WebVitalsMetric {
	name: string;
	value: number;
	id: string;
	delta: number;
	navigationType: string;
	rating: "good" | "needs-improvement" | "poor";
	entries: PerformanceEntry[];
}

function sendToAnalytics(metric: WebVitalsMetric) {
	// Send metrics to your analytics service
	if (typeof window !== "undefined") {
		// In production, send to analytics endpoint
		// Check if we're in development mode by looking for development indicators
		const isDevelopment =
			typeof window !== "undefined" &&
			(window.location.hostname === "localhost" ||
				window.location.hostname.includes("127.0.0.1") ||
				window.location.hostname.includes("dev"));

		if (!isDevelopment) {
			// You can replace this with your preferred analytics service
			navigator.sendBeacon("/api/analytics/web-vitals", JSON.stringify(metric));
		} else {
			// In development, log to console
			console.log("Web Vitals metric:", metric);
		}
	}
}

export function initWebVitals() {
	if (typeof window === "undefined") return;

	// Core Web Vitals
	onCLS(sendToAnalytics);
	onFCP(sendToAnalytics);
	onLCP(sendToAnalytics);
	onTTFB(sendToAnalytics);

	// Interaction to Next Paint (replaced FID as Core Web Vital)
	onINP(sendToAnalytics);
}

// Enhanced performance observer for custom metrics
export function observePerformance() {
	if (typeof window === "undefined" || !("PerformanceObserver" in window))
		return;

	// Observe long tasks
	try {
		const longTaskObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.duration > 50) {
					sendToAnalytics({
						name: "long-task",
						value: entry.duration,
						id: `${entry.name}-${Date.now()}`,
						delta: entry.duration,
						navigationType: "navigate",
						rating:
							entry.duration > 300
								? "poor"
								: entry.duration > 100
									? "needs-improvement"
									: "good",
						entries: [entry],
					});
				}
			}
		});
		longTaskObserver.observe({ entryTypes: ["longtask"] });
	} catch (error) {
		console.warn("Long task observer not supported:", error);
	}

	// Observe resource timing
	try {
		const resourceObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				const resourceEntry = entry as PerformanceResourceTiming;
				if (
					resourceEntry.transferSize &&
					resourceEntry.transferSize > 1000000
				) {
					// Large resources > 1MB
					sendToAnalytics({
						name: "large-resource",
						value: resourceEntry.transferSize,
						id: `${resourceEntry.name}-${Date.now()}`,
						delta: resourceEntry.transferSize,
						navigationType: "navigate",
						rating:
							resourceEntry.transferSize > 5000000
								? "poor"
								: "needs-improvement",
						entries: [entry],
					});
				}
			}
		});
		resourceObserver.observe({ entryTypes: ["resource"] });
	} catch (error) {
		console.warn("Resource observer not supported:", error);
	}
}

// Performance budget checker
export function checkPerformanceBudget() {
	if (typeof window === "undefined") return;

	const navigation = performance.getEntriesByType(
		"navigation",
	)[0] as PerformanceNavigationTiming;

	if (navigation) {
		const metrics = {
			domContentLoaded:
				navigation.domContentLoadedEventEnd -
				navigation.domContentLoadedEventStart,
			loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
			firstByte: navigation.responseStart - navigation.requestStart,
		};

		// Check against budgets
		const budgets = {
			domContentLoaded: 1500, // 1.5s
			loadComplete: 3000, // 3s
			firstByte: 200, // 200ms
		};

		Object.entries(metrics).forEach(([key, value]) => {
			const budget = budgets[key as keyof typeof budgets];
			if (value > budget) {
				sendToAnalytics({
					name: `budget-exceeded-${key}`,
					value,
					id: `${key}-${Date.now()}`,
					delta: value - budget,
					navigationType: "navigate",
					rating: "poor",
					entries: [navigation],
				});
			}
		});
	}
}
