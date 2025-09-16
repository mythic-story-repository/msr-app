# DEPLOYMENT LOG — Mythic Story Repository (MSR)

This file is an **append-only log** of production deployments.  
Each entry documents the version, date, key changes, and any operational notes.  
Together with ADRs (which explain *why* decisions were made), this file explains *when/how* changes reached production.

---

## Conventions
- **Versioning**: `D0`, `D1`, … for pre-MVP thin slices; `v0.x` for MLP/MVP releases; `v1.x`+ for major launches.
- **Date**: YYYY-MM-DD (UTC).
- **Sections**: Highlights, Technical Notes, Environment, Next Steps.
- **Do not edit history**: append new entries at the bottom.

---

## D0 (v0.1) — Initial Deployment
**Date:** 2025-09-16  
**Version:** D0 (v0.1 MLP thin slice)

### Highlights
- First public deployment of MSR thin slice to Vercel.
- Migrated database from local SQLite (`./dev.db`) to Prisma Postgres (Vercel Marketplace).
- Verified app scaffolding with Next.js 15.5 App Router, React 19, Tailwind CSS.
- Established core folder structure (`app/`, `core/`, `features/`, `components/`, etc.).
- Added archetype-based Explore page and Submit flow placeholder.

### Technical Notes
- **Build:** Configured `postinstall` + `vercel-build` to run Prisma generate + migrations.
- **Runtime:** Forced Node.js 20 for Prisma compatibility (`export const runtime = 'nodejs'` in API routes).
- **Schema:** Initial `prisma.schema` migrated; tables created for `Story` and `ResonanceLink`.
- **Repo:** Cleaned structure so `/web` is app root; ensured `package.json` and `tsconfig.json` are aligned.

### Environment
- Added env vars in Vercel:
  - `DATABASE_URL` → Postgres connection string
  - `PRISMA_DATABASE_URL` → Accelerate connection string
- Verified Prisma client generation in build logs.

### Next Steps
- Seed database with 15–20 synthetic stories across archetypes.
- Add resonance panel logic (show echoes by archetype overlap).
- Confirm `/api/export/v1` filters only **public + CC0 + AI-allowed** stories.
- Add accessibility baseline and empty states.
- Draft Terms/Privacy and basic moderation guardrails.

---

## Template for Future Entries

### v0.x — [Release Name]
**Date:** YYYY-MM-DD  
**Version:** v0.x

### Highlights
- Key user-facing changes.

### Technical Notes
- Schema changes, build/deploy adjustments, dependencies.

### Environment
- Env vars added/updated, secrets rotation, infra notes.

### Next Steps
- Immediate follow-ups for next milestone.

---
