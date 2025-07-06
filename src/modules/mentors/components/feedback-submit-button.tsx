"use client";
import { Button } from "@/components/shadcn/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      disabled={pending}
      className="w-full"
    >
      {pending ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <>
          <span>Send Message</span>
          <ArrowRight className="w-6 h-6" />
        </>
      )}
    </Button>
  );
}
