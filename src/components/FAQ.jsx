import { useState } from 'react'

export default function FAQ({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="jv-faq">
      {items.map((it, i) => (
        <div key={i} className="jv-faq-item" data-open={open === i}>
          <button type="button" className="jv-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="jv-faq-icon">{open === i ? '−' : '+'}</span>
          </button>
          <div className="jv-faq-a-wrap">
            <div className="jv-faq-a">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
