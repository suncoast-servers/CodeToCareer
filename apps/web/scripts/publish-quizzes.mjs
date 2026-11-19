import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const source = path.join(root, "apps", "api", "quizzes");
const target = path.join(root, "apps", "web", "public", "quizzes");
fs.mkdirSync(target, { recursive: true });

for (const name of fs.readdirSync(source)) {
	if (!name.endsWith(".json")) continue;
	const quiz = JSON.parse(fs.readFileSync(path.join(source, name), "utf8"));
	const published = {
		id: quiz.id,
		title: quiz.title,
		questions: quiz.questions.map((question) => ({
			id: question.id,
			prompt: question.prompt,
			choices: question.choices,
		})),
	};
	fs.writeFileSync(path.join(target, name), JSON.stringify(published, null, 2));
}
console.log(`Published quizzes to ${target}`);
