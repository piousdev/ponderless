import { Button } from "@/components/shadcn/ui/button";
import { viewModeConfig } from "@/modules/progress-hub/components/calendar/constants";
import type { ViewMode } from "@/types/calendar";

interface ViewToggleProps {
	viewMode: ViewMode;
	setViewMode: (mode: ViewMode) => void;
}

export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => (
	<div className="flex items-center gap-1 border rounded-lg p-1 sm:p-2 lg:p-3">
		{Object.entries(viewModeConfig).map(([mode, config]) => {
			const Icon = config.icon;
			return (
				<Button
					key={mode}
					variant={viewMode === mode ? "default" : "ghost"}
					size="sm"
					onClick={() => setViewMode(mode as ViewMode)}
					className="gap-1"
				>
					<Icon className="h-4 w-4" />
					<span className="hidden sm:inline">{config.label}</span>
				</Button>
			);
		})}
	</div>
);
