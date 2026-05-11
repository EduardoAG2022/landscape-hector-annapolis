import { useState } from 'react'
import JV from '../data/jv'

export default function MultiStepForm({ lang, defaultService = '' }) {
  const t = JV.t[lang]
  const services = JV.services[lang]
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ service: defaultService, when: 'ASAP', size: '', address: '', name: '', email: '', phone: '', message: '' })
  const [done, setDone] = useState(false)

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const canNext = step === 0 ? !!data.service : step === 1 ? !!data.address : true

  const submit = (e) => {
    e.preventDefault()
    if (!data.name || !data.phone) return
    setDone(true)
  }

  if (done) {
    return (
      <div className="jv-form-success">
        <div className="jv-form-success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M14 24L21 31L34 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>{t.form.success}</h3>
        <p>{data.name} · {data.phone}</p>
      </div>
    )
  }

  return (
    <form className="jv-form" onSubmit={submit}>
      <div className="jv-form-progress">
        {[0, 1, 2].map((i) => (
          <div key={i} className="jv-form-progress-step"
            data-state={i < step ? 'done' : i === step ? 'active' : 'next'}>
            <span>{i + 1}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="jv-form-step">
          <h3 className="jv-form-step-title">{t.form.step1}</h3>
          <div className="jv-form-services">
            {services.map((s) => (
              <button key={s.id} type="button" className="jv-form-service-card"
                data-active={data.service === s.id}
                onClick={() => { set('service', s.id); setTimeout(() => setStep(1), 200) }}>
                <span className="jv-form-service-name">{s.name}</span>
                <span className="jv-form-service-price">
                  {lang === 'en' ? 'from' : 'desde'} ${s.price.min}<small>/{s.price.unit.split(' ').pop()}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="jv-form-row">
            <label>{t.form.f_when}</label>
            <div className="jv-form-when">
              {t.form.when.map((w) => (
                <button key={w} type="button" data-active={data.when === w} onClick={() => set('when', w)}>{w}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="jv-form-step">
          <h3 className="jv-form-step-title">{t.form.step2}</h3>
          <label className="jv-form-field">
            <span>{t.form.f_address}</span>
            <input type="text" value={data.address} onChange={(e) => set('address', e.target.value)} placeholder="Annapolis, MD" required />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_size}</span>
            <input type="text" value={data.size} onChange={(e) => set('size', e.target.value)} placeholder="~ 600 sq ft" />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_msg}</span>
            <textarea value={data.message} onChange={(e) => set('message', e.target.value)} rows="3"
              placeholder={lang === 'en' ? 'Patio shape, materials in mind, deadlines...' : 'Forma del patio, materiales, fechas...'} />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="jv-form-step">
          <h3 className="jv-form-step-title">{t.form.step3}</h3>
          <label className="jv-form-field">
            <span>{t.form.f_name}</span>
            <input type="text" value={data.name} onChange={(e) => set('name', e.target.value)} required />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_phone}</span>
            <input type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(443) 555-0100" required />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_email}</span>
            <input type="email" value={data.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
          </label>
          <p className="jv-form-privacy">🔒 {t.form.privacy}</p>
        </div>
      )}

      <div className="jv-form-actions">
        {step > 0 && (
          <button type="button" className="jv-form-back" onClick={() => setStep(step - 1)}>
            ← {lang === 'en' ? 'Back' : 'Atrás'}
          </button>
        )}
        {step < 2 ? (
          <button type="button" className="jv-form-next" disabled={!canNext} onClick={() => setStep(step + 1)}>
            {lang === 'en' ? 'Continue' : 'Continuar'} →
          </button>
        ) : (
          <button type="submit" className="jv-form-submit">{t.form.submit}</button>
        )}
      </div>
    </form>
  )
}
