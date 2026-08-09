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
    const { message, history } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const userMessage = { role: 'user', parts: [{ text: message }] };

    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
      const reply = getFallbackReply(message);
      const updatedHistory = [...(history || []), userMessage, { role: 'model', parts: [{ text: reply }] }];
      return res.status(200).json({ reply, history: updatedHistory });
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
    return res.status(200).json({ reply, history: updatedHistory });
  } catch (error) {
    console.error('Chat error:', error);
    const reply = getFallbackReply(req.body?.message);
    return res.status(200).json({ reply, history: [] });
  }
};
