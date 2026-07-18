# HANDOFF — perp-terps (The Perpetual Terpsters)

> Living doc. Each agent session: refresh **Current state** + **Next actions**,
> then append a dated entry to **Session log**. See `AGENTS.md` → *Handoff
> convention* for the full rule.

---

## Current state

- **Repo:** `perp-terps` — forked from the `astro-client-starter` template at
  upstream commit `9ba7232` (the template's last polish commit before this
  fork). Remote: `git@github.com:gaba-gaba-zab/perp-terps.git`, branch `master`.
- **Client:** **The Perpetual Terpsters Homegrow Gardening** — a cannabis-
  adjacent homegrow cultivation / gardening brand.
  - Display name (header, nav, logo lockup): **Perpetual Terpsters**
  - Full name (footer copyright, SEO title, `<title>` tag): **The Perpetual
    Terpsters Homegrow Gardening**
  - Target domain: **perpterps.com**
- **Site purpose:** content + services hybrid — educational grow content to
  drive traffic (blog/guides) plus a services/consulting offering that converts
  via the contact form. Products are a possible later addition.
- **Phase:** 3 kickoff (per-client). Template strip + devcontainer + AGENTS.md
  all landed via inherited commits. **No client-specific customization has
  shipped yet** — every content file still contains template placeholder copy
  ("Your Company", "We build fast, modern websites…").
- **Stack:** Astro v6 + Tailwind v4, pnpm, Netlify deploy. Dev environment
  (devcontainer + OpenCode + GLM-5.2) is inherited as-is from the template —
  see `.devcontainer/` and the upstream template's handoff for env details.

---

## Next actions

### Content

- [ ] `src/config.yaml`
  - `site.name`: `"Perpetual Terpsters"`
  - `site.site`: `"https://perpterps.com"`
  - SEO `metadata.title.default`: `"The Perpetual Terpsters Homegrow Gardening"`
  - `metadata.title.template`: `"%s — The Perpetual Terpsters Homegrow Gardening"`
  - `metadata.description`: brand-appropriate description
- [ ] `src/content/hero.md` — headline, subtitle, CTAs (need client copy)
- [ ] `src/content/about.md` — brand story / about copy (need client copy)
- [ ] `src/content/services.md` — services / consulting offerings + descriptions
  (need client copy)
- [ ] `src/content/contact.md` — tagline + subtitle copy
- [ ] `src/content/footer.md`
  - `footNote`: `"&copy; 2026 The Perpetual Terpsters Homegrow Gardening."`
  - `socialLinks`: replace GitHub + X with **Facebook** + **Instagram**
    - icons: `tabler:brand-facebook`, `tabler:brand-instagram`
    - ariaLabels: `"Facebook"`, `"Instagram"`
    - hrefs: pending client FB/IG URLs
  - `secondaryLinks`: add **phone** (`tel:+1…`) and **Gmail** (`mailto:…`)
    alongside the existing Privacy/Terms placeholders
- [ ] `src/navigation.ts` — nav links + CTA text
- [ ] Swap brand assets in `src/assets/`:
  - `favicons/{favicon.ico, favicon.svg, apple-touch-icon.png}` — brand mark
  - `images/hero-image.png` — hero visual
  - `images/default.png` — OG image (must comply with Meta/Google ad policies
    if paid social is ever planned)

### Component extension

- [ ] Extend `src/content/contact.md` schema with a `contactMethods` array
      (label, value, href, icon) for phone + email.
- [ ] Extend `src/components/sections/ContactSection.astro` to render the
      `contactMethods` block above/beside the form (~15 LOC).
      - Phone renders as `tel:` link, Gmail as `mailto:` link.
      - Keep the Netlify form intact (don't break form-name/hidden fields).

### Re-enable blog (significant — content + services hybrid needs it)

The template was deliberately stripped with `APP_BLOG` disabled. For this
client's "content + services" mix, the blog must come back.

- [ ] Flip `APP_BLOG` flag in `src/config.yaml`.
- [ ] Add a `blog` collection to `src/content.config.ts` (AstroWind's glob
      pattern is `src/content/blog/*.{md,mdx}` — well-documented upstream).
- [ ] Add `src/pages/blog/index.astro` (post listing) and
      `src/pages/blog/[...slug].astro` (post template using MarkdownLayout).
- [ ] Add a **Guides** entry to `src/navigation.ts`.
- [ ] Update `AGENTS.md` house rule #1 — "five sections" expands to include
      blog as a sixth editable content area.

### Brand / theme

- [ ] Pick color tokens in `src/assets/styles/tailwind.css` (`@theme` block:
      `--color-primary`, `--color-secondary`, …).
- [ ] Set raw CSS vars in `src/components/CustomStyles.astro`
      (`--aw-color-primary`, etc.) for both light + dark.
- [ ] Confirm typography (`--aw-font-*` in CustomStyles, `font-heading` /
      `font-default` usage in components).

### Regulated-niche considerations

- [ ] **Age gate (21+): DEFERRED** — educational + consulting framing likely
      doesn't require it; revisit only if product sales are added later.
      Decide between JS interstitial vs. server-side check at that point.
- [ ] **SEO:** lean into "homegrow gardening" framing in copy and slugs for
      ad-policy friendliness. Confirm `metadata.robots` is permissive (default
      `index: true, follow: true` is fine for educational content).
- [ ] **Payment processor:** DEFERRED — only relevant if commerce is added.
      Stripe/PayPal generally accept gardening/educational merchants; would
      need re-evaluation if the catalog shifts to direct cannabis products.

### Launch

- [ ] Create Netlify site, connect to this repo, configure `perpterps.com` DNS.
- [ ] Test Netlify Forms delivery → confirm submissions reach the client's
      Gmail inbox (check spam folder the first time).
- [ ] `pnpm build && pnpm check` pass clean.
- [ ] Verify mobile + dark mode + the IPv4-loopback dev server
      (see `AGENTS.md` house rule #5 — don't strip the `127.0.0.1` host!).

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

## Open questions (gate the next session)

- **Brand assets** — logo (vector preferred), hero photo, brand color palette.
  Received yet? If not, who's producing them and by when?
- **Contact info** — phone number + Gmail address for the contact section +
  footer?
- **Social URLs** — exact Facebook + Instagram profile URLs?
- **Copy** — is the client providing About + Services copy, or are we drafting
  from a brief for their review?
- **Initial blog topics / content calendar** — what are the first 3–5 guides
  or posts? (Drives whether blog launch blocks the MVP or follows it.)
- **Consulting pricing** — display "starting at $X", "request a quote", or
  hide pricing entirely?
- **Domain registrar** — does the client already own `perpterps.com`, or do we
  register it? Which registrar?
- **Age-gate jurisdictions** — only relevant once product sales are added, but
  worth noting the target market now (US states? specific countries?).

---

## Session log

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
