import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const actionSchema = z.object({
  text: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'tertiary', 'link']).optional(),
  target: z.string().optional(),
  icon: z.string().optional(),
});

const itemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

const inputSchema = z.object({
  type: z.string().default('text'),
  name: z.string(),
  label: z.string().optional(),
  autocomplete: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  fullSpan: z.boolean().optional(),
});

const linkSchema = z.object({
  text: z.string(),
  href: z.string(),
});

const socialLinkSchema = z.object({
  ariaLabel: z.string(),
  icon: z.string(),
  href: z.string(),
});

const contactMethodSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string(),
  icon: z.string().optional(),
});

const sectionsCollection = defineCollection({
  loader: glob({ pattern: ['*.{md,mdx}'], base: 'src/content' }),
  schema: z.object({
    title: z.string().optional(),
    tagline: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),

    actions: z.array(actionSchema).optional(),
    items: z.array(itemSchema).optional(),

    inputs: z.array(inputSchema).optional(),
    textarea: z
      .object({
        name: z.string(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        rows: z.number().optional(),
        fullSpan: z.boolean().optional(),
      })
      .optional(),
    button: z.string().optional(),
    disclaimer: z.string().optional(),

    links: z.array(z.object({ title: z.string(), links: z.array(linkSchema) })).optional(),
    secondaryLinks: z.array(linkSchema).optional(),
    socialLinks: z.array(socialLinkSchema).optional(),
    contactMethods: z.array(contactMethodSchema).optional(),
    footNote: z.string().optional(),
  }),
});

export const collections = {
  sections: sectionsCollection,
};
