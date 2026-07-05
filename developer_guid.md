# Developer Guide — ExcellenceLinks Portfolio

## Project Structure

```
excellencliks/
├── index.html               # Main portfolio (single file — all CSS/JS inline)
├── Excellencelinks.html     # Redirects to index.html
├── server.js                # Local dev server (Node.js)
├── package.json             # Dependencies: nodemailer, dotenv
├── .env                     # ⚠️ Environment variables (DO NOT COMMIT)
├── .gitignore               # Ignores .env, node_modules, .vercel
├── vercel.json              # Vercel deployment config
├── api/
│   ├── contact.js           # POST /api/contact — sends email via SMTP
│   └── chat.js              # POST /api/chat — Google Gemini chatbot proxy
├── reference images/        # Source PDFs & screenshots (not linked in site)
├── ceo-shafqat.jpg          # Profile photo
├── excellence-logo.jpg      # Logo
├── excellence-banner.png    # Company banner
└── Linked in Banner.png     # Hero background image
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with your credentials
# See "Environment Variables" section below

# 3. Start local server
node server.js

# 4. Open in browser
# → http://localhost:3000
```

## Environment Variables

Create a `.env` file in the root:

```env
# SMTP — for contact form email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com

# Google Gemini — for chatbot
GOOGLE_API_KEY=your_gemini_api_key
```

**Getting a Gmail App Password:**  
Google Account → Security → 2-Step Verification → App Passwords → Select "Mail" → Copy 16-char password

**Getting a Gemini API Key:**  
Visit https://aistudio.google.com/apikey → Create API Key

## Commands

| Command | Purpose |
|---------|---------|
| `node server.js` | Start local server at port 3000 |
| `npm install` | Install dependencies (nodemailer, dotenv) |
| `vercel --prod` | Deploy to production |

## Dependencies

Only 2 packages needed:

- **nodemailer** — sends contact form emails via SMTP
- **dotenv** — loads .env variables into process.env

## How It Works

- **index.html** is fully self-contained (no build step, no framework)
- **server.js** serves static files + handles `/api/contact` and `/api/chat`
- Contact form POSTs to `/api/contact` → nodemailer sends email to khansarwar1@hotmail.com
- Chatbot POSTs to `/api/chat` → proxies to Google Gemini API with system prompt about Shafqat
- On Vercel, `api/contact.js` and `api/chat.js` run as serverless functions instead of server.js

## Customization

- **Content/text:** Edit directly in `index.html`
- **Colors:** CSS variables in `<style>` block at top of `index.html`
- **Chatbot prompt:** Edit `systemPrompt` in `api/chat.js` or `server.js`
- **Email template:** Edit HTML string in `api/contact.js` or `server.js`

### opencode -s ses_0d054f1daffeeRF1cMwuhFdLNQ
