import AppleGlassStack from './AppleGlassStack'

const items = [
  {
    title: '100%',
    label: 'Originales',
    body: 'Distribuidores autorizados de todas las marcas que ofrecemos.',
  },
  {
    title: '48h',
    label: 'Entrega',
    body: 'Envíos a cualquier estado del país con tracking incluido.',
  },
  {
    title: 'Oficial',
    label: 'Garantía',
    body: 'Respaldo directo del fabricante en todos los productos.',
  },
  {
    title: 'Directa',
    label: 'Asesoría',
    body: 'Por WhatsApp, siempre disponibles para ayudarte.',
  },
]

export default function WhyUs() {
  return (
    <section className="section-pad" style={{ position: 'relative', background: '#040e0f', paddingTop: 96, paddingBottom: 96, overflow: 'hidden' }}>
      {/* Glow de fondo */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900, height: 500,
        background: 'radial-gradient(ellipse at center, rgba(14,167,183,0.18) 0%, rgba(7,83,86,0.08) 50%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, color: '#3dc8d6', fontWeight: 500, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>
            ¿Por qué Nexo Pro?
          </p>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 400, color: '#fff', letterSpacing: -1.5, lineHeight: 1.1 }}>
            Tecnología con respaldo real.
          </h2>
        </div>

        <AppleGlassStack
          items={items}
          direction="horizontal"
          gap={20}
          config={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            backgroundBlur: 24,
            borderRadius: 24,
            padding: 44,
            boxHeight: 260,
            hoverLift: 14,
            strokeSize: 1,
            strokeColor: 'rgba(255,255,255,0.1)',
            shineColor: 'rgba(255,255,255,0.15)',
          }}
        />
      </div>
    </section>
  )
}
