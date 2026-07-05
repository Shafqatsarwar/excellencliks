module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

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

    const userMessage = {
      role: 'user',
      parts: [{ text: message }]
    };

    const contents = history && history.length > 0
      ? [...history, userMessage]
      : [systemPrompt, userMessage];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
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
      console.error('Gemini API error:', data);
      return res.status(200).json({ reply: 'Thanks for your question! 🙏 The AI assistant needs a fresh API key. Get one at https://aistudio.google.com/apikey and update .env, then restart. Or WhatsApp me at wa.me/923244279017', history: [] });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I could not generate a response.';

    const updatedHistory = [...(history || []), userMessage, {
      role: 'model',
      parts: [{ text: reply }]
    }];

    res.status(200).json({ reply, history: updatedHistory });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message. Please try again.' });
  }
};
