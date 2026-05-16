import JV from '../data/jv'

const SERVICE_NAMES = {
  en: {
    patios:      'Patios & Pavers',
    walls:       'Retaining Walls',
    stonework:   'Stonework',
    landscaping: 'Landscaping',
    walkways:    'Walkways & Sidewalks',
    maintenance: 'Maintenance',
  },
  es: {
    patios:      'Patios y Adoquines',
    walls:       'Muros de Contención',
    stonework:   'Trabajo en Piedra',
    landscaping: 'Paisajismo',
    walkways:    'Caminos y Aceras',
    maintenance: 'Mantenimiento',
  },
}

export default function Thanks() {
  const raw = sessionStorage.getItem('jv_lead')
  const lead = raw ? JSON.parse(raw) : null
  const lang = lead?.lang || 'en'

  const en = lang === 'en'

  const serviceName = lead?.service
    ? (SERVICE_NAMES[lang][lead.service] || lead.service)
    : null

  const rows = [
    serviceName && { label: en ? 'Service' : 'Servicio',     value: serviceName },
    lead?.when   && { label: en ? 'Timeline' : 'Plazo',       value: lead.when },
    lead?.address && { label: en ? 'Address' : 'Dirección',   value: lead.address },
    lead?.size    && { label: en ? 'Size' : 'Tamaño',         value: lead.size },
    lead?.phone   && { label: en ? 'Phone' : 'Teléfono',      value: lead.phone },
    lead?.email   && { label: 'Email',                         value: lead.email },
    lead?.message && { label: en ? 'Notes' : 'Notas',         value: lead.message },
  ].filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--jv-bg)', display: 'flex', flexDirection: 'column' }}>

      {/* Mini nav */}
      <header style={{
        background: 'var(--jv-bg)', borderBottom: '1px solid var(--jv-line)',
        padding: '0 24px', height: '72px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="/" className="jv-logo">
          <span className="jv-logo-mark">jv</span>
          <span className="jv-logo-text">
            <span>JV Patios &amp; Stonework</span>
            <small>Annapolis · MD · Est. 2004</small>
          </span>
        </a>
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '14px', fontWeight: 600, color: 'var(--jv-text-muted)',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--jv-green)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--jv-text-muted)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          {en ? 'Back to home' : 'Volver al inicio'}
        </a>
      </header>

      {/* Content */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '64px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '560px' }}>

          {/* Check icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'var(--jv-lime)', display: 'grid', placeItems: 'center',
              boxShadow: '0 12px 32px rgba(118,196,66,0.35)',
            }}>
              <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
                <path d="M12 24L21 33L36 15" stroke="var(--jv-forest)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontFamily: 'var(--jv-font-display)', fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 48px)', letterSpacing: '-0.03em',
              lineHeight: 1.1, color: 'var(--jv-text)', marginBottom: '14px',
            }}>
              {lead?.name
                ? (en ? `Thank you, ${lead.name}!` : `¡Gracias, ${lead.name}!`)
                : (en ? 'Thank you!' : '¡Gracias!')}
            </h1>
            <p style={{
              fontSize: '17px', lineHeight: 1.7, color: 'var(--jv-text-muted)',
              maxWidth: '44ch', margin: '0 auto',
            }}>
              {en
                ? 'We received your request. Our team will reach out within 1 business day to discuss your project.'
                : 'Recibimos tu solicitud. Nuestro equipo te contactará en menos de 1 día hábil para hablar de tu proyecto.'}
            </p>
          </div>

          {/* Summary card */}
          {rows.length > 0 && (
            <div style={{
              background: 'var(--jv-bg-2)', border: '2px solid var(--jv-bg-3)',
              borderRadius: '14px', overflow: 'hidden', marginBottom: '40px',
            }}>
              <div style={{
                background: 'var(--jv-forest)', padding: '18px 24px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--jv-lime)" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff' }}>
                  {en ? 'Your Request Summary' : 'Resumen de tu Solicitud'}
                </span>
              </div>
              <div style={{ padding: '8px 0' }}>
                {rows.map((row, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '130px 1fr',
                    gap: '12px', padding: '14px 24px',
                    borderBottom: i < rows.length - 1 ? '1px solid var(--jv-bg-3)' : 'none',
                    alignItems: 'start',
                  }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: 'var(--jv-text-muted)',
                      paddingTop: '2px',
                    }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--jv-text)', lineHeight: 1.5 }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact info */}
          <div style={{
            background: 'var(--jv-forest)', borderRadius: '12px',
            padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px',
            marginBottom: '32px',
          }}>
            <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--jv-lime)', marginBottom: '4px' }}>
              {en ? 'Need us sooner?' : '¿Necesitas hablar antes?'}
            </p>
            <a href={`tel:${JV.business.phone1Tel}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              color: '#fff', fontSize: '18px', fontWeight: 700,
              fontFamily: 'var(--jv-font-display)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--jv-lime)" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {JV.business.phone1}
            </a>
          </div>

          {/* Back button */}
          <div style={{ textAlign: 'center' }}>
            <a href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--jv-lime)', color: 'var(--jv-forest)',
              padding: '14px 28px', borderRadius: '8px', fontWeight: 700,
              fontSize: '15px', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--jv-lime-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--jv-lime)'}
            >
              {en ? 'Back to Home' : 'Volver al inicio'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>

        </div>
      </main>

      {/* Mini footer */}
      <footer style={{
        padding: '20px 24px', borderTop: '1px solid var(--jv-line)',
        textAlign: 'center', fontSize: '12px', color: 'var(--jv-text-muted)',
      }}>
        © 2024 JV Patios &amp; Stonework LLC · MHIC #142857
      </footer>

    </div>
  )
}
