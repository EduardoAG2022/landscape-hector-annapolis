import { useState, useRef, useEffect } from 'react'

export default function StatCounter({ value, label }) {
  const [v, setV] = useState(value)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const numeric = value.match(/^(\d+)/)
    if (!numeric) return
    const target = parseInt(numeric[1], 10)
    const suffix = value.slice(numeric[1].length)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !animated.current) {
          animated.current = true
          const dur = 1200
          const start = performance.now()
          const tick = (now) => {
            const k = Math.min(1, (now - start) / dur)
            const eased = 1 - Math.pow(1 - k, 3)
            setV(Math.round(target * eased) + suffix)
            if (k < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <div ref={ref} className="jv-stat">
      <div className="jv-stat-n">{v}</div>
      <div className="jv-stat-l">{label}</div>
    </div>
  )
}
