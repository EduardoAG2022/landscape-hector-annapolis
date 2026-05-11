import { useState, useRef, useCallback, useEffect } from 'react'

export default function BeforeAfter({ before, after, label, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)
  const dragging = useRef(false)

  const setFromX = useCallback((clientX) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }, [])

  useEffect(() => {
    const move = (e) => { if (dragging.current) { e.preventDefault(); setFromX(e.touches ? e.touches[0].clientX : e.clientX) } }
    const up   = () => { dragging.current = false }
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [setFromX])

  return (
    <div className="jv-ba" ref={ref}
      onMouseDown={(e) => { dragging.current = true; setFromX(e.clientX) }}
      onTouchStart={(e) => { dragging.current = true; setFromX(e.touches[0].clientX) }}
      role="slider" aria-valuenow={Math.round(pos)} aria-valuemin={0} aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
      }}
    >
      <img className="jv-ba-img jv-ba-after" src={after} alt="After" draggable="false" />
      <div className="jv-ba-clip" style={{ width: `${pos}%` }}>
        <img className="jv-ba-img" src={before} alt="Before" draggable="false"
          style={{ width: `${10000 / Math.max(1, pos)}%` }} />
      </div>
      <div className="jv-ba-tag jv-ba-tag-before">{beforeLabel}</div>
      <div className="jv-ba-tag jv-ba-tag-after">{afterLabel}</div>
      <div className="jv-ba-handle" style={{ left: `${pos}%` }}>
        <div className="jv-ba-handle-line" />
        <div className="jv-ba-handle-knob">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8 6L4 11L8 16M14 6L18 11L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {label && <div className="jv-ba-caption">{label}</div>}
    </div>
  )
}
