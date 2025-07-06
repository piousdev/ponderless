"use client";

import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { CheckSquare, Trash2, XCircle } from "lucide-react";

interface HistoryActionsProps {
  totalItems: number;
  onSelectModeChange: (isActive: boolean) => void;
  onSelectAll: () => void;
  onCancelSelection: () => void;
  onDeleteSelected: () => void;
  selectedItemCount: number;
}

export default function HistoryActions({
  totalItems,
  onSelectModeChange,
  onSelectAll,
  onCancelSelection,
  onDeleteSelected,
  selectedItemCount,
}: HistoryActionsProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handleSelectClick = () => {
    setIsSelectionMode(true);
    onSelectModeChange(true);
  };

  const handleCancelClick = () => {
    setIsSelectionMode(false);
    onSelectModeChange(false);
    onCancelSelection();
  };

  const handleDeleteClick = () => {
    onDeleteSelected();
    setIsSelectionMode(false); // Exit selection mode after deletion
    onSelectModeChange(false);
  };

  const handleSelectAllClick = () => {
    onSelectAll();
  };

  return (
    <div className="flex items-center justify-between mt-5">
      {!isSelectionMode ? (
        <p className="text-sm text-muted-foreground">
          You have {totalItems} previous activity with mentor{" "}
          <Button
            variant="ghost"
            className="p-0 h-auto capitalize"
            onClick={handleSelectClick}
          >
            Select
          </Button>
        </p>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <CheckSquare className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {selectedItemCount} selected activity
            </p>
          </div>
          <div className="flex gap-2">
            {selectedItemCount !== totalItems && (
              <Button variant="ghost" size="sm" onClick={handleSelectAllClick}>
                Select all
              </Button>
            )}
            <Button size="sm" onClick={handleCancelClick}>
              <XCircle className="mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDeleteClick}>
              <Trash2 className="mr-2" />
              Delete Selected
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
