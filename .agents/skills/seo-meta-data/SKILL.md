---
name: seo-meta-data
description: Enterprise SEO metadata, Open Graph, Twitter cards, Canonical links, and Schema.org JSON-LD structured data generator. Use when setting up metadata, search engine indexing rules, robots.txt, sitemap.xml, or rich snippets.
---

# Enterprise SEO & Structured Metadata Standard

This skill encapsulates the exact metadata architecture engineered to achieve 100/100 SEO scores and rich search snippets across Google, LinkedIn, and social platforms.

## Core Metadata Standard

Every HTML page must include the following structured `<head>` block:

```html
<!-- Primary Technical & Search Indexing Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ExcellenceLinks — Agentic AI Employees, Multi-Agent Systems & Enterprise Workflow Automation</title>
<meta name="description" content="ExcellenceLinks specializes in Agentic AI Employees, multi-agent systems, RAG pipelines, and operational workflow automation for SMEs in Pakistan, UK, and worldwide. Cut workload by 60-70%.">
<meta name="keywords" content="ExcellenceLinks, Agentic AI, AI Employees, Multi-Agent Systems, Enterprise Workflow Automation, CrewAI, LangChain, OpenAI Agents SDK, RAG Pipelines, Python AI Automation">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="ExcellenceLinks">
<link rel="canonical" href="https://excellencelinks.vercel.app/">
<link rel="icon" type="image/webp" href="/excellence-logo.webp">
<link rel="apple-touch-icon" href="/excellence-logo.webp">
<meta name="theme-color" content="#D4AF37">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://excellencelinks.vercel.app/">
<meta property="og:title" content="ExcellenceLinks — Agentic AI Employees & Enterprise Workflow Automation">
<meta property="og:description" content="Deploy 24/7 autonomous AI Employees, multi-agent workflows, and RAG pipelines for your business. Cutting response times to under 60 seconds and reducing manual workload by 60–70%.">
<meta property="og:image" content="https://excellencelinks.vercel.app/excellence-banner.webp">
<meta property="og:site_name" content="ExcellenceLinks">
<meta property="og:locale" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://excellencelinks.vercel.app/">
<meta name="twitter:title" content="ExcellenceLinks — Agentic AI Employees & Enterprise Automation">
<meta name="twitter:description" content="Autonomous AI Employees and multi-agent systems engineered for SMEs in Pakistan, UK, and global enterprises.">
<meta name="twitter:image" content="https://excellencelinks.vercel.app/excellence-banner.webp">
```

---

## Schema.org JSON-LD Multi-Graph

Embed multi-entity structured graphs inside `<script type="application/ld+json">`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://excellencelinks.vercel.app/#organization",
      "name": "ExcellenceLinks",
      "url": "https://excellencelinks.vercel.app/",
      "logo": "https://excellencelinks.vercel.app/excellence-logo.webp",
      "image": "https://excellencelinks.vercel.app/excellence-banner.webp",
      "description": "ExcellenceLinks is an enterprise Agentic AI development company specializing in autonomous AI Employees, multi-agent systems, and business workflow automation.",
      "foundingDate": "2010",
      "founder": {
        "@type": "Person",
        "name": "Shafqat Sarwar",
        "jobTitle": "Founder & CEO"
      },
      "areaServed": ["Pakistan", "United Kingdom", "Worldwide"]
    },
    {
      "@type": "WebSite",
      "@id": "https://excellencelinks.vercel.app/#website",
      "url": "https://excellencelinks.vercel.app/",
      "name": "ExcellenceLinks",
      "description": "Agentic AI Employees & Enterprise Automation"
    },
    {
      "@type": "Service",
      "@id": "https://excellencelinks.vercel.app/#service-ai-employees",
      "name": "Agentic AI Employees & Multi-Agent Systems",
      "provider": {
        "@id": "https://excellencelinks.vercel.app/#organization"
      }
    }
  ]
}
```

---

## Valid XML Sitemap & Robots.txt Specifications

### 1. `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://excellencelinks.vercel.app/</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
</urlset>
```

### 2. `robots.txt`
```text
User-agent: *
Allow: /

Sitemap: https://excellencelinks.vercel.app/sitemap.xml
```
