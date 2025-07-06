import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

export default function HelpContact({ className }: { className?: string }) {
	return (
		<div className={cn("flex flex-col items-center gap-4", className)}>
			<p className="font-medium text-2xl text-foreground mb-2">
				Can't find the answer you're looking for?
			</p>
			<Button variant="secondary" className="mt-2 w-full" asChild>
				<Link href="/mentor/feedback">Get in touch</Link>
			</Button>
		</div>
	);
}
