"use server";

import { renderContactFormEmail } from "./render-email";

/**
 * Preview utility for testing email templates during development
 * This function can be used to generate sample email HTML for testing
 */
export async function generatePreviewEmail() {
	const sampleData = {
		email: "john.doe@example.com",
		message: `Hello there!

I'm interested in learning more about your services. I found your website through a Google search and I'm impressed with what I've seen so far.

Could you please provide more information about:
- Your pricing structure
- Available consultation times
- The onboarding process

I look forward to hearing from you soon.

Best regards,
John Doe`,
		submittedAt: new Date().toLocaleString("en-US", {
			timeZone: "America/New_York",
			dateStyle: "full",
			timeStyle: "short",
		}),
	};

	return await renderContactFormEmail(sampleData);
}

/**
 * Generates a simple preview email for testing purposes
 */
export async function generateSimplePreview() {
	const sampleData = {
		email: "test@example.com",
		message: "This is a test message to preview the email template.",
	};

	return await renderContactFormEmail(sampleData);
}

// Export the functions for use in development
export { renderContactFormEmail };
