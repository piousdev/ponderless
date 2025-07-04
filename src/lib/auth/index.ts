import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
	secret:
		process.env.BETTER_AUTH_SECRET ?? "default-secret-change-in-production",
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000",
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false, // Set to true in production
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...schema,
		},
	}),
	socialProviders: {
		facebook: {
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		microsoft: {
			clientId: process.env.MICROSOFT_CLIENT_ID as string,
			clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
		},
	},
});
