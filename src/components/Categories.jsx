const categories = [
  {
    label: 'iPhone', sub: 'Apple',
    icon: (
      <svg width="30" height="54" viewBox="0 0 30 54" fill="none">
        <rect x="2" y="2" width="26" height="50" rx="7" stroke="#075356" strokeWidth="1.5"/>
        <rect x="8" y="7" width="14" height="4" rx="2" fill="#0ea7b7" opacity="0.5"/>
        <rect x="9" y="46" width="12" height="2.5" rx="1.25" fill="#075356" opacity="0.35"/>
      </svg>
    ),
  },
  {
    label: 'DJI Estabilizadores', sub: 'OM Series · RS Series',
    icon: (
      <svg width="38" height="54" viewBox="0 0 38 54" fill="none">
        <rect x="16" y="2" width="6" height="20" rx="3" fill="rgba(14,167,183,0.2)" stroke="#0ea7b7" strokeWidth="1.5"/>
        <circle cx="19" cy="9" r="7" stroke="#075356" strokeWidth="1.5" fill="rgba(7,83,86,0.06)"/>
        <rect x="2" y="22" width="34" height="6" rx="3" fill="rgba(14,167,183,0.15)" stroke="#0ea7b7" strokeWidth="1.5"/>
        <circle cx="7" cy="25" r="5.5" stroke="#075356" strokeWidth="1.5" fill="rgba(7,83,86,0.06)"/>
        <circle cx="31" cy="25" r="5.5" stroke="#075356" strokeWidth="1.5" fill="rgba(7,83,86,0.06)"/>
        <rect x="16" y="28" width="6" height="22" rx="3" fill="rgba(14,167,183,0.15)" stroke="#0ea7b7" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: 'DJI Micrófonos', sub: 'Mic 2 · Mic Mini',
    icon: (
      <svg width="28" height="50" viewBox="0 0 28 50" fill="none">
        <rect x="7" y="2" width="14" height="26" rx="7" stroke="#0ea7b7" strokeWidth="1.5" fill="rgba(14,167,183,0.08)"/>
        <path d="M2 22 Q14 36 26 22" stroke="#075356" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="14" y1="34" x2="14" y2="44" stroke="#075356" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6" y="44" width="16" height="3" rx="1.5" fill="#075356" opacity="0.4"/>
      </svg>
    ),
  },
  {
    label: 'Oakley Meta', sub: 'Meta × Oakley',
    icon: (
      <svg width="62" height="28" viewBox="0 0 62 28" fill="none">
        <rect x="2" y="5" width="24" height="18" rx="5" stroke="#0ea7b7" strokeWidth="1.5" fill="rgba(14,167,183,0.08)"/>
        <rect x="36" y="5" width="24" height="18" rx="5" stroke="#0ea7b7" strokeWidth="1.5" fill="rgba(14,167,183,0.08)"/>
        <path d="M26 14 L36 14" stroke="#075356" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Categories() {
  return (
    <section className="section-pad" style={{ background: '#f0fafb', paddingTop: 72, paddingBottom: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, color: '#1a1a1a', textAlign: 'center', marginBottom: 8 }}>Nuestras categorías</h2>
        <p style={{ fontSize: 15, color: '#777', textAlign: 'center', marginBottom: 40 }}>Marcas aspiracionales, tecnología de primer nivel.</p>
        <div className="categories-grid">
          {categories.map((cat) => (
            <a key={cat.label} href="#" style={{
              background: '#fff', borderRadius: 12, padding: '32px 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
              border: '1.5px solid transparent', transition: 'all 0.22s cubic-bezier(.22,1,.36,1)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#0ea7b7'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(7,83,86,0.09)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div style={{ width: 72, height: 72, background: '#f0fafb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cat.icon}
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', marginBottom: 4 }}>{cat.label}</h3>
                <p style={{ fontSize: 12, color: '#999' }}>{cat.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
