import { useState } from 'react'
import ProductSlideshow from './ProductSlideshow'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { products } from '../data/products'

function buildItems(brand, categories) {
  const usedImages = new Set()
  return products
    .filter(p => p.brand === brand && categories.includes(p.category))
    .flatMap(product =>
      product.colorVariants
        .filter(v => {
          if (usedImages.has(v.image)) return false
          usedImages.add(v.image)
          return true
        })
        .map(v => {
          const minPrice = Math.min(...v.storage.map(s => s.price))
          const priceStr = v.storage.length === 1
            ? `REF ${minPrice.toLocaleString()}`
            : `Desde REF ${minPrice.toLocaleString()}`
          const storageLabel = v.storage.map(s => s.label).filter(Boolean).join(' · ')
          const description = [v.color, storageLabel, 'eSIM'].filter(Boolean).join(' · ')
          return {
            name: product.name,
            description,
            price: priceStr,
            link: `/tienda?producto=${product.id}${v.color ? `&color=${encodeURIComponent(v.color)}` : ''}`,
            image: { src: v.image, alt: `${product.name}${v.color ? ` ${v.color}` : ''}` },
          }
        })
    )
}

const lines = [
  {
    id: 'iphone',
    brand: 'Apple',
    label: 'IPHONE',
    title: 'iPhone 17 Pro & Pro Max.',
    subtitle: 'Todos desbloqueados, eSIM. Silver, Orange y Silver Blue disponibles.',
    bgText: 'iPHONE',
    background: '#f5f5f7',
    dark: false,
    items: buildItems('Apple', ['iphone']),
  },
]

export default function ProductLines({ defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const isMobile = useBreakpoint(768)
  const line = lines[activeTab]

  const slideshowBaseSize = isMobile
    ? { width: 140, height: 200 }
    : { width: 200, height: 280 }

  return (
    <section style={{ background: line.background, transition: 'background 0.5s ease', overflow: 'hidden' }}>
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
                {line.label}
              </p>
              <h2 style={{
                fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(28px, 4vw, 52px)',
                fontWeight: 400, letterSpacing: -1.5,
                color: line.dark ? '#fff' : '#1a1a1a',
                margin: 0, lineHeight: 1.1,
              }}>
                {line.title}
              </h2>
            </div>
            <p style={{
              fontSize: 14, lineHeight: 1.65, margin: 0,
              color: line.dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
              maxWidth: isMobile ? '100%' : 340,
            }}>
              {line.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 48 : 72 }}>
        <ProductSlideshow
          key={line.id}
          items={line.items}
          bgText={line.bgText}
          baseSize={slideshowBaseSize}
          scaleUp={{ maxScale: 165, time: 0.45, easing: 'easeInOut', sizeDecrement: 20 }}
          settings={{ gap: isMobile ? 12 : 20, radius: 16, background: 'transparent' }}
          lightBg={!line.dark}
        />
        <p style={{
          textAlign: 'center', fontSize: 12, fontWeight: 600, marginTop: 16,
          color: line.dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.25)',
        }}>
          {isMobile
            ? 'Toca para ver detalles · Desliza para navegar'
            : 'Haz click en un producto para ver detalles · Scroll o flechas para navegar'}
        </p>
      </div>
    </section>
  )
}

