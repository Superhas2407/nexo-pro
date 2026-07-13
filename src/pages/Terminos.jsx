import { useEffect } from 'react'
import AnnouncementBar from '../components/AnnouncementBar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFab from '../components/WhatsAppFab'
import { useBreakpoint } from '../hooks/useBreakpoint'

const sections = [
  {
    title: '1. Aceptación de los términos',
    body: 'Al acceder y utilizar este sitio web y realizar una compra a través de PULSE, aceptas quedar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos no utilizar el sitio ni nuestros servicios.',
  },
  {
    title: '2. Productos y precios',
    body: 'Todos los productos ofrecidos son originales y provienen de distribuidores autorizados de Apple, DJI y Oakley Meta. Los precios se muestran en formato de referencia (REF) y pueden variar sin previo aviso. El precio final de tu compra se confirma directamente por WhatsApp antes de procesar el pago.',
  },
  {
    title: '3. Proceso de compra',
    body: 'Las compras se coordinan a través de WhatsApp o mediante el catálogo disponible en la Tienda. Un asesor confirmará disponibilidad, precio final, método de pago y tiempo de entrega antes de formalizar el pedido.',
  },
  {
    title: '4. Métodos de pago',
    body: 'Aceptamos pago en efectivo y transferencia bancaria. Los datos de pago se comparten de forma segura durante la conversación por WhatsApp. No se procesan pagos directamente a través del sitio web.',
  },
  {
    title: '5. Envíos y entrega',
    body: 'Realizamos envíos a nivel nacional con un tiempo estimado de entrega de 48 horas y seguimiento (tracking) incluido. Los tiempos pueden variar según la ubicación del destinatario y la disponibilidad del servicio de mensajería.',
  },
  {
    title: '6. Garantía',
    body: 'Todos los productos cuentan con garantía oficial respaldada directamente por el fabricante, sujeta a los términos y condiciones de cada marca (Apple, DJI, Oakley).',
  },
  {
    title: '7. Devoluciones y cambios',
    body: 'Si tu producto presenta un defecto de fábrica, contáctanos dentro de las 48 horas posteriores a la entrega para coordinar la revisión y, de ser aplicable, el cambio o reparación bajo garantía del fabricante. No se aceptan devoluciones por cambio de opinión una vez entregado el producto.',
  },
  {
    title: '8. Propiedad intelectual',
    body: 'Todo el contenido de este sitio (textos, imágenes, logotipos y diseño) es propiedad de PULSE o de sus respectivos licenciantes y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción sin autorización previa.',
  },
  {
    id: 'cookies',
    title: '9. Política de cookies',
    body: 'Utilizamos cookies y almacenamiento local del navegador para recordar tus preferencias (como los productos en tu carrito o favoritos) y mejorar tu experiencia de navegación. Puedes aceptar o rechazar las cookies no esenciales desde el aviso que aparece al ingresar al sitio. Rechazarlas no afecta tu capacidad de navegar ni comprar, pero algunas funciones podrían no recordar tus preferencias entre visitas.',
  },
  {
    title: '10. Limitación de responsabilidad',
    body: 'PULSE no será responsable por daños indirectos derivados del uso del sitio o de los productos adquiridos, más allá de lo cubierto por la garantía oficial del fabricante.',
  },
  {
    title: '11. Modificaciones',
    body: 'Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento. Los cambios entran en vigencia desde su publicación en esta página.',
  },
  {
    title: '12. Contacto',
    body: 'Para cualquier duda sobre estos términos, escríbenos por WhatsApp al 0422-319 4044 o por Instagram a @pulse.ccs.',
  },
]

export default function Terminos() {
  const isMobile = useBreakpoint(768)

  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <AnnouncementBar />
      <Navbar />

      <div className="section-pad" style={{
        maxWidth: 820, margin: '0 auto',
        paddingTop: isMobile ? 40 : 72,
        paddingBottom: isMobile ? 56 : 96,
      }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10, color: '#0057FF' }}>
          Legal
        </p>
        <h1 style={{
          fontSize: isMobile ? 'clamp(28px, 8vw, 36px)' : 'clamp(32px, 4vw, 48px)',
          fontWeight: 400, letterSpacing: -1.5,
          color: '#1a1a1a', margin: '0 0 12px', lineHeight: 1.1,
        }}>
          Términos y Condiciones
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', marginBottom: isMobile ? 40 : 56 }}>
          Última actualización: julio 2026
        </p>

        {sections.map((s) => (
          <div key={s.title} id={s.id} style={{ marginBottom: isMobile ? 32 : 40, scrollMarginTop: 90 }}>
            <h2 style={{ fontSize: isMobile ? 17 : 19, fontWeight: 600, color: '#1a1a1a', margin: '0 0 10px' }}>
              {s.title}
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'rgba(0,0,0,0.6)', margin: 0 }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <Footer />
      <WhatsAppFab />
    </div>
  )
}
