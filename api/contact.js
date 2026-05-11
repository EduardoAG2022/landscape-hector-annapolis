import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'jv.patiostonework@gmail.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, email, service, when, address, size, message } = req.body

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' })
  }

  try {
    // Email al negocio con los datos del lead
    await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      subject: `New Quote Request — ${service || 'General'} · ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email || '—'}</td></tr>
          <tr><td><strong>Service</strong></td><td>${service || '—'}</td></tr>
          <tr><td><strong>When</strong></td><td>${when || '—'}</td></tr>
          <tr><td><strong>Address</strong></td><td>${address || '—'}</td></tr>
          <tr><td><strong>Size</strong></td><td>${size || '—'}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message || '—'}</td></tr>
        </table>
      `,
    })

    // Email de confirmación al prospecto (solo si dejó email)
    if (email) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'We received your quote request — JV Patios & Stonework',
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out to <strong>JV Patios & Stonework LLC</strong>. We received your request and will contact you within 24 hours.</p>
          <p>If you need to reach us sooner, call <strong>(443) 758-5158</strong> or WhatsApp us.</p>
          <p>— The JV Patios Team</p>
        `,
      })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
