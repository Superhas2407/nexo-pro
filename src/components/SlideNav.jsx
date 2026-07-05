import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { label: 'Tienda',            to: '/tienda' },
  { label: 'Ofertas',           to: '#' },
  { label: 'Nosotros',          to: '#' },
  { label: 'Contáctanos',       to: '#' },
  { label: 'Rastrea tu pedido', to: '#' },
]

function Tab({ children, to, setPosition }) {
  const ref = useRef(null)
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      style={{
        position: 'relative', zIndex: 10, listStyle: 'none',
        cursor: 'pointer',
      }}
    >
      <a
        href={to}
        style={{
          display: 'block',
          padding: '6px 16px',
          fontSize: 13,
          fontWeight: window.location.pathname === to ? 500 : 400,
          color: '#fff',
          mixBlendMode: 'difference',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          textDecoration: 'none',
        }}
      >
        {children}
      </a>
    </li>
  )
}

function Cursor({ position }) {
  return (
    <motion.li
      animate={position}
      style={{
        position: 'absolute',
        zIndex: 0,
        height: 32,
        borderRadius: 6,
        background: '#040e0f',
        top: '50%',
        translateY: '-50%',
        listStyle: 'none',
        pointerEvents: 'none',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  )
}

export default function SlideNav() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })

  return (
    <ul
      style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        margin: 0, padding: 0, listStyle: 'none', gap: 0,
      }}
      onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
    >
      {navItems.map(item => (
        <Tab key={item.label} to={item.to} setPosition={setPosition}>
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  )
}
