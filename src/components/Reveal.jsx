import { useState, useEffect, useRef } from 'react'

export default function Reveal({ children, delay = 0, y = 24, className = '', as: Tag = 'div', style }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight || 800
    if (r.top < vh && r.bottom > 0) { setVis(true); return }
    let revealed = false
    const reveal = () => { if (!revealed) { revealed = true; setVis(true) } }
    let io
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { reveal(); io?.disconnect() } })
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
      io.observe(el)
    }
    const fallback = setTimeout(reveal, 400)
    return () => { io?.disconnect(); clearTimeout(fallback) }
  }, [])

  return (
    <Tag ref={ref} className={className} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
    }}>
      {children}
    </Tag>
  )
}
