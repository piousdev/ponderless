"use client";

import { Button } from "@/components/shadcn/ui/button";
import type { Category } from "@/config/changelog-data";
import { cn } from "@/lib/utils";

type IChangelogNav = {
	readonly categories: readonly Category[];
	readonly activeCategory: string;
	readonly setActiveCategoryAction: (category: string) => void;
};

export default function ChangelogNav({
	categories,
	activeCategory,
	setActiveCategoryAction,
}: IChangelogNav) {
	return (
		<aside className="w-full md:w-64 flex-shrink-0">
			<h2 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-4">
				Select Category
			</h2>
			<nav className="flex flex-col space-y-2">
				{categories.map((category) => (
					<Button
						key={category.name}
						onClick={() => setActiveCategoryAction(category.name)}
						className={cn(
							"flex items-center space-x-3 px-4 py-2 rounded-lg text-foreground hover:bg-background hover:text-foreground transition-colors w-full",
							activeCategory === category.name
								? "bg-background shadow-sm font-semibold text-primary"
								: "",
						)}
					>
						<category.icon className="size-5 text-primary" />
						<span>{category.name}</span>
					</Button>
				))}
			</nav>
		</aside>
	);
}
