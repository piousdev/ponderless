import { socialLinks } from "@/config/docs";

export const siteConfig = {
	name: "Ponderless.app",
	shortName: "Ponderless",
	description:
		"Ponderless is a mental gym for your brain's judgement muscles. In just five minutes a day it diagnoses your decision-making and critical thinking blind spots with science-backed micro-tests, then fixes the weakest links in a 60-second game-rewarding you with XP, streaks and instant feedback.",
	url: "https://ponderless.app",
	ogImage: "https://ponderless.app/og-image.png",
	links: socialLinks,
	keywords: [
		"mental gym",
		"decision-making",
		"critical thinking",
		"blind spots",
		"science-backed",
		"XP",
		"streaks",
		"instant feedback",
		"micro-tests",
		"game-rewarding",
		"science-backed",
		// SEO Keywords - optimized for search visibility
		"mental training app",
		"cognitive enhancement",
		"decision-making skills",
		"critical thinking training",
		"mental fitness platform",
		"brain training exercises",
		"cognitive bias detection",
		"thinking skills improvement",
		"mental agility training",
		"decision science tools",
		"rational thinking coach",
		"cognitive psychology app",
		"mental performance optimization",
		"reasoning skills development",
		"cognitive assessment tools",
		"mental clarity exercises",
		"strategic thinking training",
		"cognitive behavioral tools",
		"mental resilience building",
		"executive function training",
		"mindfulness and cognition",
		"analytical thinking skills",
		"problem-solving methodology",
		"cognitive skill building",
		"mental strength training",
		"intelligence amplification",
		"cognitive coaching platform",
		"mental workout routines",
		"decision-making framework",
		"critical analysis tools",
		"cognitive development app",
		"mental performance metrics",
	],
	author: {
		name: "Pious Alpha",
		url: "https://piousalpha.com",
	},
	creator: "Pious Alpha",
	publisher: "Pious Alpha",
	format: "website",
	robots: "index, follow",
	alternates: {
		canonical: "https://ponderless.app",
	},
	metadataBase: new URL("https://ponderless.app"),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://ponderless.app",
		title: "Ponderless.app",
		description:
			"Ponderless is a mental gym for your brain's judgement muscles. In just five minutes a day it diagnoses your decision-making and critical thinking blind spots with science-backed micro-tests, then fixes the weakest links in a 60-second game-rewarding you with XP, streaks and instant feedback.",
		siteName: "Ponderless.app",
		images: [
			{
				url: "https://ponderless.app/og-image.png",
				width: 1200,
				height: 630,
				alt: "Ponderless.app",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Ponderless.app",
		description:
			"Ponderless is a mental gym for your brain's judgement muscles. In just five minutes a day it diagnoses your decision-making and critical thinking blind spots with science-backed micro-tests, then fixes the weakest links in a 60-second game-rewarding you with XP, streaks and instant feedback.",
		images: [
			{
				url: "https://ponderless.app/og-image.png",
				width: 1200,
				height: 630,
				alt: "Ponderless.app",
			},
		],
		creator: "@piousalpha",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
		other: {
			rel: "icon",
			url: "/favicon.ico",
		},
	},
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	manifest: "/site.webmanifest",
	other: {
		rel: "icon",
		url: "/favicon.ico",
		"google-site-verification":
			"google-site-verification=google-site-verification",
		"yandex-verification": "yandex-verification=yandex-verification",
		"bing-site-verification": "bing-site-verification=bing-site-verification",
		"pinterest-site-verification":
			"pinterest-site-verification=pinterest-site-verification",
		"alexa-site-verification":
			"alexa-site-verification=alexa-site-verification",
		"norton-safeweb-site-verification":
			"norton-safeweb-site-verification=norton-safeweb-site-verification",
	},
};

export type SiteConfig = typeof siteConfig;

export const metaThemeColors = {
	light: "#ffffff",
	dark: "#09090b",
};

export type MetaThemeColors = typeof metaThemeColors;
