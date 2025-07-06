"use client";

import {
	AlertCircle,
	CalendarIcon,
	Calendar as CalendarIconSmall,
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	Clock,
	MoreHorizontal,
	Plus,
} from "lucide-react";
import { useState } from "react";
import type { DayButton } from "react-day-picker";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Calendar, CalendarDayButton } from "@/components/shadcn/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/ui/table";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/shadcn/ui/tabs";

// Sample assessment data
const assessments = [
	{
		id: 1,
		name: "Critical Reasoning Test",
		shortName: "CRT",
		date: new Date(2025, 0, 2),
		time: "10:00 AM",
		duration: "45 minutes",
		status: "scheduled",
		category: "cognitive",
		preparation: "Review logical reasoning frameworks",
	},
	{
		id: 2,
		name: "Working Memory Assessment",
		shortName: "WG",
		date: new Date(2025, 0, 9),
		time: "2:00 PM",
		duration: "30 minutes",
		status: "completed",
		category: "cognitive",
		preparation: "Get a good night's sleep",
		score: 85,
	},
	{
		id: 3,
		name: "Bias Recognition Test",
		shortName: "Bias",
		date: new Date(2025, 0, 17),
		time: "11:00 AM",
		duration: "20 minutes",
		status: "scheduled",
		category: "behavioral",
		preparation: "Review common cognitive biases",
	},
	{
		id: 4,
		name: "Risk Assessment",
		shortName: "Risk",
		date: new Date(2025, 0, 23),
		time: "2:00 PM",
		duration: "20 minutes",
		status: "scheduled",
		category: "behavioral",
		preparation: "Review risk scenarios",
	},
];

const CustomDayButton = ({
	day,
	modifiers,
	...props
}: React.ComponentProps<typeof DayButton>) => {
	const dayNum = day.date.getDate();
	const monthNum = day.date.getMonth();
	const yearNum = day.date.getFullYear();

	// Find assessments for this day
	const dayAssessments = assessments.filter(
		(a) =>
			a.date.getDate() === dayNum &&
			a.date.getMonth() === monthNum &&
			a.date.getFullYear() === yearNum,
	);

	return (
		<CalendarDayButton
			day={day}
			modifiers={modifiers}
			className="h-16 sm:h-20 w-full p-1 sm:p-1.5 flex flex-col items-start justify-start relative group hover:bg-muted/50 transition-colors"
			{...props}
		>
			<span
				className={`text-xs sm:text-sm ${modifiers.today ? "font-bold" : ""}`}
			>
				{dayNum}
			</span>
			{dayAssessments.length > 0 && (
				<div className="mt-auto w-full space-y-0.5">
					{dayAssessments.slice(0, 2).map((assessment) => (
						<div
							key={assessment.id}
							className="w-full text-[10px] sm:text-xs truncate"
						>
							{assessment.status === "completed" ? (
								<Badge
									variant="secondary"
									className="w-full justify-start px-1 py-0 h-5"
								>
									<CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
									<span className="truncate">{assessment.shortName}</span>
								</Badge>
							) : (
								<Badge
									variant="outline"
									className="w-full justify-start px-1 py-0 h-5 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
								>
									<span className="truncate">{assessment.shortName}</span>
								</Badge>
							)}
						</div>
					))}
					{dayAssessments.length > 2 && (
						<span className="text-[10px] text-muted-foreground">
							+{dayAssessments.length - 2} more
						</span>
					)}
				</div>
			)}
		</CalendarDayButton>
	);
};

export default function SchedulePage() {
	const [date, setDate] = useState<Date | undefined>(new Date(2025, 0, 23));
	const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1));
	const [view, setView] = useState<"calendar" | "list">("calendar");

	const handlePreviousMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
		);
	};

	const handleNextMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
		);
	};

	const upcomingAssessments = assessments
		.filter((a) => a.status === "scheduled" && a.date >= new Date())
		.sort((a, b) => a.date.getTime() - b.date.getTime());

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "cognitive":
				return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200";
			case "behavioral":
				return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200";
		}
	};

	const getStatusBadge = (status: string, score?: number) => {
		switch (status) {
			case "completed":
				return (
					<Badge variant="secondary" className="gap-1">
						<CheckCircle2 className="w-3 h-3" />
						Completed {score && `(${score}%)`}
					</Badge>
				);
			case "scheduled":
				return (
					<Badge variant="outline" className="gap-1">
						<Clock className="w-3 h-3" />
						Scheduled
					</Badge>
				);
			default:
				return null;
		}
	};

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
				<Button className="bg-spec-primary hover:bg-spec-primary/90 w-full sm:w-auto">
					<Plus className="h-4 w-4 mr-2" /> Schedule Assessment
				</Button>
			</div>

			{/* View Tabs */}
			<Tabs defaultValue="calendar" className="space-y-4">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<TabsList className="grid w-full sm:w-[200px] grid-cols-2">
						<TabsTrigger value="calendar">Calendar</TabsTrigger>
						<TabsTrigger value="list">List</TabsTrigger>
					</TabsList>

					{/* Mobile view selector */}
					<div className="sm:hidden w-full">
						<Select defaultValue="month">
							<SelectTrigger>
								<SelectValue placeholder="View" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="month">Month View</SelectItem>
								<SelectItem value="week">Week View</SelectItem>
								<SelectItem value="day">Day View</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Calendar View */}
				<TabsContent value="calendar" className="space-y-4">
					<Card>
						<CardHeader className="pb-3">
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										onClick={handlePreviousMonth}
									>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<h2 className="font-semibold text-base sm:text-lg min-w-[120px] text-center">
										{currentMonth.toLocaleDateString("en-US", {
											month: "long",
											year: "numeric",
										})}
									</h2>
									<Button variant="ghost" size="icon" onClick={handleNextMonth}>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>

								{/* Desktop view selector */}
								<div className="hidden sm:block">
									<Select defaultValue="month">
										<SelectTrigger className="w-[140px]">
											<SelectValue placeholder="View" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="month">Month View</SelectItem>
											<SelectItem value="week">Week View</SelectItem>
											<SelectItem value="day">Day View</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardHeader>
						<CardContent className="p-2 sm:p-6">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								month={currentMonth}
								onMonthChange={setCurrentMonth}
								className="rounded-md border-0"
								classNames={{
									months:
										"flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
									month: "space-y-4 w-full",
									caption: "hidden",
									caption_label: "hidden",
									nav: "hidden",
									nav_button: "hidden",
									head_row: "flex",
									head_cell:
										"text-muted-foreground rounded-md w-full font-normal text-[0.7rem] sm:text-[0.8rem]",
									row: "flex w-full mt-2",
									cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50",
									day: "h-16 sm:h-20 w-full p-0",
									day_selected:
										"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
									day_today: "bg-accent text-accent-foreground",
									day_outside: "text-muted-foreground opacity-50",
									day_disabled: "text-muted-foreground opacity-50",
									day_range_middle:
										"aria-selected:bg-accent aria-selected:text-accent-foreground",
									day_hidden: "invisible",
								}}
								components={{
									DayButton: CustomDayButton,
								}}
							/>
						</CardContent>
					</Card>

					{/* Upcoming Assessments - Mobile optimized */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg sm:text-xl">
								Upcoming Assessments
							</CardTitle>
							<CardDescription>Your next scheduled assessments</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							{upcomingAssessments.length === 0 ? (
								<p className="text-sm text-muted-foreground text-center py-8">
									No upcoming assessments scheduled
								</p>
							) : (
								upcomingAssessments.slice(0, 3).map((assessment) => (
									<Card key={assessment.id} className="overflow-hidden">
										<CardContent className="p-4">
											<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
												<div className="space-y-2 flex-1">
													<div className="flex items-start justify-between gap-2">
														<h3 className="font-semibold text-sm sm:text-base">
															{assessment.name}
														</h3>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8"
																>
																	<MoreHorizontal className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuLabel>Actions</DropdownMenuLabel>
																<DropdownMenuSeparator />
																<DropdownMenuItem>
																	<CalendarIconSmall className="mr-2 h-4 w-4" />
																	Reschedule
																</DropdownMenuItem>
																<DropdownMenuItem className="text-destructive">
																	Cancel Assessment
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>

													<div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
														<div className="flex items-center gap-1">
															<CalendarIconSmall className="h-3 w-3" />
															{assessment.date.toLocaleDateString()}
														</div>
														<span className="text-muted-foreground">•</span>
														<div className="flex items-center gap-1">
															<Clock className="h-3 w-3" />
															{assessment.time}
														</div>
														<span className="text-muted-foreground">•</span>
														<span>{assessment.duration}</span>
													</div>

													<div className="flex flex-wrap gap-2">
														<Badge
															className={`text-xs ${getCategoryColor(assessment.category)}`}
														>
															{assessment.category}
														</Badge>
														{getStatusBadge(assessment.status)}
													</div>

													{assessment.preparation && (
														<div className="bg-muted/50 rounded-md p-2 mt-2">
															<p className="text-xs text-muted-foreground">
																<strong>Preparation:</strong>{" "}
																{assessment.preparation}
															</p>
														</div>
													)}
												</div>
											</div>

											<div className="flex flex-col sm:flex-row gap-2 mt-4">
												<Select defaultValue="15m">
													<SelectTrigger className="h-8 text-xs sm:text-sm flex-1">
														<SelectValue placeholder="Set Reminder" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="15m">
															15 minutes before
														</SelectItem>
														<SelectItem value="1h">1 hour before</SelectItem>
														<SelectItem value="1d">1 day before</SelectItem>
													</SelectContent>
												</Select>
												<Button
													variant="ghost"
													size="sm"
													className="text-xs sm:text-sm"
												>
													View Details
												</Button>
											</div>
										</CardContent>
									</Card>
								))
							)}
						</CardContent>
					</Card>
				</TabsContent>

				{/* List View */}
				<TabsContent value="list" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>All Assessments</CardTitle>
							<CardDescription>
								Complete list of your assessments
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="overflow-x-auto -mx-6 px-6">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Assessment</TableHead>
											<TableHead className="hidden sm:table-cell">
												Category
											</TableHead>
											<TableHead>Date & Time</TableHead>
											<TableHead className="hidden md:table-cell">
												Duration
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{assessments.map((assessment) => (
											<TableRow key={assessment.id}>
												<TableCell>
													<div>
														<p className="font-medium text-sm">
															{assessment.name}
														</p>
														<p className="text-xs text-muted-foreground sm:hidden">
															{assessment.category}
														</p>
													</div>
												</TableCell>
												<TableCell className="hidden sm:table-cell">
													<Badge
														className={`${getCategoryColor(assessment.category)}`}
													>
														{assessment.category}
													</Badge>
												</TableCell>
												<TableCell>
													<div className="text-sm">
														<p>{assessment.date.toLocaleDateString()}</p>
														<p className="text-xs text-muted-foreground">
															{assessment.time}
														</p>
													</div>
												</TableCell>
												<TableCell className="hidden md:table-cell">
													{assessment.duration}
												</TableCell>
												<TableCell>
													{getStatusBadge(assessment.status, assessment.score)}
												</TableCell>
												<TableCell className="text-right">
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
															>
																<MoreHorizontal className="h-4 w-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															<DropdownMenuLabel>Actions</DropdownMenuLabel>
															<DropdownMenuSeparator />
															<DropdownMenuItem>View Details</DropdownMenuItem>
															{assessment.status === "scheduled" && (
																<>
																	<DropdownMenuItem>
																		Reschedule
																	</DropdownMenuItem>
																	<DropdownMenuItem className="text-destructive">
																		Cancel
																	</DropdownMenuItem>
																</>
															)}
															{assessment.status === "completed" && (
																<DropdownMenuItem>
																	View Results
																</DropdownMenuItem>
															)}
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Quick Stats - Mobile optimized */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Total Scheduled</p>
								<p className="text-xl sm:text-2xl font-bold">
									{assessments.filter((a) => a.status === "scheduled").length}
								</p>
							</div>
							<CalendarIconSmall className="h-8 w-8 text-muted-foreground/20" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Completed</p>
								<p className="text-xl sm:text-2xl font-bold">
									{assessments.filter((a) => a.status === "completed").length}
								</p>
							</div>
							<CheckCircle2 className="h-8 w-8 text-muted-foreground/20" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">This Week</p>
								<p className="text-xl sm:text-2xl font-bold">2</p>
							</div>
							<Clock className="h-8 w-8 text-muted-foreground/20" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Average Score</p>
								<p className="text-xl sm:text-2xl font-bold">85%</p>
							</div>
							<AlertCircle className="h-8 w-8 text-muted-foreground/20" />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
