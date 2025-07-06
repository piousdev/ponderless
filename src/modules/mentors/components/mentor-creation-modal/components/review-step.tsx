import { Card, CardContent } from "@/components/shadcn/ui/card";
import {
	criticalThinkingMethodologies,
	decisionApproaches,
	expertiseDomains,
} from "../constants";
import type { FormData } from "../types";

interface ReviewStepProps {
	formData: FormData;
}

export const ReviewStep = ({ formData }: ReviewStepProps) => {
	return (
		<div className="space-y-4">
			<h3 className="text-2xl font-bold text-center">
				Ready to Create Your Mentor?
			</h3>
			<p className="text-center text-muted-foreground">
				Review your choices below. You can go back to change anything.
			</p>
			<Card>
				<CardContent className="p-6 space-y-3">
					<p>
						<strong>Name:</strong> {formData.name}
					</p>
					<p>
						<strong>Purpose:</strong> {formData.purpose}
					</p>
					<p>
						<strong>Domain:</strong>{" "}
						{expertiseDomains.find((d) => d.id === formData.domain)?.title}
					</p>
					<p>
						<strong>Approaches:</strong>{" "}
						{formData.decisionApproaches
							.map((id) => decisionApproaches.find((a) => a.id === id)?.title)
							.join(", ")}
					</p>
					<p>
						<strong>Methodologies:</strong>{" "}
						{formData.criticalThinkingMethodologies
							.map(
								(id) =>
									criticalThinkingMethodologies.find((m) => m.id === id)?.title,
							)
							.join(", ")}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};
