---
date: 2026-05-10
topic: Donation MVP redesign
tags: [design, mvp, accessibility, donation, sanity, decision, learning]
status: shipped
---

# Donation MVP Redesign

## TL;DR
Replaced a 49KB magazine-style homepage (hero image, multi-section storytelling, sticky nav) with a single mobile-first page tuned for senior readability. The donate form is front and center; pantry info and a Facebook link sit below the fold. Donate button is intentionally disabled with a "coming soon" note pending payment vendor selection.

## Context
- **Audience:** seniors. Readability is the single biggest design constraint — not aesthetic preference.
- **Goal:** money for food donations. The site exists to convert a visitor into a donor, full stop.
- **Vendor:** not yet selected. Auth, payment processing, and tax receipts all live on the vendor side — we never handle PII or money directly.
- **Starting state:** `app/page.tsx` was ~49KB. Hero image with overlay, three content sections, sticky Navigation component, gallery, announcements, mobile pantry schedule. Beautiful, but the donate CTA was one of several competing actions.

## Decisions made (with why)

### 1. Replace the homepage (not add `/give`)
**Why:** at MVP, donation IS the site. A second page would dilute the funnel and require visitors to make a choice they shouldn't have to make.
**Reversible?** Yes — old version is in git history (`8ea91ba`).

### 2. Disabled donate button + "coming soon" note (vs. fake checkout or mailto)
**Why:** the user explicitly chose "disabled with note" over a stubbed flow. Honest > demo-able > misleading. A fake submit could erode trust if a senior visitor actually thinks they donated.
**Implication:** the button label still updates ("Donate $25") so the interaction feels alive, but submit is a no-op.

### 3. Hardcoded preset amounts ($10/$25/$50/$100, $25 default)
**Why:** speed. Pantry math (e.g., "$25 = 100 lbs of food") needs pantry input we don't have yet. Hardcoded means a deploy to change, but at MVP there's no reason these will change.
**Future:** move to Sanity once we have impact numbers tied to amounts.

### 4. CMS-driven content (Sanity) for everything else
**Why:** project rule from CLAUDE.md — content lives in Sanity, code never hardcodes it. Pantry staff can update hours/address/Facebook without a deploy.
**Added:** `facebookUrl` URL field on `homepage` schema. Query and rendering both gracefully omit if not set.

### 5. Dropped the Navigation component entirely
**Why:** single-page MVP, no destinations to navigate to. Nav was visual clutter competing with the donate CTA. The Navigation.tsx file was deleted, not just unimported — no point keeping dead code.

### 6. Senior-first readability pass
**What changed:**
- Body text 18px → 20px (info section)
- Tagline 18px → 24px
- Preset chips 18px → 20px **bold**, 56px minimum height
- Custom amount input 56px minimum height, 20px text
- Donate button 20px → 24px **extra-bold**, 64px minimum height
- Section headings 20px → 24px
- Text contrast: `gray-700` → `gray-800` everywhere (passes WCAG AAA)
- Border colors: `gray-300` → `gray-400` on inputs (more visible)
- All touch targets ≥ 44×44px (WCAG AAA), most ≥ 56px

**Why:** average donor age is senior. WCAG AA is a floor; for this audience, AAA on contrast and 56px+ targets are the design baseline, not a stretch goal.

### 7. Photo strip BELOW the donate form (not as hero)
**Why:** the donate button must be visible without scrolling. A photo hero pushes the CTA down. A photo strip below the donate card adds warmth, peeks above the fold on most viewports, and invites scroll without competing.
**Source:** uses existing Sanity `gallery` field. Renders nothing if empty — no broken layout.

### 8. Light visual polish (kept simple)
- Donate form in a white card with shadow and warm border (visual anchor)
- Subtle radial gold/orange gradient glows in the cream background (warmth without distraction, fixed attachment so they don't scroll)
- Decorative gold dash before the tagline + gold-bracketed "FOOD PANTRY" eyebrow
- 40px gold underline accent on `h2` section headings (`.section-heading` utility class)

## What's in the codebase now

```
app/
  page.tsx              ← server component, fetches Sanity, renders page (~3KB, was 49KB)
  globals.css           ← added background gradients + .section-heading utility
components/
  DonateForm.tsx        ← client component, preset chips + custom input + disabled CTA
sanity/
  schemaTypes/homepage.ts   ← added facebookUrl URL field
  lib/queries.ts            ← added facebookUrl to HOMEPAGE_QUERY
notes/                  ← this folder
```

Deleted: `components/Navigation.tsx`.

Untouched but unused (in Sanity, still rendered nowhere): `mainDescription` (PortableText), `donationQr` (image), `gallery[4+]` (only first 3 render), the `announcement` and `mobilePantrySchedule` document types. **Not removed** — non-destructive, in case we want them back.

## Trade-offs we accepted

| Lost | Gained |
|---|---|
| Magazine-style hero photo | Donate CTA in first viewport |
| Multi-section storytelling | Single, unmissable funnel |
| Sticky navigation | Less visual competition |
| Announcements feed | Faster page, simpler maintenance |
| Mobile pantry schedule UI | Schema still exists; can render later if needed |

## What's left

In rough priority order:

1. **Pick a payment vendor.** Candidates to evaluate: Stripe Checkout (DIY, fees ~2.9%+30¢), Donorbox (nonprofit-focused, recurring built-in), Givebutter (free for nonprofits, takes optional tip), GiveLively (free for 501(c)(3)s). The button is ready to wire up — needs `donationLink` set in Sanity to point at the checkout, then enable the button.
2. **Confirm 501(c)(3) status.** Affects vendor choice (some have free tier for nonprofits only) and donation page copy (tax-deductibility messaging).
3. **Deploy to production.** Vercel is the path of least resistance for Next.js. Need a domain.
4. **Real photos.** Gallery field is wired but empty in Sanity. Pantry-provided > stock.
5. **SEO + social.** Title/description set in `app/layout.tsx`. Need: OG image, favicon (still Next default), structured data for the pantry (LocalBusiness schema would help local search).
6. **Sanity hardening.** Add `Rule.uri({ scheme: ['http','https'] })` to the `facebookUrl` field — defense-in-depth against a hypothetical malicious-editor `javascript:` URL. Not a vuln today (Sanity default validator rejects), but good practice.
7. **Accessibility audit.** Self-tested for contrast and target size; should run through axe DevTools and ideally a real screen reader pass before launch.
8. **Analytics decision.** Privacy-respecting option (Plausible, Fathom) vs nothing. Avoid GA for a donation site.
9. **Cleanup unused schema.** After vendor goes live, decide whether to drop `mainDescription`, `donationQr`, `announcement`, `mobilePantrySchedule` from Sanity. They cost nothing to keep but clutter the studio.
10. **Recurring donations?** Open question — if the vendor supports it, surfacing a "donate monthly" toggle would meaningfully change average donor value.

## Learning moments

- **ASCII preview mockups beat verbal descriptions.** When the design choice was "how much polish," showing the user a tiny ASCII box of the chosen direction lets them commit visually before any code is written. Worth using for any future UI fork.
- **"Simpler" only reads as intentional if the remaining elements feel deliberate.** The first pass was clean but flat — "gets the job done, I guess." Adding the card + typographic accents + background gradient brought it back without re-bloating. Less is more, *if* what's left has shape.
- **Senior-first design ≠ ugly.** High contrast + bigger targets + clear hierarchy is just *good* design. Treating it as a constraint, not a compromise, gets there.
- **CMS discipline pays off downstream.** Adding the `facebookUrl` field meant the user could paste a URL in studio and have it appear with zero code roundtrip. Worth the 2-minute schema edit.
- **Don't auto-add features the user didn't ask for.** Impact stats ("$25 = 100 meals"), recurring donation toggle, donor wall — all plausible additions, all out of scope until the user names them. Especially important when the user is treating this as a learning project — extra features muddy the lesson.
- **Confirming scope mid-task saved a wrong path.** When the user said "front and center" after picking light polish, the question of whether to add a hero photo was real. Asking "donate stays first?" before adding a photo prevented a redo.

## Open questions for next session

- Payment vendor preference — managed (Donorbox/Givebutter) or DIY (Stripe Checkout)?
- 501(c)(3) status? Affects vendor cost and copy.
- Photo source — pantry provides, stock, or skip the photo strip for now?
- Domain registered? Where?
- Do we want recurring donations from day one, or one-time only at MVP?

## File pointers (for retrieval)

- Final homepage: `app/page.tsx`
- Donate form: `components/DonateForm.tsx`
- Sanity schema: `sanity/schemaTypes/homepage.ts`
- Sanity query: `sanity/lib/queries.ts`
- Global styles: `app/globals.css`
- Project rules: `CLAUDE.md`
- Validation script: `verify.sh`
