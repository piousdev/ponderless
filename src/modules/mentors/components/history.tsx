"use client";

import { FileText, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Checkbox } from "@/components/shadcn/ui/checkbox";

interface IHistory {
	searchTerm: string;
	isSelectionMode: boolean;
	selectedItems: string[];
	onSelectItem: (title: string, isSelected: boolean) => void;
	onDeleteItem: (title: string) => void;
	historyItems: {
		type: string;
		title: string;
		date: string;
	}[];
}

export const historyItems = [
	{
		type: "Meeting Attended",
		title: "Intro to Cognitive Biases",
		date: "June 28, 2025",
	},
	{
		type: "Mentor Connect",
		title: "Connected with Marcus Thorne",
		date: "June 25, 2025",
	},
	{
		type: "Discussion Reply",
		title: "Replied in 'Systems Thinking' thread",
		date: "June 24, 2025",
	},
	{
		type: "Profile Update",
		title: "Updated your learning goals",
		date: "June 22, 2025",
	},
];

export default function History({
	searchTerm = "",
	isSelectionMode,
	selectedItems,
	onSelectItem,
	onDeleteItem,
}: IHistory) {
	const filteredHistory = historyItems.filter(
		(item) =>
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.type.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="mt-6">
			<Card>
				<CardContent className="p-0">
					<ul className="divide-y">
						{filteredHistory.map((item) => (
							<li
								key={item.title}
								className="p-4 flex items-center justify-between"
							>
								<div className="flex items-center gap-4">
									{isSelectionMode && (
										<Checkbox
											checked={selectedItems.includes(item.title)}
											onCheckedChange={(checked) =>
												onSelectItem(item.title, checked as boolean)
											}
										/>
									)}
									<div>
										<p className="font-medium">{item.type}</p>
										<p className="text-sm text-muted-foreground">
											{item.title}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<p className="text-sm text-muted-foreground">{item.date}</p>
									{isSelectionMode && (
										<Trash2
											className="size-4 text-muted-foreground cursor-pointer hover:text-red-500"
											onClick={() => onDeleteItem(item.title)}
										/>
									)}
								</div>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
