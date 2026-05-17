import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nombre, email, telefono, direccion, tamano, categoria, mensaje, notas } = req.body;

    // Email al usuario
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Hemos recibido tu solicitud - JV Patios and Stone Work',
      html: `
        <h2>¡Hola ${nombre}!</h2>
        <p>Gracias por contactarnos. Hemos recibido tu solicitud.</p>
        <p><strong>Detalles:</strong></p>
        <ul>
          <li>Nombre: ${nombre}</li>
          <li>Email: ${email}</li>
          <li>Teléfono: ${telefono}</li>
          <li>Dirección: ${direccion}</li>
          <li>Tamaño: ${tamano}</li>
          <li>Categoría: ${categoria}</li>
          <li>Mensaje: ${mensaje}</li>
        </ul>
        <p>Saludos,<br>JV Patios & Stone Work</p>
      `,
    });

    // Email al negocio
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.BUSINESS_EMAIL,
      subject: `NUEVO LEAD - ${nombre}`,
      html: `
        <h2>Nuevo Lead Recibido</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Tamaño:</strong> ${tamano}</p>
        <p><strong>Categoría:</strong> ${categoria}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
        <p><strong>Notas:</strong> ${notas || 'N/A'}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Emails enviados correctamente' });

  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({ error: error.message });
  }
}
