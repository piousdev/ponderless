import { Check } from "lucide-react";
import { Card } from "@/components/shadcn/ui/card";
import { cn } from "@/lib/utils";
import {
	criticalThinkingMethodologies,
	decisionApproaches,
} from "../constants";
import type { FormData } from "../types";

interface MethodologiesStepProps {
	formData: FormData;
	onToggleDecisionApproach: (approachId: string) => void;
	onToggleCriticalThinkingMethodology: (methodId: string) => void;
}

export const MethodologiesStep = ({
	formData,
	onToggleDecisionApproach,
	onToggleCriticalThinkingMethodology,
}: MethodologiesStepProps) => {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-2">Decision-Making Approach</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Select up to 2 approaches. ({formData.decisionApproaches.length}/2)
				</p>
				<div className="grid grid-cols-2 gap-3">
					{decisionApproaches.map((approach) => {
						const isSelected = formData.decisionApproaches.includes(
							approach.id,
						);
						const isDisabled =
							!isSelected && formData.decisionApproaches.length >= 2;

						return (
							<Card
								key={approach.id}
								className={cn(
									"cursor-pointer p-3 flex items-center gap-2 transition-all",
									isSelected && "border-primary ring-2 ring-primary",
									isDisabled && "opacity-50 cursor-not-allowed",
								)}
								onClick={() => {
									if (isDisabled) return;
									onToggleDecisionApproach(approach.id);
								}}
							>
								<div
									className={cn(
										"w-5 h-5 rounded-sm border-2 flex items-center justify-center",
										isSelected
											? "bg-primary border-primary"
											: "border-muted-foreground",
									)}
								>
									{isSelected && (
										<Check className="w-4 h-4 text-primary-foreground" />
									)}
								</div>
								<p className="text-sm font-medium">{approach.title}</p>
							</Card>
						);
					})}
				</div>
			</div>
			<div>
				<h3 className="text-lg font-semibold mb-2">
					Critical Thinking Methodologies
				</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Select up to 2 methodologies. (
					{formData.criticalThinkingMethodologies.length}/2)
				</p>
				<div className="grid grid-cols-2 gap-3">
					{criticalThinkingMethodologies.map((method) => {
						const isSelected = formData.criticalThinkingMethodologies.includes(
							method.id,
						);
						const isDisabled =
							!isSelected && formData.criticalThinkingMethodologies.length >= 2;

						return (
							<Card
								key={method.id}
								className={cn(
									"cursor-pointer p-3 flex items-center gap-2 transition-all",
									isSelected && "border-primary ring-2 ring-primary",
									isDisabled && "opacity-50 cursor-not-allowed",
								)}
								onClick={() => {
									if (isDisabled) return;
									onToggleCriticalThinkingMethodology(method.id);
								}}
							>
								<div
									className={cn(
										"w-5 h-5 rounded-sm border-2 flex items-center justify-center",
										isSelected
											? "bg-primary border-primary"
											: "border-muted-foreground",
									)}
								>
									{isSelected && (
										<Check className="w-4 h-4 text-primary-foreground" />
									)}
								</div>
								<p className="text-sm font-medium">{method.title}</p>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
};
