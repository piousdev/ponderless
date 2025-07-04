import type { ComponentType } from "react";
import { memo, useCallback } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import {
	AppleIcon,
	FacebookIcon,
	GithubIcon,
	GoogleIcon,
	MicrosoftIcon,
} from "@/components/icons";
import { Button } from "@/components/shadcn/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { cn } from "@/lib/utils";
import { ErrorFallback } from "@/modules/auth/ui/components/error-fallback";

const PROVIDER_THRESHOLD = 4;
const ICON_SIZE = "h-4 w-4";
const BUTTON_HEIGHT = "h-10 sm:h-11";
const ICON_BUTTON_SIZE = "h-10 w-10";
const GAP_SIZE = "gap-2 sm:gap-3";

export interface IOAuthProvider {
	readonly id: string;
	readonly name: string;
	readonly icon: ComponentType<{ className?: string }>;
	readonly onClick: () => void;
}

interface IOAuthProvidersProps {
	readonly providers: IOAuthProvider[];
	readonly className?: string;
}

const defaultProviders: Array<Omit<IOAuthProvider, "onClick">> = [
	{
		id: "google",
		name: "Google",
		icon: GoogleIcon,
	},
	{
		id: "microsoft",
		name: "Microsoft",
		icon: MicrosoftIcon,
	},
	{
		id: "apple",
		name: "Apple",
		icon: AppleIcon,
	},
	{
		id: "github",
		name: "GitHub",
		icon: GithubIcon,
	},
	{
		id: "facebook",
		name: "Facebook",
		icon: FacebookIcon,
	},
];

const OAuthProvidersImplementation = memo(
	({ providers, className }: IOAuthProvidersProps): React.JSX.Element => {
		const showNamesAndIcons = providers.length <= PROVIDER_THRESHOLD;
		const showIconsOnly = providers.length > PROVIDER_THRESHOLD;

		const renderProvider = useCallback(
			(provider: IOAuthProvider): React.JSX.Element => {
				const Icon = provider.icon;

				const buttonContent = showNamesAndIcons ? (
					<>
						<Icon className={cn(ICON_SIZE, "mr-2 flex-shrink-0")} />
						<span className="truncate text-sm sm:text-base">
							{provider.name}
						</span>
					</>
				) : (
					<Icon className={ICON_SIZE} />
				);

				const button = (
					<Button
						key={provider.id}
						type="button"
						variant="outline"
						size={showIconsOnly ? "icon" : "default"}
						className={cn(
							"min-h-[44px] min-w-[44px] transition-all duration-200",
							showNamesAndIcons
								? cn("flex-1 min-w-0", BUTTON_HEIGHT)
								: cn(ICON_BUTTON_SIZE, "flex-shrink-0"),
						)}
						data-testid={`oauth-provider-${provider.id}`}
						aria-label={`Continue with ${provider.name}`}
						onClick={provider.onClick}
					>
						{buttonContent}
					</Button>
				);

				if (showIconsOnly) {
					return (
						<Tooltip key={provider.id}>
							<TooltipTrigger asChild>{button}</TooltipTrigger>
							<TooltipContent>
								<p>Continue with {provider.name}</p>
							</TooltipContent>
						</Tooltip>
					);
				}

				return button;
			},
			[showNamesAndIcons, showIconsOnly],
		);

		return (
			<TooltipProvider>
				<div className={cn("w-full", className)}>
					<div
						className={cn(
							"flex flex-row justify-center",
							GAP_SIZE,
							showNamesAndIcons ? "xs:flex-row" : "flex-wrap",
						)}
					>
						{providers.map(renderProvider)}
					</div>
				</div>
			</TooltipProvider>
		);
	},
);

OAuthProvidersImplementation.displayName = "OAuthProvidersImplementation";

export const OAuthProviders = (
	props: IOAuthProvidersProps,
): React.JSX.Element => (
	<ErrorBoundary
		FallbackComponent={(props: FallbackProps) => (
			<ErrorFallback
				{...props}
				componentName="OAuthProviders"
				message="Unable to load OAuth providers."
			/>
		)}
	>
		<OAuthProvidersImplementation {...props} />
	</ErrorBoundary>
);

OAuthProviders.displayName = "OAuthProviders";

export const createOAuthProviders = (
	enabledProviders: string[],
	onProviderClick: (providerId: string) => void,
): IOAuthProvider[] => {
	return defaultProviders
		.filter((provider) => enabledProviders.includes(provider.id))
		.map((provider) => ({
			...provider,
			onClick: () => onProviderClick(provider.id),
		}));
};

export { defaultProviders };
