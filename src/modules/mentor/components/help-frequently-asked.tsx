import { faqData } from "@/config/faq-data";
import { cn } from "@/lib/utils";
import { HelpAccordionFromData } from "@/modules/mentor/components/help-accordion";

interface IHelpFrequentlyAsked {
	readonly className?: string;
}

export default function HelpFrequentlyAsked({
	className,
}: IHelpFrequentlyAsked) {
	return (
		<div className={cn("flex flex-col gap-6 w-full", className)}>
			<HelpAccordionFromData sections={faqData} />
		</div>
	);
}
