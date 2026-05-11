export default function LangToggle({ lang, setLang, variant = 'pill' }) {
  if (variant === 'pill') {
    return (
      <div className="jv-lang-pill" role="group" aria-label="Language">
        <button type="button" data-active={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <span className="jv-lang-sep" aria-hidden="true">·</span>
        <button type="button" data-active={lang === 'es'} onClick={() => setLang('es')}>ES</button>
      </div>
    )
  }
  return (
    <button type="button" className="jv-lang-toggle" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
      <span data-active={lang === 'en'}>EN</span>/<span data-active={lang === 'es'}>ES</span>
    </button>
  )
}
