import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	colorClasses,
	colorDots,
} from "@/modules/progress-hub/components/calendar/constants";
import type { WeekViewProps } from "@/modules/progress-hub/components/calendar/types";
import { CompletionBadge, ProgressBar, TrendIndicator } from "./progress-indicators";

export const ListView = ({
	weekDays,
	getEventsForDate,
	onDayClick,
	isDateInPast,
}: WeekViewProps) => {
	return (
		<div className="space-y-2 p-2 sm:p-4 lg:p-6">
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
							"w-full text-left transition-colors border rounded-lg group",
							isPast
								? "opacity-50 cursor-not-allowed bg-muted/20"
								: "hover:bg-muted/50 cursor-pointer bg-card",
							isToday && "ring-2 ring-primary",
						)}
					>
						<div className="p-4">
							{/* Day Header */}
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
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
									<div className="flex flex-col">
										<h3
											className={cn(
												"font-medium",
												isPast ? "text-muted-foreground" : "text-foreground",
											)}
										>
											{dayDate.toLocaleDateString("en-US", {
												weekday: "long",
												month: "long",
												day: "numeric",
											})}
										</h3>
										<p className="text-xs text-muted-foreground">
											{events.length === 0
												? isPast
													? "No events"
													: "Click to add event"
												: `${events.length} event${events.length > 1 ? "s" : ""}`}
										</p>
									</div>
								</div>

								{/* Click indicator */}
								{!isPast && (
									<div className="opacity-0 group-hover:opacity-100 transition-opacity">
										<MousePointer2 className="h-4 w-4 text-muted-foreground" />
									</div>
								)}
							</div>

							{/* Events */}
							{events.length > 0 && (
								<div className="space-y-2 ml-11">
									{events.map((event) => (
										<div
											key={event.id}
											className={cn(
												"p-3 rounded-lg border-l-4 pointer-events-none",
												colorClasses[event.color],
												isPast && "opacity-60",
											)}
										>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-1">
														<h4 className="font-medium">{event.title}</h4>
														<CompletionBadge
															status={event.status}
															score={event.score}
															maxScore={event.maxScore}
															size="md"
														/>
														{event.improvementTrend && (
															<TrendIndicator
																trend={event.improvementTrend}
																previousScore={event.previousScore}
																currentScore={event.score}
																size="md"
															/>
														)}
													</div>
													<div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
														<span>{event.time}</span>
														{event.duration && (
															<>
																<span>•</span>
																<span>{event.duration}</span>
															</>
														)}
														{event.status === "completed" && event.score && (
															<>
																<span>•</span>
																<span className={cn(
																	"font-medium",
																	event.score >= 90 ? "text-green-600" :
																	event.score >= 70 ? "text-blue-600" :
																	"text-gray-600"
																)}>
																	Score: {event.score}/{event.maxScore || 100}
																</span>
															</>
														)}
													</div>
													{event.description && (
														<p className="text-sm text-muted-foreground mt-1 line-clamp-2">
															{event.description}
														</p>
													)}
													{event.totalSessions && event.sessionNumber && (
														<ProgressBar
															sessionNumber={event.sessionNumber}
															totalSessions={event.totalSessions}
															className="mt-2 mb-2"
														/>
													)}
													<div className="flex items-center gap-2 mt-2">
														<span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
															{event.type}
														</span>
														<span
															className={cn(
																"text-xs px-2 py-1 rounded-full",
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
												<div
													className={cn(
														"w-3 h-3 rounded-full ml-3 mt-1",
														colorDots[event.color],
													)}
												/>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</button>
				);
			})}
		</div>
	);
};
