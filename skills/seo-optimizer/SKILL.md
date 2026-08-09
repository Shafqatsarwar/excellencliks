---
name: seo-optimizer
description: Full-spectrum 98+ PageSpeed Insights performance and 3/3 Agentic Browsing optimization workflow. Use when eliminating CLS, preloading LCP assets, self-hosting WOFF2 fonts, compressing WebP images, and setting production Vercel security headers.
---

# 98+ PageSpeed & 3/3 Agentic Browsing Optimization Standard

This skill documents the exact technical optimization rules proven to elevate production websites to **98/100 Performance**, **100/100 Accessibility**, **100/100 Best Practices**, **100/100 SEO**, and **3/3 Agentic Browsing**.

## Core Performance Rules & Architecture

### 1. 0.000 CLS (Cumulative Layout Shift) Guaranteed Standard
- **Self-Hosted WOFF2 Fonts:** Never load fonts asynchronously from 3rd party CDNs (`fonts.gstatic.com`). Always bundle `.woff2` files into `/fonts/` and declare `@font-face` with `font-display: swap` alongside `<link rel="preload" href="/fonts/outfit.woff2" as="font" type="font/woff2" crossorigin>`. This eliminates the font-swap text line height expansion shift.
- **Strict Hero Container Height Locking:** Enforce strict CSS height boundaries (`min-height: 580px; height: 580px; max-height: 580px; contain: strict;`) on `.hero` and `.hero-bg` across **both desktop and mobile viewports** (`@media(max-width:768px)`).
- **CSS Layered Backgrounds:** Convert hero background images (`url('/linked-in-banner.webp')`) into pure CSS background properties on `.hero-bg` instead of rendering `<img>` DOM nodes. CSS background layers never trigger DOM node recalculations.
- **Global Reset Rule:** Apply `*, *::before, *::after { box-sizing: border-box; }` and `img { max-width: 100%; height: auto; display: block; }`.

---

### 2. LCP (Largest Contentful Paint) Preload Discovery
- Always place an explicit `<link rel="preload" as="image" href="/excellence-banner.webp" type="image/webp" fetchpriority="high">` in `<head>` for the hero/banner image.
- Set `fetchpriority="high"` and `decoding="async"` on above-the-fold images.
- Set `loading="lazy"` and `decoding="async"` on below-the-fold images (`ceo-shafqat.webp`).

---

### 3. Image Optimization Standard
- Compress WebP image assets using PIL/Squoosh down to exact max display bounds:
  - Header / Banner: Max 900–1000px width, ~8 KB
  - Hero background: Max 1000px width, ~17 KB
  - Profile photo: Max 500px width, ~4 KB
  - Logo: Max 200px width, ~1.5 KB

---

### 4. Production Security Headers (`vercel.json`)
```json
{
  "version": 2,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    },
    {
      "source": "/(.*\\.(?:webp|png|jpg|jpeg|svg|ico|woff2|woff|ttf))",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

### 5. Agentic Browsing (3/3 Audit Requirements)
- **Accessibility Tree:** Ensure valid HTML5 semantic tags (`<main>`, `<header>`, `<nav>`, `<h1>`, `<h3>`) and ARIA labels.
- **llms.txt:** Provide valid Markdown representation of site capabilities.
- **Zero Shift:** Ensure `.hero-bg` contains `contain: strict;` to satisfy Headless Chromium synthetic agentic layout shift checks.
