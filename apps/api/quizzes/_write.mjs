import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const quizzes = [
	{
		id: "path0-welcome",
		title: "Welcome",
		questions: [
			{
				id: "q1",
				prompt: "What is this site for?",
				choices: [
					"A random list of videos",
					"An ordered path with practice",
					"A paid bootcamp",
				],
				answer: 1,
			},
			{
				id: "q2",
				prompt: "Where do the lab files live?",
				choices: ["labs/compose", "only on YouTube", "inside the certificate"],
				answer: 0,
			},
		],
	},
	{
		id: "path0-editor",
		title: "Editor",
		questions: [
			{
				id: "q1",
				prompt: "What runs git and python commands?",
				choices: ["The terminal", "A screenshot", "The certificate page"],
				answer: 0,
			},
		],
	},
	{
		id: "path0-git",
		title: "Git",
		questions: [
			{
				id: "q1",
				prompt: "What should stay out of git?",
				choices: ["README", ".env secrets", "commit messages"],
				answer: 1,
			},
		],
	},
	{
		id: "path0-docker",
		title: "Docker",
		questions: [
			{
				id: "q1",
				prompt: "What does Compose do?",
				choices: [
					"Starts the services listed in the YAML file",
					"Replaces SQL",
					"Publishes your secrets",
				],
				answer: 0,
			},
		],
	},
	{
		id: "path0-ai",
		title: "Learn with AI",
		questions: [
			{
				id: "q1",
				prompt: "What should you never paste into a chat tool?",
				choices: ["A syntax error", "Secrets and customer data", "A function name"],
				answer: 1,
			},
		],
	},
	{
		id: "path0-tools",
		title: "Tools",
		questions: [
			{
				id: "q1",
				prompt: "Where is the affiliate allowlist?",
				choices: ["docs/disclosure.md", "A private email", "The quiz answers"],
				answer: 0,
			},
		],
	},
	{
		id: "py-hello",
		title: "Print",
		questions: [
			{
				id: "q1",
				prompt: "Which call prints text in Python 3?",
				choices: ["echo()", "print()", "console.log()"],
				answer: 1,
			},
		],
	},
	{
		id: "py-variables",
		title: "Variables",
		questions: [
			{
				id: "q1",
				prompt: "What does a function return when you forget return?",
				choices: ["0", "None", "The function name"],
				answer: 1,
			},
		],
	},
	{
		id: "py-functions",
		title: "Functions",
		questions: [
			{
				id: "q1",
				prompt: "What does greet('Ada') return if the body is return f'Hello, {name}'?",
				choices: ["Hello, Ada", "name", "Hello, {name}"],
				answer: 0,
			},
		],
	},
	{
		id: "py-files",
		title: "Files",
		questions: [
			{
				id: "q1",
				prompt: "Why use a with block when opening a file?",
				choices: [
					"It closes the file even if something fails",
					"It skips reading the file",
					"It commits the file to git",
				],
				answer: 0,
			},
		],
	},
	{
		id: "py-debug",
		title: "Debugging",
		questions: [
			{
				id: "q1",
				prompt: "First move when a test fails?",
				choices: [
					"Read the assertion and the line it names",
					"Delete the test",
					"Paste secrets into chat",
				],
				answer: 0,
			},
		],
	},
	{
		id: "sql-select",
		title: "SELECT",
		questions: [
			{
				id: "q1",
				prompt: "Which clause chooses columns?",
				choices: ["FROM", "SELECT", "WHERE"],
				answer: 1,
			},
		],
	},
	{
		id: "sql-where",
		title: "WHERE",
		questions: [
			{
				id: "q1",
				prompt: "Which clause keeps only matching rows?",
				choices: ["WHERE", "ORDER BY", "SELECT"],
				answer: 0,
			},
		],
	},
	{
		id: "sql-joins",
		title: "Joins",
		questions: [
			{
				id: "q1",
				prompt: "An INNER JOIN returns rows that...",
				choices: [
					"Match the join condition in both tables",
					"Exist only in the left table",
					"Ignore keys",
				],
				answer: 0,
			},
		],
	},
	{
		id: "sql-group",
		title: "GROUP BY",
		questions: [
			{
				id: "q1",
				prompt: "COUNT(*) with GROUP BY counts...",
				choices: ["Rows in each group", "Tables in the database", "Columns in the SELECT"],
				answer: 0,
			},
		],
	},
	{
		id: "sql-etl",
		title: "Batch ETL",
		questions: [
			{
				id: "q1",
				prompt: "Why is the daily count load idempotent?",
				choices: [
					"ON CONFLICT updates the same date instead of duplicating it",
					"TRUNCATE deletes the warehouse forever",
					"CSV files cannot be read twice",
				],
				answer: 0,
			},
		],
	},
	{
		id: "ai-spec",
		title: "Spec",
		questions: [
			{
				id: "q1",
				prompt: "What do you write before asking a model to code?",
				choices: [
					"The outcome, inputs, and how you will check it",
					"Only the words 'write the code'",
					"Your API keys",
				],
				answer: 0,
			},
		],
	},
	{
		id: "ai-diff",
		title: "Diff",
		questions: [
			{
				id: "q1",
				prompt: "What do you read before keeping AI changes?",
				choices: ["The diff", "Only the success message", "Nothing"],
				answer: 0,
			},
		],
	},
	{
		id: "ai-refuse",
		title: "Refuse bad code",
		questions: [
			{
				id: "q1",
				prompt: "When should you reject a suggestion?",
				choices: [
					"You cannot explain it or the tests fail",
					"It was fast",
					"It uses a function",
				],
				answer: 0,
			},
		],
	},
];

for (const quiz of quizzes) {
	fs.writeFileSync(path.join(dir, `${quiz.id}.json`), JSON.stringify(quiz, null, 2));
}
console.log(`Wrote ${quizzes.length} quizzes`);
