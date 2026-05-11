import { useState } from 'react'
import JV from '../data/jv'

export default function PriceCalculator({ lang }) {
  const t = JV.t[lang]
  const services = JV.services[lang]
  const [serviceId, setServiceId] = useState('patios')
  const [size, setSize] = useState(400)
  const [tier, setTier] = useState('standard')

  const svc = services.find((s) => s.id === serviceId)
  const tierMul = { value: 0.85, standard: 1.0, premium: 1.35 }[tier]
  const min = Math.round(size * svc.price.min * tierMul / 50) * 50
  const max = Math.round(size * svc.price.max * tierMul / 50) * 50
  const isPerVisit = svc.price.unit.includes('visit') || svc.price.unit.includes('visita')
  const fmt = (n) => '$' + n.toLocaleString()
  const tierLabel = lang === 'en'
    ? { value: 'Value', standard: 'Standard', premium: 'Premium' }
    : { value: 'Económico', standard: 'Estándar', premium: 'Premium' }

  return (
    <div className="jv-calc">
      <div className="jv-calc-row">
        <label className="jv-calc-label">{t.calc.service}</label>
        <div className="jv-calc-services">
          {services.map((s) => (
            <button key={s.id} type="button" className="jv-calc-chip"
              data-active={s.id === serviceId} onClick={() => setServiceId(s.id)}>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {!isPerVisit && (
        <div className="jv-calc-row">
          <div className="jv-calc-row-head">
            <label className="jv-calc-label" htmlFor="jv-size">{t.calc.area}</label>
            <span className="jv-calc-size">{size.toLocaleString()} <span>sq ft</span></span>
          </div>
          <input id="jv-size" type="range" min="50" max="2500" step="25"
            value={size} onChange={(e) => setSize(+e.target.value)} className="jv-calc-slider" />
          <div className="jv-calc-ticks"><span>50</span><span>1,000</span><span>2,500</span></div>
        </div>
      )}

      <div className="jv-calc-row">
        <label className="jv-calc-label">{t.calc.surface}</label>
        <div className="jv-calc-tier">
          {['value', 'standard', 'premium'].map((k) => (
            <button key={k} type="button" data-active={tier === k} onClick={() => setTier(k)}>
              {tierLabel[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="jv-calc-est">
        <div className="jv-calc-est-label">{t.calc.est}</div>
        <div className="jv-calc-est-value">{fmt(min)}<span>—</span>{fmt(max)}</div>
        <div className="jv-calc-est-note">{t.calc.note}</div>
      </div>
    </div>
  )
}
