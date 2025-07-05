import { createAuthClient } from "better-auth/react";

const baseUrl =
	process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000";

export const authClient = createAuthClient({
	baseURL: baseUrl,
	fetchOptions: {
		onError: (ctx) => {
			if (ctx.error.status === 401) {
				// Handle unauthorized
				console.error("Unauthorized:", ctx.error.message);
			} else {
				console.error("Auth error:", ctx.error.message || ctx.error);
			}
		},
	},
});
