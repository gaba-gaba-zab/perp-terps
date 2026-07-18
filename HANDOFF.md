# HANDOFF — perp-terps (The Perpetual Terpsters)

> Living doc. Each agent session: refresh **Current state** + **Next actions**,
> then append a dated entry to **Session log**. See `AGENTS.md` → *Handoff
> convention* for the full rule.

> **New agent? Start here:** Read this whole file (it's short), then
> `AGENTS.md` house rules. Most *Next actions* are gated on *Open questions*
> (client assets, copy, FB/IG URLs, contact info, domain registrar) — confirm
> those answers before building, otherwise you'll be re-creating placeholder
> content. If an answer is missing, surface it to the operator first instead
> of guessing.

---

## Current state

- **Repo:** `perp-terps` — forked from the `astro-client-starter` template at
  upstream commit `9ba7232` (the template's last polish commit before this
  fork). Remote: `git@github.com:gaba-gaba-zab/perp-terps.git`, branch `master`.
- **Client:** **The Perpetual Terpsters Homegrow Gardening** — a cannabis-
  adjacent homegrow cultivation / gardening brand based in **New Jersey**.
  - Display name (header, nav, logo lockup): **Perpetual Terpsters**
  - Full name (footer copyright, SEO title, `<title>` tag): **The Perpetual
    Terpsters Homegrow Gardening**
  - Target domain: **perpterps.com** (DNS/registrar still pending)
- **Site purpose:** content + services hybrid — educational grow content to
  drive traffic (blog/guides) plus a services/consulting offering that converts
  via the contact form. Blog deferred to Phase 3.5 (see *Next actions*).
- **Phase:** 3 — **MVP customization shipped, with banner-row header
  restructure follow-up.** All template placeholder copy has been replaced
  with brand copy; theme tokens are wired to an earthy-green palette extracted
  from the client's banner art; header is a full-width brand bar above a
  2-col nav row (see *Banner row restructure* below); favicons use the brand
  mark. Open review items below.
- **Stack:** Astro v6 + Tailwind v4, pnpm, Netlify deploy. Dev environment
  (devcontainer + OpenCode + GLM-5.2) is inherited as-is from the template —
  see `.devcontainer/` and the upstream template's handoff for env details.

### What shipped this session (Phase 3 MVP)

- **Identity/metadata** (`src/config.yaml`): name, site URL, SEO title +
  template, description (NJ homegrow framing), OG site_name all swapped to
  Perpetual Terpsters. `site` block edit was approved by operator (house rule
  #5 exception). OG image still points at template `default.png` (deferred —
  see *Open questions*).
- **Theme palette** (`src/components/CustomStyles.astro`): primary
  `#12351B` (deep forest), secondary `#3B5A21` (mid leaf), accent `#899C35`
  (olive) — sampled from the banner art via ImageMagick. Light + dark both
  wired; dark uses lifted values for button visibility. `::selection` tinted
  olive. `tailwind.css` was not touched (it aliases the aw-color vars).
- **Header logo** (`src/components/Logo.astro`): renders
  `perpterps_banner.png` via `astro:assets` at `h-20 md:h-28` (80 / 112px) in a
  full-width banner row above the nav. `SITE.name` kept as `sr-only` for
  a11y/SEO. Old 🚀 emoji dropped. See *Banner row restructure* for the layout
  change and the new photo-asset sizing philosophy.
- **Navigation** (`src/navigation.ts`): CTA text `Start a project` →
  `Free consultation`.
- **Hero** (`src/content/hero.md`): text-only (HeroSection.astro has no image
  slot — extending it is Phase 3.5 scope). Headline "Homegrow help, start to
  harvest." Subtitle establishes NJ + free consults + medical-patient support.
  CTAs: Free consultation / See services.
- **About** (`src/content/about.md`): tagline/title/subtitle, 3 pillars
  (Hands-on in NJ, Medical-patient friendly, Beginner to advanced), 2-sentence
  body story. `perpterps_vertical.png` dropped into body via markdown image
  syntax.
- **Services** (`src/content/services.md`): all 8 services rendered as items
  with tabler icons + warm+earthy 1-line descriptions:
  Free Consultation (`message-chatbot`), Free Seed Starting for Medical
  Patients (`seedling`), Installation of Grow Equipment (`tools`), Grow
  Monitoring Service (`activity-heartbeat`), Pest & Prevention Control (`bug`),
  Plant Training (`plant-2`), Harvest Assistance (`scissors`), Maintenance &
  Support (`heart-handshake`). Two free services badged in description copy.
- **Contact** (`src/content/contact.md` + `ContactSection.astro` +
  `content.config.ts` + `pages/index.astro`): extended the sections schema with
  optional `contactMethods: [{label, value, href, icon}]`; ContactSection now
  renders phone + email as a 2-col card grid above the form. Netlify form
  fields unchanged (name/email/message) — `public/netlify-form.html`
  intentionally not touched.
- **Footer** (`src/content/footer.md`): copyright `© 2026 The Perpetual
  Terpsters Homegrow Gardening.`; 3 socials (FB placeholder `#`, IG
  `instagram.com/perpterps`, YT `youtube.com/@ThePerpetualTerpsters`); phone
  + email as `secondaryLinks`. Old Privacy/Terms placeholders dropped.
- **Favicons** (`src/assets/favicons/`): generated from `perpterps_banner.png`
  via ImageMagick. `favicon.ico` (16+32), `apple-touch-icon.png` (180²),
  `favicon.svg` (PNG-in-SVG wrapper — potrace unavailable so no true vector).
  `Favicons.astro` mask-icon color updated `#8D46E7` → `#12351B`.
- **Cleanup:** deleted unreferenced template assets `app-store.png`,
  `google-play.png`, `hero-image.png`. Renamed client-uploaded
  `perpterps_*.PNG` → lowercase `.png` (filesystem is case-insensitive but TS
  module declarations only match lowercase — this resolves the
  `Cannot find module` error in `Logo.astro`). Kept template `default.png`
  as OG image (Tier 3 Option A).

### Pre-existing issues surfaced (not caused by this session)

- **`pnpm check` fails on `astro.config.ts:27`** — TS complains `'preview'
  does not exist in type 'AstroUserConfig<never, never, never>'`. This is the
  intentional IPv4-loopback `preview.host: '127.0.0.1'` block from upstream
  commit `3079e63`. House rule #5 forbids editing `astro.config.ts` without
  asking. **Runtime is unaffected** — Astro accepts the key; `pnpm build` is
  green. Surfaced for operator decision.

### Banner row restructure (2026-07-18 follow-up)

Operator flagged the header logo was "too small" — the original `h-10`/`h-12`
(40–48px) treatment inherited `default.png`'s template sizing. Directive
received: **break the template's layout rules for photo/brand assets** —
brand imagery is no longer constrained to template defaults, even when that
means reflowing header chrome, escaping the template grid, or exceeding the
default header height. This philosophy applies going forward to all photo
assets (e.g. the about-section `{width=320}` cap I added last session is
wrong-headed under this directive — revert pending operator decision).

What changed:

- `Header.astro` split into two stacked rows inside `<header>`: a full-width
  centered banner row (border-bottom separator, `py-2`) and a 2-col flex nav
  row `[nav | actions]` (`py-0 md:py-3` so it collapses to 0-height on mobile
  when the menu is closed). Whole header still sticks on scroll.
- `Logo.astro` bumped `h-10` → `h-20 md:h-28` (80 / 112px). `w-auto` preserves
  aspect; transparent PNG sits cleanly on any bg.
- Mobile hamburger moved into the banner row (top-right absolute) — on mobile
  the nav row is empty/hidden by default; tapping the hamburger toggles
  `<nav>` and the actions div via the existing JS in `BasicScripts.astro`.
- `BasicScripts.astro` selector `#header > div > div:last-child` →
  `#header [data-aw-header-actions]` (3 occurrences). The positional selector
  broke under the new two-row DOM; semantic attribute is structure-agnostic.
  New `data-aw-header-actions` attribute added to the actions div in
  `Header.astro`.
- Asset-swap resilient: sizing is purely `h-*` cap + `w-auto`. Future banner
  with different aspect auto-fits; no PNG-dims-magic-numbers anywhere.

**Convention decision:** 2-col nav (nav-left + actions-right) — standard for
consulting/marketing sites. Avoids the "missing logo" tell that an empty
3-col col-1 would create once the banner moved to its own row.

**Verification:** `pnpm build` green (2 pages, 3 brand images optimized).
`pnpm check:eslint` clean. `pnpm check:prettier` clean on touched files
(`Header.astro`, `Logo.astro`, `BasicScripts.astro` — 3 pre-existing
warnings on untouched files remain). `pnpm check:astro` reports only the
pre-existing `astro.config.ts:27` error (unchanged). Rendered HTML
spot-checked: banner row, nav row, theme toggle, CTA, and both
`data-aw-toggle-menu` / `data-aw-header-actions` hooks present in the right
DOM positions for the mobile-menu JS.

---

## Next actions

### Review pass (operator)

- [ ] **Visual review of rendered site** — `pnpm dev` and walk through every
      section. Especially:
  - ~~Header logo at `h-12`~~ — **RESOLVED 2026-07-18:** banner-row
    restructure shipped (see *Banner row restructure* under *Current state*).
    Logo is now `h-20 md:h-28` in a full-width brand bar above a 2-col nav
    row. **Still review:** does the banner row's `py-2` + 80/112px height feel
    right on desktop and mobile? Want it taller/shorter? Want the banner row
    sticky-collapsed on scroll?
  - About-section vertical PNG — check it doesn't dominate the section.
    (Operator directive received: photo assets should not be capped to
    template-conservative sizes — the `{width=320}` cap I added last session
    is likely wrong under the new philosophy. Decision pending.)
  - Dark mode contrast on the new green palette (primary is dark forest on
    light bg; secondary is lighter on dark bg).
- [ ] **`perpterps_withcopy.png` copy review** — operator said "include all of
      it except contact" referring to copy baked into the image. I drafted
      hero/about copy blind from the brief (cannot OCR in this env). Compare
      side-by-side and tell me what to mirror / replace / drop.
- [ ] **Form submission test in prod** — Netlify Forms only works after
      deploy; first submission often lands in client's Gmail spam folder.

### Pre-launch blockers

- [ ] **Facebook URL** — still pending; footer link is `#`. Replace before
      deploy.
- [ ] **Domain registrar** — pending decision. Client owns it / we register /
      defer to Netlify subdomain?
- [ ] **OG image decision** — keep template `default.png` (Tier 3 Option A,
      current state), swap to a brand asset, or drop entirely? Affects link
      unfurls on FB/X.

### Phase 3.5 (post-MVP)

- [ ] **Re-enable blog** — significant. Flip `APP_BLOG` in `config.yaml`, add
      `blog` collection to `content.config.ts`, add `src/pages/blog/` listing
      + post template using `MarkdownLayout`, add **Guides** nav entry, update
      AGENTS.md house rule #1 ("five sections" → six).
- [ ] **Optional hero image** — `HeroSection.astro` currently has no image
      slot. Could extend (~15 LOC) if operator wants a hero visual.
- [ ] **True vector `favicon.svg`** — current is a PNG-in-SVG wrapper. If a
      vector logo source arrives, replace.
- [ ] **`pnpm check` resolution** — operator decision on the
      `astro.config.ts` `preview` TS error (fix vs. suppress vs. ignore).

### Regulated-niche considerations (deferred — unchanged from prior session)

- [ ] **Age gate (21+): DEFERRED** — educational + consulting framing likely
      doesn't require it; revisit only if product sales are added later.
- [ ] **Payment processor:** DEFERRED — only relevant if commerce is added.

---

## Post-MVP (deferred scope)

### Chat bot with owner escalation

A site chat widget that answers generic FAQs automatically and pings the owner
in real time when a question falls outside the generic set.

**Decision points to resolve when revisited:**
- **Provider axis:** Tawk.to or Crisp (both free, mobile app for owner
  takeover, chatbot via their dashboard/API) vs. custom (LLM + Netlify
  Function + Twilio SMS for escalation).
- **Generic-answer source:** FAQ keyword matching (simple, deterministic) vs.
  LLM with system prompt + RAG over an FAQ doc (flexible, costs per message).
- **Escalation channel:** native provider mobile app (Tawk/Crisp) vs. Twilio
  SMS vs. email push.
- **Off-hours behavior:** store hours, "we'll reply by EOD" auto-reply, etc.

**Recommendation to future-self:** start with Tawk.to + their built-in chatbot
for v1 (zero backend, free, owner gets a mobile app). Migrate to a custom LLM
backend only if generic-answer quality becomes the bottleneck.

---

## Open questions (gate launch / Phase 3.5)

- **Brand OG image** — keep template `default.png` for link unfurls (current),
  swap to a brand asset, or drop entirely? Cannabis-adjacent imagery may need
  Meta/Google ad-policy review if paid social is ever planned.
- **`perpterps_withcopy.png` content** — operator said "include all of it
  except contact" but I cannot OCR images in this env. Hero/about copy was
  drafted blind from the brief; operator needs to compare side-by-side and
  identify what to mirror/replace.
- **About-section `{width=320}` cap** — under the new photo-asset philosophy
  (no template-style conservative sizing), should this be reverted? Operator
  scoped it out of this pass but flagged for follow-up.
- **Facebook URL** — exact profile URL still pending. Footer link is `#`.
- **Domain registrar** — does the client own `perpterps.com`, or do we
  register it? Which registrar? (Launch blocker.)
- **Initial blog topics / content calendar** — drives Phase 3.5 blog launch.
  First 3–5 guides or posts?
- **`pnpm check` resolution** — `astro.config.ts:27` `preview` block throws
  a TS error (pre-existing). Fix it (requires editing `astro.config.ts`,
  gated on house rule #5), suppress, or accept as a known-broken check?
- **Consulting pricing display** — operator answer was "Free consultations
  and Free seed starting for medical patients" (no pricing on paid services).
  Confirm "request a quote / no price shown" framing for the 6 paid services
  is the long-term call vs. eventual tier display.

---

## Session log

### 2026-07-18 — Full-width banner row restructure

**Context:** Operator resumed after preemptively ending the prior Phase 3 MVP
session mid-handoff. Surfaced 4 uncommitted visual-review tweaks (smaller
logo `h-12` → `h-10`, about-image capped `{width=320}`, two brand PNGs
swapped) from that interrupted session. Then operator flagged the *resulting*
logo was still too small: "It's too small. It's respecting the layout in
`default.png`. Moving forward, let's break the rules of that layout with
respect to photo assets." New directive received and recorded under
*Banner row restructure* → photo/brand assets are no longer constrained to
template defaults.

**Shipped (3 files, banner-row restructure):**

- `src/components/widgets/Header.astro` — split the single 3-col grid into
  two stacked rows: a full-width banner row (border-bottom separator, banner
  centered, mobile hamburger absolute top-right) and a 2-col flex nav row
  `[nav | actions]`. Added `data-aw-header-actions` attribute on the actions
  div so the mobile-menu JS can find it under the new DOM. Wrapper uses
  `py-0 md:py-3` so the nav row collapses to 0-height on mobile when the
  menu is closed (children stay `hidden md:flex`, JS toggles `.hidden`).
  Outer `<header>` keeps `sticky top-0` — both rows pin on scroll.
- `src/components/Logo.astro` — `h-10` (40px) → `h-20 md:h-28` (80 / 112px).
  `w-auto` preserves aspect; transparent PNG sits cleanly on any bg.
  `height={112}` on the `<Image>` matches the desktop cap (astro:assets
  hint).
- `src/components/common/BasicScripts.astro` — 3 occurrences of
  `document.querySelector('#header > div > div:last-child')` →
  `document.querySelector('#header [data-aw-header-actions]')`. The
  positional selector broke under the new two-row DOM (would now match the
  banner-inner div instead of the actions div). Semantic selector is
  structure-agnostic and won't break on future Header refactors.

**Decisions logged:**

- **Sticky:** whole header sticks (banner + nav) — biggest brand presence.
- **Nav layout:** 2-col flex (nav-left + actions-right) — standard for
  consulting/marketing sites, avoids the "missing logo" tell.
- **Banner height:** medium (`h-20 md:h-28`, 80 / 112px).
- **Scope:** banner only this pass. About-section `{width=320}` cap stays
  for now — flagged under *Open questions* for the same photo-asset
  philosophy.
- **Asset resilience:** all sizing via `h-*` cap + `w-auto`, never
  hard-coded pixel widths tied to PNG dims. Future asset swap auto-fits.

**Operator decisions still pending (in *Open questions*):**

- About-section `{width=320}` cap — revert under new photo-asset philosophy?
- Brand PNGs marked "might change" — layout will auto-adapt via `h-*` cap.

**Verification:**

- `pnpm build` — **GREEN.** 2 pages, 3 brand images optimized (banner now
  emits at the new aspect: 1024×474 → `h-20 md:h-28` rendered, width=242
  auto-computed).
- `pnpm check:astro` — **1 PRE-EXISTING ERROR** at `astro.config.ts:27`
  (unchanged).
- `pnpm check:eslint` — clean.
- `pnpm check:prettier` — clean on touched files; 3 pre-existing warnings
  remain on files I didn't touch (`AGENTS.md`, `HANDOFF.md`,
  `ContactSection.astro`).
- Spot-checked rendered `dist/index.html`: banner row present with `<img
  height="112" width="242" class="h-20 md:h-28 w-auto">`, nav with `hidden
  md:flex`, actions div with `data-aw-header-actions`, theme toggle, CTA
  "Free consultation" all in correct DOM positions.

**Next-session priorities (in *Next actions* order):**

1. Operator visual review of the new banner row in `pnpm dev` — especially
   the 112px desktop height and whether sticky-collapsing the banner on
   scroll would feel better.
2. About-section `{width=320}` revert decision (same photo-asset
   philosophy).
3. Outstanding Phase 3.5 items (blog, hero image support, vector favicon).
4. Pre-launch blockers (FB URL, domain registrar, OG image decision).

### 2026-07-18 — Phase 3 MVP customization shipped

**Context:** First build session on the per-client fork. Plan-mode review first
(surfaced 8 handoff open questions, operator answered; then operator flipped
to Build). Executed the full sequenced plan top-to-bottom.

**Shipped (12 work items):**
- Identity/metadata swap in `src/config.yaml` (operator approved the `site`
  block edit per house rule #5). Domain `perpterps.com` wired canonical
  despite DNS still pending.
- Theme palette in `CustomStyles.astro`: deep-forest primary `#12351B`,
  mid-leaf secondary `#3B5A21`, olive accent `#899C35`. Sampled from the
  client's banner PNG via ImageMagick. Light + dark both wired; dark uses
  lifted values for button visibility.
- Header logo in `Logo.astro`: now renders `perpterps_banner.png` at `h-12`
  via `astro:assets`, `SITE.name` as `sr-only`. Old 🚀 emoji dropped.
- Nav CTA: `Start a project` → `Free consultation`.
- Hero copy: text-only (HeroSection.astro has no image slot — extending is
  Phase 3.5). Headline "Homegrow help, start to harvest." + NJ/medical-
  patient subtitle.
- About: tagline/title/subtitle, 3 pillars (NJ / medical-patient / beginner-
  to-advanced), 2-sentence body, `perpterps_vertical.png` dropped into the
  markdown body.
- Services: all 8 services rendered with tabler icons + warm+earthy
  descriptions. Two free services badged in copy.
- Contact: extended sections schema with optional `contactMethods`
  (`content.config.ts`); ContactSection.astro renders phone + email cards
  above the form (~30 LOC added); Netlify form fields untouched.
- Footer: copyright `© 2026 The Perpetual Terpsters Homegrow Gardening.`,
  3 socials (FB `#` pending, IG, YT), phone + email as secondary links.
  Dropped Privacy/Terms placeholders.
- Favicons: regenerated all 3 from `perpterps_banner.png` via ImageMagick.
  `favicon.svg` is a PNG-in-SVG wrapper (potrace unavailable, no true vector).
  Favicons.astro mask-icon color `#8D46E7` → `#12351B`.
- Cleanup: deleted unreferenced `app-store.png`, `google-play.png`,
  `hero-image.png`. Renamed client-supplied `perpterps_*.PNG` → lowercase
  `.png` (case-insensitive FS + TS module decls only match lowercase).
- Kept template `default.png` as OG image (Tier 3 Option A).

**Verification:**
- `pnpm build` — **GREEN.** 2 pages built, 3 brand images optimized and
  emitted, sitemap generated. Spot-checked rendered HTML: title, description,
  all 8 services, contact methods, footer copyright + 3 socials all
  confirmed present.
- `pnpm check` — **1 PRE-EXISTING ERROR** at `astro.config.ts:27` (the
  intentional IPv4-loopback `preview` block from upstream commit `3079e63`).
  Not caused by this session; house rule #5 forbids editing that file
  without operator permission. Runtime is unaffected — Astro accepts the
  key. Surfaced for operator decision.

**Operator decisions logged:**
- Yes: edit `config.yaml` `site` block.
- Yes: hero text-only for MVP (banner PNG only in header, vertical PNG in
  About).
- Yes: drop Privacy/Terms placeholder links.
- "Only remove Tier 1" — boilerplate sweep narrowed to the 3 unreferenced
  images; orphaned components (Timeline, Form, SocialShare, MarkdownLayout)
  all kept.

**Identified for next session:**
- Operator visual review of rendered site — especially header logo size and
  the withcopy.PNG copy mirror (I drafted blind, cannot OCR).
- Facebook URL still pending; pre-launch blocker.
- Domain registrar still pending; pre-launch blocker.
- Phase 3.5: blog re-enablement, optional hero image support, true vector
  favicon, and the `astro.config.ts` TS-error decision.

### 2026-07-18 — onboarding callout for next agent

Added a "New agent? Start here" blockquote to the top of this file making the
gating explicit: most *Next actions* depend on *Open questions* being
answered (client assets, copy, FB/IG URLs, contact info). Goal is to prevent
a fresh agent from charging ahead and filling in placeholder content with
guessed values. No project-state change — pure onboarding hygiene.

### 2026-07-18 — AGENTS.md identity fix

Follow-up to the README dedupe. Same bug class: AGENTS.md still wore the
template's name tag after the fork. Three identity conflicts with HANDOFF.md
fixed:
- Title: `astro-client-starter` -> `perp-terps`.
- Tagline: reframed from "reusable template, stripped to base" to "client
  website for The Perpetual Terpsters, forked from astro-client-starter".
- Architecture header: dropped "(what survived the strip)" parenthetical
  (template-era framing).

Left intentionally untouched (true today, will change when the work lands):
- House rule #1 + verification checklist still say "five sections" — will
  become six when blog is re-enabled (per *Next actions*).
- Config system note still says "Blog is disabled" — will flip with the
  blog re-enablement work.

No project-state change — pure doc hygiene.

### 2026-07-18 — README dedupe + identity fix

Follow-up to the kickoff commit. Audited README.md against HANDOFF.md +
AGENTS.md and found three conflicts and significant redundancy:
- README title still said `astro-client-starter` (template, not client site).
- Tagline described the repo as a reusable template — wrong framing.
- Deploy instructions said `main`; actual default branch is `master`.

Rewrote README to a tight human-facing doc: client identity, run commands,
Node requirement, pointers to HANDOFF.md and AGENTS.md. Removed sections that
duplicated AGENTS.md house rules (Editing content, Contact form, Deploy).
Removed the irrelevant upstream AstroWind link.

No project-state change — pure doc hygiene. Next session proceeds per the
*Next actions* checklist above.

### 2026-07-18 — kickoff audit + handoff creation

**Context:** first agent session on this client fork. Inherited
`OGHANDOFF.md` (untracked) was a Phase-1/2 brief from the upstream template
that incorrectly described Phase 2 as "not done" — but Phase 2 (the template)
had already shipped via commit `4342272`, and this repo is the Phase-3 fork.

**Audited and verified:**
- Repo state: 4 commits, all inherited from upstream (`4342272` scaffold +
  `aa0dfc8`/`3079e63`/`9ba7232` devcontainer polish). `origin/master` in sync.
- Template completeness: all five sections, `vendor/integration/`, Netlify
  Forms + `public/netlify-form.html` mirror, AGENTS.md, devcontainer — all
  present and matching the template's design.
- Content state: every editable file (`src/config.yaml`, `src/content/*.md`,
  `src/navigation.ts`) still contains placeholder copy. No client
  customization has landed.

**Changed this session:**
- Removed `public/decapcms/` — Decap CMS admin UI contradicted the template's
  "no CMS" rule and wasn't linked from any page. Two-file delete, zero
  references elsewhere.
- Refreshed `AGENTS.md` architecture tree: added `Logo.astro`, `Favicons.astro`,
  `LandingLayout.astro`, `MarkdownLayout.astro`, and `src/utils/`. Fixed the
  `common/` comment (Favicons lives at `components/` root, not under `common/`).
- Added `AGENTS.md` → *Handoff convention* subsection documenting the
  session-end update rule (refresh Current state + Next actions, append
  Session log entry).
- Deleted the stale inherited `OGHANDOFF.md` — superseded by this file.
  Provenance recorded here.
- Created this `HANDOFF.md` as the per-client source of truth.

**Identified for next session:**
- Blog re-enablement is required (content + services hybrid) but is too big
  for the kickoff commit — it's a top-checkbox in *Next actions*.
- Phone + Gmail display needs a small ContactSection.astro schema extension
  (component work, not pure content).
- All content work is gated on client assets/copy — see *Open questions*.

**Next:** review this handoff with the client (or wait for their assets),
then execute *Next actions* top-to-bottom in Build mode.
