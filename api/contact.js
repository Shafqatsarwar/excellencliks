const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: 'khansarwar1@hotmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0e1320;color:#e8eaf0;border-radius:12px;border:1px solid rgba(212,175,55,0.2);">
          <div style="text-align:center;margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid rgba(212,175,55,0.15);">
            <h2 style="color:#D4AF37;margin:0;">📬 New Portfolio Message</h2>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#8b93a7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Name</td></tr>
            <tr><td style="padding:0 0 12px 0;color:#e8eaf0;font-size:15px;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#8b93a7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td></tr>
            <tr><td style="padding:0 0 12px 0;color:#22d3ee;font-size:14px;"><a href="mailto:${email}" style="color:#22d3ee;text-decoration:none;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#8b93a7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td></tr>
            <tr><td style="padding:0 0 12px 0;color:#e8eaf0;font-size:14px;">${phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#8b93a7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Subject</td></tr>
            <tr><td style="padding:0 0 12px 0;color:#D4AF37;font-size:14px;font-weight:600;">${subject || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;color:#8b93a7;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</td></tr>
            <tr><td style="padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid rgba(255,255,255,0.05);color:#e8eaf0;font-size:14px;line-height:1.6;">${message.replace(/\n/g, '<br>')}</td></tr>
          </table>
          <div style="text-align:center;margin-top:20px;padding-top:15px;border-top:1px solid rgba(212,175,55,0.15);font-size:11px;color:#8b93a7;">
            Sent via excellencelinks.com contact form
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};
