import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <FileQuestion className="w-16 h-16 text-muted-foreground mb-4" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground mt-2 mb-6">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
