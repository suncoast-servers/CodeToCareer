import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const quizDir = path.join(__dirname, "quizzes");
const dataDir = path.join(__dirname, "data");
const port = Number(process.env.PORT || 8787);
const progressPath = path.join(dataDir, "progress.json");
const coachLog = path.join(dataDir, "coach-log.jsonl");
const hits = new Map();

fs.mkdirSync(dataDir, { recursive: true });

function readJson(filePath, fallback) {
	try {
		return JSON.parse(fs.readFileSync(filePath, "utf8"));
	} catch {
		return fallback;
	}
}

function send(res, status, body) {
	const payload = JSON.stringify(body);
	res.writeHead(status, {
		"content-type": "application/json",
		"access-control-allow-origin": process.env.CORS_ORIGIN || "*",
		"access-control-allow-headers": "content-type, authorization",
	});
	res.end(payload);
}

function readBody(req) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		req.on("data", (chunk) => chunks.push(chunk));
		req.on("end", () => {
			try {
				const raw = Buffer.concat(chunks).toString("utf8");
				resolve(raw ? JSON.parse(raw) : {});
			} catch (error) {
				reject(error);
			}
		});
	});
}

function limited(ip) {
	const now = Date.now();
	const recent = (hits.get(ip) || []).filter((stamp) => now - stamp < 60 * 60 * 1000);
	if (recent.length >= 8) {
		hits.set(ip, recent);
		return true;
	}
	recent.push(now);
	hits.set(ip, recent);
	return false;
}

async function clerkUserId(authorization) {
	if (!authorization?.startsWith("Bearer ") || !process.env.CLERK_SECRET_KEY) return "";
	try {
		const { verifyToken } = await import("@clerk/backend");
		const payload = await verifyToken(authorization.slice(7), {
			secretKey: process.env.CLERK_SECRET_KEY,
		});
		return payload.sub || "";
	} catch {
		return "";
	}
}

async function coachReply(lesson, message, code) {
	const hint =
		"Change one thing, run it, and read the error from the top. Name the line that failed before you ask for more.";
	if (!process.env.AI_API_KEY) return hint;
	const base = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
	const response = await fetch(`${base}/chat/completions`, {
		method: "POST",
		headers: {
			authorization: `Bearer ${process.env.AI_API_KEY}`,
			"content-type": "application/json",
		},
		body: JSON.stringify({
			model: process.env.AI_MODEL || "gpt-4o-mini",
			temperature: 0.2,
			messages: [
				{
					role: "system",
					content:
						"You are a coding coach for Code to Career. Explain errors and give the next hint only. Do not write the full solution, a complete function, or the final SQL the learner was asked to produce. If they ask for the answer, refuse and give a smaller hint. Stay on the lesson they name.",
				},
				{
					role: "user",
					content: `Lesson: ${lesson}\n\nWhat they tried:\n${message.slice(0, 2000)}\n\nCode or error:\n${code.slice(0, 4000)}`,
				},
			],
		}),
	});
	if (!response.ok) return hint;
	const payload = await response.json();
	return payload.choices?.[0]?.message?.content?.trim() || hint;
}

const server = http.createServer(async (req, res) => {
	if (req.method === "OPTIONS") {
		res.writeHead(204, {
			"access-control-allow-origin": process.env.CORS_ORIGIN || "*",
			"access-control-allow-headers": "content-type, authorization",
			"access-control-allow-methods": "POST, GET, OPTIONS",
		});
		res.end();
		return;
	}

	const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

	if (req.method === "POST" && url.pathname === "/api/quiz/check") {
		const body = await readBody(req);
		const quiz = readJson(path.join(quizDir, `${body.id}.json`), null);
		if (!quiz) {
			send(res, 404, { error: "unknown quiz" });
			return;
		}
		let score = 0;
		const correct = {};
		for (const question of quiz.questions) {
			const ok = body.answers?.[question.id] === question.answer;
			correct[question.id] = ok;
			if (ok) score += 1;
		}
		send(res, 200, { score, total: quiz.questions.length, correct });
		return;
	}

	if (req.method === "POST" && url.pathname === "/api/coach") {
		const ip = req.socket.remoteAddress || "local";
		if (limited(ip)) {
			send(res, 429, { reply: "Hourly hint limit reached. Take a short break and re-read the lesson." });
			return;
		}
		const body = await readBody(req);
		const reply = await coachReply(
			String(body.lesson || ""),
			String(body.message || ""),
			String(body.code || ""),
		);
		fs.appendFileSync(
			coachLog,
			`${JSON.stringify({ at: new Date().toISOString(), lesson: body.lesson, chars: String(body.code || "").length })}\n`,
		);
		send(res, 200, { reply });
		return;
	}

	if (req.method === "POST" && url.pathname === "/api/progress") {
		const body = await readBody(req);
		const userId = (await clerkUserId(req.headers.authorization)) || String(body.learnerId || "");
		if (!userId || !body.lesson) {
			send(res, 400, { error: "learner and lesson required" });
			return;
		}
		const db = readJson(progressPath, { users: {} });
		db.users[userId] = db.users[userId] || { lessons: {} };
		db.users[userId].lessons[body.lesson] = {
			status: body.status || "done",
			updated: new Date().toISOString(),
		};
		fs.writeFileSync(progressPath, JSON.stringify(db, null, 2));
		send(res, 200, { ok: true, signedIn: Boolean(await clerkUserId(req.headers.authorization)) });
		return;
	}

	if (req.method === "GET" && url.pathname === "/api/health") {
		send(res, 200, { ok: true });
		return;
	}

	send(res, 404, { error: "not found" });
});

server.listen(port, () => {
	console.log(`Code to Career API on ${port}`);
});
