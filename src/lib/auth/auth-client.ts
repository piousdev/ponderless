import { createAuthClient } from "better-auth/react";

const baseUrl =
	process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000";

const signIn = async () => {
	return await authClient.signIn.social({
		provider: "facebook",
	});
};

export const authClient = createAuthClient({
	secret:
		process.env.BETTER_AUTH_SECRET ?? "default-secret-change-in-production",
	baseURL: baseUrl,
	fetchOptions: {
		onError: (error) => {
			console.error("Auth client error:", error);
		},
	},
	signIn,
});
