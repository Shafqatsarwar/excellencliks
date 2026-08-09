# ExcellenceLinks — Enterprise Developer & System Operations Guide

> **Internal Maintenance & Architecture Documentation**  
> **Author & Owner:** Shafqat Sarwar (Founder & CEO, ExcellenceLinks)  
> **Last Updated:** August 2026

---

## 1. Project Architecture & File System

The repository is built as a lightweight, zero-dependency, ultra-fast B2B web application with a serverless Node.js backend layer designed for Vercel deployment.

```
excellencliks/
├── public/                    # 📁 Production Static Assets & Public Folder
│   ├── excellence-banner.png  # Hero Banner Image (Single Source of Truth)
│   ├── excellence-logo.jpg    # Official Brand Logo
│   ├── ceo-shafqat.jpg        # Founder & CEO Profile Photo (44px avatar)
│   ├── Linked in Banner.png   # Secondary Brand Banner Asset
│   ├── excellencliks-main.zip # Full Repository Backup Archive
│   ├── robots.txt             # Search Engine Crawler Directives
│   ├── sitemap.xml            # XML Sitemap (excellencelinks.com & vercel.app)
│   ├── site.webmanifest       # PWA Mobile Application Manifest
│   ├── context.md             # Core Business Context Document
│   └── developer_guid.md      # Public/Developer Reference Copy
├── api/                       # ⚡ Vercel Serverless Function Endpoints
│   ├── contact.js             # POST /api/contact — Nodemailer SMTP Forwarder
│   └── chat.js                # POST /api/chat — Gemini AI Chatbot Proxy & Link Parser
├── index.html                 # 🎨 Primary Landing Page (HTML5 + CSS Tokens + JS Scroll Reveal)
├── server.js                  # 🚀 Local Express Node Development Server (Port 3000)
├── package.json               # Node Package Dependencies (`dotenv`, `nodemailer`)
├── .env                       # 🔒 Environment Secrets (DO NOT COMMIT TO GIT)
├── .gitignore                 # Excludes `.env`, `node_modules`, `.vercel`
├── robots.txt                 # Root Crawler Directive
├── sitemap.xml                # Root XML Sitemap
├── site.webmanifest           # Root Web Application Manifest
├── vercel.json                # Vercel Serverless Route Handler Configuration
└── README.md                  # 🌐 Public GitHub Showcase Documentation
```

---

## 2. Environment Configuration (`.env`)

Create or update your local `.env` file with active production credentials:

```env
# ── SERVER CONFIGURATION ──
PORT=3000
NODE_ENV=development

# ── DOMAINS & PUBLIC CONTACTS ──
NEXT_PUBLIC_SITE_URL="https://excellencelinks.vercel.app"
NEXT_PUBLIC_EMAIL="excellencelinks@hotmail.com"
NEXT_PUBLIC_PHONE_UK="+442081239145"
NEXT_PUBLIC_WHATSAPP="+923244279017"
NEXT_PUBLIC_LINKEDIN_URL="https://www.linkedin.com/company/134524073/"
NEXT_PUBLIC_FACEBOOK_URL="https://www.facebook.com/excellencelinks/"
NEXT_PUBLIC_GITHUB_URL="https://github.com/Shafqatsarwar"

# ── NODEMAILER SMTP EMAIL SETTINGS ──
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=exellencelinks@gmail.com
SMTP_PASSWORD=slzlqtytmmkmrvpq
EMAIL_FROM=exellencelinks@gmail.com
EMAIL_TO=excellencelinks@hotmail.com

# ── ADMINISTRATIVE CREDENTIALS ──
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Abcd!234
JWT_SECRET=excellencelinks_jwt_secret_key_2026

# ── GOOGLE AI GEMINI CHATBOT ──
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 3. Local Development & Operational Commands

### Start Local Express Server:
```bash
node server.js
```
- Access Website: `http://localhost:3000`
- Test Contact API: `http://localhost:3000/api/contact`
- Test AI Chatbot API: `http://localhost:3000/api/chat`

### Sync Assets to `public/` Folder:
```powershell
Copy-Item -Path "robots.txt", "sitemap.xml", "site.webmanifest" -Destination "public\" -Force
```

### Deploy to Vercel Production:
```bash
vercel --prod
```

---

## 4. How to Update Site Content & Features

### A. Updating Founder & CEO Profile
1. **Photo**: Replace `ceo-shafqat.jpg` in both root and `/public` directories.
2. **Profile Link**: Both the hero visual and executive card link directly to `#experience` (**Career & Professional Experience**).
3. **Location Standard**: Maintain exact location string across all components:
   `London, UK / Pakistan (Remote)`

### B. Adding New Projects in `index.html`
Locate `<div class="proj-grid">` around line 980 and duplicate a card:
```html
<div class="card proj-card rv d1">
  <div class="proj-top"><div class="proj-icon ic-gold">🚀</div><span class="badge badge-live">✓ Live</span></div>
  <div class="proj-name">New AI Product Name</div>
  <p class="proj-desc">Description of autonomous AI workflows and tech stack.</p>
  <a href="https://yourdomain.com" target="_blank" class="proj-link">www.yourdomain.com</a>
</div>
```

### C. Updating AI Chatbot System Prompt & Link Parsing
To update system knowledge or link behavior in the chatbot:
- Modify `handleChat` in `server.js` and `api/chat.js`.
- The regex in `index.html` (`appendMsg`) automatically renders markdown links `[Contact form](#contact)` and `[WhatsApp](https://wa.me/...)` as clickable styled links.

---

## 5. Enterprise SEO & Indexing Maintenance

1. **Google Search Console**:
   - Inspect `https://excellencelinks.com/` and submit `https://excellencelinks.com/sitemap.xml`.
2. **Schema.org JSON-LD Verification**:
   - Verify structured data with [Google Rich Results Test](https://search.google.com/test/rich-results).
   - Validated schemas: `Organization`, `WebSite`, `Service` (AI Employees & Enterprise SEO), `FAQPage`.
3. **Crawl Budget Safeguard**:
   - Keep images in `/public` directory.
   - Do not re-introduce duplicated banner or hero photo tags in body content.

---

*ExcellenceLinks Internal Operations Manual — Confidential & Enterprise Ready.*
