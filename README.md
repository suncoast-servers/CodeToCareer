# Code to Career

**[codetocareer.org](https://codetocareer.org)** — free, open-source tracks from zero to tech careers (Docker labs, certificates, AI-aware practice).

**Start:** [Path 0](content/path-00-setup/welcome.mdx) · **Tracks:** [content/tracks/](content/tracks/) · **Syllabus:** [outline.md](outline.md)

## Repo map

| Area | Location |
|------|-----------|
| Lessons | [`content/`](content/) |
| Site (minimal Starlight) | [`apps/web/`](apps/web/) |
| Labs | [`labs/compose/`](labs/compose/) |
| Certificates catalog | [`certificates/`](certificates/) |
| Hetzner site deploy | [`ops/hetzner/site/`](ops/hetzner/site/) |

## Labs

```bash
cd labs/compose/core
cp .env.example .env
docker compose --profile core up -d
```

## Site locally

```bash
cd apps/web
npm install
npm run dev
```

Build uses `SITE_URL=https://codetocareer.org` by default.

## GitHub rename

Rename to **CodeToCareer** on GitHub and locally: [docs/GITHUB_RENAME.md](docs/GITHUB_RENAME.md).

MIT License — [LICENSE](LICENSE).
