// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

const webRoot = path.dirname(fileURLToPath(import.meta.url));

const site = process.env.SITE_URL ?? "https://codetocareer.org";

const organizationJsonLd = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Code to Career",
	url: site,
	description:
		"Free open-source career tracks from zero to tech jobs—with Docker labs.",
});

const courseJsonLd = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "Course",
	name: "Code to Career",
	description:
		"Ordered tracks for coders, AI-assisted development, and data engineering.",
	provider: {
		"@type": "Organization",
		name: "Code to Career",
	},
	isAccessibleForFree: true,
});

/** Minimal Starlight skin — customize later. */
export default defineConfig({
	site,
	trailingSlash: "always",
	vite: {
		resolve: {
			alias: {
				"@ctc": path.join(webRoot, "src", "components"),
			},
		},
	},
	integrations: [
		starlight({
			title: "Code to Career",
			description:
				"Free tracks from zero to tech careers—labs, certificates, open source.",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/suncoast-servers/codetocareer",
				},
			],
			editLink: {
				baseUrl:
					"https://github.com/suncoast-servers/codetocareer/edit/main/content/",
			},
			customCss: ["./src/styles/custom.css"],
			components: {
				Head: "./src/components/Head.astro",
			},
			head: [
				{
					tag: "script",
					attrs: { type: "application/ld+json" },
					content: organizationJsonLd,
				},
				{
					tag: "script",
					attrs: { type: "application/ld+json" },
					content: courseJsonLd,
				},
			],
			sidebar: [
				{
					label: "Start",
					items: [
						{ slug: "index" },
						{ slug: "tracks" },
						{ slug: "certificates" },
						{ slug: "certificates/verify" },
						{ slug: "support" },
					],
				},
				{
					label: "Career tracks",
					items: [{ autogenerate: { directory: "tracks" } }],
				},
				{
					label: "Path 0 — Setup",
					items: [{ autogenerate: { directory: "path-00-setup" } }],
				},
				{
					label: "Data engineer paths",
					items: [
						{ slug: "tracks/data-engineer" },
						{ slug: "path-01-mindset" },
						{
							label: "Path 2 - Python",
							items: [{ autogenerate: { directory: "path-02-python" } }],
						},
						{
							label: "Path 3 - SQL",
							items: [{ autogenerate: { directory: "path-03-sql" } }],
						},
						{ slug: "path-04-modeling-pipelines" },
						{ slug: "path-05-orchestration-warehouse" },
						{ slug: "path-06-distributed" },
						{ slug: "path-07-ops-metal" },
						{ slug: "path-08-portfolio" },
						{ slug: "path-09-capstones" },
						{ slug: "path-10-career" },
					],
				},
				{
					label: "AI-assisted practice",
					items: [{ autogenerate: { directory: "path-ai" } }],
				},
				{
					label: "Labs",
					items: [{ autogenerate: { directory: "labs" } }],
				},
			],
		}),
		sitemap(),
	],
});
