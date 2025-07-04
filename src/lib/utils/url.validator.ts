const DATABASE_URL_REQUIRED_ERROR = "DATABASE_URL is not set";

interface IURLReturnValue {
	url: string | undefined;
	errorMessage: string;
}

/**
 * Requires that a database URL is provided, throwing if missing
 */
export const requireDatabaseUrl = ({
	url,
	errorMessage,
}: IURLReturnValue): string => {
	if (!url) {
		throw new Error(errorMessage ?? DATABASE_URL_REQUIRED_ERROR);
	}
	return url;
};

/**
 * Validates database URL exists and has valid format
 */
export const requireValidDatabaseUrl = ({
	url,
	errorMessage,
}: IURLReturnValue): string => {
	const validUrl = requireDatabaseUrl({ url, errorMessage: "" });

	try {
		const parsed = new URL(validUrl);
		if (!parsed.protocol || !parsed.hostname) {
			throw new Error(errorMessage ?? "Invalid database URL format");
		}
	} catch (error) {
		throw new Error(
			`Invalid database URL: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}

	return validUrl;
};

/**
 * Attempts to parse database URL, returns null if invalid
 */
export const tryParseDatabaseUrl = (url: string | undefined): string | null => {
	if (!url) {
		return null;
	}
	return url;
};

/**
 * Type predicate to check if a URL string exists
 */
export const isDatabaseUrlProvided = (
	url: string | undefined,
): url is string => {
	return typeof url === "string" && url.length > 0;
};

/**
 * Gets database URL from environment or throws
 */
export const requireDatabaseUrlFromEnv = (): string => {
	return requireDatabaseUrl({
		url: process.env.DATABASE_URL,
		errorMessage: "DATABASE_URL is not set",
	});
};

/**
 * Validates all required environment variables on startup
 */
export const validateRequiredEnvironment = (): void => {
	requireDatabaseUrlFromEnv(); // Will throw with descriptive error if missing
};

// TypeScript environment declaration for type safety
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL?: string;
		}
	}
}
