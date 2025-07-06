"use client";

import { useState } from "react";
import CommunityMentors from "@/modules/mentor/components/community-mentors";
import CommunitySearch from "@/modules/mentor/components/community-search";
import MentorHeader from "@/modules/mentor/components/mentor-header";

export default function CommunityPage() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<MentorHeader
					title="Community Mentors"
					description="Find community mentors for personal and professional growth."
				/>
				<CommunitySearch
					searchTerm={searchTerm}
					setSearchTermAction={setSearchTerm}
				/>
			</div>
			<CommunityMentors searchTerm={searchTerm} />
		</>
	);
}
