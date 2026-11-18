# codetocareer.org on Suncoast VPS

| Item | Value |
|------|--------|
| Hetzner server | `ubuntu-4gb-nbg1-suncoastservers` |
| Origin IPv4 | `167.233.250.4` |
| Web root | `/var/www/codetocareer.org/public` |
| Nginx vhost | `/etc/nginx/sites-available/codetocareer.org` |
| TLS | Let's Encrypt (certbot) |
| DNS | Cloudflare A records → origin (proxied), SSL **Full** |

## Deploy from Windows

```powershell
cd ops/hetzner/site
.\deploy.ps1
```

Overrides: `$env:VPS_HOST`, `$env:VPS_USER` (default `root`).

## Deploy from Linux/macOS

```bash
export SITE_URL=https://codetocareer.org
cd apps/web && npm ci && npm run build
scp -r dist/* root@167.233.250.4:/var/www/codetocareer.org/public/
ssh root@167.233.250.4 'nginx -t && systemctl reload nginx'
```

`deploy.sh` targets Caddy; this VPS uses **nginx** (see `codetocareer.org.nginx.conf` for the initial HTTP block—certbot manages HTTPS).
