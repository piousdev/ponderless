"use client";

import { Laptop, type LucideIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

// ==================== TYPES ====================

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeToggleButtonProps {
	className?: string;
	size?: "default" | "sm" | "lg" | "icon";
	variant?:
		| "default"
		| "primary"
		| "primaryOutline"
		| "secondary"
		| "secondaryOutline"
		| "destructive"
		| "destructiveOutline"
		| "super"
		| "superOutline"
		| "ghost"
		| "sidebar"
		| "sidebarOutline";
	showLabel?: boolean;
	defaultTheme?: Theme;
	onThemeChange?: (theme: ResolvedTheme) => void;
}

interface ThemeIconProps {
	icon: LucideIcon;
	isVisible: boolean;
	className?: string;
}

interface LoadingButtonProps {
	size?: ThemeToggleButtonProps["size"];
	variant?: ThemeToggleButtonProps["variant"];
	className?: string;
}

// ==================== CONSTANTS ====================

export const ICON_SIZES = {
	xs: "size-3",
	sm: "size-4",
	md: "size-5",
	lg: "size-6",
	xl: "size-8",
} as const;

const BUTTON_DIMENSIONS = {
	width: "w-6",
	height: "h-6",
} as const;

const STYLES = {
	button: {
		base: "rounded-md flex items-center justify-center text-foreground transition-all duration-200",
		hover: "hover:text-foreground hover:scale-105 cursor-pointer",
		focus:
			"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		active: "active:scale-95",
	},
	icon: {
		base: "text-current",
	},
} as const;

// ==================== THEME CONFIG ====================

const THEME_CONFIG = {
	light: {
		next: "dark" as ResolvedTheme,
		label: "Switch to dark mode",
		icon: Sun,
	},
	dark: {
		next: "light" as ResolvedTheme,
		label: "Switch to light mode",
		icon: Moon,
	},
} as const;

// ==================== UTILITIES ====================

function getNextTheme(currentTheme: ResolvedTheme): ResolvedTheme {
	return THEME_CONFIG[currentTheme].next;
}

function getThemeLabel(isDarkMode: boolean): string {
	return isDarkMode ? THEME_CONFIG.dark.label : THEME_CONFIG.light.label;
}

// ==================== HOOKS ====================
function useMounted() {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
}

function useThemeToggle(onThemeChange?: (theme: ResolvedTheme) => void) {
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = React.useCallback(() => {
		const currentTheme = resolvedTheme as ResolvedTheme;
		const nextTheme = getNextTheme(currentTheme);

		setTheme(nextTheme);
		onThemeChange?.(nextTheme);
	}, [resolvedTheme, setTheme, onThemeChange]);

	return {
		toggleTheme,
		isDarkMode: resolvedTheme === "dark",
		resolvedTheme,
	};
}

// ==================== COMPONENTS ====================

const ThemeIcon: React.FC<ThemeIconProps> = ({
	icon: Icon,
	isVisible,
	className,
}) => {
	if (!isVisible) return null;

	return <Icon className={cn(ICON_SIZES.sm, STYLES.icon.base, className)} />;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
	size = "icon",
	variant = "ghost",
	className,
}) => {
	return (
		<Button
			variant={variant}
			size={size}
			className={cn(
				BUTTON_DIMENSIONS.width,
				BUTTON_DIMENSIONS.height,
				className,
			)}
			disabled
			aria-label="Loading theme toggle"
		>
			<Laptop className={cn(ICON_SIZES.sm, STYLES.icon.base)} />
		</Button>
	);
};

// ==================== MAIN COMPONENT ====================

export function ThemeToggleButton({
	className,
	size = "icon",
	variant = "ghost",
	showLabel = false,
	defaultTheme,
	onThemeChange,
}: ThemeToggleButtonProps = {}) {
	const mounted = useMounted();
	const { setTheme } = useTheme();
	const { toggleTheme, isDarkMode } = useThemeToggle(onThemeChange);

	React.useEffect(() => {
		if (defaultTheme && mounted) {
			setTheme(defaultTheme);
		}
	}, [defaultTheme, mounted, setTheme]);

	if (!mounted) {
		return (
			<LoadingButton size={size} variant={variant} className={className} />
		);
	}

	const themeLabel = getThemeLabel(isDarkMode);

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={themeLabel}
			aria-pressed={isDarkMode}
			className={cn(
				BUTTON_DIMENSIONS.width,
				BUTTON_DIMENSIONS.height,
				STYLES.button.base,
				STYLES.button.hover,
				STYLES.button.focus,
				STYLES.button.active,
				className,
			)}
		>
			<span className="sr-only">Toggle theme</span>

			<ThemeIcon icon={Sun} isVisible={!isDarkMode} />

			<ThemeIcon icon={Moon} isVisible={isDarkMode} />

			{showLabel && (
				<span className="ml-2 hidden sm:inline-block">
					{isDarkMode ? "Dark" : "Light"}
				</span>
			)}
		</button>
	);
}

export type { Theme, ResolvedTheme, ThemeToggleButtonProps };
