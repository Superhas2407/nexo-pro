import { useState } from 'react'
import { products, basePrice } from '../data/products'
import { useBreakpoint } from '../hooks/useBreakpoint'

const fmt = (n) => 'REF ' + n.toLocaleString('en-US')

const tabs = [
  { label: 'Más populares', ids: ['iphone-17-pro', 'iphone-17-pro-max', 'dji-om7p', 'airpods-pro-3'] },
  { label: 'Nuevos',        ids: ['iphone-17-pro', 'dji-om8', 'airpods-pro-3', 'dji-om7'] },
]

const tagColors = {
  'Nuevo':    { bg: '#0ea7b7', color: '#fff' },
  'Pro':      { bg: '#111',    color: '#fff' },
  'Popular':  { bg: '#f0c000', color: '#111' },
  'Exclusivo':{ bg: '#111',    color: '#fff' },
}

function FeatCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const v = product.colorVariants[0]
  const price = fmt(basePrice(product))
  const hasMulti = product.colorVariants.length > 1 || product.colorVariants[0].storage.length > 1
  const tagStyle = product.tag ? tagColors[product.tag] : null

  return (
    <a
      href={`/tienda?producto=${product.id}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        display: 'flex', flexDirection: 'column',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'transform 0.3s cubic-bezier(.22,1,.36,1)',
      }}>
        {/* Imagen flotante */}
        <div style={{
          height: 220, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {tagStyle && (
            <span style={{
              position: 'absolute', top: 0, left: 0, zIndex: 1,
              fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
              padding: '3px 10px', borderRadius: 99, textTransform: 'uppercase',
              background: tagStyle.bg, color: tagStyle.color,
            }}>
              {product.tag}
            </span>
          )}
          {v.image ? (
            <>
              <img
                src={v.image}
                alt={product.name}
                style={{
                  maxHeight: '90%', maxWidth: '90%',
                  objectFit: 'contain',
                  opacity: hovered && v.hoverImage ? 0 : 1,
                  transition: 'opacity 0.35s ease',
                  position: 'absolute',
                  filter: hovered && !v.hoverImage ? 'brightness(0.95)' : 'none',
                }}
              />
              {v.hoverImage && (
                <img
                  src={v.hoverImage}
                  alt={product.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', borderRadius: 12,
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    position: 'absolute', inset: 0,
                  }}
                />
              )}
            </>
          ) : (
            <div style={{ width: 60, height: 80, background: 'rgba(14,167,183,0.08)', borderRadius: 8, border: '1px solid rgba(14,167,183,0.2)' }} />
          )}
        </div>

        {/* Texto */}
        <div style={{ paddingTop: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#0ea7b7', letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 4px' }}>
            {product.brand}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.3 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#075356', margin: 0 }}>
            {hasMulti ? 'Desde ' + price : price}
          </p>
        </div>
      </div>
    </a>
  )
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0)
  const isMobile = useBreakpoint(768)

  const tabProducts = tabs[activeTab].ids
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)

  return (
    <section className="section-pad" style={{
      background: '#f5f5f3',
      paddingTop: isMobile ? 48 : 72,
      paddingBottom: isMobile ? 48 : 72,
      borderTop: '1px solid #e8e8e6',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header estilo ProductLines */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: isMobile ? 16 : 24,
          marginBottom: isMobile ? 32 : 48,
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10, color: '#0ea7b7' }}>
              Lo más vendido
            </p>
            <h2 style={{
              fontSize: isMobile ? 'clamp(22px, 6vw, 32px)' : 'clamp(28px, 4vw, 52px)',
              fontWeight: 400, letterSpacing: -1.5,
              color: '#1a1a1a', margin: 0, lineHeight: 1.1,
            }}>
              Los favoritos.
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {tabs.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveTab(i)} style={{
                padding: '8px 18px', background: 'none', border: 'none',
                borderBottom: activeTab === i ? '2px solid #0ea7b7' : '2px solid transparent',
                color: activeTab === i ? '#075356' : '#aaa',
                fontWeight: activeTab === i ? 600 : 400,
                fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.18s',
              }}>
                {tab.label}
              </button>
            ))}
            <a href="/tienda" style={{
              marginLeft: 20, fontSize: 13, color: '#0ea7b7',
              fontWeight: 500, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '8px 4px',
            }}>
              Ver todo →
            </a>
          </div>
        </div>

        {/* Grid sin marcos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? 24 : 40,
        }}>
          {tabProducts.map(p => <FeatCard key={p.id} product={p} />)}
        </div>

      </div>
    </section>
  )
}
