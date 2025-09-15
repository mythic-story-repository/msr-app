# Cline Prompt Pack — MSR

## Context Injection
You are contributing to Mythic Story Repository (MSR).
Follow `.clinerules.md` and the repo tree when making changes.

## 1) Thin vertical slice (D0)
Plan, then implement:
1. Home page with “Offer Your Story” CTA + recent stories.
2. Submit flow: text-only + consent + at least one archetype.
3. Story detail page with resonance panel (stubbed).
4. Explore page listing by archetype.
5. Minimal DB + API (story CRUD + export endpoint).
6. Seed 15–20 synthetic stories.

Constraints:
- Next.js App Router.
- Routes thin → server handlers in `/src/features/*/server` → `/src/core/usecases`.
- Zod validation in `/src/features/stories/schema.ts`.
- Domain invariants in `/src/core/domain/story.ts`.
- Write/update tests in `/src/tests`.

## 2) Refactor without breaking boundaries
When changing schema or folder structure:
- Propose a plan first.
- Execute in small steps.
- Update tests + ADR.

## 3) ADR drafting
When introducing a new dependency or structure:
- Create `/ADR/YYYY-MM-DD-<slug>.md` with: Context, Decision, Options, Consequences.

## 4) Consent & anonymity checks
In story submission/export:
- Validate and enforce consent, license, AI opt-out, anonymity level.
- Never expose PII if user selected pseudonym/anonymous.
