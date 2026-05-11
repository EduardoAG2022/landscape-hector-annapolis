import { useState, useEffect } from 'react'

const GALLERY = [
  '/images/galeri1.jpg',
  '/images/galeri2.jpg',
  '/images/galeri3.jpg',
  '/images/galeri4.jpg',
  '/images/galeri5.jpg',
  '/images/galeri6.jpg',
  '/images/galeri7.jpg',
  '/images/galeri8.jpg',
  '/images/galeri9.jpg',
  '/images/galeri10.jpg',
  '/images/galeri11.jpg',
  '/images/galeri12.jpg',
  '/images/galeri13.jpeg',
  '/images/galeri14.jpeg',
  '/images/galeri15.jpeg',
  '/images/galeri16.jpeg',
  '/images/galeri17.jpeg',
  '/images/galeri18.jpeg',
]

const PER_PAGE = 6

export default function Gallery({ lang }) {
  const [page, setPage] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  const totalPages = Math.ceil(GALLERY.length / PER_PAGE)
  const visible = GALLERY.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  const lbPrev = () => setLightbox(i => (i - 1 + GALLERY.length) % GALLERY.length)
  const lbNext = () => setLightbox(i => (i + 1) % GALLERY.length)

  useEffect(() => {
    if (lightbox === null) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft') lbPrev()
      if (e.key === 'ArrowRight') lbNext()
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const goPage = (p) => { setPage(p); setLightbox(null) }

  return (
    <>
      <div className="jv-gallery-grid">
        {visible.map((src, i) => {
          const idx = page * PER_PAGE + i
          return (
            <button key={src} type="button" className="jv-gallery-card"
              onClick={() => setLightbox(idx)}
              aria-label={`${lang === 'en' ? 'View project' : 'Ver proyecto'} ${idx + 1}`}>
              <img src={src} alt={`Project ${idx + 1}`} loading="lazy" />
              <span className="jv-gallery-label">
                {lang === 'en' ? 'Project' : 'Proyecto'} {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="jv-gallery-zoom">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <path d="M11 8v6M8 11h6"/>
                </svg>
              </div>
            </button>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="jv-gallery-pagination">
          <button type="button" className="jv-gallery-pg-btn"
            onClick={() => goPage(Math.max(0, page - 1))}
            disabled={page === 0} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="jv-gallery-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} type="button" className="jv-gallery-dot"
                data-active={i === page}
                onClick={() => goPage(i)}
                aria-label={`Page ${i + 1}`} />
            ))}
          </div>
          <button type="button" className="jv-gallery-pg-btn"
            onClick={() => goPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}

      {lightbox !== null && (
        <div className="jv-lightbox" onClick={() => setLightbox(null)}>
          <button type="button" className="jv-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <button type="button" className="jv-lightbox-arrow jv-lightbox-prev"
            onClick={e => { e.stopPropagation(); lbPrev() }} aria-label="Previous">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="jv-lightbox-stage" onClick={e => e.stopPropagation()}>
            <img src={GALLERY[lightbox]} alt={`Project ${lightbox + 1}`} className="jv-lightbox-img" />
            <div className="jv-lightbox-counter">{lightbox + 1} / {GALLERY.length}</div>
          </div>

          <button type="button" className="jv-lightbox-arrow jv-lightbox-next"
            onClick={e => { e.stopPropagation(); lbNext() }} aria-label="Next">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </>
  )
}
