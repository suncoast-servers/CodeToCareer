# Certificates & profile integration

Code to Career credentials are **verifiable completion records** tied to open criteria in `certificates/catalog.json`—not pay-to-print PDFs.

## What works today (Phase 1)

| Platform | Integration | Notes |
|----------|-------------|--------|
| **LinkedIn** | [Add to profile](https://www.linkedin.com/profile/add) deep links per track | Manual click; prefilled name, org, cert URL, ID |
| **GitHub portfolio** | README + public repos | Primary proof for employers |
| **Your site** | `/certificates/` + future `/verify/{id}` | Open-source verification page |

## What does **not** have a public API (honest limits)

| Platform | Reality |
|----------|---------|
| **Upwork** | No “import certificate” API. Use **portfolio links**, project history, and skill tests. |
| **Fiverr** | Same—profile + gigs; link to `codetocareer.org/verify/...` in description. |
| **LinkedIn auto-sync** | Full automation usually requires **Credly / Accredible** (paid issuer) or **Open Badges 3.0** wallet apps. |

## Phase 2 (planned in repo)

1. **Open Badges 3.0** issuer (self-hosted) — portable badges learners store in Badgr / Learner Wallet.
2. **Signed verification** — Ed25519 signature over completion JSON; public key in repo.
3. **Optional Credly** — if you want one-click LinkedIn for all learners (annual issuer fee).

## LinkedIn template

```
https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME
  &name={certificateTitle}
  &organizationName=Code%20to%20Career
  &issueYear={year}
  &issueMonth={month}
  &certUrl=https%3A%2F%2Fcodetocareer.org%2Fcertificates%2Fverify%2F{certId}
  &certId={certId}
```

Organization LinkedIn Company Page (create when ready) unlocks cleaner branding.

## For learners

Complete track requirements → open PR or automated check (future) → receive cert ID → add to LinkedIn + link from Upwork/Fiverr profiles.
