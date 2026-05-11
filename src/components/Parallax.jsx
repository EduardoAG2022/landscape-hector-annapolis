import { useRef, useState, useEffect } from 'react'

export default function Parallax({ children, speed = 0.15, className = '', style }) {
  const ref = useRef(null)
  const [t, setT] = useState(0)

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) { raf = null; return }
        const r = el.getBoundingClientRect()
        const center = r.top + r.height / 2
        setT((window.innerHeight / 2 - center) * speed)
        raf = null
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [speed])

  return (
    <div ref={ref} className={className} style={{ ...style, transform: `translate3d(0,${t}px,0)`, willChange: 'transform' }}>
      {children}
    </div>
  )
}
