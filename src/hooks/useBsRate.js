import { useState, useEffect } from 'react'

const CACHE_KEY = 'pulse_bs_rate_paralelo'
const CACHE_MS = 30 * 60 * 1000 // 30 min — suficiente para no golpear la API en cada render, sin quedar desactualizado

// Tasa paralela/Binance del dólar en bolívares — NO la oficial BCV (va por debajo del valor real)
// y NUNCA la tasa del euro (moneda sin relación con el negocio, solo infla el número).
export function useBsRate() {
  const [rate, setRate] = useState(null)

  useEffect(() => {
    let cancelled = false

    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const { value, ts } = JSON.parse(cached)
      if (Date.now() - ts < CACHE_MS) {
        setRate(value)
        return
      }
    }

    fetch('https://ve.dolarapi.com/v1/dolares/paralelo')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (cancelled || !data?.promedio) return
        setRate(data.promedio)
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ value: data.promedio, ts: Date.now() }))
      })
      .catch(() => {}) // sin tasa disponible → simplemente no se muestra el estimado en Bs

    return () => { cancelled = true }
  }, [])

  return rate
}

export const formatBs = (usd, rate) =>
  'Bs ' + Math.round(usd * rate).toLocaleString('es-VE')
