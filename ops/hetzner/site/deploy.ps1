# Deploy Code to Career static site to Suncoast Hetzner VPS (nginx).
param(
	[string]$VpsHost = $(if ($env:VPS_HOST) { $env:VPS_HOST } else { "167.233.250.4" }),
	[string]$VpsUser = $(if ($env:VPS_USER) { $env:VPS_USER } else { "root" }),
	[string]$SiteUrl = "https://codetocareer.org"
)

$ErrorActionPreference = "Stop"
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..\..")
$Dist = Join-Path $RepoRoot "apps\web\dist"

Push-Location (Join-Path $RepoRoot "apps\web")
$env:SITE_URL = $SiteUrl
npm ci
npm run build
Pop-Location

scp -r (Join-Path $Dist "*") "${VpsUser}@${VpsHost}:/var/www/codetocareer.org/public/"
ssh "${VpsUser}@${VpsHost}" "nginx -t && systemctl reload nginx"
Write-Host "Deployed $SiteUrl"
