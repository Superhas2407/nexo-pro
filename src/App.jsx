import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Store from './pages/Store'
import Terminos from './pages/Terminos'
import CookieConsent from './components/CookieConsent'
import { ShopProvider } from './context/ShopContext'
import './index.css'

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/terminos" element={<Terminos />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </ShopProvider>
  )
}
