import MentorHeader from "@/modules/mentors/components/mentor-header";
import Mentors from "@/modules/mentors/components/mentors";
import RecentActivity from "@/modules/mentors/components/recent-activity";

export default function MentorsPage() {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
			<div className="space-y-6">
				<MentorHeader
					title="Your Mentors"
					description="Manage your one-on-one mentor relationships and interactions."
				/>
				<Mentors />
			</div>

			<div className="hidden xl:block">
				<RecentActivity />
			</div>
		</div>
	);
}
