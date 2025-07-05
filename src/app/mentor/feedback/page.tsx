import { Toaster } from "@/components/shadcn/ui/sonner";
import { ContactForm } from "@/modules/mentor/components/feedback-contact-form";
import MentorHeader from "@/modules/mentor/components/mentor-header";

export default function FeedbackPage() {
  return (
    <div className="bg-background text-foreground flex items-center justify-center p-6">
      <div className="flex flex-col gap-12 w-full max-w-3xl">
        <MentorHeader
          title="Get in touch"
          description="Fill out the form below to provide us with your feedback."
        />
        <ContactForm />
      </div>
      <Toaster />
    </div>
  );
}
