# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal resume/portfolio site hosted on GitHub Pages. There is no build step, no package manager, and no framework — it's plain HTML/CSS/JS deployed directly by pushing to `master`.

## Structure

- `index.html` — the entire site; single-page layout with anchor-linked sections (About, Skills, Experience, Education, Contact)
- `styles/main.css` — all custom styles, built on top of Now UI Kit v1.1.0
- `scripts/main.js` — jQuery-based: AOS initialization, smooth-scroll, and a countTo animation plugin
- `css/` — vendor CSS (Bootstrap 4, AOS)
- `js/` — vendor JS (AOS, Now UI Kit, jQuery plugins)
- `images/` — profile photo and background images; `og-image.png` is the 1200×630 social-share card referenced by the Open Graph tags
- `files/` — static assets for download (e.g. `resume.pdf`)
- `robots.txt` / `sitemap.xml` — SEO crawler files; bump `<lastmod>` in the sitemap when content changes
- `index.html` `<head>` carries the SEO surface: canonical URL, Open Graph/Twitter meta, and a JSON-LD Person/WebSite/ProfilePage graph — keep these in sync when titles, roles, or social links change

## Development

Open `index.html` directly in a browser — no server needed. For live reload, `python3 -m http.server` or any static file server works.

All content edits happen in `index.html`. Style overrides go in `styles/main.css`. Behavior changes go in `scripts/main.js`.

## Deployment

Push to `master` — GitHub Pages serves the site automatically from the repo root.
