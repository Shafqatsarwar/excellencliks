const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config();

const PORT = 3000;
const MIME = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml',
  '.ico':'image/x-icon','.pdf':'application/pdf','.webp':'image/webp'
};

async function handleContact(body) {
  const { name, email, phone, subject, message } = body;
  if (!name || !email || !message) return { status: 400, json: { error: 'Name, email, and message are required' } };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: 'khansarwar1@hotmail.com',
    replyTo: email,
    subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0e1320;color:#e8eaf0;border-radius:12px;"><h2 style="color:#D4AF37;">📬 New Message from ${name}</h2><p><strong>Email:</strong> ${email}</p>${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}<p><strong>Subject:</strong> ${subject || 'N/A'}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p></div>`
  });

  return { status: 200, json: { success: true, message: 'Message sent!' } };
}

async function handleChat(body) {
  const { message, history } = body;
  if (!message) return { status: 400, json: { error: 'Message is required' } };

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return { status: 500, json: { error: 'API key not configured' } };

  const systemPrompt = {
    role: 'user',
    parts: [{ text: `You are Shafqat Sarwar's AI assistant. You represent Shafqat Sarwar — an Agentic AI Developer, AI Automation Engineer, and Founder of ExcellenceLinks and TheMindGauge.

Your purpose: Answer questions about Shafqat's skills, experience, projects, and services. Be professional, helpful, and concise.

About Shafqat:
- Agentic AI Developer with 14+ years exp, now 100% focused on AI Employees, multi-agent systems, workflow automation
- Founder of Excellence Links (est. 2010) and Executive Director of The Mind Gauge (est. 2012)
- Built 6 live AI products across 10+ SME clients in Pakistan and UK
- Reduces manual workload by 60-70% and cuts response time from hours to under 60 seconds
- Expert in: CrewAI, LangChain, OpenAI Agents SDK, MCP, Python, FastAPI, RAG pipelines, vector stores, agent memory
- Live projects: TheMindGauge, LinkedIn AI Agent, AI Assistant 24/7, OpenClaw AI Agent Platform, Secure Alerts, JoinQuran
- Education: MS Network & System Admin (Virtual Uni), MCS (Quaid-e-Azam Uni), BA Social Sciences (BZU)
- Contact: excellencelinks@hotmail.com | WhatsApp: +92 324 427 9017
- LinkedIn: linkedin.com/in/shafqatsarwar | GitHub: github.com/Shafqatsarwar

Rules:
1. Be friendly, professional, and enthusiastic
2. If asked about services, explain AI Employee solutions, custom agent development, workflow automation
3. If asked about pricing, suggest contacting via the contact form or WhatsApp
4. Keep responses concise (2-4 sentences ideally)
5. If you don't know something, say you'll have Shafqat follow up directly
6. Never make up technical details
7. Always mention the WhatsApp link (wa.me/923244279017) when relevant` }]
  };

  const contents = history && history.length > 0
    ? [...history, { role: 'user', parts: [{ text: message }] }]
    : [systemPrompt, { role: 'user', parts: [{ text: message }] }];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    return { status: 200, json: { reply: 'Thanks for your question! 🙏 The AI assistant needs a fresh API key to respond. Please get a new key at https://aistudio.google.com/apikey and update the .env file, then restart the server. Or reach me directly on WhatsApp wa.me/923244279017', history: [] } };
  }

  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Thanks for your question! Please contact me directly on WhatsApp at +92 324 427 9017 for a detailed response.';
  const updatedHistory = [...(history || []), { role: 'user', parts: [{ text: message }] }, { role: 'model', parts: [{ text: reply }] }];

  return { status: 200, json: { reply, history: updatedHistory } };
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // API Routes
  if (req.url === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const result = await handleContact(JSON.parse(body));
        res.writeHead(result.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.json));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const result = await handleChat(JSON.parse(body));
        res.writeHead(result.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.json));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Static files
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  try {
    const data = await fs.promises.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`\n  🚀 Server running at http://localhost:${PORT}`);
  console.log(`  📁 Serving static files from ${__dirname}`);
  console.log(`  ✉️  Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`  🤖 Chat API:    http://localhost:${PORT}/api/chat\n`);
});
