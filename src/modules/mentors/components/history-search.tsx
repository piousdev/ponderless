import { Search } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";

interface IHistorySearch {
	readonly searchTerm: string;
	setSearchTermAction: (term: string) => void;
}

export default function HistorySearch({
	searchTerm,
	setSearchTermAction,
}: IHistorySearch) {
	return (
		<div className="relative flex items-center w-full">
			<Search className="absolute left-3 size-4 text-muted-foreground" />
			<Input
				value={searchTerm}
				onChange={(e) => setSearchTermAction(e.target.value)}
				placeholder="Search history..."
				className="pl-10 py-6"
			/>
		</div>
	);
}
