import MentorLayoutWrapper from "@/modules/mentor/components/mentor-layout-wrapper";

interface IMentorLayout {
	children: React.ReactNode;
}

export default function MentorLayout({ children }: IMentorLayout) {
	return <MentorLayoutWrapper>{children}</MentorLayoutWrapper>;
}
