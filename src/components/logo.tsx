import Link from "next/link";
import { LogoIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ILogo {
	className?: string;
	title?: string;
}

export default function Logo({ className, title }: ILogo) {
	return (
		<Link
			href="/"
			className={cn("inline-flex", className)}
			aria-label="Ponderless"
		>
			<LogoIcon />
			<span className="hidden sm:inline-flex ml-2 font-bold text-primary">
				{title}
			</span>
		</Link>
	);
}
