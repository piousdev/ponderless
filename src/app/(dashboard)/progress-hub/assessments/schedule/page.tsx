"use client";

import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import CalendarComponent from "@/modules/progress-hub/components/calendar";
import type { CalendarEvent } from "@/types/calendar";
import { createCalendarEvents } from "@/types/calendar";

// Sample assessment schedule data
const assessmentSchedule: CalendarEvent[] = createCalendarEvents([
	{
		id: "assess-1",
		date: new Date(2025, 0, 5), // January 5, 2025
		title: "Cognitive Processing Speed",
		description:
			"Assess information processing speed and accuracy under time pressure",
		time: "9:00 AM",
		duration: "45 minutes",
		type: "assessment",
		priority: "high",
		color: "blue",
		status: "scheduled",
	},
	{
		id: "assess-2",
		date: new Date(2025, 0, 12), // January 12, 2025
		title: "Decision Making Under Uncertainty",
		description: "Evaluate decision-making strategies in ambiguous situations",
		time: "2:30 PM",
		duration: "2 hours",
		type: "exam",
		priority: "high",
		color: "red",
		status: "scheduled",
	},
	{
		id: "assess-3",
		date: new Date(2025, 0, 18), // January 18, 2025
		title: "Metacognitive Awareness",
		description:
			"Test self-awareness of thinking processes and learning strategies",
		time: "11:00 AM",
		duration: "1.5 hours",
		type: "assessment",
		priority: "medium",
		color: "green",
		status: "scheduled",
	},
	{
		id: "assess-4",
		date: new Date(2025, 0, 25), // January 25, 2025
		title: "Attention and Focus Training",
		description: "Assess sustained attention and resistance to distraction",
		time: "10:00 AM",
		duration: "1 hour",
		type: "assessment",
		priority: "medium",
		color: "purple",
		status: "scheduled",
	},
	{
		id: "assess-5",
		date: new Date(2025, 0, 30), // January 30, 2025
		title: "Progress Review Meeting",
		description: "Review assessment results and discuss next steps",
		time: "3:00 PM",
		duration: "1 hour",
		type: "meeting",
		priority: "high",
		color: "yellow",
		status: "scheduled",
	},
	{
		id: "assess-6",
		date: new Date(2025, 1, 3), // February 3, 2025
		title: "Advanced Problem Solving",
		description: "Complex reasoning and creative problem-solving assessment",
		time: "1:00 PM",
		duration: "2.5 hours",
		type: "exam",
		priority: "high",
		color: "red",
		status: "scheduled",
	},
]);

export default function SchedulePage() {
	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
						<CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8" />
						Assessment Schedule
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Manage and track your assessment calendar
					</p>
				</div>
			</div>

			{/* Pass custom assessment data to calendar */}
			<CalendarComponent
				events={assessmentSchedule}
				initialDate={new Date()} // Start with current date
				initialViewMode="stacked"
			/>
		</div>
	);
}
