import ProductSlideshow from './ProductSlideshow'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { products } from '../data/products'

// Una funda representativa por marca — no las 189 variantes de color/línea.
// image/imageAlt usan versiones recortadas (fundas-line-*) para tamaño consistente en el carrusel;
// el link sigue apuntando al producto real en products.js
const FEATURED = [
  { id: 'spigen-tough-armor', image: '/fundas-line-spigen.webp' },
  { id: 'uag-monarch', image: '/fundas-line-uag.webp' },
  { id: 'otterbox-defender-series', image: '/fundas-line-otterbox.webp' },
  { id: 'ringke-onyx', image: '/fundas-line-ringke.webp' },
  { id: 'nomad-modern-leather-case', image: '/fundas-line-nomad.webp' },
  { id: 'peak-design-everyday-case', image: '/fundas-line-peakdesign.webp' },
]

function buildItems() {
  return FEATURED
    .map(({ id, image }) => {
      const product = products.find(p => p.id === id)
      if (!product) return null
      const v = product.colorVariants[0]
      return {
        name: product.name,
        description: v.color ?? '',
        price: `REF ${v.storage[0].price.toLocaleString()}`,
        link: `/tienda?producto=${product.id}${v.color ? `&color=${encodeURIComponent(v.color)}` : ''}`,
        image: { src: image, alt: `${product.name}${v.color ? ` ${v.color}` : ''}` },
      }
    })
    .filter(Boolean)
}

const items = buildItems()

export default function FundasLines() {
  const isMobile = useBreakpoint(768)

  const slideshowBaseSize = isMobile
    ? { width: 160, height: 200 }
    : { width: 220, height: 280 }

  return (
    <section style={{ background: '#fff', overflow: 'hidden' }}>
      <div className="section-pad" style={{ paddingTop: isMobile ? 48 : 72, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: isMobile ? 12 : 24,
            marginBottom: isMobile ? 32 : 48,
          }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10, color: '#0057FF' }}>
                Fundas
              </p>
              <h2 style={{
                fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(28px, 4vw, 52px)',
                fontWeight: 400, letterSpacing: -1.5,
                color: '#1a1a1a',
                margin: 0, lineHeight: 1.1,
              }}>
                Spigen, UAG, OtterBox y más.
              </h2>
            </div>
            <p style={{
              fontSize: 14, lineHeight: 1.65, margin: 0,
              color: 'rgba(0,0,0,0.45)',
              maxWidth: isMobile ? '100%' : 340,
            }}>
              Protección para cada estilo — desde transparentes minimalistas hasta rugged militar.
            </p>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 48 : 72 }}>
        <ProductSlideshow
          items={items}
          bgText="FUNDAS"
          baseSize={slideshowBaseSize}
          scaleUp={{ maxScale: 165, time: 0.45, easing: 'easeInOut', sizeDecrement: 20 }}
          settings={{ gap: isMobile ? 12 : 20, radius: 16, background: 'transparent' }}
          lightBg={true}
          imageFit="contain"
        />
        <p style={{
          textAlign: 'center', fontSize: 12, fontWeight: 600, marginTop: 16,
          color: 'rgba(0,0,0,0.25)',
        }}>
          {isMobile
            ? 'Toca para ver detalles · Desliza para navegar'
            : 'Haz click en un producto para ver detalles · Scroll o flechas para navegar'}
        </p>
      </div>
    </section>
  )
}
