import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, address, size, service, message, when } = req.body;

    // Email al usuario (solo si dejó email)
    if (email) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: 'Hemos recibido tu solicitud - JV Patios and Stone Work',
        html: `
          <h2>¡Hola ${name}!</h2>
          <p>Gracias por contactarnos. Hemos recibido tu solicitud y te contactaremos en menos de 1 día hábil.</p>
          <p><strong>Resumen de tu solicitud:</strong></p>
          <ul>
            <li>Nombre: ${name}</li>
            <li>Teléfono: ${phone}</li>
            <li>Email: ${email}</li>
            <li>Servicio: ${service || '—'}</li>
            <li>Plazo: ${when || '—'}</li>
            <li>Dirección: ${address || '—'}</li>
            <li>Tamaño: ${size || '—'}</li>
            <li>Mensaje: ${message || '—'}</li>
          </ul>
          <p>Saludos,<br>JV Patios &amp; Stone Work</p>
        `,
      });
    }

    // Email al negocio (+ vendedor si está configurado)
    const leadRecipients = [process.env.BUSINESS_EMAIL, process.env.SALES_EMAIL].filter(Boolean)
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: leadRecipients,
      subject: `NUEVO LEAD - ${name} · ${service || 'General'}`,
      html: `
        <h2>Nuevo Lead Recibido</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || '—'}</p>
        <p><strong>Servicio:</strong> ${service || '—'}</p>
        <p><strong>Plazo:</strong> ${when || '—'}</p>
        <p><strong>Dirección:</strong> ${address || '—'}</p>
        <p><strong>Tamaño:</strong> ${size || '—'}</p>
        <p><strong>Mensaje:</strong> ${message || '—'}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Emails enviados correctamente' });

  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({ error: error.message });
  }
}
