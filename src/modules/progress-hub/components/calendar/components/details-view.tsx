import { MousePointer2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import { colorClasses } from "@/modules/progress-hub/components/calendar/constants";
import type { WeekViewProps } from "@/modules/progress-hub/components/calendar/types";
import { CompletionBadge, ProgressBar, TrendIndicator } from "./progress-indicators";

export const DetailsView = ({
	weekDays,
	getEventsForDate,
	onDayClick,
	isDateInPast,
}: WeekViewProps) => (
	<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-7 gap-4 p-2 sm:p-4 lg:p-6">
		{weekDays.map((dayDate) => {
			const isToday = dayDate.toDateString() === new Date().toDateString();
			const isPast = isDateInPast(dayDate);
			const events = getEventsForDate(dayDate);
			return (
				<button
					key={dayDate.getTime()}
					type="button"
					onClick={() => onDayClick(dayDate)}
					disabled={isPast}
					className={cn(
						"h-fit min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] max-h-[300px] sm:max-h-[350px] lg:max-h-[400px] transition-all duration-200 group",
						isPast ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
					)}
				>
					<Card
						className={cn(
							"h-full transition-all duration-200",
							isToday && "ring-2 ring-primary",
							!isPast && "hover:ring-2 hover:ring-primary/50",
						)}
					>
						<CardHeader className="p-2 sm:p-3">
							<div className="flex items-center justify-between">
								<div
									className={cn(
										"font-semibold text-lg flex items-center justify-center min-w-[32px] h-8",
										isToday
											? "bg-primary text-primary-foreground rounded-full px-3"
											: isPast
												? "text-muted-foreground"
												: "text-foreground",
									)}
								>
									{dayDate.getDate()}
								</div>
								{/* Show day name on mobile/tablet */}
								<div
									className={cn(
										"lg:hidden text-xs",
										isPast ? "text-muted-foreground" : "text-muted-foreground",
									)}
								>
									{dayDate.toLocaleDateString("en-US", { weekday: "short" })}
								</div>
								{/* Hover indicator - only show for future dates */}
								{!isPast && (
									<div className="opacity-0 group-hover:opacity-100 transition-opacity">
										<MousePointer2 className="h-3 w-3 text-muted-foreground" />
									</div>
								)}
							</div>
						</CardHeader>
						<CardContent className="p-2 sm:p-3 pt-0 space-y-1 sm:space-y-2 overflow-y-auto max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]">
							{events.length === 0 ? (
								<div
									className={cn(
										"text-xs py-2",
										isPast ? "text-muted-foreground" : "text-muted-foreground",
									)}
								>
									{isPast ? "No events" : "Click to add event"}
								</div>
							) : (
								events.map((event) => (
									<div
										key={event.id}
										className={cn(
											"text-xs sm:text-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2 border-l-4 pointer-events-none",
											colorClasses[event.color],
											isPast && "opacity-60",
										)}
									>
										<div className="flex items-start justify-between gap-2 mb-1">
											<div className="flex-1 min-w-0">
												<p className="font-semibold truncate" title={event.title}>
													{event.title}
												</p>
												<p className="text-xs opacity-75 truncate">{event.time}</p>
												{event.duration && (
													<p className="text-xs opacity-60 truncate">
														{event.duration}
													</p>
												)}
											</div>
											<div className="flex items-start gap-1">
												<CompletionBadge
													status={event.status}
													score={event.score}
													maxScore={event.maxScore}
													size="sm"
												/>
												{event.improvementTrend && (
													<TrendIndicator
														trend={event.improvementTrend}
														previousScore={event.previousScore}
														currentScore={event.score}
														size="sm"
													/>
												)}
											</div>
										</div>
										{event.description && (
											<p
												className="text-xs opacity-60 mt-1 line-clamp-2 sm:line-clamp-3"
												title={event.description}
											>
												{event.description}
											</p>
										)}
										{event.totalSessions && event.sessionNumber && (
											<ProgressBar
												sessionNumber={event.sessionNumber}
												totalSessions={event.totalSessions}
												className="mt-2"
											/>
										)}
										{/* Performance score display */}
										{event.status === "completed" && event.score && (
											<div className="flex items-center gap-2 mt-2 text-xs">
												<span className="font-medium">Score:</span>
												<span className={cn(
													"font-bold",
													event.score >= 90 ? "text-green-600" :
													event.score >= 70 ? "text-blue-600" :
													"text-gray-600"
												)}>
													{event.score}/{event.maxScore || 100}
												</span>
											</div>
										)}
										{/* Show priority and type on mobile/tablet */}
										<div className="lg:hidden flex items-center gap-1 mt-1">
											<span className="text-xs px-1 py-0.5 rounded bg-secondary text-secondary-foreground">
												{event.type}
											</span>
											<span
												className={cn(
													"text-xs px-1 py-0.5 rounded",
													event.priority === "high"
														? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
														: event.priority === "medium"
															? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
															: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
												)}
											>
												{event.priority}
											</span>
										</div>
									</div>
								))
							)}
						</CardContent>
					</Card>
				</button>
			);
		})}
	</div>
);
