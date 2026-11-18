// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

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
			customCss: [],
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
						{ slug: "path-02-python" },
						{ slug: "path-03-sql" },
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
					label: "Labs",
					items: [{ autogenerate: { directory: "labs" } }],
				},
			],
		}),
		sitemap(),
	],
});
