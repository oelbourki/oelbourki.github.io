# Search Console checklist (after deploy)

Do this once the SEO branch is live on **https://oelbourki.com**.

## 1. Confirm sitemap is live

Open these URLs (all should return **200**):

- https://oelbourki.com/robots.txt — `Sitemap:` should be `https://oelbourki.com/sitemap-index.xml`
- https://oelbourki.com/sitemap-index.xml
- https://oelbourki.com/sitemap-0.xml
- https://oelbourki.com/sitemap.xml — rewrite to the index (200)

Skim `sitemap-0.xml` for `/`, `/pensieve/`, post slugs, and `/archive/`.

## 2. Google Search Console

1. Property: `https://oelbourki.com` (URL-prefix).
2. **Sitemaps** → submit `https://oelbourki.com/sitemap-index.xml` (and/or `sitemap.xml`).
3. Wait until status is **Success** (can take hours).
4. **URL inspection** → request indexing for:
   - `https://oelbourki.com/`
   - `https://oelbourki.com/pensieve/`
   - One strong post (e.g. GraphRAG or multi-agent)

## 3. Profile link check

Confirm these still point at `https://oelbourki.com`:

- LinkedIn → Website
- GitHub profile → Website
- Hugging Face profile → Website

## 4. Spot-check share previews

- Homepage title/description match `siteMetadata` in `gatsby-config.js`
- A Pensieve post shows **post** title + description (not the homepage blurb)
- View source: `rel="canonical"`, Person + WebSite JSON-LD on the homepage
