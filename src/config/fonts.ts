import {
	Funnel_Display,
	Lexend,
	Merriweather,
	Newsreader,
} from "next/font/google";

export const funnelDisplay = Funnel_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-funnel-display-regular",
	preload: true,
	fallback: ["Helvetica", "sans-serif"],
});

export const lexend = Lexend({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lexend",
	preload: true,
	fallback: ["system-ui", "arial"],
});

export const newsreader = Newsreader({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-newsreader",
	preload: true,
	fallback: ["Helvetica", "sans-serif"],
});

export const merriweather = Merriweather({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-merriweather",
	weight: ["300", "400", "700", "900"],
	style: ["normal", "italic"],
	preload: true,
	fallback: ["Georgia", "serif"],
});
