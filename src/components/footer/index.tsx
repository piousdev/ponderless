import Link from "next/link";
import Logo from "@/components/logo";

// Common styles
const styles = {
	link: "text-muted-foreground transition hover:text-muted-foreground/80 cursor-pointer",
	socialLink:
		"flex items-center justify-center text-blue-500 transition hover:text-blue-600",
	section: "space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2",
	sectionTitle: "text-sm font-medium",
	linkList: "space-y-2 text-sm",
	socialList: "flex gap-1",
	icon: "h-8 w-8 fill-current",
} as const;

// Icon components
const icons = {
	twitter: (
		<svg
			className={styles.icon}
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Twitter"
			role="img"
		>
			<path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
		</svg>
	),
	linkedin: (
		<svg
			className={styles.icon}
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="LinkedIn"
			role="img"
		>
			<path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14.4h2.3v7.2zm-1.2-8.2c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.5 1.3-1.3 1.3zm8.8 8.2h-2.3v-3.7c0-.9 0-2-.6-2-.7 0-.8.5-.8 1.9v3.8h-2.3V14.4h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v3.8h-.4z" />
		</svg>
	),
	github: (
		<svg
			className={styles.icon}
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Github"
			role="img"
		>
			<path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
		</svg>
	),
} as const;

// Footer data configuration
const footerData = {
	sections: [
		{
			title: "Platform",
			links: [
				{ label: "Find Mentors", href: "/mentors" },
				{ label: "Community", href: "/mentors/community" },
				{ label: "Progress Hub", href: "/progress-hub" },
				{ label: "Meetings", href: "/mentors/meetings" },
				{ label: "Changelog", href: "/changelog" },
			],
		},
		{
			title: "Support",
			links: [
				{ label: "Help Center", href: "/mentors/help" },
				{ label: "Feedback", href: "/feedback" },
				{ label: "Session History", href: "/mentors/history" },
				{ label: "Contact Us", href: "/contact" },
			],
		},
		{
			title: "Legal",
			links: [
				{ label: "Privacy Policy", href: "/privacy" },
				{ label: "Terms of Service", href: "/terms" },
				{ label: "Security", href: "/security" },
			],
		},
	],
	socialLinks: [
		{
			label: "Twitter",
			href: "https://twitter.com/ponderless",
			icon: icons.twitter,
		},
		{
			label: "LinkedIn",
			href: "https://linkedin.com/company/ponderless",
			icon: icons.linkedin,
		},
		{
			label: "Github",
			href: "https://github.com/ponderless",
			icon: icons.github,
		},
	],
	companyInfo: {
		name: "Ponderless",
		tagline: "Empowering growth through mentorship.",
		brandText: "Ponderless",
	},
} as const;

// Helper components
const ExternalLink = ({
	href,
	label,
	children,
}: {
	href: string;
	label: string;
	children: React.ReactNode;
}) => (
	<Link
		className={styles.socialLink}
		href={href}
		aria-label={label}
		target="_blank"
		rel="noopener noreferrer"
	>
		{children}
	</Link>
);

const FooterSection = ({
	title,
	links,
}: {
	title: string;
	links: readonly { label: string; href: string }[];
}) => (
	<div className={styles.section}>
		<h3 className={styles.sectionTitle}>{title}</h3>
		<ul className={styles.linkList}>
			{links.map((link) => (
				<li key={link.label}>
					<Link className={styles.link} href={link.href}>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	</div>
);

export default function Footer({ border = false }: { border?: boolean }) {
	const borderClass = border
		? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]"
		: "";

	return (
		<footer>
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div
					className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${borderClass}`}
				>
					{/* Company Info Block */}
					<div className="space-y-2 sm:col-span-12 lg:col-span-4">
						<div>
							<Logo />
						</div>
						<div className="text-sm text-gray-600">
							&copy; {footerData.companyInfo.name} -{" "}
							{footerData.companyInfo.tagline}
						</div>
					</div>

					{/* Navigation Sections */}
					{footerData.sections.map((section) => (
						<FooterSection
							key={section.title}
							title={section.title}
							links={section.links}
						/>
					))}

					{/* Social Links Block */}
					<div className={styles.section}>
						<h3 className={styles.sectionTitle}>Connect</h3>
						<ul className={styles.socialList}>
							{footerData.socialLinks.map((social) => (
								<li key={social.label}>
									<ExternalLink href={social.href} label={social.label}>
										{social.icon}
									</ExternalLink>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Big text */}
			<div
				className="relative -mt-16 h-60 w-full overflow-hidden"
				aria-hidden="true"
			>
				<div
					className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-center font-bold leading-none before:bg-linear-to-b before:from-border/30 before:to-border/10 before:to-80% before:bg-clip-text before:text-transparent before:content-['Ponderless'] after:absolute after:inset-0 after:bg-border/20 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Ponderless']"
					style={{ fontSize: "clamp(80px, 20vw, 280px)" }}
				></div>
				{/* Glow */}
				<div
					className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
					aria-hidden="true"
				>
					<div className="h-56 w-56 rounded-full border-[20px] border-sky-500 blur-[80px] will-change-[filter]"></div>
				</div>
			</div>
		</footer>
	);
}
