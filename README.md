# astro-client-starter

A client-website template built on **Astro v6** + **Tailwind CSS v4**, derived
from [AstroWind](https://github.com/arthelokyo/astrowind) and stripped to a
reusable five-section base: **hero, about, services, contact, footer**.

All copy lives in `src/content/*.md` — edit Markdown, not components. Deploy to
Netlify by pushing to `main`.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:4321
```

Build / verify:

```bash
pnpm build    # outputs ./dist/
pnpm check    # astro check + ESLint + Prettier
```

**Requires Node.js >= 22.12.0.**

## Editing content

- Section copy → `src/content/{hero,about,services,contact,footer}.md` (Markdown frontmatter)
- Site name, SEO, theme → `src/config.yaml`
- Colors / fonts → `src/assets/styles/tailwind.css` + `src/components/CustomStyles.astro`
- Header nav → `src/navigation.ts`

## Contact form

Uses [Netlify Forms](https://docs.netlify.com/forms/setup/) — no serverless
functions. The styled form is in `src/components/sections/ContactSection.astro`,
with a static detection mirror at `public/netlify-form.html`. Keep the field
names in sync between the two.

## Deploy

Push to `main` — Netlify builds with `pnpm build` and publishes `dist/`
(see `netlify.toml`).
