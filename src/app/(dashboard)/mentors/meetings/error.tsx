"use client";

import { ErrorDisplay } from "@/components/error-display";

export default function MeetingsError({ reset }: { reset: () => void }) {
	return (
		<ErrorDisplay
			title="Something went wrong"
			message="We couldn't load your meetings. Please try again later."
			onResetAction={reset}
		/>
	);
}
