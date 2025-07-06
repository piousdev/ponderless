"use client";
import { useId } from "react";
import { toast } from "sonner";
import { sendEmail } from "@/app/actions/send-emails";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { SubmitButton } from "@/modules/mentors/components/feedback-submit-button";

export default function ContactForm() {
	const emailId = useId();
	const messageId = useId();
	async function handleSubmit(formData: FormData) {
		const result = await sendEmail(formData);

		if (result.success) {
			toast("Success", {
				description: result.success,
			});
		} else {
			toast("Error", {
				description: result.error,
			});
		}
	}

	return (
		<form action={handleSubmit} className="space-y-12">
			<div className="space-y-4">
				<Label htmlFor={emailId}>Email address</Label>
				<Input
					type="email"
					autoComplete="email"
					id={emailId}
					name="email"
					placeholder="Enter your email"
					required
					className="w-full bg-input rounded-xl p-6 !text-lg border-0 focus:ring-1 focus:ring-ring placeholder:text-muted-foreground focus:placeholder:text-muted-foreground"
				/>
			</div>

			<div className="space-y-4">
				<Label htmlFor={messageId}>How can we help?</Label>
				<Textarea
					id={messageId}
					name="message"
					placeholder="Enter your message"
					required
					rows={5}
					className="w-full bg-input rounded-xl p-6 !text-lg border-0 focus:ring-1 focus:ring-ring placeholder:text-muted-foreground focus:placeholder:text-muted-foreground resize-none"
				/>
			</div>
			<SubmitButton />
		</form>
	);
}
