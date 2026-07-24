import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API_KEY = process.env.OPENROUTER_API_KEY
if (!API_KEY) {
  console.error('Falta OPENROUTER_API_KEY. Corre con: node --env-file=.env generate-carousel.mjs')
  process.exit(1)
}
const MODEL    = 'google/gemini-3-pro-image'
const OUT      = path.join(__dirname, 'carousel-output')

async function callAPI(messages) {
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://nexo-pro.vercel.app',
      'X-Title': 'Nexo Pro Carousel',
    },
    body: JSON.stringify({ model: MODEL, messages }),
  })
  const data = await r.json()
  if (!r.ok) throw new Error(JSON.stringify(data).slice(0, 300))
  return data
}

async function genSlide(messages, filename) {
  console.log(`\nGenerating ${filename}...`)
  const data = await callAPI(messages)

  const imgEntry = data.choices?.[0]?.message?.images?.[0]
  if (!imgEntry) throw new Error('No image in response: ' + JSON.stringify(data).slice(0, 400))

  const b64 = imgEntry.image_url.url.replace(/^data:image\/\w+;base64,/, '')
  const raw  = Buffer.from(b64, 'base64')

  const out = await sharp(raw)
    .resize(1080, 1350, { fit: 'cover', position: 'center' })
    .png({ quality: 95 })
    .toBuffer()

  fs.writeFileSync(path.join(OUT, filename), out)
  console.log(`Saved ${filename} — ${Math.round(out.length / 1024)} KB`)
  return raw
}

const BRAND = `
Nexo Pro (@nexopro.ccs) — premium tech store in Venezuela.
Color palette: background #0d0d0f (near black), accent cyan #0ea7b7, white text.
Style: dark cinematic editorial, high-end tech advertising.
Every slide: "@nexopro.ccs" in cyan monospace top-left · slide number tiny gray italic bottom-right.
Format: 4:5 portrait, 1080x1350 Instagram.
`.trim()

const SLIDES = [
  {
    file: '01_cover.png',
    prompt: `${BRAND}

SLIDE 01/05 — COVER.
Background #0d0d0f with very faint cyan glowing grid lines.
Top bar: "@nexopro.ccs" in cyan IBM Plex Mono left | "save for later" white italic right.
Small tag pill: "NEXO PRO · VE" with tiny cyan dot, cyan border.
Large Playfair Display italic white headline (two lines): "Los dispositivos" / "que todos quieren".
Cyan bold italic subheadline: "al mejor precio."
Row of small rounded dark pills with light border: "iPhone" · "DJI" · "Oakley Meta" · "Audio Pro".
Bottom italic hook: "lo que buscabas, ahora está aquí →" in dim white.
Thin separator line at bottom | "nexo-pro.vercel.app" tiny gray left | "01 / 05" tiny gray italic right.
Ultra high quality, editorial magazine, professional advertising.`,
  },
  {
    file: '02_iphone.png',
    prompt: `${BRAND}

SLIDE 02/05 — iPHONE 17 PRO.
Same dark #0d0d0f background. Faint large "17 PRO" watermark text in background, very transparent.
Label "APPLE — iPHONE" in cyan monospace small.
Playfair Display italic white headline: "iPhone 17 Pro & Pro Max".
Cyan bold italic: "Tres colores. Tu elección."
Three feature bullets with cyan dot:
  • "Titanio aeroespacial — ultraliviano, resistencia extrema"
  • "Camera System 48MP + teleobjetivo 5x · Video 4K"
  • "Chip A19 Pro — rendimiento de otro nivel"
Three color swatches row: dark steel blue circle, burnt orange circle, silver/white circle — labeled "COLORES" in small cyan caps.
Price box with cyan border: "DESDE" small gray | "REF 1,270" large cyan monospace bold.
Bottom: "@nexopro.ccs" | "02 / 05".`,
  },
  {
    file: '03_dji.png',
    prompt: `${BRAND}

SLIDE 03/05 — DJI GIMBALS.
Same dark #0d0d0f background. Faint large "DJI" watermark very transparent.
Label "DJI — ESTABILIZADORES" cyan monospace.
Playfair Display italic white headline: "Captura tu mundo en movimiento".
Cyan bold italic: "sin sacrificar calidad."
2x2 grid of product cards (thin dark border, rounded 10px):
  Card 1 (normal dark): "OSMO MOBILE 6" cyan tiny caps | "Compacto · 3 ejes" gray | "REF 120" white bold
  Card 2 (normal dark): "OSMO MOBILE 7" cyan tiny caps | "Magnético · Potente" gray | "REF 180" white bold
  Card 3 (cyan tinted border): "OSMO MOBILE 7+" cyan | "Auto-seguimiento" gray | "REF 210" cyan bold
  Card 4 (cyan tinted border): "OSMO MOBILE 8" cyan | "Ultra-estable" gray | "REF 270" cyan bold
Price box cyan border: "DESDE" | "REF 120" cyan large.
Bottom: "@nexopro.ccs" | "03 / 05".`,
  },
  {
    file: '04_audio.png',
    prompt: `${BRAND}

SLIDE 04/05 — AUDIO & ACCESORIOS.
Same dark #0d0d0f background.
Label "AUDIO & ACCESORIOS" cyan monospace.
Playfair Display italic white headline: "Sonido profesional, estilo propio."
Cyan bold italic: "Donde sea. Como sea."
Four product rows (rounded card, thin border), each with a small cyan letter icon box:
  Icon "M" | "DJI Mic Mini" white bold | "Micrófono inalámbrico profesional · REF 159" gray small
  Icon "S" | "Shokz OpenRun Pro 2" white bold | "Auriculares conducción ósea · REF 89" gray small
  Icon "O" (cyan border) | "Oakley Meta" white bold | "Smart glasses — audio + cámara · REF 449" gray small
  Icon "B" | "BOYA WM3 Mini 2" white bold | "Lavalier inalámbrico compacto · REF 59" gray small
Bottom: "@nexopro.ccs" | "04 / 05".`,
  },
  {
    file: '05_cta.png',
    prompt: `${BRAND}

SLIDE 05/05 — CTA FINAL. Centered composition.
Background #0d0d0f with subtle cyan radial glow in the center.
Center top: large letter "N" inside a rounded square, dark background, cyan glow border.
Centered Playfair Display italic white large headline: "Todo en un solo lugar."
Cyan bold centered: "iPhone · DJI · Oakley · Audio"
Thin horizontal separator line.
CTA box with cyan glowing border centered:
  "LINK EN BIO" cyan monospace caps | "nexo-pro.vercel.app" gray below
Small italic gray centered: "Envíos a nivel nacional · Venezuela"
Bottom: "@nexopro.ccs" | "05 / 05".`,
  },
]

async function main() {
  fs.mkdirSync(OUT, { recursive: true })
  let styleRef = null  // cover image compressed for use as reference

  for (let i = 0; i < SLIDES.length; i++) {
    const { file, prompt } = SLIDES[i]
    const messages = []

    // Include cover as style reference from slide 2 onwards
    if (styleRef) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: 'Style reference — slide 01 of this same carousel. Match the visual style exactly:' },
          { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + styleRef } },
        ],
      })
      messages.push({
        role: 'assistant',
        content: 'I can see the Nexo Pro carousel cover. I will create the next slide matching this dark cinematic style exactly.',
      })
    }

    messages.push({ role: 'user', content: prompt })

    const raw = await genSlide(messages, file)

    // On cover, compress it for style reference (smaller = faster subsequent calls)
    if (i === 0) {
      const compressed = await sharp(raw)
        .resize(540, 675)
        .jpeg({ quality: 75 })
        .toBuffer()
      styleRef = compressed.toString('base64')
      console.log(`Style ref ready — ${Math.round(compressed.length / 1024)} KB`)
    }

    if (i < SLIDES.length - 1) {
      console.log('Waiting 3s...')
      await new Promise(r => setTimeout(r, 3000))
    }
  }

  console.log(`\nDone! Slides in: ${OUT}`)
}

main().catch(e => { console.error(e); process.exit(1) })
