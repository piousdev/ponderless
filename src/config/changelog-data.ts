import {
	Code,
	Database,
	FileText,
	Lock,
	type LucideIcon,
	Palette,
	Rocket,
	Scale,
	Settings,
	Star,
	Zap,
} from "lucide-react";

export type Category = {
	name:
		| "News"
		| "Platform"
		| "Features"
		| "UI/UX"
		| "Documentation"
		| "Performance"
		| "Security"
		| "Database"
		| "Developer Experience"
		| "Bug Fixes"
		| "Legal";
	icon: LucideIcon;
};

export const categories: readonly Category[] = [
	{ name: "News", icon: FileText },
	{ name: "Platform", icon: Rocket },
	{ name: "Features", icon: Star },
	{ name: "UI/UX", icon: Palette },
	{ name: "Performance", icon: Zap },
	{ name: "Security", icon: Lock },
	{ name: "Database", icon: Database },
	{ name: "Developer Experience", icon: Code },
	{ name: "Documentation", icon: FileText },
	{ name: "Bug Fixes", icon: Settings },
	{ name: "Legal", icon: Scale },
] as const;

export type ChangelogEntry = {
	category: Category["name"];
	date: string;
	title: string;
	description: string;
};

export const changelogData: readonly ChangelogEntry[] = [
	{
		category: "Bug Fixes",
		date: "Jul 6, 2025",
		title: "Improved Help Contact Component",
		description:
			"Fixed messaging and styling issues in the help contact component for better user experience and visual consistency.",
	},
	{
		category: "Features",
		date: "Jul 6, 2025",
		title: "Enhanced Help System with FAQ",
		description:
			"Launched comprehensive help system with structured FAQ sections, detailed help components, and improved user guidance throughout the platform.",
	},
	{
		category: "UI/UX",
		date: "Jul 6, 2025",
		title: "Feedback Page Redesign",
		description:
			"Redesigned the feedback page with improved user guidance, better form validation, and enhanced messaging for clearer communication.",
	},
	{
		category: "Developer Experience",
		date: "Jul 6, 2025",
		title: "Updated Dependencies",
		description:
			"Updated package.json and bun.lock with latest dependencies for improved security, performance, and compatibility.",
	},
	{
		category: "Features",
		date: "Jul 6, 2025",
		title: "Help Page & History Interface",
		description:
			"Added comprehensive help page component with integrated history interface for better user support and activity tracking.",
	},
	{
		category: "Features",
		date: "Jul 6, 2025",
		title: "Contact Form & Email System",
		description:
			"Implemented complete contact form functionality with email handling, form validation, and automated email notifications using Resend.",
	},
	{
		category: "Documentation",
		date: "Jul 6, 2025",
		title: "Google OAuth Setup Guide",
		description:
			"Created comprehensive documentation for Google OAuth setup with step-by-step instructions and troubleshooting guides.",
	},
	{
		category: "Features",
		date: "Jul 5, 2025",
		title: "History Management System",
		description:
			"Implemented complete history management with search, filtering, selection modes, and activity tracking for user sessions.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "Community Mentors Enhancement",
		description:
			"Simplified community mentors component with enhanced mentor header, improved search functionality, and better user experience.",
	},
	{
		category: "Features",
		date: "Jul 5, 2025",
		title: "Community Page Error Handling",
		description:
			"Added robust error handling and loading components for the community page to improve reliability and user feedback.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "Enhanced Sidebar Experience",
		description:
			"Improved sidebar logo with tooltips, better TRPC context handling, and streamlined recent activity component integration.",
	},
	{
		category: "Features",
		date: "Jul 5, 2025",
		title: "Meetings Component Launch",
		description:
			"Launched complete meetings system with scheduling, video calls, chat integration, and meeting history tracking.",
	},
	{
		category: "Features",
		date: "Jul 5, 2025",
		title: "Community Mentors & Search",
		description:
			"Implemented community mentors discovery with advanced search functionality, mentor profiles, and expertise filtering.",
	},
	{
		category: "Performance",
		date: "Jul 5, 2025",
		title: "TRPC Integration & State Management",
		description:
			"Integrated TRPC for type-safe API calls with enhanced sidebar state management and cookie-based persistence.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "UI Component Consistency",
		description:
			"Standardized button variants across OAuth providers, pagination, carousel, and alert dialogs for consistent user experience.",
	},
	{
		category: "Features",
		date: "Jul 5, 2025",
		title: "Meetings Page with Loading States",
		description:
			"Created comprehensive meetings page with loading skeletons, error handling, and responsive design for all device sizes.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "Theme Toggle Enhancements",
		description:
			"Expanded theme toggle button variants with improved mobile header integration for better accessibility and user experience.",
	},
	{
		category: "Features",
		date: "Jul 5, 2025",
		title: "Community Page Module",
		description:
			"Launched community page for mentor module with mentor discovery, community interaction, and collaborative features.",
	},
	{
		category: "Performance",
		date: "Jul 5, 2025",
		title: "Sidebar State Prefetching",
		description:
			"Implemented sidebar state prefetching in mentor layout for faster navigation and improved user experience.",
	},
	{
		category: "Platform",
		date: "Jul 5, 2025",
		title: "Enhanced Mentor Sidebar",
		description:
			"Completely redesigned mentor sidebar with improved functionality, better user experience, and streamlined navigation.",
	},
	{
		category: "Performance",
		date: "Jul 5, 2025",
		title: "Home Page Optimization",
		description:
			"Optimized home page structure with cleaner imports, better performance, and improved loading times.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "Enhanced Error Pages",
		description:
			"Improved error display and not-found pages with better user guidance, error reporting, and navigation options.",
	},
	{
		category: "Bug Fixes",
		date: "Jul 5, 2025",
		title: "Layout File Updates",
		description:
			"Fixed remaining layout files for consistent styling, proper component hierarchy, and improved responsive design.",
	},
	{
		category: "Documentation",
		date: "Jul 5, 2025",
		title: "Google OAuth Documentation",
		description:
			"Added comprehensive Google OAuth setup documentation with environment variables, configuration steps, and troubleshooting.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "Error Handling & Page Layouts",
		description:
			"Improved error handling across all pages with better layout consistency and user-friendly error messages.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "Enhanced UI Components",
		description:
			"Upgraded UI components with improved styling, better accessibility, and enhanced user interactions across the platform.",
	},
	{
		category: "Features",
		date: "Jul 5, 2025",
		title: "Mentor Module & Routes",
		description:
			"Launched the core mentor module with routing, mentor selection, session management, and personalized AI interactions.",
	},
	{
		category: "Security",
		date: "Jul 5, 2025",
		title: "Authentication System Enhancement",
		description:
			"Implemented Better Auth with improved session management, password security, and user account protection features.",
	},
	{
		category: "Database",
		date: "Jul 5, 2025",
		title: "Database Schema & Migrations",
		description:
			"Updated database schema with new tables, relationships, and migrations for mentor system, user data, and session tracking.",
	},
	{
		category: "Developer Experience",
		date: "Jul 5, 2025",
		title: "Project Configuration Update",
		description:
			"Updated all project configuration files including TypeScript, ESLint, Tailwind, and build configurations for better development experience.",
	},
	{
		category: "Developer Experience",
		date: "Jul 5, 2025",
		title: "Drizzle Configuration Rename",
		description:
			"Renamed drizzle-config.ts to drizzle.config.ts following better naming conventions and improved database tooling integration.",
	},
	{
		category: "UI/UX",
		date: "Jul 5, 2025",
		title: "Navigation & Button Styling",
		description:
			"Implemented comprehensive navigation system with consistent button variants, improved styling, and better user interface patterns.",
	},
	{
		category: "Platform",
		date: "Jul 4, 2025",
		title: "Initial Platform Setup",
		description:
			"Established the foundation of Ponderless with core architecture, basic routing, and essential project structure.",
	},
	{
		category: "News",
		date: "Jun 25, 2025",
		title: "Started Ponderless Project Development",
		description:
			"Started development of Ponderless - A mental gym for your brain's judgment muscles. Project is in early stages of development.",
	},
] as const;
