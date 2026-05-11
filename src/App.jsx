import { useState, useEffect, useRef } from 'react'
import JV from './data/jv'
import Reveal from './components/Reveal'
import Parallax from './components/Parallax'
import LangToggle from './components/LangToggle'
import BeforeAfter from './components/BeforeAfter'
import ServiceAreaMap from './components/ServiceAreaMap'
import MultiStepForm from './components/MultiStepForm'
import StickyMobileCTA from './components/StickyMobileCTA'
import FAQ from './components/FAQ'
import Stars from './components/Stars'
import StatCounter from './components/StatCounter'

export default function App() {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const formRef = useRef(null)
  const t = JV.t[lang]

  useEffect(() => {
    document.body.classList.add('jv-has-sticky')
    document.documentElement.lang = lang
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lang])

  const scrollToForm = () => {
    setMenuOpen(false)
    if (formRef.current) {
      const top = formRef.current.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#work',     label: t.nav.work     },
    { href: '#area',     label: t.nav.area     },
    { href: '#reviews',  label: t.nav.reviews  },
    { href: '#contact',  label: t.nav.contact  },
  ]

  const whyIcons = [
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ]

  return (
    <div className="jv-app">

      {/* NAV */}
      <header className="jv-nav" data-scrolled={scrolled}>
        <div className="jv-container jv-nav-inner">
          <a href="#" className="jv-logo">
            <span className="jv-logo-mark">jv</span>
            <span className="jv-logo-text">
              <span>JV Patios &amp; Stonework</span>
              <small>Annapolis · MD · Est. 2004</small>
            </span>
          </a>
          <nav className="jv-nav-links" aria-label="Primary">
            {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="jv-nav-right">
            <LangToggle lang={lang} setLang={setLang} />
            <button className="jv-nav-cta" onClick={scrollToForm}>
              {t.nav.quote}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </button>
            <button className="jv-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen
                ? <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className="jv-mobile-menu" data-open={menuOpen}>
        {navLinks.map((l) => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
        <div className="jv-mobile-menu-footer">
          <span style={{ color: 'var(--jv-ember-2)' }}>{JV.business.phone1}</span>
          <span>{JV.business.email}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="jv-hero">
        <div className="jv-container">
          <div className="jv-hero-meta-top">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {lang === 'en' ? 'Free estimate · 1 business day' : 'Estimado gratis · 1 día hábil'}
            </span>
            <span><em>vol. xx</em></span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s-8-4.5-8-11.5A8 8 0 0 1 12 2a8 8 0 0 1 8 8.5C20 17.5 12 22 12 22z"/></svg>
              Annapolis · MD · 40 mi
            </span>
          </div>

          <div className="jv-hero-grid">
            <div className="jv-hero-content">
              <Reveal>
                <div className="jv-hero-eyebrow-row">
                  <span>JV</span>
                  <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.2 }}></span>
                  <span>{t.hero.eyebrow}</span>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="jv-hero-title" dangerouslySetInnerHTML={{
                  __html: lang === 'en'
                    ? "Stone, paver, <span class='ampersand'>&amp;</span> <em>landscape</em> that outlast the mortgage."
                    : "Piedra, adoquín <span class='ampersand'>y</span> <em>paisaje</em> que duran más que la hipoteca."
                }}/>
              </Reveal>
              <Reveal delay={260}><p className="jv-hero-sub">{t.hero.sub}</p></Reveal>
              <Reveal delay={380}>
                <div className="jv-hero-ctas">
                  <button className="jv-btn jv-btn-primary" onClick={scrollToForm}>
                    {t.hero.cta1}
                    <span className="jv-btn-arrow">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </span>
                  </button>
                </div>
              </Reveal>
              <Reveal delay={500}>
                <div className="jv-hero-index">
                  <div className="jv-hero-index-item"><small>{lang === 'en' ? 'Year founded' : 'Fundada'}</small><strong><em>2004</em></strong></div>
                  <div className="jv-hero-index-item"><small>{lang === 'en' ? 'Reviews · ★' : 'Reseñas · ★'}</small><strong><em>5.0</em></strong></div>
                  <div className="jv-hero-index-item"><small>{lang === 'en' ? 'Projects done' : 'Proyectos'}</small><strong><em>850+</em></strong></div>
                </div>
              </Reveal>
            </div>

            <div className="jv-hero-image-wrap">
              <Parallax speed={0.06} style={{ height: '100%' }}>
                <img src={JV.images.hero} alt="" />
              </Parallax>
              <div className="jv-hero-stamp-circle">
                <svg viewBox="0 0 200 200">
                  <defs>
                    <path id="jv-circ-path" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
                  </defs>
                  <text>
                    <textPath href="#jv-circ-path" startOffset="0">
                      ★ {lang === 'en' ? 'MHIC LICENSED · INSURED · 20+ YEARS · ANNAPOLIS MD' : 'LICENCIADOS · ASEGURADOS · 20+ AÑOS · ANNAPOLIS MD'} ·
                    </textPath>
                  </text>
                </svg>
                <div className="jv-hero-stamp-inner">
                  <div>20+<small>{lang === 'en' ? 'years' : 'años'}</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="jv-marquee" aria-hidden="true">
        <div className="jv-marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <em>Patios</em><span className="dot">●</span>
              <em>Stonework</em><span className="dot">●</span>
              <em>Walkways</em><span className="dot">●</span>
              <em>Retaining Walls</em><span className="dot">●</span>
              <em>Landscaping</em><span className="dot">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="jv-stats">
        <div className="jv-container">
          <div className="jv-stats-grid">
            {JV.stats[lang].map((s, i) => <StatCounter key={i} value={s.n} label={s.l} />)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="jv-section" id="services">
        <div className="jv-container">
          <div className="jv-section-head">
            <Reveal><div className="jv-eyebrow">{t.sections.services.eyebrow}</div></Reveal>
            <Reveal delay={100}>
              <h2 className="jv-h2" dangerouslySetInnerHTML={{
                __html: lang === 'en'
                  ? 'Six trades. <em>One crew.</em><br/>No subs.'
                  : 'Seis oficios. <em>Una cuadrilla.</em><br/>Sin subcontratos.'
              }}/>
            </Reveal>
            <Reveal delay={200}><p className="jv-sub">{t.sections.services.sub}</p></Reveal>
          </div>

          <div className="jv-svc-list">
            {JV.services[lang].map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <div className="jv-svc-row" onClick={scrollToForm}>
                  <div className="jv-svc-num">N° 0{i + 1}</div>
                  <div><h3 className="jv-svc-name">{s.name}</h3></div>
                  <div className="jv-svc-desc">{s.desc}</div>
                  <div className="jv-svc-meta">
                    <div className="jv-svc-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="jv-svc-grid-bottom">
            <Reveal delay={0}><div className="jv-svc-img-card"><img src={JV.images.patio2} alt=""/><span>Patio · 2024</span></div></Reveal>
            <Reveal delay={100}><div className="jv-svc-img-card"><img src={JV.images.stone1} alt=""/><span>Stonework · 2025</span></div></Reveal>
            <Reveal delay={200}><div className="jv-svc-img-card"><img src={JV.images.fire} alt=""/><span>Fire pit · 2025</span></div></Reveal>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="jv-ba-wrap" id="work">
        <div className="jv-container">
          <div className="jv-section-head">
            <Reveal><div className="jv-eyebrow">{t.sections.work.eyebrow}</div></Reveal>
            <Reveal delay={100}>
              <h2 className="jv-h2" dangerouslySetInnerHTML={{
                __html: lang === 'en'
                  ? 'Drag the slider.<br/><em>See the difference.</em>'
                  : 'Mueve el deslizador.<br/><em>Mira la diferencia.</em>'
              }}/>
            </Reveal>
            <Reveal delay={200}><p className="jv-sub">{t.sections.work.sub}</p></Reveal>
          </div>
          <div className="jv-ba-list">
            {JV.images.beforeAfter.map((ba, i) => (
              <Reveal key={i} delay={i * 100}>
                <BeforeAfter before={ba.before} after={ba.after}
                  label={lang === 'en' ? ba.labelEn : ba.labelEs}
                  beforeLabel={lang === 'en' ? 'Before' : 'Antes'}
                  afterLabel={lang === 'en' ? 'After' : 'Después'} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="jv-section jv-gallery-wrap">
        <div className="jv-container">
          <div className="jv-section-head">
            <Reveal><div className="jv-eyebrow">{lang === 'en' ? 'Project Gallery' : 'Galería de Proyectos'}</div></Reveal>
            <Reveal delay={100}>
              <h2 className="jv-h2" dangerouslySetInnerHTML={{
                __html: lang === 'en'
                  ? 'Every project.<br/><em>Built to last.</em>'
                  : 'Cada proyecto.<br/><em>Construido para durar.</em>'
              }}/>
            </Reveal>
          </div>
          <div className="jv-gallery-grid">
            {[
              { src: JV.images.patio1,     label: lang === 'en' ? 'Patio · Annapolis'       : 'Patio · Annapolis'      },
              { src: JV.images.patio2,     label: lang === 'en' ? 'Patio · Severna Park'    : 'Patio · Severna Park'   },
              { src: JV.images.stone1,     label: lang === 'en' ? 'Stonework · Edgewater'   : 'Piedra · Edgewater'     },
              { src: JV.images.stone2,     label: lang === 'en' ? 'Stone Wall · Bowie'      : 'Muro · Bowie'           },
              { src: JV.images.landscape1, label: lang === 'en' ? 'Landscaping · Annapolis' : 'Paisajismo · Annapolis' },
              { src: JV.images.walkway,    label: lang === 'en' ? 'Walkway · Glen Burnie'   : 'Camino · Glen Burnie'   },
            ].map((img, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="jv-gallery-card">
                  <img src={img.src} alt={img.label} />
                  <span>{img.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="jv-section">
        <div className="jv-container">
          <div className="jv-why-grid">
            <Reveal>
              <div className="jv-why-img-stack">
                <img src={JV.images.worker} alt="JV crew" />
                <img src={JV.images.stone1} alt="" />
                <div className="jv-why-stamp">
                  <div><em>20+</em><small>{lang === 'en' ? 'Years' : 'Años'}</small></div>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal><div className="jv-eyebrow">{t.sections.why.eyebrow}</div></Reveal>
              <Reveal delay={100}><h2 className="jv-h2" style={{ whiteSpace: 'pre-line' }}>{t.sections.why.title}</h2></Reveal>
              <Reveal delay={200}><p className="jv-sub">{t.sections.why.sub}</p></Reveal>
              <div className="jv-why-list">
                {t.why.map((w, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="jv-why-item">
                      <div className="jv-why-icon">{whyIcons[i]}</div>
                      <div>
                        <div className="jv-why-t">{w.t}</div>
                        <div className="jv-why-d">{w.d}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* AREA MAP */}
      <section className="jv-section jv-map-wrap" id="area">
        <div className="jv-container">
          <div className="jv-map-grid">
            <div>
              <Reveal><div className="jv-eyebrow">{t.sections.area.eyebrow}</div></Reveal>
              <Reveal delay={100}>
                <h2 className="jv-h2" dangerouslySetInnerHTML={{
                  __html: lang === 'en'
                    ? 'Annapolis &amp;<br/><em>40 miles</em> around.'
                    : 'Annapolis y<br/><em>40 millas</em> alrededor.'
                }}/>
              </Reveal>
              <Reveal delay={200}><p className="jv-sub">{t.sections.area.sub}</p></Reveal>
              <div className="jv-map-cities-list">
                {JV.cities.filter((c) => !c.hq).slice(0, 10).map((c) => (
                  <div key={c.name}>
                    <span>{c.name}</span>
                    <span>{c.dist}mi</span>
                  </div>
                ))}
              </div>
            </div>
            <Reveal delay={150}><ServiceAreaMap lang={lang} /></Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="jv-section" id="reviews">
        <div className="jv-container">
          <div className="jv-section-head">
            <Reveal><div className="jv-eyebrow">{t.sections.reviews.eyebrow}</div></Reveal>
            <Reveal delay={100}>
              <h2 className="jv-h2" dangerouslySetInnerHTML={{
                __html: lang === 'en'
                  ? '<em>5 stars</em> across<br/>200+ reviews.'
                  : '<em>5 estrellas</em> en<br/>200+ reseñas.'
              }}/>
            </Reveal>
          </div>
          <div className="jv-reviews-grid">
            {JV.reviews.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="jv-review">
                  <div className="jv-review-head">
                    <Stars n={r.stars} size={16} />
                    <span className="jv-review-source">{r.source}</span>
                  </div>
                  <p className="jv-review-text">{lang === 'en' ? r.en : r.es}</p>
                  <div className="jv-review-attr">
                    <div className="jv-review-avatar">{r.name.charAt(0)}</div>
                    <div>
                      <div className="jv-review-name">{r.name}</div>
                      <div className="jv-review-city">{r.city}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="jv-section" style={{ background: 'var(--jv-paper-2)' }}>
        <div className="jv-container">
          <div className="jv-section-head" style={{ maxWidth: '100%' }}>
            <Reveal><div className="jv-eyebrow">{t.sections.faq.eyebrow}</div></Reveal>
            <Reveal delay={100}><h2 className="jv-h2">{t.sections.faq.title}</h2></Reveal>
          </div>
          <FAQ items={JV.faq[lang]} />
        </div>
      </section>

      {/* CONTACT / FORM */}
      <section className="jv-quote jv-section" id="contact" ref={formRef}>
        <div className="jv-container">
          <div className="jv-quote-grid">
            <div className="jv-quote-side">
              <div>
                <Reveal><div className="jv-eyebrow">{t.sections.contact.eyebrow}</div></Reveal>
                <Reveal delay={100}>
                  <h2 className="jv-h2" dangerouslySetInnerHTML={{
                    __html: lang === 'en'
                      ? 'Tell us about<br/><em>your project.</em>'
                      : 'Cuéntanos de<br/><em>tu proyecto.</em>'
                  }}/>
                </Reveal>
                <Reveal delay={200}><p className="jv-sub">{t.sections.contact.sub}</p></Reveal>
              </div>
              <div className="jv-quote-contact">
                <div className="jv-quote-contact-item">
                  <div className="jv-quote-contact-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div className="jv-quote-contact-item-text">
                    <small>{lang === 'en' ? 'Call' : 'Llama'}</small>
                    <strong>{JV.business.phone1}</strong>
                    <strong style={{ fontSize: 16, opacity: 0.7 }}>{JV.business.phone2}</strong>
                  </div>
                </div>
                <div className="jv-quote-contact-item">
                  <div className="jv-quote-contact-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div className="jv-quote-contact-item-text">
                    <small>Email</small>
                    <strong style={{ fontSize: 18 }}>{JV.business.email}</strong>
                  </div>
                </div>
                <div className="jv-quote-contact-item">
                  <div className="jv-quote-contact-item-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div className="jv-quote-contact-item-text">
                    <small>{lang === 'en' ? 'Hours' : 'Horario'}</small>
                    <strong style={{ fontSize: 16 }}>{JV.business.hours[lang].weekday}<br/>{JV.business.hours[lang].weekend}</strong>
                  </div>
                </div>
              </div>
            </div>
            <Reveal delay={150}><MultiStepForm lang={lang} /></Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="jv-footer">
        <div className="jv-container">
          <div className="jv-footer-grid">
            <div className="jv-footer-brand">
              <a href="#" className="jv-logo" style={{ color: 'var(--jv-paper)' }}>
                <span className="jv-logo-mark" style={{ background: 'var(--jv-paper)', color: 'var(--jv-stone)' }}>jv</span>
                <span className="jv-logo-text">
                  <span>JV Patios &amp; Stonework</span>
                  <small style={{ color: 'var(--jv-on-dark-mute)' }}>Annapolis · MD · Est. 2004</small>
                </span>
              </a>
              <div className="jv-footer-tagline">{t.footer.tagline}</div>
              <div className="jv-footer-cred">{t.footer.crafted}</div>
            </div>
            <div className="jv-footer-col">
              <h4>{t.footer.links}</h4>
              <ul>{navLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
            </div>
            <div className="jv-footer-col">
              <h4>{t.footer.contact}</h4>
              <ul>
                <li><a href={`tel:${JV.business.phone1Tel}`}>{JV.business.phone1}</a></li>
                <li><a href={`tel:${JV.business.phone2Tel}`}>{JV.business.phone2}</a></li>
                <li><a href={`mailto:${JV.business.email}`}>{JV.business.email}</a></li>
                <li>{JV.business.address}</li>
              </ul>
            </div>
            <div className="jv-footer-col">
              <h4>{t.footer.hours}</h4>
              <ul>
                <li>{JV.business.hours[lang].weekday}</li>
                <li>{JV.business.hours[lang].weekend}</li>
                <li style={{ opacity: 0.5 }}>{JV.business.hours[lang].sunday}</li>
              </ul>
            </div>
          </div>
          <div className="jv-footer-bottom">
            <span>{t.footer.rights}</span>
            <span>MHIC #142857</span>
          </div>
        </div>
      </footer>

      <StickyMobileCTA lang={lang} onQuote={scrollToForm} />
    </div>
  )
}
