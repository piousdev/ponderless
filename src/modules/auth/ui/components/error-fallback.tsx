import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const SUPPORT_EMAIL = "support@example.com";

interface IErrorFallbackProps {
	error: Error;
	readonly componentName: string;
	readonly message?: string;
}

function getEmailBody(
	error: Error,
	componentName: string,
	message?: string,
): string {
	const emailBody = `Hello,
I encountered an error while using the ${componentName}:
Error Message: ${error.message}
Error Stack: ${error.stack || "Not available"}
Timestamp: ${new Date().toISOString()}
User Agent: ${typeof window !== "undefined" ? window.navigator.userAgent : "Not available"}
${message ? `Message: ${message}` : ""}
Please help resolve this issue.
Thank you!`;

	return emailBody;
}

function getEmailSubject(componentName: string): string {
	return `${componentName} Component Error`;
}

function getMailtoUrl(emailSubject: string, emailBody: string): string {
	return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
		emailSubject,
	)}&body=${encodeURIComponent(emailBody)}`;
}

function reformatComponentName(componentName: string): string {
	return (
		componentName
			// Insert a space before any uppercase letter that follows a lowercase letter or digit
			.replace(/([a-z\d])([A-Z])/g, "$1 $2")
			// Insert a space before any uppercase letter that is followed by a lowercase letter (for acronyms)
			.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
			.trim()
	);
}

function getErrorFallbackMessage(
	componentName: string,
	message?: string,
): string {
	return `Unable to display ${reformatComponentName(componentName)}. ${
		message ? `Message: ${message}.` : ""
	}`;
}

function getSendToSupportMessage(): string {
	return "If the problem persists, please contact support by clicking on the link below:";
}

export const ErrorFallback = ({
	error,
	componentName,
	message,
}: IErrorFallbackProps): React.JSX.Element => {
	const emailSubject = getEmailSubject(reformatComponentName(componentName));
	const emailBody = getEmailBody(
		error,
		reformatComponentName(componentName),
		message,
	);
	const mailtoUrl = getMailtoUrl(emailSubject, emailBody);

	return (
		<div
			role="alert"
			className="p-4 text-center"
			data-testid={`${componentName}-error`}
		>
			<AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
			<h3 className="text-lg font-medium">Error</h3>
			<p className="text-sm text-muted-foreground text-center">
				Error is: {error.message}
			</p>
			<p className="text-sm text-muted-foreground text-center">
				{getErrorFallbackMessage(reformatComponentName(componentName), message)}
			</p>
			<p className="text-sm text-muted-foreground text-center">
				{getSendToSupportMessage()}
				<Link href={mailtoUrl} className="text-primary underline">
					{SUPPORT_EMAIL}
				</Link>
			</p>
		</div>
	);
};
