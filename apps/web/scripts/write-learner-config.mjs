import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const target = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
	"public",
	"learner-config.js",
);

const config = {
	clerkPublishableKey: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY || "",
	apiBase: process.env.PUBLIC_API_BASE || "",
	plausibleDomain: process.env.PUBLIC_PLAUSIBLE_DOMAIN || "",
	adsEnabled: process.env.PUBLIC_ADS_ENABLED === "true",
};

fs.writeFileSync(
	target,
	`window.__CTC__ = ${JSON.stringify(config, null, 2)};\n`,
);
console.log(`Wrote ${target}`);
