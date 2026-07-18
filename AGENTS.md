# AGENTS.md — perp-terps

Client website for **The Perpetual Terpsters Homegrow Gardening**
(perpterps.com), forked from the `astro-client-starter` template (itself
derived from AstroWind). Built on **Astro v6** + **Tailwind CSS v4**. Content
lives in Markdown; deploys go to Netlify via `git push` to `master`. See
`HANDOFF.md` for project state and next actions.

## House rules (read before editing)

1. **Content lives in `src/content/` — never hardcode copy in components.**
   Section copy for `hero`, `about`, `services`, `contact`, and `footer` is edited
   as Markdown frontmatter in `src/content/*.md`. Components in
   `src/components/sections/` consume that data; they must contain **zero** user-
   facing copy. The only strings allowed in components are structural/semantic
   (e.g. a `sr-only` label). Site-level metadata (name, SEO, theme) lives in
   `src/config.yaml`.

2. **Colors and fonts via Tailwind config + CSS variables only.**
   - Theme tokens are defined in `src/assets/styles/tailwind.css` (`@theme` block:
     `--color-primary`, `--color-secondary`, etc., plus `@utility` helpers like
     `bg-page`, `text-muted`, `btn`, `btn-primary`).
   - The raw CSS variables (`--aw-color-*`, `--aw-font-*`, light/dark) live in
     `src/components/CustomStyles.astro`.
   - Do **not** inline hex colors or one-off font stacks in components. Use the
     tokens (`text-primary`, `bg-page`, `text-muted`, `font-heading`, …).

3. **Use `pnpm`, never `npm` or `yarn`.** Install with `pnpm install`, run scripts
   with `pnpm <script>`. The lockfile (`pnpm-lock.yaml`) is committed.

4. **Netlify Forms is the contact solution — no serverless functions.**
   - The form is `src/components/sections/ContactSection.astro`
     (`name="contact"`, `data-netlify="true"`, hidden `form-name` input).
   - Because Astro is SSG, a static mirror exists at
     `public/netlify-form.html` so Netlify's detector finds the form. Keep field
     names in sync between the two.

5. **Do not edit `netlify.toml` or `astro.config.ts` without asking.** These are
   load-bearing for build/deploy. Same goes for `src/config.yaml`'s `site` block
   (affects sitemaps, SEO, permalinks).
   - Exception: the `server.host` / `preview.host` settings (`'127.0.0.1'`) are
     **intentional**. They force IPv4 loopback so the dev/preview server is
     reachable through Codespace/VS Code port-forwarding (Astro otherwise binds
     IPv6-only `::1`, which the forwarder can't hit). Don't remove them.

## Commands

| Command        | Purpose                           |
| -------------- | --------------------------------- |
| `pnpm dev`     | Dev server at `localhost:4321`    |
| `pnpm build`   | Production build to `./dist/`     |
| `pnpm preview` | Preview the production build      |
| `pnpm check`   | `astro check` + ESLint + Prettier |
| `pnpm fix`     | Auto-fix ESLint + Prettier        |

**Node.js:** >= 22.12.0

## Architecture

```
src/
  content.config.ts        # `sections` collection (glob: src/content/*.{md,mdx})
  content/                 # EDITABLE COPY — hero/about/services/contact/footer
    hero.md  about.md  services.md  contact.md  footer.md
  components/
    sections/              # HeroSection, AboutSection, ServicesSection, ContactSection
    widgets/               # Header, Footer (site chrome)
    common/                # Image, Metadata, ApplyColorMode, ToggleTheme, …
    ui/                    # Button, Headline, WidgetWrapper, Form (primitives)
    Logo.astro             # brand lockup (renders SITE.name)
    Favicons.astro         # <link rel="icon"> tags (consumes src/assets/favicons/)
    CustomStyles.astro     # CSS variables (colors, fonts, light/dark)
  layouts/
    Layout.astro           # <head>: metadata, favicons, analytics PLACEHOLDER
    PageLayout.astro       # Header + <main> + Footer (footer loaded from content)
    LandingLayout.astro    # section-based page wrapper used by index.astro
    MarkdownLayout.astro   # renders standalone Markdown pages
  pages/
    index.astro            # Home: loads 4 section entries, renders sections
    404.astro
  utils/                   # permalinks, frontmatter, image helpers used by sections
  assets/styles/tailwind.css   # Tailwind v4 theme tokens + utilities
  config.yaml              # site metadata, SEO, theme (loaded via astrowind:config)
  navigation.ts            # header nav links/actions
vendor/integration/        # loads config.yaml as the `astrowind:config` virtual module
```

### Path alias

`~/` → `src/` (configured in `astro.config.ts` and `tsconfig.json`).

### Config system

`src/config.yaml` is loaded by `vendor/integration/` as the virtual module
`astrowind:config`, exporting `SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`,
`ANALYTICS`. Blog is disabled (defaults); analytics is intentionally absent —
see the placeholder in `src/layouts/Layout.astro`.

## Verification checklist

After changes, confirm:

1. `pnpm build` succeeds
2. `pnpm check` passes
3. Homepage renders all sections (hero, about, services, contact, footer) with no
   console errors; dark mode and mobile menu still work

## Handoff convention

`HANDOFF.md` at the repo root is the living source of truth for project state
and next actions. It is structured as:

1. **Current state** — what the project is *today*. Always overwritten to
   reflect reality at session end.
2. **Next actions** — checklist of immediate work, grouped by area.
3. **Open questions** — anything gating the next actions (client assets, copy,
   decisions).
4. **Session log** — append-only, newest-at-top. One dated entry per agent
   session recording what changed and what's now next. Don't rewrite history —
   the log is the audit trail.

**Every agent session ends by** (1) refreshing *Current state* and *Next
actions*, (2) appending a dated entry to *Session log*. New agents should read
`HANDOFF.md` first before consulting the rest of the docs.
