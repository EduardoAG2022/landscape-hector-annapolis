// Shared interactive components for both JV variations
// Themed via CSS variables: --jv-accent, --jv-ink, --jv-cream, --jv-line
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ═══════════════════════════ Reveal — scroll fade-in ═══════════════════════════ */
function Reveal({ children, delay = 0, y = 24, className = "", as: Tag = "div", style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already in viewport at mount, reveal immediately.
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    if (r.top < vh && r.bottom > 0) { setVis(true); return; }
    let revealed = false;
    const reveal = () => { if (!revealed) { revealed = true; setVis(true); } };
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { reveal(); io && io.disconnect(); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      io.observe(el);
    }
    // Safety net: if IO never fires (some sandboxed iframes) reveal after a short delay.
    const fallback = setTimeout(reveal, 400);
    return () => { io && io.disconnect(); clearTimeout(fallback); };
  }, []);
  return (
    <Tag ref={ref} className={className} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange: "opacity, transform"
    }}>{children}</Tag>
  );
}

/* ═══════════════════════════ Parallax wrapper ═══════════════════════════ */
function Parallax({ children, speed = 0.15, className = "", style }) {
  const ref = useRef(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) { raf = null; return; }
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const off = (window.innerHeight / 2 - center) * speed;
        setT(off);
        raf = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [speed]);
  return <div ref={ref} className={className} style={{ ...style, transform: `translate3d(0, ${t}px, 0)`, willChange: "transform" }}>{children}</div>;
}

/* ═══════════════════════════ Language toggle ═══════════════════════════ */
function LangToggle({ lang, setLang, variant = "pill" }) {
  if (variant === "pill") {
    return (
      <div className="jv-lang-pill" role="group" aria-label="Language">
        <button type="button" data-active={lang === "en"} onClick={() => setLang("en")}>EN</button>
        <span className="jv-lang-sep" aria-hidden="true">·</span>
        <button type="button" data-active={lang === "es"} onClick={() => setLang("es")}>ES</button>
      </div>
    );
  }
  return (
    <button type="button" className="jv-lang-toggle" onClick={() => setLang(lang === "en" ? "es" : "en")}>
      <span data-active={lang === "en"}>EN</span>/<span data-active={lang === "es"}>ES</span>
    </button>
  );
}

/* ═══════════════════════════ Before / After slider ═══════════════════════════ */
function BeforeAfter({ before, after, label, beforeLabel = "Before", afterLabel = "After" }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    const move = (e) => { if (dragging.current) { e.preventDefault(); setFromX(e.touches ? e.touches[0].clientX : e.clientX); } };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [setFromX]);

  return (
    <div className="jv-ba" ref={ref}
      onMouseDown={(e) => { dragging.current = true; setFromX(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; setFromX(e.touches[0].clientX); }}
      role="slider" aria-valuenow={Math.round(pos)} aria-valuemin={0} aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
      }}
    >
      <img className="jv-ba-img jv-ba-after" src={after} alt="After" draggable="false" />
      <div className="jv-ba-clip" style={{ width: `${pos}%` }}>
        <img className="jv-ba-img" src={before} alt="Before" draggable="false" style={{ width: `${10000 / Math.max(1, pos)}%` }} />
      </div>
      <div className="jv-ba-tag jv-ba-tag-before">{beforeLabel}</div>
      <div className="jv-ba-tag jv-ba-tag-after">{afterLabel}</div>
      <div className="jv-ba-handle" style={{ left: `${pos}%` }}>
        <div className="jv-ba-handle-line" />
        <div className="jv-ba-handle-knob">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M8 6L4 11L8 16M14 6L18 11L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      {label && <div className="jv-ba-caption">{label}</div>}
    </div>
  );
}

/* ═══════════════════════════ Price Calculator ═══════════════════════════ */
function PriceCalculator({ lang, accent = "var(--jv-accent)" }) {
  const t = JV.t[lang];
  const services = JV.services[lang];
  const [serviceId, setServiceId] = useState("patios");
  const [size, setSize] = useState(400);
  const [tier, setTier] = useState("standard"); // value | standard | premium

  const svc = services.find((s) => s.id === serviceId);
  const tierMul = { value: 0.85, standard: 1.0, premium: 1.35 }[tier];
  const min = Math.round(size * svc.price.min * tierMul / 50) * 50;
  const max = Math.round(size * svc.price.max * tierMul / 50) * 50;
  const isPerVisit = svc.price.unit.includes("visit") || svc.price.unit.includes("visita");
  const showSize = !isPerVisit;
  const fmt = (n) => "$" + n.toLocaleString();

  const tierLabel = lang === "en"
    ? { value: "Value", standard: "Standard", premium: "Premium" }
    : { value: "Económico", standard: "Estándar", premium: "Premium" };

  return (
    <div className="jv-calc">
      <div className="jv-calc-row">
        <label className="jv-calc-label">{t.calc.service}</label>
        <div className="jv-calc-services">
          {services.map((s) => (
            <button key={s.id} type="button"
              className="jv-calc-chip" data-active={s.id === serviceId}
              onClick={() => setServiceId(s.id)}>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {showSize && (
        <div className="jv-calc-row">
          <div className="jv-calc-row-head">
            <label className="jv-calc-label" htmlFor="jv-size">{t.calc.area}</label>
            <span className="jv-calc-size">{size.toLocaleString()} <span>sq ft</span></span>
          </div>
          <input id="jv-size" type="range" min="50" max="2500" step="25"
            value={size} onChange={(e) => setSize(+e.target.value)}
            className="jv-calc-slider" />
          <div className="jv-calc-ticks"><span>50</span><span>1,000</span><span>2,500</span></div>
        </div>
      )}

      <div className="jv-calc-row">
        <label className="jv-calc-label">{t.calc.surface}</label>
        <div className="jv-calc-tier">
          {["value", "standard", "premium"].map((k) => (
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
  );
}

/* ═══════════════════════════ Service Area Map (SVG) ═══════════════════════════ */
function ServiceAreaMap({ lang, onCity }) {
  const [hover, setHover] = useState(null);
  const cities = JV.cities;

  return (
    <div className="jv-map">
      <svg viewBox="0 0 100 100" className="jv-map-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="jv-rad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--jv-accent)" stopOpacity="0.32"/>
            <stop offset="60%" stopColor="var(--jv-accent)" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="var(--jv-accent)" stopOpacity="0"/>
          </radialGradient>
          <pattern id="jv-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.15" opacity="0.3"/>
          </pattern>
        </defs>

        {/* grid */}
        <rect width="100" height="100" fill="url(#jv-grid)" />

        {/* Bay water shape — stylized */}
        <path d="M 55 0 Q 60 20 58 35 Q 65 45 60 55 Q 70 70 65 90 Q 70 100 60 100 L 100 100 L 100 0 Z"
          fill="currentColor" opacity="0.06" />
        <path d="M 56 5 Q 60 22 59 36 Q 66 46 62 56 Q 71 72 67 92"
          fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1,1.5" />

        {/* 40-mile radius */}
        <circle cx="50" cy="50" r="40" fill="url(#jv-rad)" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--jv-accent)" strokeWidth="0.5" strokeDasharray="0.8,1.2" opacity="0.7" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="var(--jv-accent)" strokeWidth="0.3" strokeDasharray="0.6,1" opacity="0.45" />

        {/* radius label */}
        <g transform="translate(50, 10)">
          <text textAnchor="middle" fontSize="2.4" fill="var(--jv-accent)" fontWeight="700" letterSpacing="0.3">40 MI RADIUS</text>
        </g>

        {/* cities */}
        {cities.map((c, i) => (
          <g key={c.name} className="jv-map-city" data-active={hover === i}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            onClick={() => onCity && onCity(c)}
            style={{ cursor: "pointer" }}>
            {c.hq ? (
              <>
                <circle cx={c.x} cy={c.y} r="2.6" fill="var(--jv-accent)" />
                <circle cx={c.x} cy={c.y} r="2.6" fill="none" stroke="var(--jv-accent)" strokeWidth="0.4">
                  <animate attributeName="r" values="2.6;5;2.6" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <text x={c.x} y={c.y - 4} textAnchor="middle" fontSize="2.6" fontWeight="800" fill="currentColor">{c.name}</text>
                <text x={c.x} y={c.y + 5.5} textAnchor="middle" fontSize="1.6" fill="var(--jv-accent)" fontWeight="600" letterSpacing="0.2">HQ</text>
              </>
            ) : (
              <>
                <circle cx={c.x} cy={c.y} r={hover === i ? 1.4 : 0.9} fill="currentColor" opacity={hover === i ? 1 : 0.55} />
                <text x={c.x} y={c.y - 1.8} textAnchor="middle" fontSize={hover === i ? 2.2 : 1.8}
                  fill="currentColor" opacity={hover === i ? 1 : 0.7} fontWeight={hover === i ? 700 : 500}>
                  {c.name}
                </text>
                {hover === i && (
                  <text x={c.x} y={c.y + 3} textAnchor="middle" fontSize="1.5" fill="var(--jv-accent)" fontWeight="700">
                    {c.dist} mi
                  </text>
                )}
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════ Multi-step Form ═══════════════════════════ */
function MultiStepForm({ lang, defaultService = "" }) {
  const t = JV.t[lang];
  const services = JV.services[lang];
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: defaultService, when: "ASAP", size: "", address: "", name: "", email: "", phone: "", message: ""
  });
  const [done, setDone] = useState(false);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const canNext = step === 0 ? !!data.service : step === 1 ? !!data.address : true;

  const submit = (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    setDone(true);
  };

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
    );
  }

  return (
    <form className="jv-form" onSubmit={submit}>
      <div className="jv-form-progress">
        {[0, 1, 2].map((i) => (
          <div key={i} className="jv-form-progress-step" data-state={i < step ? "done" : i === step ? "active" : "next"}>
            <span>{i + 1}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="jv-form-step">
          <h3 className="jv-form-step-title">{t.form.step1}</h3>
          <div className="jv-form-services">
            {services.map((s) => (
              <button key={s.id} type="button"
                className="jv-form-service-card" data-active={data.service === s.id}
                onClick={() => { set("service", s.id); setTimeout(() => setStep(1), 200); }}>
                <span className="jv-form-service-name">{s.name}</span>
                <span className="jv-form-service-price">{lang === "en" ? "from" : "desde"} ${s.price.min}<small>/{s.price.unit.split(" ").pop()}</small></span>
              </button>
            ))}
          </div>
          <div className="jv-form-row">
            <label>{t.form.f_when}</label>
            <div className="jv-form-when">
              {t.form.when.map((w, i) => (
                <button key={w} type="button" data-active={data.when === w}
                  onClick={() => set("when", w)}>{w}</button>
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
            <input type="text" value={data.address} onChange={(e) => set("address", e.target.value)} placeholder="Annapolis, MD" required />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_size}</span>
            <input type="text" value={data.size} onChange={(e) => set("size", e.target.value)} placeholder="~ 600 sq ft" />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_msg}</span>
            <textarea value={data.message} onChange={(e) => set("message", e.target.value)} rows="3" placeholder={lang === "en" ? "Patio shape, materials in mind, deadlines..." : "Forma del patio, materiales, fechas..."}/>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="jv-form-step">
          <h3 className="jv-form-step-title">{t.form.step3}</h3>
          <label className="jv-form-field">
            <span>{t.form.f_name}</span>
            <input type="text" value={data.name} onChange={(e) => set("name", e.target.value)} required />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_phone}</span>
            <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(443) 555-0100" required />
          </label>
          <label className="jv-form-field">
            <span>{t.form.f_email}</span>
            <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
          </label>
          <p className="jv-form-privacy">🔒 {t.form.privacy}</p>
        </div>
      )}

      <div className="jv-form-actions">
        {step > 0 && (
          <button type="button" className="jv-form-back" onClick={() => setStep(step - 1)}>
            ← {lang === "en" ? "Back" : "Atrás"}
          </button>
        )}
        {step < 2 ? (
          <button type="button" className="jv-form-next" disabled={!canNext} onClick={() => setStep(step + 1)}>
            {lang === "en" ? "Continue" : "Continuar"} →
          </button>
        ) : (
          <button type="submit" className="jv-form-submit">
            {t.form.submit}
          </button>
        )}
      </div>
    </form>
  );
}

/* ═══════════════════════════ Sticky mobile CTA bar ═══════════════════════════ */
function StickyMobileCTA({ lang, onQuote }) {
  const t = JV.t[lang];
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="jv-sticky" data-show={show}>
      <a className="jv-sticky-btn jv-sticky-call" href={`tel:${JV.business.phone1Tel}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>{t.sticky.call}</span>
      </a>
      <a className="jv-sticky-btn jv-sticky-wa" href={`https://wa.me/${JV.business.whatsapp}`} target="_blank" rel="noopener">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"/></svg>
        <span>{t.sticky.whatsapp}</span>
      </a>
      <button type="button" className="jv-sticky-btn jv-sticky-quote" onClick={onQuote}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
        <span>{t.sticky.quote}</span>
      </button>
    </div>
  );
}

/* ═══════════════════════════ FAQ Accordion ═══════════════════════════ */
function FAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="jv-faq">
      {items.map((it, i) => (
        <div key={i} className="jv-faq-item" data-open={open === i}>
          <button type="button" className="jv-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="jv-faq-icon">{open === i ? "−" : "+"}</span>
          </button>
          <div className="jv-faq-a-wrap">
            <div className="jv-faq-a">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════ Star icon ═══════════════════════════ */
function Stars({ n = 5, size = 14 }) {
  return (
    <span className="jv-stars" aria-label={`${n} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

/* ═══════════════════════════ Stat counter ═══════════════════════════ */
function StatCounter({ value, label }) {
  // Render value as-is. Animation-on-scroll for purely numeric
  const [v, setV] = useState(value);
  const ref = useRef(null);
  const animated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numeric = value.match(/^(\d+)/);
    if (!numeric) return;
    const target = parseInt(numeric[1], 10);
    const suffix = value.slice(numeric[1].length);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !animated.current) {
          animated.current = true;
          const dur = 1200;
          const start = performance.now();
          const tick = (now) => {
            const k = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            setV(Math.round(target * eased) + suffix);
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="jv-stat">
      <div className="jv-stat-n">{v}</div>
      <div className="jv-stat-l">{label}</div>
    </div>
  );
}

/* expose */
Object.assign(window, {
  Reveal, Parallax, LangToggle, BeforeAfter, PriceCalculator,
  ServiceAreaMap, MultiStepForm, StickyMobileCTA, FAQ, Stars, StatCounter
});
