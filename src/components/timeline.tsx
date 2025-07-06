"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const Timeline = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <div className={cn("relative", className)}>{children}</div>;
};

const TimelineItem = ({
	children,
	icon,
	className,
}: {
	children: ReactNode;
	icon: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"relative flex items-start space-x-4 pb-8",
				"before:absolute before:left-5 before:top-5 before:-ml-px before:h-full before:w-px before:bg-slate-200 last:before:hidden dark:before:bg-slate-800",
				className,
			)}
		>
			<div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background ring-4 ring-background dark:bg-slate-900 dark:ring-slate-900">
				{icon}
			</div>
			<div className="flex-1 space-y-1 pt-1">{children}</div>
		</div>
	);
};

const TimelineTitle = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return <p className={cn("font-medium text-sm", className)}>{children}</p>;
};

const TimelineDescription = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<p className={cn("text-xs text-muted-foreground", className)}>
			{children}
		</p>
	);
};

export { Timeline, TimelineItem, TimelineTitle, TimelineDescription };