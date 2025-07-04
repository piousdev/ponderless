export const PASSWORD_STRENGTH_INDICATOR_LEVELS = [
	"weak",
	"fair",
	"good",
	"strong",
] as const;

export const PASSWORD_STRENGTH_INDICATOR_LEVELS_COLORS = {
	weak: "text-red-500",
	fair: "text-orange-500",
	good: "text-yellow-500",
	strong: "text-green-500",
} as const;
