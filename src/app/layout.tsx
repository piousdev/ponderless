import type { Metadata, Viewport } from "next";
import {
	funnelDisplay,
	lexend,
	merriweather,
	newsreader,
} from "@/config/fonts";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { WebVitalsReporter } from "@/components/performance/web-vitals-reporter";
import { metaThemeColors, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/client";

interface IRootLayoutProps {
	readonly children: React.ReactNode;
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: true,
	viewportFit: "cover",
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: metaThemeColors.light,
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: metaThemeColors.dark,
		},
	],
	colorScheme: "light dark",
};

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: [
		{
			name: siteConfig.author.name,
			url: siteConfig.author.url,
		},
	],
	creator: siteConfig.creator,
	publisher: siteConfig.publisher,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: siteConfig.url,
		languages: {
			"en-US": "/en-US",
		},
	},
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		locale: "en_US",
		type: "website",
		images: siteConfig.openGraph.images,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.twitter.title,
		description: siteConfig.twitter.description,
		images: siteConfig.twitter.images,
		creator: siteConfig.twitter.creator,
	},
	icons: {
		icon: siteConfig.icons.icon,
		shortcut: siteConfig.icons.shortcut,
		apple: siteConfig.icons.apple,
		other: {
			rel: "icon",
			url: siteConfig.icons.other.url,
		},
	},
	manifest: siteConfig.manifest,
	other: {
		"google-site-verification": siteConfig.other["google-site-verification"],
	},
	applicationName: siteConfig.name,
};

export default function RootLayout({ children }: IRootLayoutProps) {
	return (
		<html
			lang="en"
			className={cn(
				funnelDisplay.variable,
				lexend.variable,
				merriweather.variable,
				newsreader.variable,
			)}
			suppressHydrationWarning
		>
			<head>
				<script
					// biome-ignore lint: Required for theme color detection
					dangerouslySetInnerHTML={{
						__html: `
                        try {
                          if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                            document.querySelector('meta[name="theme-color"]').setAttribute('content', '${metaThemeColors.dark}')
                          }
                        } catch (_) {}
                      `,
					}}
				/>

				<script
					type="application/ld+json"
					// biome-ignore lint: Required for structured data
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: siteConfig.name,
							url: siteConfig.url,
							description: siteConfig.description,
							potentialAction: {
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
								},
								"query-input": "required name=search_term_string",
								"query-type": "required name=search_term_string",
							},
							inLanguage: "en-US",
							publisher: {
								"@type": "Organization",
								name: siteConfig.name,
								url: siteConfig.url,
								logo: {
									"@type": "ImageObject",
								},
							},
							mainEntityOfPage: {
								"@type": "WebPage",
								url: siteConfig.url,
							},
							image: {},
						}),
					}}
				/>
			</head>
			<body
				className={cn(
					"min-h-svh bg-background font-sans-serif antialiased",
					"selection:bg-primary selection:text-primary-foreground",
				)}
				suppressHydrationWarning
			>
				<ThemeProvider>
					<TRPCReactProvider>
						<div vaul-drawer-wrapper="">
							<div className="relative flex min-h-svh flex-col bg-background">
								{children}
							</div>
						</div>
						<Toaster
							richColors
							closeButton
							position="bottom-right"
							toastOptions={{
								duration: 5000,
								className: "sonner-toast",
								closeButton: true,
								closeButtonAriaLabel: "Close toast",
							}}
						/>
						<WebVitalsReporter />
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
