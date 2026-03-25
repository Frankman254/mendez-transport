/**
 * Méndez Transport — Flyer de Impresión
 * Tamaño carta vertical: 8.5" × 11" (816 × 1056 px a 96 dpi)
 * Componente standalone — sin navbar, sin landing page, sin scroll.
 * Acceder en /flyer
 */

import { QRCodeSVG } from 'qrcode.react'
import { MapPin, Clock, Phone } from 'lucide-react'
import BannerHomeButton from './BannerHomeButton'

// ── WhatsApp icon SVG ─────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── Logo SVG inline (alta calidad, vectorial) ────────────────────────────────
function MendezLogoSVG({ width = 110 }) {
  return (
    <svg
      width={width}
      viewBox="0 0 220 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Icon container */}
      <rect x="0" y="0" width="76" height="76" rx="12" fill="#1a1a1a" />

      {/* Road swoosh left */}
      <path d="M8 66 Q20 38 38 42 Q20 44 12 62 Z" fill="#e31e24" opacity="0.95" />
      {/* Road swoosh right */}
      <path d="M68 66 Q56 38 38 42 Q56 44 64 62 Z" fill="#e31e24" opacity="0.95" />
      {/* Center dashes */}
      <line x1="38" y1="44" x2="38" y2="58" stroke="white" strokeWidth="1.5" strokeDasharray="3 2.5" />
      {/* M letter */}
      <text
        x="38" y="50"
        fontFamily="Arial Black, Impact, sans-serif"
        fontSize="34"
        fontWeight="900"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >M</text>
      {/* Speed lines */}
      <path d="M16 16 Q38 11 60 16" stroke="#e31e24" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M20 10 Q38 6 56 10" stroke="#e31e24" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55" />

      {/* MÉNDEZ text */}
      <text
        x="88" y="32"
        fontFamily="Arial Black, Impact, sans-serif"
        fontSize="22"
        fontWeight="900"
        fill="#1a1a1a"
        letterSpacing="1"
      >MÉNDEZ</text>
      {/* TRANSPORT text */}
      <text
        x="89" y="52"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#e31e24"
        letterSpacing="3"
      >TRANSPORT</text>
      {/* Underline */}
      <line x1="88" y1="57" x2="210" y2="57" stroke="#e31e24" strokeWidth="2" />
    </svg>
  )
}

// ── QR WhatsApp con ícono central ─────────────────────────────────────────────
function WhatsAppQR({ url = 'https://wa.me/50769255088', size = 100 }) {
  const iconSVGBase64 = btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366">` +
    `<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>` +
    `</svg>`
  )
  const iconSrc = `data:image/svg+xml;base64,${iconSVGBase64}`
  return (
    <QRCodeSVG
      value={url}
      size={size}
      bgColor="#ffffff"
      fgColor="#1a1a1a"
      level="H"
      imageSettings={{
        src: iconSrc,
        x: undefined,
        y: undefined,
        height: Math.round(size * 0.23),
        width: Math.round(size * 0.23),
        excavate: true,
      }}
    />
  )
}

// ── Destinations & Prices data ────────────────────────────────────────────────
const DESTINATIONS = [
  { name: 'Panama City',      price: '$55' },
  { name: 'Boquete',          price: '$35' },
  { name: 'David',            price: '$30' },
  { name: 'El Valle de Antón',price: '$40' },
  { name: 'Playa Venado',     price: '$40' },
  { name: 'Bocas del Toro',   price: '$65' },
]

// ── Featured destinations (3 images, NO prices) ───────────────────────────────
const FEATURED = [
  {
    name: 'Bocas del Toro',
    img: '/assets/Bocas-del-toro-1.jpg',
    pos: 'center',
  },
  {
    name: 'El Valle de Antón',
    img: '/assets/tips-valle-de-anton-panama.jpg',
    pos: 'center',
  },
  {
    name: 'Panama City',
    img: '/assets/Panama-City.jpg',
    pos: 'center bottom',
  },
]

// ── FLYER COMPONENT ───────────────────────────────────────────────────────────
export default function Flyer() {
  return (
    /*
      print-flyer-root: contenedor pensado para screenshot / export a PDF.
      Tamaño carta: 816 × 1056 px (8.5" × 11" a 96 dpi).
      Centrado en pantalla con fondo neutro.
    */
    <div
      style={{
        minHeight: '100vh',
        background: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        fontFamily: "'Inter', 'Arial', sans-serif",
      }}
    >
      <BannerHomeButton />
      {/* ── PRINT CANVAS ── */}
      <div
        id="print-flyer"
        style={{
          width: 816,
          height: 1056,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          borderRadius: 4,
          flexShrink: 0,
        }}
      >
        {/* ═══ BACKGROUND LAYERS ═══ */}

        {/* Layer 1: tropical base image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/assets/Bocas-del-toro-2.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        {/* Layer 2: dark gradient overlay for legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(170deg, rgba(5,20,12,0.93) 0%, rgba(10,30,15,0.88) 30%, rgba(8,22,10,0.82) 55%, rgba(5,15,8,0.92) 100%)',
          }}
        />

        {/* Layer 3: subtle red vignette top */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 220,
            background: 'linear-gradient(180deg, rgba(180,10,14,0.25) 0%, transparent 100%)',
          }}
        />

        {/* Layer 4: tropical leaf texture overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(ellipse 600px 400px at 0% 60%, rgba(0,120,60,0.18) 0%, transparent 70%),
              radial-gradient(ellipse 500px 300px at 100% 80%, rgba(0,100,80,0.15) 0%, transparent 70%)
            `,
          }}
        />

        {/* ═══ CONTENT (relative z-index on top of backgrounds) ═══ */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* ── RED TOP BAR ───────────────────────────────────────────── */}
          <div style={{ height: 6, background: 'linear-gradient(90deg, #e31e24 0%, #ff4444 50%, #e31e24 100%)', flexShrink: 0 }} />

          {/* ── HEADER: Title + Logo ──────────────────────────────────── */}
          <div style={{ padding: '18px 28px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
            {/* Title block */}
            <div>
              {/* Daily badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(227,30,36,0.2)', border: '1px solid rgba(227,30,36,0.5)',
                borderRadius: 20, padding: '3px 12px', marginBottom: 10,
              }}>
                <Clock size={12} color="#e31e24" />
                <span style={{ color: '#e31e24', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Daily Departure · 7:40 AM
                </span>
              </div>

              {/* Main headline */}
              <div style={{
                fontFamily: "'Arial Black', 'Impact', sans-serif",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.5px',
              }}>
                <div style={{ fontSize: 56, color: '#ffffff', textShadow: '0 3px 12px rgba(0,0,0,0.8)' }}>
                  BOOK YOUR
                </div>
                <div style={{
                  fontSize: 68,
                  color: '#e31e24',
                  textShadow: '0 0 30px rgba(227,30,36,0.5), 0 3px 12px rgba(0,0,0,0.9)',
                  WebkitTextStroke: '0.5px rgba(255,80,80,0.3)',
                }}>
                  SHUTTLE
                </div>
                <div style={{ fontSize: 56, color: '#ffffff', textShadow: '0 3px 12px rgba(0,0,0,0.8)' }}>
                  HERE!
                </div>
              </div>

              {/* Subtitle */}
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 500, letterSpacing: '0.04em' }}>
                  Shared or Private Transportation
                </div>
              </div>
            </div>

            {/* Logo top-right */}
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 14,
              padding: '10px 14px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              flexShrink: 0,
            }}>
              <MendezLogoSVG width={120} />
            </div>
          </div>

          {/* ── THREE DESTINATION IMAGES (horizontal strip) ───────────── */}
          <div style={{
            display: 'flex',
            gap: 6,
            padding: '0 28px',
            flexShrink: 0,
            height: 132,
          }}>
            {FEATURED.map((dest) => (
              <div
                key={dest.name}
                style={{
                  flex: 1,
                  borderRadius: 10,
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: dest.pos,
                  }}
                />
                {/* gradient bottom */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
                }} />
                {/* destination name — NO price */}
                <div style={{
                  position: 'absolute', bottom: 8, left: 0, right: 0,
                  textAlign: 'center',
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(227,30,36,0.85)',
                    borderRadius: 5,
                    padding: '2px 10px',
                  }}>
                    <span style={{
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      {dest.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── BUS IMAGE (protagonist central) ──────────────────────── */}
          <div style={{
            flex: '0 0 auto',
            padding: '0 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: 198,
          }}>
            {/* Glow behind bus */}
            <div style={{
              position: 'absolute',
              width: 620, height: 120,
              background: 'radial-gradient(ellipse, rgba(227,30,36,0.22) 0%, transparent 70%)',
              bottom: 10,
            }} />
            <img
              src="/assets/busito png.png"
              alt="Méndez Transport Toyota HiAce Turismo"
              style={{
                height: 190,
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.7))',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>

          {/* ── DESTINATIONS & PRICES BOX ─────────────────────────────── */}
          <div style={{ padding: '0 28px', flexShrink: 0 }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(10,20,12,0.96) 0%, rgba(15,30,18,0.98) 100%)',
              border: '1.5px solid rgba(227,30,36,0.35)',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}>
              {/* Box header */}
              <div style={{
                background: 'linear-gradient(90deg, #e31e24 0%, #c0151a 100%)',
                padding: '9px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <MapPin size={14} color="white" />
                <span style={{
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}>
                  Destinations &amp; Prices
                </span>
              </div>

              {/* Box body: price list + QR */}
              <div style={{ display: 'flex', gap: 0 }}>
                {/* Left: 6 destinations */}
                <div style={{ flex: 1, padding: '10px 16px 12px' }}>
                  {DESTINATIONS.map((d, i) => (
                    <div
                      key={d.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        borderBottom: i < DESTINATIONS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: '#e31e24',
                          flexShrink: 0,
                          boxShadow: '0 0 4px rgba(227,30,36,0.8)',
                        }} />
                        <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 13.5, fontWeight: 500 }}>
                          {d.name}
                        </span>
                      </div>
                      <span style={{
                        color: '#ffffff',
                        fontSize: 15,
                        fontWeight: 800,
                        fontFamily: "'Arial Black', sans-serif",
                        background: 'rgba(227,30,36,0.15)',
                        border: '1px solid rgba(227,30,36,0.3)',
                        borderRadius: 6,
                        padding: '1px 8px',
                        letterSpacing: '0.03em',
                      }}>
                        {d.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', margin: '10px 0' }} />

                {/* Right: QR code placeholder elegante */}
                <div style={{
                  width: 148,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 14px',
                  gap: 8,
                }}>
                  <div style={{
                    background: 'white',
                    borderRadius: 10,
                    padding: 6,
                    boxShadow: '0 0 20px rgba(37,211,102,0.3)',
                  }}>
                    <WhatsAppQR url="https://wa.me/50769255088" size={100} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#25D366', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Scan to Book
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 8.5, marginTop: 2 }}>
                      WhatsApp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── WHATSAPP CONTACT STRIP ────────────────────────────────── */}
          <div style={{
            margin: '10px 28px 0',
            background: 'linear-gradient(90deg, #128C7E 0%, #25D366 50%, #128C7E 100%)',
            borderRadius: 12,
            padding: '11px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            flexShrink: 0,
            boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <WhatsAppIcon size={20} color="white" />
              <span style={{ color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em' }}>
                BOOK NOW ON WhatsApp
              </span>
            </div>
            {/* divider */}
            <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.3)' }} />
            {/* Numbers */}
            <div style={{ display: 'flex', gap: 16 }}>
              {['+507 69255088', '+507 68768467'].map(num => (
                <div key={num} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Phone size={12} color="rgba(255,255,255,0.8)" />
                  <span style={{ color: 'white', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }}>
                    {num}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM TAGLINE ────────────────────────────────────────── */}
          <div style={{
            textAlign: 'center',
            padding: '8px 28px 10px',
            flexShrink: 0,
          }}>
            <span style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 11,
              fontStyle: 'italic',
              letterSpacing: '0.12em',
              textTransform: 'lowercase',
            }}>
              transporte compartido o privado
            </span>
          </div>

          {/* ── BOTTOM RED BAR ────────────────────────────────────────── */}
          <div style={{
            marginTop: 'auto',
            height: 5,
            background: 'linear-gradient(90deg, #e31e24 0%, #ff4444 50%, #e31e24 100%)',
            flexShrink: 0,
          }} />
        </div>
      </div>
    </div>
  )
}
