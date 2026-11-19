import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const keysDir = path.join(root, "certificates", "keys");
const issuedDir = path.join(root, "certificates", "issued");
const publicDir = path.join(root, "apps", "web", "public", "certificates", "issued");
const publicKeyOut = path.join(root, "apps", "web", "public", "certificates", "public.pem");

const trackId = process.argv[2];
const learner = process.argv[3];
if (!trackId || !learner) {
	console.error("Usage: node certificates/issue.mjs <track-id> <learner-name>");
	process.exit(1);
}

const catalog = JSON.parse(
	fs.readFileSync(path.join(root, "certificates", "catalog.json"), "utf8"),
);
const track = catalog.tracks.find((item) => item.id === trackId);
if (!track) {
	console.error(`Unknown track ${trackId}`);
	process.exit(1);
}

fs.mkdirSync(keysDir, { recursive: true });
const privatePath = path.join(keysDir, "private.pem");
const publicPath = path.join(keysDir, "public.pem");
if (!fs.existsSync(privatePath)) {
	const pair = crypto.generateKeyPairSync("ed25519");
	fs.writeFileSync(privatePath, pair.privateKey.export({ type: "pkcs8", format: "pem" }));
	fs.writeFileSync(publicPath, pair.publicKey.export({ type: "spki", format: "pem" }));
	console.log("Generated certificates/keys. Keep private.pem off git.");
}

const id = `${trackId}-${Date.now().toString(36)}`;
const record = {
	id,
	learner,
	trackId: track.id,
	title: track.title,
	requirements: track.requirements,
	issuedAt: new Date().toISOString(),
	issuer: catalog.issuer.name,
};
const payload = Buffer.from(JSON.stringify(record));
const privateKey = crypto.createPrivateKey(fs.readFileSync(privatePath));
const signature = crypto.sign(null, payload, privateKey).toString("base64");
const issued = { record, signature };

fs.mkdirSync(issuedDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(path.dirname(publicKeyOut), { recursive: true });
fs.copyFileSync(publicPath, publicKeyOut);
const file = `${id}.json`;
fs.writeFileSync(path.join(issuedDir, file), JSON.stringify(issued, null, 2));
fs.writeFileSync(path.join(publicDir, file), JSON.stringify(issued, null, 2));
console.log(`Issued ${id}`);
console.log(`Verify at /certificates/verify/?id=${id}`);
