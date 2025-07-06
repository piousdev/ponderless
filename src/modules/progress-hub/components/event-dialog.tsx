"use client";

import { Calendar, Plus, Save, Trash2, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { cn } from "@/lib/utils";
import type {
	CalendarEvent,
	EventColor,
	EventPriority,
	EventType,
} from "@/types/calendar";

interface EventDialogProps {
	isOpen: boolean;
	onCloseAction: () => void;
	selectedDate: Date | null;
	existingEvents: CalendarEvent[];
	onSaveAction: (event: Omit<CalendarEvent, "id"> & { id?: string }) => void;
	onDeleteAction: (eventId: string) => void;
}

interface EventFormData {
	title: string;
	description: string;
	time: string;
	duration: string;
	type: EventType;
	priority: EventPriority;
	color: EventColor;
}

const defaultFormData: EventFormData = {
	title: "",
	description: "",
	time: "09:00",
	duration: "1 hour",
	type: "assessment",
	priority: "medium",
	color: "blue",
};

const eventTypes: { value: EventType; label: string }[] = [
	{ value: "assessment", label: "Assessment" },
	{ value: "exam", label: "Exam" },
	{ value: "review", label: "Review" },
	{ value: "meeting", label: "Meeting" },
];

const priorities: { value: EventPriority; label: string }[] = [
	{ value: "low", label: "Low Priority" },
	{ value: "medium", label: "Medium Priority" },
	{ value: "high", label: "High Priority" },
];

const colors: { value: EventColor; label: string; class: string }[] = [
	{ value: "blue", label: "Blue", class: "bg-blue-500" },
	{ value: "green", label: "Green", class: "bg-green-500" },
	{ value: "red", label: "Red", class: "bg-red-500" },
	{ value: "yellow", label: "Yellow", class: "bg-yellow-500" },
	{ value: "purple", label: "Purple", class: "bg-purple-500" },
];

export default function EventDialog({
	isOpen,
	onCloseAction,
	selectedDate,
	existingEvents,
	onSaveAction,
	onDeleteAction,
}: EventDialogProps) {
	const [editingEvent, setEditingEvent] = React.useState<CalendarEvent | null>(
		null,
	);
	const [formData, setFormData] =
		React.useState<EventFormData>(defaultFormData);
	const [isCreating, setIsCreating] = React.useState(false);

	const titleId = React.useId();
	const descriptionId = React.useId();
	const timeId = React.useId();
	const durationId = React.useId();
	const typeId = React.useId();
	const priorityId = React.useId();
	const colorId = React.useId();

	const hasEvents = existingEvents.length > 0;

	// Helper function to check if a date is in the past
	const isDateInPast = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const targetDate = new Date(date);
		targetDate.setHours(0, 0, 0, 0);
		return targetDate < today;
	};

	// Helper function to check if a time is in the past for today's date
	const isTimeInPast = (date: Date, time: string) => {
		const today = new Date();
		const targetDate = new Date(date);

		// If the date is not today, time validation doesn't apply
		if (targetDate.toDateString() !== today.toDateString()) {
			return false;
		}

		// Parse the time
		const [hours, minutes] = time.split(":").map(Number);
		const targetDateTime = new Date(targetDate);
		targetDateTime.setHours(hours, minutes, 0, 0);

		return targetDateTime < today;
	};

	// Get minimum time for today
	const getMinTime = () => {
		if (!selectedDate) return "00:00";

		const today = new Date();
		const targetDate = new Date(selectedDate);

		// If the date is not today, no time restriction
		if (targetDate.toDateString() !== today.toDateString()) {
			return "00:00";
		}

		// For today, set minimum time to current time + 1 hour
		const currentHour = today.getHours();
		const currentMinute = today.getMinutes();
		const minHour = currentMinute >= 30 ? currentHour + 2 : currentHour + 1;

		return `${minHour.toString().padStart(2, "0")}:00`;
	};

	React.useEffect(() => {
		if (isOpen) {
			setEditingEvent(null);
			setFormData(defaultFormData);
			setIsCreating(false);
		}
	}, [isOpen]);

	const handleEditEvent = (event: CalendarEvent) => {
		setEditingEvent(event);
		setFormData({
			title: event.title,
			description: event.description || "",
			time: event.time,
			duration: event.duration || "1 hour",
			type: event.type,
			priority: event.priority,
			color: event.color,
		});
		setIsCreating(false);
	};

	const handleCreateNew = () => {
		setEditingEvent(null);
		setFormData(defaultFormData);
		setIsCreating(true);
	};

	const handleSave = () => {
		if (!selectedDate || !formData.title.trim()) return;

		// Validate past date/time
		if (isDateInPast(selectedDate)) {
			alert("Cannot schedule events in the past");
			return;
		}

		if (isTimeInPast(selectedDate, formData.time)) {
			alert("Cannot schedule events at past times for today");
			return;
		}

		const eventData = {
			...(editingEvent && { id: editingEvent.id }),
			date: selectedDate,
			title: formData.title.trim(),
			description: formData.description.trim() || undefined,
			time: formData.time,
			duration: formData.duration || undefined,
			type: formData.type,
			priority: formData.priority,
			color: formData.color,
			status: "scheduled" as const,
		};

		onSaveAction(eventData);
		onCloseAction();
	};

	const handleDelete = () => {
		if (editingEvent) {
			onDeleteAction(editingEvent.id);
			onCloseAction();
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Don't show dialog for past dates
	if (selectedDate && isDateInPast(selectedDate)) {
		return (
			<Dialog open={isOpen} onOpenChange={onCloseAction}>
				<DialogContent className="sm:max-w-[400px]">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							{selectedDate && formatDate(selectedDate)}
						</DialogTitle>
					</DialogHeader>
					<div className="text-center py-8">
						<p className="text-muted-foreground mb-4">
							This date is in the past. You cannot schedule new events on past
							dates.
						</p>
						{hasEvents && (
							<div className="space-y-2">
								<h3 className="font-semibold">Existing Events</h3>
								{existingEvents.map((event) => (
									<div
										key={event.id}
										className="p-3 rounded-lg border text-left"
									>
										<div className="flex items-center gap-2">
											<div
												className={cn(
													"w-3 h-3 rounded-full",
													colors.find((c) => c.value === event.color)?.class,
												)}
											/>
											<span className="font-medium">{event.title}</span>
											<span className="text-sm text-muted-foreground">
												{event.time}
											</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={onCloseAction}>
			<DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Calendar className="h-5 w-5" />
						{selectedDate && formatDate(selectedDate)}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{/* Existing Events */}
					{hasEvents && !isCreating && (
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold">Scheduled Events</h3>
								<Button
									variant="secondary"
									size="sm"
									onClick={handleCreateNew}
									className="gap-2"
								>
									<Plus className="h-4 w-4" />
									Add New
								</Button>
							</div>
							<div className="space-y-2">
								{existingEvents.map((event) => (
									<button
										key={event.id}
										type="button"
										className="w-full text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors"
										onClick={() => handleEditEvent(event)}
									>
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"w-3 h-3 rounded-full",
													colors.find((c) => c.value === event.color)?.class,
												)}
											/>
											<div className="flex-1">
												<h4 className="font-medium">{event.title}</h4>
												<p className="text-sm text-muted-foreground">
													{event.time}
													{event.duration && ` • ${event.duration}`}
												</p>
											</div>
											<div className="text-xs text-muted-foreground">
												{event.type}
											</div>
										</div>
									</button>
								))}
							</div>
						</div>
					)}

					{/* Event Form */}
					{(isCreating || editingEvent) && (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-semibold">
									{editingEvent ? "Edit Event" : "Create New Event"}
								</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setIsCreating(false);
										setEditingEvent(null);
									}}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>

							<div className="space-y-4">
								<div>
									<Label htmlFor={titleId}>Event Title *</Label>
									<Input
										id={titleId}
										value={formData.title}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												title: e.target.value,
											}))
										}
										placeholder="Enter event title"
									/>
								</div>

								<div>
									<Label htmlFor={descriptionId}>Description</Label>
									<Textarea
										id={descriptionId}
										value={formData.description}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										placeholder="Enter event description"
										rows={3}
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor={timeId}>Time *</Label>
										<Input
											id={timeId}
											type="time"
											value={formData.time}
											min={getMinTime()}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													time: e.target.value,
												}))
											}
										/>
										{selectedDate &&
											isTimeInPast(selectedDate, formData.time) && (
												<p className="text-xs text-red-600 mt-1">
													This time is in the past
												</p>
											)}
									</div>

									<div>
										<Label htmlFor={durationId}>Duration</Label>
										<Select
											value={formData.duration}
											onValueChange={(value) =>
												setFormData((prev) => ({ ...prev, duration: value }))
											}
										>
											<SelectTrigger id={durationId}>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="30 minutes">30 minutes</SelectItem>
												<SelectItem value="1 hour">1 hour</SelectItem>
												<SelectItem value="1.5 hours">1.5 hours</SelectItem>
												<SelectItem value="2 hours">2 hours</SelectItem>
												<SelectItem value="2.5 hours">2.5 hours</SelectItem>
												<SelectItem value="3 hours">3 hours</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor={typeId}>Event Type</Label>
										<Select
											value={formData.type}
											onValueChange={(value: EventType) =>
												setFormData((prev) => ({ ...prev, type: value }))
											}
										>
											<SelectTrigger id={typeId}>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{eventTypes.map((type) => (
													<SelectItem key={type.value} value={type.value}>
														{type.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div>
										<Label htmlFor={priorityId}>Priority</Label>
										<Select
											value={formData.priority}
											onValueChange={(value: EventPriority) =>
												setFormData((prev) => ({ ...prev, priority: value }))
											}
										>
											<SelectTrigger id={priorityId}>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{priorities.map((priority) => (
													<SelectItem
														key={priority.value}
														value={priority.value}
													>
														{priority.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div>
									<Label htmlFor={colorId}>Color</Label>
									<Select
										value={formData.color}
										onValueChange={(value: EventColor) =>
											setFormData((prev) => ({ ...prev, color: value }))
										}
									>
										<SelectTrigger id={colorId}>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{colors.map((color) => (
												<SelectItem key={color.value} value={color.value}>
													<div className="flex items-center gap-2">
														<div
															className={cn(
																"w-3 h-3 rounded-full",
																color.class,
															)}
														/>
														{color.label}
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex items-center gap-2 pt-4">
								<Button
									onClick={handleSave}
									className="flex items-center gap-2"
								>
									<Save className="h-4 w-4" />
									{editingEvent ? "Update Event" : "Create Event"}
								</Button>
								{editingEvent && (
									<Button
										variant="destructive"
										onClick={handleDelete}
										className="flex items-center gap-2"
									>
										<Trash2 className="h-4 w-4" />
										Delete Event
									</Button>
								)}
							</div>
						</div>
					)}

					{/* No events and not creating */}
					{!hasEvents && !isCreating && !editingEvent && (
						<div className="text-center py-8">
							<p className="text-muted-foreground mb-4">
								No events scheduled for this day
							</p>
							<Button onClick={handleCreateNew} className="gap-2">
								<Plus className="h-4 w-4" />
								Create Event
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
