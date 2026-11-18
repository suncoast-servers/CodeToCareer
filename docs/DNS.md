# DNS — codetocareer.org (Cloudflare)

Zone **codetocareer.org** is on Cloudflare.

## Live origin (Suncoast Hetzner)

| Record | Value |
|--------|--------|
| A `codetocareer.org` | `167.233.250.4` (proxied) |
| A `www` | `167.233.250.4` (proxied) |
| SSL mode | **Full** (origin has Let's Encrypt via certbot) |

Nginx + static files: see [`ops/hetzner/site/README.md`](../ops/hetzner/site/README.md).

## Redeploy

```powershell
ops/hetzner/site/deploy.ps1
```

## Alternative

Cloudflare Pages or orange-cloud proxy in front of Hetzner origin—same DNS records, Caddy on origin still works.
