import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { requireDatabaseUrl } from "@/lib/utils/url.validator";

const databaseUrl = requireDatabaseUrl({
	url: process.env.DATABASE_URL,
	errorMessage: "DATABASE_URL is not set",
});

const sql = neon(databaseUrl);
const db = drizzle({ client: sql });

export default db;
