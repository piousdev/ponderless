import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { templates } from "../constants";
import type { ITemplate } from "../types";

interface TemplatesStepProps {
	onTemplateSelect: (template: ITemplate) => void;
	onStartFromScratch: () => void;
}

export const TemplatesStep = ({
	onTemplateSelect,
	onStartFromScratch,
}: TemplatesStepProps) => {
	return (
		<div>
			<h3 className="text-lg font-semibold mb-4">Quick Start Templates</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				{templates.map((template) => (
					<Card
						key={template.name}
						className="cursor-pointer hover:border-primary transition-colors"
						onClick={() => onTemplateSelect(template)}
					>
						<CardHeader>
							<CardTitle className="text-base">{template.name}</CardTitle>
						</CardHeader>
					</Card>
				))}
			</div>
			<div className="text-center">
				<Button variant="secondary" onClick={onStartFromScratch}>
					Start from Scratch
				</Button>
			</div>
		</div>
	);
};
