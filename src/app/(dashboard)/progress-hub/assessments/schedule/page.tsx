"use client";

import { CalendarIcon } from "lucide-react";
import CalendarComponent from "@/modules/progress-hub/components/calendar";
import { CalendarStats } from "@/modules/progress-hub/components/calendar/components/calendar-stats";
import type { CalendarEvent } from "@/types/calendar";
import { createCalendarEvents } from "@/types/calendar";

// Sample assessment schedule data
const assessmentSchedule: CalendarEvent[] = createCalendarEvents([
	// Past completed assessments for stats
	{
		id: "completed-1",
		date: new Date(2024, 11, 15), // December 15, 2024
		title: "Memory Recall Assessment",
		description: "Test short and long-term memory capabilities",
		time: "10:00 AM",
		duration: "1 hour",
		type: "assessment",
		priority: "medium",
		color: "blue",
		status: "completed",
		score: 78,
		maxScore: 100,
		completedAt: new Date(2024, 11, 15, 11, 0),
	},
	{
		id: "completed-2",
		date: new Date(2024, 11, 22), // December 22, 2024
		title: "Logical Reasoning Test",
		description: "Evaluate deductive and inductive reasoning skills",
		time: "2:00 PM",
		duration: "90 minutes",
		type: "assessment",
		priority: "high",
		color: "red",
		status: "completed",
		score: 85,
		maxScore: 100,
		previousScore: 78,
		improvementTrend: "up",
		completedAt: new Date(2024, 11, 22, 15, 30),
	},
	{
		id: "completed-3",
		date: new Date(2025, 0, 2), // January 2, 2025
		title: "Pattern Recognition",
		description: "Visual and abstract pattern identification",
		time: "9:30 AM",
		duration: "45 minutes",
		type: "assessment",
		priority: "medium",
		color: "green",
		status: "completed",
		score: 92,
		maxScore: 100,
		previousScore: 85,
		improvementTrend: "up",
		completedAt: new Date(2025, 0, 2, 10, 15),
	},
	// Upcoming assessments
	{
		id: "assess-1",
		date: new Date(2025, 0, 8), // January 8, 2025
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
		date: new Date(2025, 0, 15), // January 15, 2025
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
		date: new Date(2025, 0, 22), // January 22, 2025
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
		date: new Date(2025, 0, 29), // January 29, 2025
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
		date: new Date(2025, 1, 5), // February 5, 2025
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
		date: new Date(2025, 1, 12), // February 12, 2025
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
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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

			{/* Quick Stats */}
			<CalendarStats events={assessmentSchedule} currentDate={new Date()} />

			{/* Pass custom assessment data to calendar */}
			<CalendarComponent
				events={assessmentSchedule}
				initialDate={new Date()} // Start with current date
				initialViewMode="stacked"
			/>
		</div>
	);
}
