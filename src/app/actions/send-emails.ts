"use server";

import { Resend } from "resend";
import { renderContactFormEmail } from "@/lib/email-templates";

export async function sendEmail(formData: FormData) {
	try {
		const resend = new Resend(process.env.RESEND_API_KEY);

		const email = formData.get("email") as string;
		const message = formData.get("message") as string;

		if (!email || !message) {
			return { error: "All fields are required" };
		}

		if (!process.env.RESEND_TO_EMAIL_ADDRESS) {
			return { error: "Missing environment variable: RESEND_TO_EMAIL_ADDRESS" };
		}

		const submittedAt = new Date().toLocaleString("en-US", {
			timeZone: "America/New_York",
			dateStyle: "full",
			timeStyle: "short",
		});

		const htmlContent = await renderContactFormEmail({
			email,
			message,
			submittedAt,
		});

		const data = await resend.emails.send({
			from: "Ponderless <onboarding@resend.dev>",
			to: process.env.RESEND_TO_EMAIL_ADDRESS,
			subject: "Mentor | Feedback - Ponderless",
			html: htmlContent,
			text: `
Mentor | Feedback from Ponderless

From: ${email}
Submitted: ${submittedAt}

Message:
${message}

---
Reply directly to this email or contact them at: ${email}
			`.trim(),
		});

		return { success: "Email sent successfully" };
	} catch (error) {
		if (error instanceof Error && error.message.includes("Missing API key")) {
			return { error: "Missing environment variable: RESEND_API_KEY" };
		}
		return {
			error: error instanceof Error ? error.message : "Failed to send email",
		};
	}
}
