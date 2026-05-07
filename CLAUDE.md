# Eudora Pantry Site — Project Memory

## Quick Reference
- **Stack:** Next.js 16.1.1 (App Router) + React 19 + Sanity CMS + TypeScript 5 + Tailwind CSS 4
- **Build:** `npm run build`
- **Type check:** `npx tsc --noEmit`
- **Validate:** `bash verify.sh` (full) or `bash verify.sh --quick` (type-check only)

## Architecture
Next.js App Router site with Sanity CMS backend. Pages in `app/`, Sanity studio at `app/studio/`. Sanity config in root (`sanity/` dir has schema types and structure). Content is fetched from Sanity via `next-sanity` and `@sanity/image-url`. Styled with Tailwind + styled-components.

## Key Files
- `app/page.tsx` — Homepage
- `app/layout.tsx` — Root layout
- `app/studio/` — Embedded Sanity Studio
- `sanity/schemaTypes/` — CMS schema definitions
- `sanity/structure.ts` — Studio structure config
- `sanity/env.ts` — Sanity environment config
- `sanity/lib/` — Sanity client and helpers

## Never/Always Rules
- **NEVER** hardcode CMS content — always fetch from Sanity
- **NEVER** commit Sanity dataset tokens to source
- **ALWAYS** use `@sanity/image-url` for image URLs (handles CDN + transforms)
- **ALWAYS** define content types in `sanity/schemaTypes/` — never ad-hoc queries

## Gotchas
- Sanity Studio is embedded at `/studio` — Next.js routes must not conflict
- `next-sanity` v11 has different API from older versions — check docs
- Both Tailwind and styled-components are used — prefer Tailwind for new code

Style: Follow `~/.claude/STYLE.md`
