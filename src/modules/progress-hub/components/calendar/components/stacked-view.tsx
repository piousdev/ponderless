import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { colorClasses } from "@/modules/progress-hub/components/calendar/constants";
import type { ViewPropsWithClick } from "@/modules/progress-hub/components/calendar/types";
import { CompletionBadge, ProgressBar, TrendIndicator } from "./progress-indicators";

export const StackedView = ({
	currentDate,
	days,
	leadingEmptyDays,
	weekDays,
	getEventsForDate,
	onDayClick,
	isDateInPast,
}: ViewPropsWithClick) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-2 p-2 sm:p-4 lg:p-6">
		{/* Week day headers - hidden on mobile, shown on larger screens */}
		<div className="hidden lg:contents">
			{weekDays.map((day) => (
				<div
					key={day}
					className="text-center font-medium text-muted-foreground p-2 text-sm border-b"
				>
					{day}
				</div>
			))}
		</div>

		{/* Leading empty days - only on large screens */}
		<div className="hidden lg:contents">
			{leadingEmptyDays.map(() => (
				<div key={crypto.randomUUID()} className="min-h-[120px]" />
			))}
		</div>

		{days.map((day) => {
			const isToday =
				new Date().toDateString() ===
				new Date(
					currentDate.getFullYear(),
					currentDate.getMonth(),
					day,
				).toDateString();
			const isPast = isDateInPast(day);
			const events = getEventsForDate(day);
			return (
				<button
					key={day}
					type="button"
					onClick={() => onDayClick(day)}
					disabled={isPast}
					className={cn(
						"min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] border rounded-lg p-2 sm:p-3 transition-all duration-200",
						isPast
							? "opacity-50 cursor-not-allowed bg-muted/20"
							: "hover:bg-muted/50 cursor-pointer bg-card group",
						isToday && "ring-2 ring-primary",
					)}
				>
					<div className="flex flex-col h-full">
						<div className="flex items-center justify-between mb-2">
							<div
								className={cn(
									"font-medium text-base sm:text-lg",
									isToday
										? "bg-primary text-primary-foreground rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
										: isPast
											? "text-muted-foreground"
											: "text-foreground",
								)}
							>
								{day}
							</div>
							{/* Show day name on mobile/tablet */}
							<div className="lg:hidden text-xs text-muted-foreground">
								{
									weekDays[
										new Date(
											currentDate.getFullYear(),
											currentDate.getMonth(),
											day,
										).getDay()
									]
								}
							</div>
							{/* Hover indicator - only show for future dates */}
							{!isPast && (
								<div className="opacity-0 group-hover:opacity-100 transition-opacity">
									<MousePointer2 className="h-3 w-3 text-muted-foreground" />
								</div>
							)}
						</div>
						<div className="flex-1 space-y-1 sm:space-y-2 overflow-hidden">
							{events.length === 0 ? (
								<div className="text-xs text-muted-foreground text-center py-2">
									{isPast ? "No events" : "Click to add"}
								</div>
							) : (
								<div className="space-y-1 sm:space-y-2">
									{events.map((event) => (
										<div
											key={event.id}
											className={cn(
												"text-xs sm:text-sm rounded px-2 sm:px-3 py-1 sm:py-2 border-l-4 text-left pointer-events-none relative",
												colorClasses[event.color],
												isPast && "opacity-60",
											)}
										>
											<div className="flex items-start justify-between gap-2">
												<div className="flex-1 min-w-0">
													<p className="font-semibold truncate" title={event.title}>
														{event.title}
													</p>
													<p className="text-xs opacity-75 truncate">
														{event.time}
													</p>
													{event.duration && (
														<p className="text-xs opacity-60 truncate">
															{event.duration}
														</p>
													)}
												</div>
												<CompletionBadge
													status={event.status}
													score={event.score}
													maxScore={event.maxScore}
													size="sm"
												/>
											</div>
											{event.totalSessions && event.sessionNumber && (
												<ProgressBar
													sessionNumber={event.sessionNumber}
													totalSessions={event.totalSessions}
													className="mt-2"
												/>
											)}
											{event.improvementTrend && (
												<div className="absolute -top-1 -right-1">
													<TrendIndicator
														trend={event.improvementTrend}
														previousScore={event.previousScore}
														currentScore={event.score}
														size="sm"
													/>
												</div>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</button>
			);
		})}
	</div>
);
