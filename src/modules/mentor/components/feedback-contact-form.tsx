"use client";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { sendEmail } from "@/app/actions/send-emails";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { SubmitButton } from "@/modules/mentor/components/feedback-submit-button";

export function ContactForm() {
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
				<Label htmlFor="email">Email address</Label>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email"
					required
					className="w-full bg-input rounded-xl p-6 !text-lg border-0 focus:ring-1 focus:ring-ring placeholder:text-muted-foreground focus:placeholder:text-muted-foreground"
				/>
			</div>

			<div className="space-y-4">
				<Label htmlFor="message">How can we help?</Label>
				<Textarea
					id="message"
					name="message"
					placeholder="Enter your message"
					required
					rows={10}
					className="w-full bg-input rounded-xl p-6 !text-lg border-0 focus:ring-1 focus:ring-ring placeholder:text-muted-foreground focus:placeholder:text-muted-foreground resize-none"
				/>
			</div>
			<SubmitButton />
		</form>
	);
}
