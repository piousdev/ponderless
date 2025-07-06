"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";

interface CommunitySearchProps {
	searchTerm: string;
	setSearchTermAction: (term: string) => void;
}

export default function CommunitySearch({
	searchTerm,
	setSearchTermAction,
}: CommunitySearchProps) {
	return (
		<div className="relative w-64">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
			<Input
				placeholder="Search mentors..."
				className="pl-9"
				value={searchTerm}
				onChange={(e) => setSearchTermAction(e.target.value)}
			/>
		</div>
	);
}
