# krishnacherukuri.com

Single-page, static portfolio focused on Data Science and Analytics in payments and financial services.

## Stack

- Plain HTML/CSS/vanilla JS
- Data-driven rendering from `/data/site.js`
- Markdown posts in `/content/posts/*.md`
- Static hosting compatible (GitHub Pages, Cloudflare Pages, Vercel static output, etc.)

## Project structure

- `/index.html` - semantic single-page shell
- `/style.css` - minimal responsive styling and accessibility states
- `/js/app.js` - data rendering + hash routing + markdown post loader
- `/data/site.js` - primary content/data source for the portfolio
- `/content/posts/*.md` - writing posts with frontmatter
- `/assets/resume.pdf` - resume download target (replace with your actual PDF)
- `/assets/favicon.svg` - favicon
- `/assets/og-cover.svg` - OpenGraph preview asset

## Edit content (`/data/site.js`)

Update these keys:

- `hero`: headline, subheadline, CTA URLs
- `impactTiles`: replace `XX` placeholder metrics with validated values
- `caseStudies`: problem/approach/result, tools, and metrics
- `skills`: keep concise and proof-first
- `experience`: impact bullets in `Did X -> resulting in Y` style
- `certifications`: name + issuer (+ optional year)
- `writing.posts`: metadata used for the writing cards and post routes
- `footer`: CTA text/URLs

Use existing `// REPLACE_ME` comments as placeholders for final metrics.

## Add a blog post

1. Create a file in `/content/posts/` using a kebab-case filename.
2. Add frontmatter at the top:

```md
---
title: "Your post title"
date: "YYYY-MM-DD"
tags: ["Tag1", "Tag2"]
description: "One-line summary"
---
```

3. Write content in Markdown below frontmatter.
4. Add the post metadata to `writing.posts` in `/data/site.js`:

```js
{
  slug: 'your-post-slug',
  title: 'Your post title',
  date: 'YYYY-MM-DD',
  tags: ['Tag1', 'Tag2'],
  description: 'One-line summary',
  file: '/content/posts/your-post-slug.md'
}
```

The homepage automatically shows the latest 3 posts by date.

## Local preview

Open `index.html` with a local static server (recommended so `fetch()` for markdown works):

- `python3 -m http.server` (from repo root), then open `http://localhost:8000`

## Deploy

This is a static site; deploy the repository output as-is.

Generic deploy flow:

1. Push changes to your main branch.
2. Configure static hosting to publish repository root.
3. Confirm custom domain points to host and HTTPS is enabled.
4. Verify `/CNAME` matches your domain (`www.krishnacherukuri.com`).

## Optional: `blog.krishnacherukuri.com` (separate deploy)

If you want a separate blog deployment later:

1. Create a `/blog/` output that reuses the same `style.css`, `/js/app.js`, and `/content/posts/`.
2. Publish `/blog/` as a separate static project.
3. Create DNS `CNAME` for `blog` pointing to your hosting provider target.
4. Enable HTTPS for the `blog` subdomain.
5. For GitHub Pages-style targets, `blog` is commonly a CNAME to `<username>.github.io`.

You can keep the main domain single-page and link writing cards to the subdomain if you later split deployments.
