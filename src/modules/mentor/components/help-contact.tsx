import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

export default function HelpContact({ className }: { className?: string }) {
	return (
		<div className={cn("flex flex-col items-center gap-4", className)}>
			<p className="font-medium text-2xl text-foreground">
				Can't find the answer you're looking for? Please contact us.
			</p>
			<Button variant="secondary" className="mt-2 w-full" asChild>
				<Link href="/mentor/feedback">Contact Support</Link>
			</Button>
		</div>
	);
}
