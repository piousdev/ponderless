import MentorHeader from "@/modules/mentor/components/mentor-header";

export default function HelpHeader({ className }: { className?: string }) {
	return (
		<MentorHeader
			title="How can we help you?"
			description="We're here to help you with any questions or concerns you have."
			className={className}
		/>
	);
}
