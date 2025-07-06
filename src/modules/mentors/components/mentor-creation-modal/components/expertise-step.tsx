import { motion } from "motion/react";
import { Card } from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { cn } from "@/lib/utils";
import { expertiseDomains } from "../constants";
import type { FormData } from "../types";

interface ExpertiseStepProps {
	formData: FormData;
	onUpdateFormData: (updates: Partial<FormData>) => void;
}

export const ExpertiseStep = ({
	formData,
	onUpdateFormData,
}: ExpertiseStepProps) => {
	return (
		<div>
			<h3 className="text-lg font-semibold mb-4">Expertise Domain</h3>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
				{expertiseDomains.map((domain) => (
					<Card
						key={domain.id}
						className={cn(
							"cursor-pointer text-center p-4 flex flex-col items-center justify-center gap-2 transition-all",
							formData.domain === domain.id &&
								"border-primary ring-2 ring-primary",
						)}
						onClick={() => onUpdateFormData({ domain: domain.id })}
					>
						<domain.icon className="w-6 h-6" />
						<p className="text-sm font-medium">{domain.title}</p>
					</Card>
				))}
			</div>
			{formData.domain === "custom" && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="mt-4"
				>
					<Input
						placeholder="Describe the custom domain..."
						value={formData.customDomain}
						onChange={(e) => onUpdateFormData({ customDomain: e.target.value })}
					/>
				</motion.div>
			)}
		</div>
	);
};
