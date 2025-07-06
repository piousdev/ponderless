"use client";

import { useState } from "react";
import History, {
	historyItems as initialHistoryItems,
} from "@/modules/mentor/components/history"; // Import historyItems as initialHistoryItems
import HistoryActions from "@/modules/mentor/components/history-actions";
import HistorySearch from "@/modules/mentor/components/history-search";
import MentorHeader from "@/modules/mentor/components/mentor-header";

const HistoryPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isSelectionMode, setIsSelectionMode] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]); // Store titles of selected items
	const [currentHistoryItems, setCurrentHistoryItems] =
		useState(initialHistoryItems);

	const handleSelectModeChange = (isActive: boolean) => {
		setIsSelectionMode(isActive);
		if (!isActive) {
			setSelectedItems([]); // Clear selection when exiting selection mode
		}
	};

	const handleSelectAll = () => {
		setSelectedItems(currentHistoryItems.map((item) => item.title));
	};

	const handleCancelSelection = () => {
		setSelectedItems([]);
	};

	const handleDeleteSelected = () => {
		setCurrentHistoryItems((prevItems) =>
			prevItems.filter((item) => !selectedItems.includes(item.title)),
		);
		setSelectedItems([]);
		setIsSelectionMode(false);
	};

	const handleSelectItem = (title: string, isSelected: boolean) => {
		if (isSelected) {
			setSelectedItems((prev) => [...prev, title]);
		} else {
			setSelectedItems((prev) => prev.filter((item) => item !== title));
		}
	};

	const handleDeleteItem = (title: string) => {
		setCurrentHistoryItems((prevItems) =>
			prevItems.filter((item) => item.title !== title),
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<MentorHeader title="Your Activity History" />
			<HistorySearch
				searchTerm={searchTerm}
				setSearchTermAction={setSearchTerm}
			/>
			<HistoryActions
				totalItems={currentHistoryItems.length}
				onSelectModeChange={handleSelectModeChange}
				onSelectAll={handleSelectAll}
				onCancelSelection={handleCancelSelection}
				onDeleteSelected={handleDeleteSelected}
				selectedItemCount={selectedItems.length}
			/>
			<History
				searchTerm={searchTerm}
				isSelectionMode={isSelectionMode}
				selectedItems={selectedItems}
				onSelectItem={handleSelectItem}
				onDeleteItem={handleDeleteItem}
				historyItems={currentHistoryItems}
			/>
		</div>
	);
};

export default HistoryPage;
