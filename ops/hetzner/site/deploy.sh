#!/usr/bin/env bash
# Build locally or on CI, rsync to VPS, reload Caddy.
set -euo pipefail

VPS_USER="${VPS_USER:-deploy}"
VPS_HOST="${VPS_HOST:-your.vps.hostname}"
REPO_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"

cd "$REPO_ROOT/apps/web"
export SITE_URL="${SITE_URL:-https://codetocareer.org}"
npm ci
npm run build

rsync -avz --delete dist/ "${VPS_USER}@${VPS_HOST}:/var/www/codetocareer/"

ssh "${VPS_USER}@${VPS_HOST}" 'sudo systemctl reload caddy || sudo caddy reload --config /etc/caddy/Caddyfile'

echo "Deployed to https://codetocareer.org"
