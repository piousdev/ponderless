import { Slider } from "@/components/shadcn/ui/slider";
import type { FormData } from "../types";

interface CommunicationStepProps {
	formData: FormData;
	onUpdateCommunicationStyle: (
		updates: Partial<FormData["communicationStyle"]>,
	) => void;
}

export const CommunicationStep = ({
	formData,
	onUpdateCommunicationStyle,
}: CommunicationStepProps) => {
	return (
		<div className="space-y-8 pt-4">
			<h3 className="text-lg font-semibold mb-2 -mt-4">Communication Style</h3>
			<div>
				<div className="flex justify-between text-sm text-muted-foreground mb-2">
					<span>Direct</span>
					<span>Socratic</span>
				</div>
				<Slider
					value={[formData.communicationStyle.approach]}
					onValueChange={([value]) =>
						onUpdateCommunicationStyle({ approach: value })
					}
				/>
				<p className="text-center text-sm font-medium mt-2">
					Communication Approach
				</p>
			</div>
			<div>
				<div className="flex justify-between text-sm text-muted-foreground mb-2">
					<span>Formal</span>
					<span>Casual</span>
				</div>
				<Slider
					value={[formData.communicationStyle.tone]}
					onValueChange={([value]) =>
						onUpdateCommunicationStyle({ tone: value })
					}
				/>
				<p className="text-center text-sm font-medium mt-2">Tone</p>
			</div>
			<div>
				<div className="flex justify-between text-sm text-muted-foreground mb-2">
					<span>Analytical</span>
					<span>Intuitive</span>
				</div>
				<Slider
					value={[formData.communicationStyle.thinkingStyle]}
					onValueChange={([value]) =>
						onUpdateCommunicationStyle({ thinkingStyle: value })
					}
				/>
				<p className="text-center text-sm font-medium mt-2">Thinking Style</p>
			</div>
		</div>
	);
};
