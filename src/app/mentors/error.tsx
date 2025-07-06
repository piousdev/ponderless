"use client";

import { ErrorDisplay } from "@/components/error-display";

interface IMentorsError {
	error: Error & { digest?: string };
	readonly reset: () => void;
}

export default function MentorsError({ error, reset }: IMentorsError) {
	return (
		<ErrorDisplay
			title="Failed to Load Mentors"
			message={
				error.message ||
				"An error occurred while fetching your mentor data. Please try again."
			}
			onResetAction={() => reset()}
			showGoBack={true}
			showGoHome={true}
		/>
	);
}
