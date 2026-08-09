const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config();

const PORT = 3000;
const MIME = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml',
  '.ico':'image/x-icon','.pdf':'application/pdf','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain'
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
    from: `"${name}" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
    to: process.env.NEXT_PUBLIC_EMAIL || 'excellencelinks@hotmail.com',
    replyTo: email,
    subject: `ExcellenceLinks Inquiry: ${subject || 'New Message'} from ${name}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0e1320;color:#e8eaf0;border-radius:12px;"><h2 style="color:#D4AF37;">📬 New Inquiry from ${name}</h2><p><strong>Email:</strong> ${email}</p>${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}<p><strong>Subject:</strong> ${subject || 'N/A'}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p></div>`
  });

  return { status: 200, json: { success: true, message: 'Message sent!' } };
}

function getFallbackReply(message) {
  const msg = (message || '').toLowerCase();
  if (msg.includes('service') || msg.includes('offer') || msg.includes('what do you do') || msg.includes('solution') || msg.includes('help')) {
    return "ExcellenceLinks specializes in 24/7 autonomous AI Employees, multi-agent systems, RAG search pipelines, WhatsApp business automation, and custom workflow integration for SMEs. Please send us a message via our [Contact form](#contact) or [WhatsApp](https://wa.me/923244279017) for details.";
  }
  if (msg.includes('shafqat') || msg.includes('founder') || msg.includes('ceo') || msg.includes('team') || msg.includes('experience')) {
    return "ExcellenceLinks was founded in 2010 by Shafqat Sarwar, Founder & CEO with 15+ years of software experience delivering AI automation across Pakistan & the UK. Please send us a message via our [Contact form](#contact) or [WhatsApp](https://wa.me/923244279017) for a personalized quotation.";
  }
  if (msg.includes('project') || msg.includes('product') || msg.includes('mindgauge') || msg.includes('joinquran') || msg.includes('openclaw')) {
    return "ExcellenceLinks has built 6 live AI products including [TheMindGauge](https://themindgauge.com), [JoinQuran](https://www.joinquran.com), OpenClaw, and Secure Alerts. Please send us a message via our [Contact form](#contact) or [WhatsApp](https://wa.me/923244279017) for a personalized quotation.";
  }
  return "We provide customized AI Employee solutions tailored to your operational needs. Please send us a message via our [Contact form](#contact) or [WhatsApp](https://wa.me/923244279017) for a personalized quotation.";
}

async function handleChat(body) {
  const { message, history } = body || {};
  if (!message) return { status: 400, json: { error: 'Message is required' } };

  const apiKey = process.env.GOOGLE_API_KEY;
  const userMessage = { role: 'user', parts: [{ text: message }] };

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
    const reply = getFallbackReply(message);
    const updatedHistory = [...(history || []), userMessage, { role: 'model', parts: [{ text: reply }] }];
    return { status: 200, json: { reply, history: updatedHistory } };
  }

  const systemPrompt = {
    role: 'user',
    parts: [{ text: `You are the ExcellenceLinks AI Assistant. You represent ExcellenceLinks — an enterprise Agentic AI development & automation company founded by Shafqat Sarwar.

Your purpose: Answer questions about ExcellenceLinks' services, AI Employees, multi-agent systems, live AI products, and business automation solutions. Be professional, helpful, and concise.

About ExcellenceLinks:
- Founded in 2010 by Founder & CEO Shafqat Sarwar (15+ years technology & AI experience)
- Specializes in 24/7 AI Employees, multi-agent systems, RAG pipelines, and operational workflow automation for SMEs across Pakistan and the UK
- Portfolio of 6 live AI products: TheMindGauge, LinkedIn AI Agent, AI Assistant 24/7, OpenClaw AI Platform, Secure Alerts, JoinQuran (www.joinquran.com)
- Proven results: Cuts operational response times from hours to under 60 seconds and reduces manual workloads by 60–70%
- Key Technologies: CrewAI, LangChain, OpenAI Agents SDK, MCP Protocol, Python, FastAPI, RAG vector stores, WhatsApp Business API
- Contact: excellencelinks@hotmail.com | WhatsApp: +92 324 427 9017 / +44 208 123 9145
- Website: https://excellencelinks.vercel.app | LinkedIn: linkedin.com/company/134524073/ | GitHub: github.com/Shafqatsarwar

Rules:
1. Be friendly, professional, and business-focused.
2. When asked about pricing, quotation, rates, cost, or contact options, output exact text with links: "We provide customized AI Employee solutions tailored to your operational needs. Please send us a message via our [Contact form](#contact) or [WhatsApp](https://wa.me/923244279017) for a personalized quotation."
3. Keep responses concise (2-4 sentences).
4. Format links as markdown links like [Contact form](#contact) and [WhatsApp](https://wa.me/923244279017) so they render as clickable links.` }]
  };

  const contents = history && history.length > 0
    ? [...history, userMessage]
    : [systemPrompt, userMessage];

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  let reply = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
          }),
        }
      );
      const data = await response.json();
      if (response.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply = data.candidates[0].content.parts[0].text;
        break;
      }
    } catch (e) {
      console.warn(`Model ${model} fetch failed:`, e.message);
    }
  }

  if (!reply) {
    reply = getFallbackReply(message);
  }

  const updatedHistory = [...(history || []), userMessage, { role: 'model', parts: [{ text: reply }] }];
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
  let reqPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  let primaryPath = path.join(__dirname, 'public', reqPath);
  let fallbackPath = path.join(__dirname, reqPath);

  const ext = path.extname(reqPath);
  const contentType = MIME[ext] || 'application/octet-stream';

  try {
    const data = await fs.promises.readFile(primaryPath);
    res.writeHead(200, { 'Content-Type': contentType });
    return res.end(data);
  } catch {
    try {
      const data = await fs.promises.readFile(fallbackPath);
      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>404 Not Found</h1>');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n  🚀 Server running at http://localhost:${PORT}`);
  console.log(`  📁 Serving static files from ${__dirname}`);
  console.log(`  ✉️  Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`  🤖 Chat API:    http://localhost:${PORT}/api/chat\n`);
});
