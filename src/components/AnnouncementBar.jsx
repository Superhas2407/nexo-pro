export default function AnnouncementBar() {
  return (
    <div style={{ background: '#0ea7b7', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
      <p style={{ color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <span>Envíos a nivel nacional</span>
        <span className="ann-sep" style={{ opacity: 0.4 }}>|</span>
        <span className="ann-item">Pago en efectivo y transferencia</span>
        <span className="ann-sep" style={{ opacity: 0.4 }}>|</span>
        <span className="ann-item">Contáctanos por WhatsApp</span>
      </p>
    </div>
  )
}
