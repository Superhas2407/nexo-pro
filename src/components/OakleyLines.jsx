import ProductSlideshow from './ProductSlideshow'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { products } from '../data/products'

function buildItems() {
  const usedImages = new Set()
  return products
    .filter(p => p.category === 'oakley')
    .flatMap(product =>
      product.colorVariants
        .filter(v => {
          if (!v.image || usedImages.has(v.image)) return false
          usedImages.add(v.image)
          return true
        })
        .map(v => ({
          name: product.name,
          description: v.color ?? '',
          price: `REF ${v.storage[0].price.toLocaleString()}`,
          link: `/tienda?producto=${product.id}${v.color ? `&color=${encodeURIComponent(v.color)}` : ''}`,
          image: { src: v.image, alt: `${product.name}${v.color ? ` ${v.color}` : ''}` },
        }))
    )
}

const items = buildItems()

export default function OakleyLines() {
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
                Oakley Meta
              </p>
              <h2 style={{
                fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(28px, 4vw, 52px)',
                fontWeight: 400, letterSpacing: -1.5,
                color: '#1a1a1a',
                margin: 0, lineHeight: 1.1,
              }}>
                HSTN & Vanguard.
              </h2>
            </div>
            <p style={{
              fontSize: 14, lineHeight: 1.65, margin: 0,
              color: 'rgba(0,0,0,0.45)',
              maxWidth: isMobile ? '100%' : 340,
            }}>
              Smart glasses con IA, cámara integrada y audio direccional. Lentes Prizm de Oakley.
            </p>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 48 : 72 }}>
        <ProductSlideshow
          items={items}
          bgText="OAKLEY"
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

