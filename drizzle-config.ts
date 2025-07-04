import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { requireDatabaseUrl } from "@/lib/utils/url.validator";

const databaseUrl = requireDatabaseUrl({
	url: process.env.DATABASE_URL,
	errorMessage: "DATABASE_URL is not set",
});

export default defineConfig({
	out: "./src/lib/db/migrations",
	schema: "./src/lib/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: databaseUrl,
	},
});
