#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";
import { manifestConfig } from "../src/config/manifest";

const manifestPath = path.join(process.cwd(), "public", "site.webmanifest");

// Add schema to the manifest
const manifestWithSchema = {
	$schema: "https://json.schemastore.org/web-manifest-combined.json",
	...manifestConfig,
};

// Generate the manifest JSON
const manifestJSON = JSON.stringify(manifestWithSchema, null, 2);

// Write to file
fs.writeFileSync(manifestPath, manifestJSON, "utf-8");

console.log("✅ Generated site.webmanifest successfully!");
console.log(`📁 Location: ${manifestPath}`);