import { useBreakpoint } from '../hooks/useBreakpoint'

const brands = [
  { name: 'Apple', hoverColor: '#1a1a1a' },
  { name: 'DJI',   hoverColor: '#e74c3c' },
  { name: 'Meta',  hoverColor: '#0668E1' },
  { name: 'Oakley',hoverColor: '#c41230' },
]

export default function Brands() {
  const isMobile = useBreakpoint(768)

  return (
    <section style={{
      background: '#fff',
      padding: isMobile ? '40px 24px' : '56px 48px',
      borderTop: '1px solid #f2f2f2',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', letterSpacing: 2.5, fontWeight: 500, marginBottom: 28 }}>
          NUESTRAS MARCAS
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: isMobile ? 24 : 72,
          flexWrap: 'wrap',
        }}>
          {brands.map((b) => (
            <span
              key={b.name}
              style={{
                fontSize: isMobile ? 18 : 22,
                fontWeight: 500, color: '#d0d0d0',
                letterSpacing: 0.5, cursor: 'pointer', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = b.hoverColor}
              onMouseLeave={e => e.currentTarget.style.color = '#d0d0d0'}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
