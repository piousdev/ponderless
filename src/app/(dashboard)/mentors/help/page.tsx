import HelpCommandMenu from "@/modules/mentors/components/help-command";
import HelpContact from "@/modules/mentors/components/help-contact";
import HelpFrequentlyAsked from "@/modules/mentors/components/help-frequently-asked";
import HelpHeader from "@/modules/mentors/components/help-header";

export default function HelpPage() {
	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="flex flex-col items-center">
				<div className="w-full max-w-4xl">
					<HelpHeader className="mb-6 text-left" />
					<HelpCommandMenu />
					<HelpFrequentlyAsked className="mt-[5rem]" />
				</div>
				<HelpContact className="w-full max-w-4xl m-[5rem]" />
			</div>
		</div>
	);
}
