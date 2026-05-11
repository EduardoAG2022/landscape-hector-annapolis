/* Variation 1 — "The Trade" (Industrial / Honest Contractor) */
const { useState, useEffect, useRef } = React;

function App() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef(null);
  const t = JV.t[lang];

  useEffect(() => {
    document.body.classList.add("jv-has-sticky");
    document.documentElement.lang = lang;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lang]);

  const scrollToForm = () => {
    setMenuOpen(false);
    if (formRef.current) {
      const top = formRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#work", label: t.nav.work },
    { href: "#area", label: t.nav.area },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#contact", label: t.nav.contact }
  ];

  return (
    <div className="jv-app">
      {/* TOP TICKER */}
      <div className="jv-ticker" aria-hidden="true">
        <div className="jv-ticker-track">
          {[...t.hero.ticker, ...t.hero.ticker, ...t.hero.ticker].map((item, i) => (
            <span key={i} className="jv-ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <header className="jv-nav" data-scrolled={scrolled}>
        <div className="jv-container jv-nav-inner">
          <a href="#" className="jv-logo" aria-label="JV Patios & Stonework">
            <span className="jv-logo-mark">JV</span>
            <span className="jv-logo-text">
              <span>JV PATIOS</span>
              <small>& Stonework · MD</small>
            </span>
          </a>

          <nav className="jv-nav-links" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <div className="jv-nav-right">
            <LangToggle lang={lang} setLang={setLang} />
            <a className="jv-nav-phone" href={`tel:${JV.business.phone1Tel}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {JV.business.phone1}
            </a>
            <button className="jv-nav-cta" onClick={scrollToForm}>{t.nav.quote}</button>
            <button className="jv-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.4" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className="jv-mobile-menu" data-open={menuOpen}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <div className="jv-mobile-menu-footer">
          <a href={`tel:${JV.business.phone1Tel}`} style={{ fontSize: "20px", color: "var(--jv-rust-2)", borderBottom: "none" }}>
            {JV.business.phone1}
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="jv-hero">
        <div className="jv-hero-grid">
          <div className="jv-hero-content">
            <Reveal>
              <div className="jv-hero-eyebrow">{t.hero.eyebrow}</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="jv-hero-title" dangerouslySetInnerHTML={{
                __html: lang === "en"
                  ? "Built like the\nold <em>country</em>.\nBuilt to outlast\nthe mortgage."
                  : "Hecho como\nen el viejo <em>continente</em>.\nHecho para durar."
              }}/>
            </Reveal>
            <Reveal delay={240}>
              <p className="jv-hero-sub">{t.hero.sub}</p>
            </Reveal>
            <Reveal delay={360}>
              <div className="jv-hero-ctas">
                <button className="jv-btn jv-btn-primary" onClick={scrollToForm}>
                  {t.hero.cta1}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
                <a className="jv-btn jv-btn-ghost" href={`https://wa.me/${JV.business.whatsapp}`} target="_blank" rel="noopener">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/></svg>
                  {t.hero.cta2}
                </a>
              </div>
            </Reveal>
            <Reveal delay={500}>
              <div className="jv-hero-meta">
                <div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 22s-8-4.5-8-11.5A8 8 0 0 1 12 2a8 8 0 0 1 8 8.5C20 17.5 12 22 12 22z"/><circle cx="12" cy="10" r="3"/></svg>
                  Annapolis, MD · 40 mi
                </div>
                <div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {lang === "en" ? "Reply in 1 business day" : "Respuesta en 1 día hábil"}
                </div>
                <div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 5-3.5 9-9 9s-9-4-9-9 3.5-9 9-9 9 4 9 9z"/></svg>
                  MHIC Licensed
                </div>
              </div>
            </Reveal>
          </div>

          <div className="jv-hero-image">
            <Parallax speed={0.08}>
              <img src={JV.images.hero} alt="" />
            </Parallax>
            <div className="jv-hero-stamp jv-hero-stamp-rating">
              <Stars n={5} size={14}/>
              <div>
                <div className="big">4.9</div>
                <div style={{ fontSize: 9, color: "rgba(26,24,21,0.6)" }}>200+ Google · Yelp</div>
              </div>
            </div>
            <div className="jv-hero-stamp jv-hero-stamp-years">
              <div>
                <div className="big">20+</div>
                <div>{lang === "en" ? "Years in MD" : "Años en MD"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAPE / MARQUEE */}
      <div className="jv-tape" aria-hidden="true">
        <div className="jv-tape-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="jv-tape-item">
              {lang === "en" ? "Patios" : "Patios"} ✦ {lang === "en" ? "Walls" : "Muros"} ✦ {lang === "en" ? "Walkways" : "Caminos"} ✦ {lang === "en" ? "Stonework" : "Piedra"} ✦ {lang === "en" ? "Landscaping" : "Paisajismo"} ✦ {lang === "en" ? "Maintenance" : "Mantenimiento"}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="jv-stats">
        <div className="jv-stats-grid">
          {JV.stats[lang].map((s, i) => (
            <StatCounter key={i} value={s.n} label={s.l} />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="jv-section" id="services">
        <div className="jv-container">
          <div className="jv-section-head">
            <Reveal><div className="jv-eyebrow">{t.sections.services.eyebrow}</div></Reveal>
            <Reveal delay={100}>
              <h2 className="jv-h2" dangerouslySetInnerHTML={{
                __html: lang === "en"
                  ? "Six trades. <em>One crew.</em> No subs."
                  : "Seis oficios. <em>Una cuadrilla.</em> Sin subcontratos."
              }}/>
            </Reveal>
            <Reveal delay={200}><p className="jv-sub">{t.sections.services.sub}</p></Reveal>
          </div>

          <div className="jv-services-grid">
            {JV.services[lang].map((s, i) => {
              const imgs = [JV.images.patio1, JV.images.wall1, JV.images.stone1, JV.images.landscape1, JV.images.walkway, JV.images.fire];
              return (
                <Reveal key={s.id} delay={i * 80} as="div" className="jv-svc-card" style={{ background: "var(--jv-cream)" }}>
                  <div className="jv-svc-img" style={{ backgroundImage: `url(${imgs[i]})` }}/>
                  <div className="jv-svc-num">0{i + 1}</div>
                  <h3 className="jv-svc-name">{s.name}</h3>
                  <p className="jv-svc-desc">{s.desc}</p>
                  <div className="jv-svc-price">
                    <span>{lang === "en" ? "from" : "desde"}</span>
                    <strong>${s.price.min}<span style={{ fontSize: 12, fontFamily: "var(--jv-font-mono)", marginLeft: 4, opacity: 0.7, letterSpacing: "0.06em" }}>/{s.price.unit.split(" ").pop()}</span></strong>
                  </div>
                  <div className="jv-svc-arrow">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </div>
                </Reveal>
              );
            })}
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
                __html: lang === "en"
                  ? "Drag the slider.<br/><em>See the difference.</em>"
                  : "Mueve el deslizador.<br/><em>Mira la diferencia.</em>"
              }}/>
            </Reveal>
            <Reveal delay={200}><p className="jv-sub">{t.sections.work.sub}</p></Reveal>
          </div>

          <div className="jv-ba-list">
            {JV.images.beforeAfter.map((ba, i) => (
              <Reveal key={i} delay={i * 100}>
                <BeforeAfter
                  before={ba.before}
                  after={ba.after}
                  label={lang === "en" ? ba.labelEn : ba.labelEs}
                  beforeLabel={lang === "en" ? "Before" : "Antes"}
                  afterLabel={lang === "en" ? "After" : "Después"}
                />
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
              <div className="jv-why-img">
                <img src={JV.images.worker} alt="JV crew at work" />
                <div className="jv-why-img-stamp">
                  <strong>{lang === "en" ? "The crew, est. 2009" : "La cuadrilla, desde 2009"}</strong>
                  {lang === "en" ? "Same five hands, every job" : "Las mismas manos en cada trabajo"}
                </div>
              </div>
            </Reveal>
            <div>
              <div className="jv-section-head" style={{ marginBottom: 32 }}>
                <Reveal><div className="jv-eyebrow">{t.sections.why.eyebrow}</div></Reveal>
                <Reveal delay={100}>
                  <h2 className="jv-h2" style={{ whiteSpace: "pre-line" }}>{t.sections.why.title}</h2>
                </Reveal>
                <Reveal delay={200}><p className="jv-sub">{t.sections.why.sub}</p></Reveal>
              </div>
              <div className="jv-why-list">
                {t.why.map((w, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="jv-why-item">
                      <div className="jv-why-num">0{i + 1}</div>
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

      {/* CALCULATOR */}
      <section className="jv-section jv-calc-wrap">
        <div className="jv-container">
          <div className="jv-calc-grid">
            <div>
              <Reveal><div className="jv-eyebrow">{t.sections.calc.eyebrow}</div></Reveal>
              <Reveal delay={100}>
                <h2 className="jv-h2" dangerouslySetInnerHTML={{
                  __html: lang === "en"
                    ? "Get a <em>number</em><br/>in 30 seconds."
                    : "Tu <em>número</em><br/>en 30 segundos."
                }}/>
              </Reveal>
              <Reveal delay={200}><p className="jv-sub">{t.sections.calc.sub}</p></Reveal>
              <Reveal delay={300}>
                <button className="jv-btn jv-btn-primary" style={{ marginTop: 32 }} onClick={scrollToForm}>
                  {t.calc.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <PriceCalculator lang={lang} />
            </Reveal>
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
                  __html: lang === "en"
                    ? "Annapolis &<br/><em>40 miles</em> around."
                    : "Annapolis y<br/><em>40 millas</em> alrededor."
                }}/>
              </Reveal>
              <Reveal delay={200}><p className="jv-sub">{t.sections.area.sub}</p></Reveal>

              <div className="jv-map-cities-list">
                {JV.cities.filter((c) => !c.hq).slice(0, 10).map((c) => (
                  <div key={c.name}>
                    <span style={{ color: "var(--jv-cream)" }}>{c.name}</span>
                    <span>{c.dist}mi</span>
                  </div>
                ))}
              </div>
            </div>
            <Reveal delay={150}>
              <ServiceAreaMap lang={lang} />
            </Reveal>
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
                __html: lang === "en"
                  ? "<em>4.9 stars</em> across<br/>200+ reviews."
                  : "<em>4.9 estrellas</em> en<br/>200+ reseñas."
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
                  <p className="jv-review-text">"{lang === "en" ? r.en : r.es}"</p>
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
      <section className="jv-section" style={{ background: "var(--jv-cream-2)" }}>
        <div className="jv-container">
          <div className="jv-section-head" style={{ maxWidth: "100%" }}>
            <Reveal><div className="jv-eyebrow">{t.sections.faq.eyebrow}</div></Reveal>
            <Reveal delay={100}>
              <h2 className="jv-h2">{t.sections.faq.title}</h2>
            </Reveal>
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
                    __html: lang === "en"
                      ? "Tell us about<br/><em>your project.</em>"
                      : "Cuéntanos sobre<br/><em>tu proyecto.</em>"
                  }}/>
                </Reveal>
                <Reveal delay={200}><p className="jv-sub">{t.sections.contact.sub}</p></Reveal>
              </div>

              <Reveal delay={300}>
                <a href={`https://wa.me/${JV.business.whatsapp}?text=${encodeURIComponent(lang === "en" ? "Hi JV, I'd like a quote for…" : "Hola JV, quisiera una cotización para…")}`}
                  target="_blank" rel="noopener" className="jv-quote-wa-cta">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/></svg>
                  {lang === "en" ? "Or WhatsApp us — fastest" : "O por WhatsApp — más rápido"}
                </a>
              </Reveal>

              <div className="jv-quote-contact">
                <div className="jv-quote-contact-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <div className="jv-quote-contact-item-text">
                    <small>{lang === "en" ? "Call" : "Llama"}</small>
                    <strong>{JV.business.phone1} · {JV.business.phone2}</strong>
                  </div>
                </div>
                <div className="jv-quote-contact-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <div className="jv-quote-contact-item-text">
                    <small>Email</small>
                    <strong>{JV.business.email}</strong>
                  </div>
                </div>
                <div className="jv-quote-contact-item">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <div className="jv-quote-contact-item-text">
                    <small>{lang === "en" ? "Hours" : "Horario"}</small>
                    <strong>{JV.business.hours[lang].weekday}<br/>{JV.business.hours[lang].weekend}</strong>
                  </div>
                </div>
              </div>
            </div>

            <Reveal delay={150}>
              <MultiStepForm lang={lang} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="jv-footer">
        <div className="jv-container">
          <div className="jv-footer-grid">
            <div className="jv-footer-brand">
              <a href="#" className="jv-logo" style={{ color: "var(--jv-cream)" }}>
                <span className="jv-logo-mark">JV</span>
                <span className="jv-logo-text">
                  <span>JV PATIOS</span>
                  <small style={{ color: "var(--jv-on-dark-mute)" }}>& Stonework · MD</small>
                </span>
              </a>
              <div className="jv-footer-tagline">{t.footer.tagline}</div>
              <div className="jv-footer-cred">{t.footer.crafted}</div>
            </div>
            <div className="jv-footer-col">
              <h4>{t.footer.links}</h4>
              <ul>
                {navLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              </ul>
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
            <span>{lang === "en" ? "Crafted in Annapolis · MHIC #142857" : "Hecho en Annapolis · MHIC #142857"}</span>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <StickyMobileCTA lang={lang} onQuote={scrollToForm} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
