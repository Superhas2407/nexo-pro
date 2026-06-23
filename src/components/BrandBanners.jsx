export default function BrandBanners() {
  return (
    <>
      <section className="section-pad" style={{ background: '#075356', paddingTop: 80, paddingBottom: 80 }}>
        <div className="banner-inner">
          <div style={{ flex: 1, maxWidth: 480 }}>
            <p style={{ fontSize: 11, color: '#3dc8d6', fontWeight: 500, letterSpacing: 2.5, marginBottom: 18 }}>DJI COLECCIÓN</p>
            <h2 style={{ fontSize: 32, fontWeight: 500, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>Captura todo<br/>con DJI.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, marginBottom: 32 }}>Estabilizadores y micrófonos profesionales para creadores que no se conforman con menos.</p>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1.5px solid rgba(255,255,255,0.55)', color: '#fff', fontSize: 14, fontWeight: 500, padding: '12px 28px', borderRadius: 8, transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent' }}
            >
              Ver colección DJI
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div className="banner-illustration" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {[
              <svg key="gimbal" width="64" height="128" viewBox="0 0 64 128" fill="none">
                <rect x="28" y="2" width="8" height="48" rx="4" fill="rgba(14,167,183,0.2)" stroke="#0ea7b7" strokeWidth="1.5"/>
                <circle cx="32" cy="14" r="11" stroke="#3dc8d6" strokeWidth="1.5"/>
                <rect x="4" y="50" width="56" height="8" rx="4" fill="rgba(14,167,183,0.15)" stroke="#0ea7b7" strokeWidth="1.5"/>
                <circle cx="10" cy="54" r="8" stroke="#3dc8d6" strokeWidth="1.5"/>
                <circle cx="54" cy="54" r="8" stroke="#3dc8d6" strokeWidth="1.5"/>
                <rect x="28" y="58" width="8" height="64" rx="4" fill="rgba(14,167,183,0.15)" stroke="#0ea7b7" strokeWidth="1.5"/>
              </svg>,
              <svg key="mic" width="110" height="80" viewBox="0 0 110 80" fill="none">
                <rect x="8" y="8" width="94" height="52" rx="10" fill="rgba(14,167,183,0.1)" stroke="#0ea7b7" strokeWidth="1.5"/>
                <rect x="18" y="20" width="74" height="12" rx="5" fill="rgba(61,200,214,0.22)"/>
                <circle cx="32" cy="46" r="6" stroke="#3dc8d6" strokeWidth="1.5"/>
                <circle cx="55" cy="46" r="6" stroke="#3dc8d6" strokeWidth="1.5"/>
                <circle cx="78" cy="46" r="6" stroke="#3dc8d6" strokeWidth="1.5"/>
              </svg>,
            ].map((icon, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(14,167,183,0.28)', borderRadius: 12, padding: '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 148, height: 170 }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#0a0a0a', paddingTop: 80, paddingBottom: 80 }}>
        <div className="banner-inner">
          <div style={{ flex: 1, maxWidth: 480 }}>
            <p style={{ fontSize: 11, color: '#3dc8d6', fontWeight: 500, letterSpacing: 2.5, marginBottom: 18 }}>META × OAKLEY</p>
            <h2 style={{ fontSize: 32, fontWeight: 500, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>Audio + cámara<br/>en tus lentes.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.65, marginBottom: 32 }}>Oakley Meta integra tecnología inteligente en un diseño que ya conoces y usas todos los días.</p>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#0ea7b7', color: '#fff', fontSize: 14, fontWeight: 500, padding: '12px 28px', borderRadius: 8, transition: 'background 0.22s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#3dc8d6'}
              onMouseLeave={e => e.currentTarget.style.background = '#0ea7b7'}
            >
              Explorar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div className="banner-illustration" style={{ width: 380, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="340" height="148" viewBox="0 0 340 148" fill="none">
              <path d="M8 68 L20 62" stroke="#3dc8d6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 42 L20 90 Q20 115 46 115 L124 115 Q152 115 152 90 L152 42 Q152 18 124 18 L46 18 Q20 18 20 42Z" fill="rgba(14,167,183,0.09)" stroke="#3dc8d6" strokeWidth="2"/>
              <circle cx="86" cy="66" r="26" stroke="#0ea7b7" strokeWidth="1" opacity="0.3"/>
              <path d="M152 66 L188 66" stroke="#3dc8d6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M188 42 L188 90 Q188 115 214 115 L292 115 Q320 115 320 90 L320 42 Q320 18 292 18 L214 18 Q188 18 188 42Z" fill="rgba(14,167,183,0.09)" stroke="#3dc8d6" strokeWidth="2"/>
              <circle cx="292" cy="44" r="16" stroke="#0ea7b7" strokeWidth="1.5" strokeDasharray="4,3"/>
              <circle cx="292" cy="44" r="7" fill="rgba(14,167,183,0.2)"/>
              <path d="M320 68 L332 62" stroke="#3dc8d6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </section>
    </>
  )
}
