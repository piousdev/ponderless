"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="flex gap-1 mx-4 mb-2">
				<Button
					variant="secondaryOutline"
					size="sm"
					className="flex-1 h-8"
					disabled
				>
					<Sun className="size-3" />
				</Button>
				<Button
					variant="secondaryOutline"
					size="sm"
					className="flex-1 h-8"
					disabled
				>
					<Moon className="size-3" />
				</Button>
			</div>
		);
	}

	const isLight = theme === "light";
	const isDark = theme === "dark";

	return (
		<div className="flex gap-1 mx-4 mb-2">
			<Button
				variant={isLight ? "secondary" : "secondaryOutline"}
				size="sm"
				className="flex-1 h-8"
				onClick={() => setTheme("light")}
			>
				<Sun className="size-3" />
				<span className="text-xs">Light</span>
			</Button>
			<Button
				variant={isDark ? "secondary" : "secondaryOutline"}
				size="sm"
				className="flex-1 h-8"
				onClick={() => setTheme("dark")}
			>
				<Moon className="size-3" />
				<span className="text-xs">Dark</span>
			</Button>
		</div>
	);
}
