import { useState, startTransition } from 'react'
import { motion } from 'framer-motion'

function GlassBox({ item, config }) {
  const {
    backgroundColor = 'rgba(255,255,255,0.08)',
    borderRadius = 24,
    padding = 40,
    hoverLift = 10,
    backgroundBlur = 12,
    strokeSize = 1,
    strokeColor = 'rgba(255,255,255,0.18)',
    shineColor = 'rgba(255,255,255,0.22)',
    boxHeight = 200,
  } = config

  const [isHovered, setIsHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    startTransition(() => setMouse({ x, y }))
  }

  return (
    <div className="glass-box" style={{ perspective: '1000px', flex: 1, minWidth: 0 }}>
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: boxHeight,
          borderRadius,
          overflow: 'hidden',
          cursor: 'pointer',
          backdropFilter: `blur(${backgroundBlur}px)`,
          WebkitBackdropFilter: `blur(${backgroundBlur}px)`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(61,200,214,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={() => startTransition(() => setIsHovered(true))}
        onMouseLeave={() => startTransition(() => { setIsHovered(false); setMouse({ x: 0, y: 0 }) })}
        onMouseMove={handleMouseMove}
        animate={{
          y: isHovered ? -hoverLift : 0,
          x: isHovered ? mouse.x * 8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Background image */}
        {item.backgroundImage && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${item.backgroundImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
          }} />
        )}

        {/* Glass layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor, borderRadius, zIndex: 1,
        }} />

        {/* Shine sweep */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(90deg, transparent 0%, ${shineColor} 49%, ${shineColor} 51%, transparent 100%)`,
            zIndex: 2, pointerEvents: 'none',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Border */}
        <div style={{
          position: 'absolute', inset: 0,
          border: `${strokeSize}px solid ${strokeColor}`,
          borderRadius, zIndex: 2, pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 3,
          padding, display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-start', alignItems: 'flex-start',
          textAlign: 'left', minHeight: boxHeight, gap: 0,
        }}>
          {/* Accent line */}
          <div style={{ width: 28, height: 2, background: '#0057FF', borderRadius: 2, marginBottom: 24 }} />

          {/* Stat */}
          <h3 style={{
            margin: '0 0 6px',
            fontSize: 44,
            fontWeight: 400,
            color: '#fff',
            letterSpacing: -1.5,
            lineHeight: 1,
          }}>
            {item.title}
          </h3>

          {/* Label */}
          <p style={{
            margin: '0 0 20px', fontSize: 11, fontWeight: 500,
            color: '#0057FF', textTransform: 'uppercase', letterSpacing: 2,
          }}>
            {item.label}
          </p>

          {/* Body */}
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>
            {item.body}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function AppleGlassStack({
  items = [],
  direction = 'horizontal',
  gap = 16,
  config = {},
}) {
  return (
    <div className="glass-stack" style={{
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap,
      width: '100%',
      flexWrap: 'wrap',
    }}>
      {items.map((item, i) => (
        <GlassBox key={i} item={item} config={config} />
      ))}
    </div>
  )
}

