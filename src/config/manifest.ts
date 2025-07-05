import { siteConfig, metaThemeColors } from "@/config/site";

export interface WebManifestIcon {
	src: string;
	sizes: string;
	type: string;
	purpose?: "monochrome" | "maskable" | "any";
}

export interface WebManifestShortcut {
	name: string;
	short_name?: string;
	description?: string;
	url: string;
	icons?: WebManifestIcon[];
}

export interface WebManifestScreenshot {
	src: string;
	sizes: string;
	type: string;
	form_factor?: "narrow" | "wide";
	label?: string;
}

export interface WebManifestRelatedApplication {
	platform: string;
	url: string;
	id?: string;
}

export interface WebManifest {
	name: string;
	short_name: string;
	description: string;
	theme_color: string;
	background_color: string;
	display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
	orientation:
		| "any"
		| "natural"
		| "landscape"
		| "portrait"
		| "portrait-primary"
		| "portrait-secondary"
		| "landscape-primary"
		| "landscape-secondary";
	scope: string;
	start_url: string;
	id?: string;
	icons: WebManifestIcon[];
	categories?: string[];
	shortcuts?: WebManifestShortcut[];
	screenshots?: WebManifestScreenshot[];
	related_applications?: WebManifestRelatedApplication[];
	prefer_related_applications?: boolean;
	protocol_handlers?: Array<{
		protocol: string;
		url: string;
	}>;
}

export const manifestConfig: WebManifest = {
	name: siteConfig.name,
	short_name: siteConfig.shortName,
	description: siteConfig.description,
	theme_color: metaThemeColors.light,
	background_color: metaThemeColors.light,
	display: "standalone",
	orientation: "portrait",
	scope: "/",
	start_url: "/",
	id: "ponderless-app",
	icons: [
		{
			src: "/icons/icon-72x72.png",
			sizes: "72x72",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-96x96.png",
			sizes: "96x96",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-128x128.png",
			sizes: "128x128",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-144x144.png",
			sizes: "144x144",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-152x152.png",
			sizes: "152x152",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-192x192.png",
			sizes: "192x192",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-384x384.png",
			sizes: "384x384",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-512x512.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "any",
		},
		{
			src: "/icons/icon-192x192-maskable.png",
			sizes: "192x192",
			type: "image/png",
			purpose: "maskable",
		},
		{
			src: "/icons/icon-512x512-maskable.png",
			sizes: "512x512",
			type: "image/png",
			purpose: "maskable",
		},
	],
	categories: ["education", "productivity", "health"],
	shortcuts: [
		{
			name: "Daily Mental Workout",
			short_name: "Workout",
			description: "Start your daily mental training",
			url: "/workout",
			icons: [
				{
					src: "/icons/workout-96x96.png",
					sizes: "96x96",
					type: "image/png",
				},
			],
		},
		{
			name: "Progress Dashboard",
			short_name: "Progress",
			description: "View your mental fitness progress",
			url: "/dashboard",
			icons: [
				{
					src: "/icons/dashboard-96x96.png",
					sizes: "96x96",
					type: "image/png",
				},
			],
		},
	],
	screenshots: [
		{
			src: "/screenshots/desktop-home.png",
			sizes: "1920x1080",
			type: "image/png",
			form_factor: "wide",
			label: "Ponderless home screen on desktop",
		},
		{
			src: "/screenshots/mobile-workout.png",
			sizes: "1080x1920",
			type: "image/png",
			form_factor: "narrow",
			label: "Daily mental workout on mobile",
		},
		{
			src: "/screenshots/desktop-dashboard.png",
			sizes: "1920x1080",
			type: "image/png",
			form_factor: "wide",
			label: "Progress dashboard view",
		},
	],
	related_applications: [],
	prefer_related_applications: false,
};

// Helper function to generate manifest JSON
export function generateManifestJSON(): string {
	return JSON.stringify(manifestConfig, null, 2);
}

// Type guard for manifest validation
export function isValidManifest(manifest: unknown): manifest is WebManifest {
	return (
		typeof manifest === "object" &&
		manifest !== null &&
		"name" in manifest &&
		"short_name" in manifest &&
		"icons" in manifest &&
		Array.isArray((manifest as WebManifest).icons)
	);
}