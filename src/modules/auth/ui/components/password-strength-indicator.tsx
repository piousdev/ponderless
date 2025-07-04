import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { cn } from "@/lib/utils";
import {
	PASSWORD_STRENGTH_INDICATOR_LEVELS,
	PASSWORD_STRENGTH_INDICATOR_LEVELS_COLORS,
} from "@/modules/auth/constants";
import type { IPasswordStrengthProps } from "@/modules/auth/types";
import { ErrorFallback } from "@/modules/auth/ui/components/error-fallback";
import { getPasswordStrength } from "@/modules/auth/utils";

const STRENGTH_INDEX_OFFSET = 1;
const WEAK_STRENGTH_THRESHOLD = 2;

const PasswordStrengthImplementation = ({
	password,
}: IPasswordStrengthProps): React.JSX.Element => {
	const strength = getPasswordStrength(password);
	const strengthText =
		PASSWORD_STRENGTH_INDICATOR_LEVELS[strength - STRENGTH_INDEX_OFFSET] || "";
	const strengthLevel = PASSWORD_STRENGTH_INDICATOR_LEVELS[
		strength - STRENGTH_INDEX_OFFSET
	] as keyof typeof PASSWORD_STRENGTH_INDICATOR_LEVELS_COLORS;
	const strengthColor = strengthLevel
		? PASSWORD_STRENGTH_INDICATOR_LEVELS_COLORS[strengthLevel]
		: "bg-muted";

	return (
		<div className="space-y-1" data-testid="password-strength-container">
			<div className="flex">
				{PASSWORD_STRENGTH_INDICATOR_LEVELS.map((level, i) => (
					<div
						key={`strength-${level}`}
						className={cn(
							"h-1 flex-1 rounded-full",
							i < strength ? strengthColor : "bg-muted",
						)}
						role="progressbar"
						aria-valuenow={i < strength ? STRENGTH_INDEX_OFFSET : 0}
						aria-valuemin={0}
						aria-valuemax={STRENGTH_INDEX_OFFSET}
						aria-label={`Password strength indicator ${i + STRENGTH_INDEX_OFFSET}`}
						data-testid={`password-strength-bar-${i}`}
					/>
				))}
			</div>
			{password && (
				<p
					className={cn(
						"text-xs",
						strength <= WEAK_STRENGTH_THRESHOLD
							? PASSWORD_STRENGTH_INDICATOR_LEVELS_COLORS.fair
							: PASSWORD_STRENGTH_INDICATOR_LEVELS_COLORS.strong,
					)}
					aria-live="polite"
					aria-atomic="true"
					data-testid="password-strength-text"
				>
					Password strength: {strengthText}
				</p>
			)}
		</div>
	);
};

export const PasswordStrength = (
	props: IPasswordStrengthProps,
): React.JSX.Element => (
	<ErrorBoundary
		FallbackComponent={(props: FallbackProps) => (
			<ErrorFallback
				{...props}
				componentName="PasswordStrengthIndicator"
				message="Unable to display password strength indicator."
			/>
		)}
	>
		<PasswordStrengthImplementation {...props} />
	</ErrorBoundary>
);
