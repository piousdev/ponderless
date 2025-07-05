"use client";

import { ErrorDisplay } from "@/components/error-display";

interface IError {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: IError) {
	return (
		<ErrorDisplay
			title="Something went wrong!"
			message={
				error.message || "An unexpected error occurred. Please try again."
			}
			onResetAction={reset}
			showGoBack={true}
			showGoHome={true}
			errorCode="500"
		/>
	);
}
