const ITEMS = [
  'Envíos a nivel nacional',
  'Pago en efectivo y transferencia',
  'Contáctanos por WhatsApp',
]

function MarqueeTrack() {
  return (
    <div className="ann-track">
      {ITEMS.map((item, i) => (
        <span key={i} className="ann-track-item">
          {item}
          <span className="ann-sep" aria-hidden="true">|</span>
        </span>
      ))}
    </div>
  )
}

export default function AnnouncementBar() {
  return (
    <div style={{ background: '#0057FF', height: 40, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div className="ann-marquee">
        <MarqueeTrack />
        <MarqueeTrack aria-hidden="true" />
      </div>
    </div>
  )
}
