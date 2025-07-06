import { Lightbulb } from "lucide-react";
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
						For example, click a tag to add it to your purpose:
					</p>
					<div className="flex flex-wrap gap-2">
						{criticalThinkingPurposes.map((purpose) => (
							<Button
								key={purpose}
								variant="secondaryOutline"
								size="sm"
								onClick={() =>
									onUpdateFormData({
										purpose: `${formData.purpose} ${purpose}.`.trim(),
									})
								}
							>
								<Lightbulb className="mr-2 h-4 w-4" />
								{purpose}
							</Button>
						))}
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-2 text-right">
					{formData.purpose.length}/150
				</p>
			</div>
		</div>
	);
};
