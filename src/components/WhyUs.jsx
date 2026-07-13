import { useBreakpoint } from '../hooks/useBreakpoint'

const items = [
  {
    stat: '100%',
    label: 'Originales',
    body: 'Distribuidores autorizados de todas las marcas que ofrecemos.',
  },
  {
    stat: '48h',
    label: 'Entrega',
    body: 'Envíos a cualquier estado del país con tracking incluido.',
  },
  {
    stat: 'Oficial',
    label: 'Garantía',
    body: 'Respaldo directo del fabricante en todos los productos.',
  },
  {
    stat: 'Directa',
    label: 'Asesoría',
    body: 'Por WhatsApp, siempre disponibles para ayudarte.',
  },
]

export default function WhyUs() {
  const isMobile = useBreakpoint(768)

  return (
    <section id="nosotros" className="section-pad" style={{
      background: '#fff',
      paddingTop: isMobile ? 48 : 72,
      paddingBottom: isMobile ? 48 : 72,
      borderTop: '1px solid #e8e8e6',
      scrollMarginTop: 68,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: isMobile ? 12 : 24,
          marginBottom: isMobile ? 40 : 56,
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10, color: '#0057FF' }}>
              ¿Por qué PULSE?
            </p>
            <h2 style={{
              fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(28px, 4vw, 52px)',
              fontWeight: 400, letterSpacing: -1.5,
              color: '#1a1a1a', margin: 0, lineHeight: 1.1,
            }}>
              Tecnología con respaldo real.
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '32px 24px' : '0',
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              paddingRight: isMobile ? 0 : 40,
              borderRight: isMobile ? 'none' : (i < items.length - 1 ? '1px solid #e8e8e6' : 'none'),
              paddingLeft: isMobile ? 0 : (i > 0 ? 40 : 0),
            }}>
              <p style={{
                fontSize: isMobile ? 44 : 52,
                fontWeight: 300,
                letterSpacing: -2,
                color: '#1a1a1a',
                margin: '0 0 4px',
                lineHeight: 1,
              }}>
                {item.stat}
              </p>
              <p style={{
                fontSize: 11, fontWeight: 600,
                letterSpacing: 2, textTransform: 'uppercase',
                color: '#0057FF', margin: '0 0 12px',
              }}>
                {item.label}
              </p>
              <p style={{
                fontSize: 14, lineHeight: 1.65,
                color: 'rgba(0,0,0,0.45)', margin: 0,
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

