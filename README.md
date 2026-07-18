# perp-terps

Client website for **The Perpetual Terpsters Homegrow Gardening**
(perpterps.com) — a cannabis-adjacent homegrow cultivation / gardening brand.
Built on Astro v6 + Tailwind v4; deploys to Netlify on push.

## Running locally

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # outputs ./dist/
pnpm check      # astro check + ESLint + Prettier
```

Requires Node.js >= 22.12.0.

## Project docs

- **[`HANDOFF.md`](./HANDOFF.md)** — current project state, next actions, and
  session log. Read this first if you're picking up work.
- **[`AGENTS.md`](./AGENTS.md)** — house rules for editing content, theme,
  forms, and load-bearing config. Read before touching code.

The default branch is `master`. Pushing to `master` triggers a Netlify build
(see `netlify.toml`).
