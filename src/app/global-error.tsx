"use client";

import { ErrorDisplay } from "@/components/error-display";

interface IGlobalError {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ reset }: IGlobalError) {
	return (
		<html lang="en">
			<body>
				<ErrorDisplay
					title="Something went wrong!"
					message="An unexpected error occurred in the application shell. Please try again."
					onResetAction={() => reset()}
					showGoBack={false}
					showGoHome={true}
					errorCode="500"
				/>
			</body>
		</html>
	);
}
