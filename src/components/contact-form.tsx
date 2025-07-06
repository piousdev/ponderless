import { Toaster } from "@/components/shadcn/ui/sonner";
import ContactForm from "@/modules/mentors/components/contact-form";
import MentorHeader from "@/modules/mentors/components/mentor-header";

interface IContactForm {
	readonly title: string;
	readonly description?: string;
}

export default function ContactPage({ title, description }: IContactForm) {
	return (
		<div className="bg-background text-foreground flex items-center justify-center p-6">
			<div className="flex flex-col gap-12 w-full max-w-3xl">
				<MentorHeader title={title} description={description} />
				<ContactForm />
			</div>
			<Toaster />
		</div>
	);
}
