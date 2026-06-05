import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Projects: each project is one .md file in src/content/projects/.
// Add a new project by copying any file and editing its frontmatter.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    github: z.string().optional().default(""),
    order: z.number().default(0),
  }),
});

// Skills: each .md file is one skill group (a tab) with its list of items.
const skills = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/skills" }),
  schema: z.object({
    id: z.string(),
    icon: z.string(),
    label: z.string(),
    items: z.array(
      z.object({
        icon: z.string(),
        name: z.string(),
      })
    ),
    order: z.number().default(0),
  }),
});

// Certificates: each .md file is one seminar/certificate entry.
const certificates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/certificates" }),
  schema: z.object({
    category: z.enum(["seminar", "certificate"]),
    image: z.string(),
    alt: z.string(),
    caption: z.string(),
    date: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { projects, skills, certificates };
