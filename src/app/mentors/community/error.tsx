"use client";

import { ErrorDisplay } from "@/components/error-display";

export default function CommunityError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorDisplay
      title="Something went wrong"
      message="We couldn't load the community page. Please try again later."
      onResetAction={reset}
    />
  );
}
