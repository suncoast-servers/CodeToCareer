import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const labId = process.argv[2];
const useSolution = process.argv.includes("--solution");

if (!labId) {
	console.error("Usage: node labs/check.mjs <lab-id> [--solution]");
	process.exit(1);
}

const folder = path.join(
	root,
	"labs",
	useSolution ? "solutions" : "exercises",
	labId,
);

if (!fs.existsSync(folder)) {
	console.error(`Missing ${folder}`);
	process.exit(1);
}

function fail(message) {
	console.error(message);
	process.exit(1);
}

if (labId.startsWith("path-02-python")) {
	const test = path.join(root, "labs", "tests", `${labId}.py`);
	if (!fs.existsSync(test)) fail(`Missing test ${test}`);
	const result = spawnSync("python", [test, folder], { encoding: "utf8" });
	if (result.status !== 0) {
		fail(result.stdout + result.stderr);
	}
	console.log(result.stdout.trim() || "Python lab passed.");
	process.exit(0);
}

if (labId.startsWith("path-03-sql")) {
	const rules = JSON.parse(
		fs.readFileSync(path.join(root, "labs", "tests", `${labId}.json`), "utf8"),
	);
	const source = fs.readFileSync(path.join(folder, rules.file), "utf8").toLowerCase();
	for (const needle of rules.mustInclude) {
		if (!source.includes(needle.toLowerCase())) {
			fail(`Missing required SQL: ${needle}`);
		}
	}
	console.log(`SQL lab ${labId} passed static checks.`);
	process.exit(0);
}

fail(`No checker for ${labId}`);
