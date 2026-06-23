import ProductSlideshow from './ProductSlideshow'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { products } from '../data/products'

function buildItems(categories) {
  const usedImages = new Set()
  return products
    .filter(p => p.brand === 'DJI' && categories.includes(p.category))
    .flatMap(product =>
      product.colorVariants
        .filter(v => {
          if (usedImages.has(v.image)) return false
          usedImages.add(v.image)
          return true
        })
        .map(v => {
          const minPrice = Math.min(...v.storage.map(s => s.price))
          const priceStr = `REF ${minPrice.toLocaleString()}`
          return {
            name: product.name,
            description: product.tag || null,
            price: priceStr,
            link: `/tienda?producto=${product.id}`,
            image: { src: v.image, alt: product.name },
          }
        })
    )
}

const line = {
  label: 'DJI',
  title: 'Estabilizadores Osmo Mobile.',
  subtitle: 'Osmo Mobile 7, 7P y 8. Para creadores que van en serio.',
  background: '#0d0d0f',
  dark: true,
  items: buildItems(['dji-estab']),
}

export default function DjiLines() {
  const isMobile = useBreakpoint(768)

  const slideshowBaseSize = isMobile
    ? { width: 160, height: 240 }
    : { width: 200, height: 320 }

  return (
    <section style={{ background: line.background, overflow: 'hidden' }}>
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
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10, color: '#0ea7b7' }}>
                {line.label}
              </p>
              <h2 style={{
                fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(28px, 4vw, 52px)',
                fontWeight: 400, letterSpacing: -1.5,
                color: '#fff',
                margin: 0, lineHeight: 1.1,
              }}>
                {line.title}
              </h2>
            </div>
            <p style={{
              fontSize: 14, lineHeight: 1.65, margin: 0,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: isMobile ? '100%' : 340,
            }}>
              {line.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 48 : 72 }}>
        <ProductSlideshow
          items={line.items}
          bgText={null}
          baseSize={slideshowBaseSize}
          scaleUp={{ maxScale: 165, time: 0.45, easing: 'easeInOut', sizeDecrement: 20 }}
          settings={{ gap: isMobile ? 12 : 20, radius: 16, background: 'transparent' }}
          lightBg={true}
          darkTheme={true}
          imageFit="contain"
        />
        <p style={{
          textAlign: 'center', fontSize: 12, fontWeight: 600, marginTop: 16,
          color: 'rgba(255,255,255,0.22)',
        }}>
          {isMobile
            ? 'Toca para ver detalles · Desliza para navegar'
            : 'Haz click en un producto para ver detalles · Scroll o flechas para navegar'}
        </p>
      </div>
    </section>
  )
}
