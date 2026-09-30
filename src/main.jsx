import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { loadWebPrices } from './data/webPrices'

// La app se importa después de aplicar precios/agotados/ocultos de PULSE
// Stock: varios componentes arman sus listas al cargar el módulo, así ya
// las arman con los datos vigentes.
loadWebPrices()
  .then(() => import('./App.jsx'))
  .then(({ default: App }) => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
