import { Lightbulb, X } from "lucide-react";
import { useId } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { criticalThinkingPurposes } from "../constants";
import type { FormData, FormErrors } from "../types";

interface BasicInfoStepProps {
	formData: FormData;
	formErrors: FormErrors;
	onUpdateFormData: (updates: Partial<FormData>) => void;
}

export const BasicInfoStep = ({
	formData,
	formErrors,
	onUpdateFormData,
}: BasicInfoStepProps) => {
	const nameId = useId();
	const purposeId = useId();

	// Helper function to check if a purpose is already in the textarea
	const isPurposeSelected = (purpose: string): boolean => {
		return formData.purpose.includes(purpose);
	};

	// Helper function to add a purpose to the textarea
	const addPurpose = (purpose: string): void => {
		const currentPurpose = formData.purpose.trim();
		const newPurpose = currentPurpose
			? `${currentPurpose} ${purpose}.`.trim()
			: `${purpose}.`;

		onUpdateFormData({ purpose: newPurpose });
	};

	// Helper function to remove a purpose from the textarea
	const removePurpose = (purpose: string): void => {
		const purposePattern = new RegExp(`\\s*${purpose}\\.?\\s*`, "gi");
		const updatedPurpose = formData.purpose
			.replace(purposePattern, " ")
			.replace(/\s+/g, " ")
			.trim();

		onUpdateFormData({ purpose: updatedPurpose });
	};

	// Toggle purpose - add if not present, remove if present
	const togglePurpose = (purpose: string): void => {
		if (isPurposeSelected(purpose)) {
			removePurpose(purpose);
		} else {
			addPurpose(purpose);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<label
					htmlFor={nameId}
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Mentor Name
				</label>
				<Input
					id={nameId}
					placeholder="Give your mentor a name..."
					value={formData.name}
					onChange={(e) => onUpdateFormData({ name: e.target.value })}
					maxLength={30}
				/>
				{formErrors.name && (
					<p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
				)}
				<p className="text-xs text-muted-foreground mt-1 text-right">
					{formData.name.length}/30
				</p>
			</div>
			<div>
				<label
					htmlFor={purposeId}
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Mentor Purpose
				</label>
				<Textarea
					id={purposeId}
					placeholder="What decisions will this mentor help with?"
					value={formData.purpose}
					onChange={(e) => onUpdateFormData({ purpose: e.target.value })}
					maxLength={150}
					className="h-24"
				/>
				{formErrors.purpose && (
					<p className="text-xs text-red-500 mt-1">{formErrors.purpose}</p>
				)}
				<div className="mt-2">
					<p className="text-xs text-muted-foreground mb-2">
						Click to add/remove purposes. Selected purposes are highlighted:
					</p>
					<div className="flex flex-wrap gap-2">
						{criticalThinkingPurposes.map((purpose) => {
							const isSelected = isPurposeSelected(purpose);
							return (
								<Button
									key={purpose}
									variant="ghost"
									size="sm"
									onClick={() => togglePurpose(purpose)}
									className={`!capitalize !text-xs transition-all duration-200 cursor-pointer ${
										isSelected
											? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground"
											: "hover:bg-muted hover:text-muted-foreground"
									}`}
								>
									{isSelected ? (
										<X className="mr-2 size-4" />
									) : (
										<Lightbulb className="mr-2 size-4" />
									)}
									{purpose}
								</Button>
							);
						})}
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2 text-right">
					{formData.purpose.length}/150
				</p>
			</div>
		</div>
	);
};
