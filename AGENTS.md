# AGENTS.md

Guidance for working on this portfolio (for both humans and AI agents).

## Stack

- **Astro** static site (`output: static`). Builds to `dist/`.
- No framework UI libraries — plain `.astro` components + inline `<script>` for
  the original vanilla-JS behavior (AOS, image modal, skill tabs, certificate
  filter, flower canvas, Gmail compose).
- Styling lives in `public/assets/css/index.css` (unchanged from the original
  site). Bootstrap 4.5, Font Awesome, and AOS are loaded from CDNs in
  `src/layouts/BaseLayout.astro`.

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Project layout

```
public/assets/              # images, css, fonts, datafiles (served at /assets/...)
src/
  layouts/BaseLayout.astro  # <head>, CDN <link>/<script>, page shell
  pages/index.astro         # the single page, assembled from components
  components/               # Cover, Profile, Projects, Skills, Certificates, Footer, ClientScripts
  content/                  # content collections (the editable data) ← add entries here
  content.config.ts         # collection schemas (Zod)
```

## Adding new content

The **Projects**, **Skills**, and **Certificates** sections are powered by
[Astro content collections](https://docs.astro.build/en/guides/content-collections/).
To add an entry you create a new Markdown file — no component edits needed.
Each file's frontmatter is validated against `src/content.config.ts`; the build
fails with a clear message if a required field is missing or mistyped.

Entries are ordered by the `order` number (ascending), so set it to place the
item where you want it.

### Add a Project

Create `src/content/projects/<your-slug>.md`:

```md
---
title: My New Project
image: /assets/img/your-image.png   # put the file in public/assets/img/
alt: Short description of the image
tags: [Django, React, PostgreSQL]   # rendered as tag chips
description: One or two sentences about the project.
github: https://github.com/you/repo # optional — omit or use "" for no link
order: 8                             # higher = lower on the page
---
```

### Add a Skill group (a tab)

Create `src/content/skills/<group-id>.md`. Each file is one tab in the Skills
section. Icons are Font Awesome classes.

```md
---
id: devops                 # must be unique; used as the tab's element id
icon: fas fa-cloud         # icon shown on the tab and heading
label: DevOps
order: 6
items:
  - { icon: fab fa-aws, name: AWS }
  - { icon: fas fa-server, name: Nginx }
---
```

To add a skill to an **existing** tab, edit that group's `items:` list.

### Add a Certificate or Seminar

Create `src/content/certificates/<NN>-<slug>.md`. `category` must be either
`seminar` or `certificate` (this drives the Show All / Seminars / Certificates
filter).

```md
---
category: certificate              # "seminar" or "certificate"
image: /assets/certificates/your-cert.png
alt: Certificate name
caption: "Certificate Title | Issuer"   # quote if it contains a colon
date: March 2025
order: 13
---
```

## Editing the other sections

- **Cover** (`src/components/Cover.astro`) — the hero title, subtitle, and nav
  buttons.
- **Profile** (`src/components/Profile.astro`) — bio, contact details, and
  education. This is prose, so it's edited directly in the component (not a
  collection).
- **Footer** (`src/components/Footer.astro`) — social links and contact info
  (the `socials` array).
- The "Let's Work Together" email template lives in
  `src/components/ClientScripts.astro` (`openGmail()`).

## Images

Keep images under `public/assets/`. Reference them with an absolute path from
the site root, e.g. `/assets/img/me.jpg`. Do not delete existing images —
several are reused across projects and certificates.

## Notes

- The three placeholder certificate images point at `https://via.placeholder.com`
  (carried over from the original site). Replace those `image:` values once the
  real certificate scans are available.
- Always run `npm run build` before committing to confirm collection frontmatter
  is valid.
