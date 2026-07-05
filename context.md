# Goal
Build a complete modern portfolio website for ExcellenceLinks / Shafqat Sarwar with company-first layout, contact form, WhatsApp link, and Google Gemini chatbot.
## Constraints & Preferences
Company first (ExcellenceLinks), then founder portfolio below
Colorful modern dark theme with gold/cyan/purple accents
Form inputs must have light backgrounds with dark text for readability
WhatsApp button: dark green (#1B5E20), no phone number text, just an icon
Chatbot toggle button: white/silver gradient
LinkedIn Banner.png as hero background image (faint watermark), profile picture in circular frame with orbits
Move all reference PDFs/screenshots to reference images/ folder
Keep site simple — no unnecessary packages or extra features
Must not deploy to Vercel until user confirms; run locally at localhost:3000

## Key Decisions
Company-first structure: hero leads with "ExcellenceLinks" branding, then Company section, then Founder/portfolio sections below
Single-file HTML (no build step) — keeps site simple and fast to edit
Light form inputs on dark theme — improves readability vs original dark-on-dark placeholders
LinkedIn Banner as subtle full-width hero background — keeps profile picture as focal point


## relevant files
index.html: Main portfolio page (single file, all CSS/JS inline)
server.js: Local dev server (port 3000)
api/contact.js: Serverless contact form → email
api/chat.js: Serverless Gemini chatbot proxy
.env: SMTP + Google API credentials
package.json: nodemailer + dotenv dependencies
developer_guid.md: Commands, env setup, structure reference
reference images/: Source PDFs and screenshots (not linked)
### Run commands:
Restart server: node server.js
Open http://localhost:3000 to review
After local approval, deploy with vercel --prod
Full restart command for future use:
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force; Start-Sleep 1; node server.js