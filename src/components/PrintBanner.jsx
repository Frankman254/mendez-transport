import { QRCodeSVG } from 'qrcode.react'
import { Instagram, MapPin, Clock } from 'lucide-react'
import BannerHomeButton from './BannerHomeButton'

// ── WhatsApp SVG base64 para centro del QR ───────────────────────────────────
const WA_ICON_B64 = (() => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366">' +
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15' +
    '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475' +
    '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52' +
    '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207' +
    '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372' +
    '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2' +
    ' 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118' +
    '.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413' +
    '-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214' +
    '-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884' +
    ' 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884' +
    'm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892' +
    'c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005' +
    'c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
    '</svg>'
  return `data:image/svg+xml;base64,${btoa(svg)}`
})()

// ── Logo M + Road SVG (trazado desde la imagen real) ─────────────────────────
function LogoIcon({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo blanco */}
      <rect width="100" height="100" fill="white" />

      {/* Letra M — negra, bold */}
      <text
        x="55"
        y="83"
        textAnchor="middle"
        fontFamily="Impact, Arial Black, sans-serif"
        fontSize="78"
        fontWeight="900"
        fill="#1a1a1a"
      >
        M
      </text>

      {/* Road — banda roja exterior */}
      <path
        d="M -4 110 Q 14 55 62 22"
        stroke="#e31e24"
        strokeWidth="23"
        fill="none"
        strokeLinecap="round"
      />
      {/* Road — superficie oscura interior */}
      <path
        d="M -4 110 Q 14 55 62 22"
        stroke="#200808"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* Road — guiones blancos centrales */}
      <path
        d="M -2 108 Q 14 55 60 23"
        stroke="white"
        strokeWidth="2.2"
        strokeDasharray="7 5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Speed line 1 (arriba derecha) */}
      <path
        d="M 64 17 Q 83 10 102 14"
        stroke="#e31e24"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Speed line 2 */}
      <path
        d="M 68 8 Q 85 3 104 6"
        stroke="#e31e24"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  )
}

// ── WhatsApp Icon inline ──────────────────────────────────────────────────────
function WAIcon({ size = 20, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const destinations = [
  { name: 'Panama City',       price: '$55' },
  { name: 'Boquete',           price: '$35' },
  { name: 'David',             price: '$30' },
  { name: 'El Valle de Antón', price: '$40' },
  { name: 'Playa Venado',      price: '$40' },
  { name: 'Bocas del Toro',    price: '$65' },
]

const featured = [
  {
    name:  'Bocas del Toro',
    image: '/assets/Bocas-del-toro-3.jpg',
  },
  {
    name:  'El Valle de Antón',
    image: '/assets/tips-valle-de-anton-panama.jpg',
  },
  {
    name:  'Panama City',
    image: '/assets/Panama-City.jpg',
  },
]

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function PrintBanner() {
  return (
    <div className="min-h-screen bg-neutral-300 py-10 px-4 flex justify-center items-start">
      <BannerHomeButton />

      <div
        id="print-banner"
        className="relative w-[816px] h-[1056px] overflow-hidden rounded-sm shadow-2xl text-white"
        style={{ aspectRatio: '8.5 / 11' }}
      >
        {/* ═══ FONDOS ═══ */}

        {/* Capa 1 — imagen tropical local */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/Bocas-del-toro-1.jpg')" }}
        />

        {/* Capa 2 — overlay oscuro general */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.80)_0%,rgba(2,6,23,0.55)_40%,rgba(2,6,23,0.85)_100%)]" />

        {/* Capa 3 — toques de color tropical */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.30),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.15),transparent_30%)]" />

        {/* Capa 4 — toque verde/azul sides */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,101,52,0.30),transparent_30%,transparent_68%,rgba(8,47,73,0.30))]" />

        {/* ═══ CONTENIDO ═══ */}
        <div className="relative z-10 h-full px-8 pt-7 pb-6 flex flex-col gap-0">

          {/* ── HEADER: Título + Logo ── */}
          <div className="flex items-start justify-between gap-4 flex-shrink-0">

            {/* Título */}
            <div>
              <h1
                style={{
                  fontFamily: 'Impact, "Arial Narrow", Arial, sans-serif',
                  fontStyle: 'italic',
                  lineHeight: 0.88,
                  textTransform: 'uppercase',
                  margin: 0,
                  padding: 0,
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: 80,
                    fontWeight: 900,
                    color: '#fcd34d',
                    textShadow: '3px 3px 0 rgba(0,0,0,0.55), 0 0 30px rgba(251,191,36,0.3)',
                    WebkitTextStroke: '1px rgba(160,90,0,0.35)',
                  }}
                >
                  Book Your
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 80,
                    fontWeight: 900,
                    color: '#f43f5e',
                    textShadow: '3px 3px 0 rgba(0,0,0,0.6), 0 0 30px rgba(220,38,38,0.4)',
                    WebkitTextStroke: '1px rgba(100,0,20,0.4)',
                  }}
                >
                  Shuttle Here!
                </span>
              </h1>

              <p
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '0.02em',
                }}
              >
                Shared or Private Transportation
              </p>

              {/* Horario badge */}
              <div
                style={{
                  marginTop: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'rgba(0,0,0,0.40)',
                  border: '1px solid rgba(251,191,36,0.50)',
                  borderRadius: 999,
                  padding: '7px 18px',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <Clock size={17} color="#fcd34d" />
                <span
                  style={{
                    color: '#fcd34d',
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                  }}
                >
                  Daily Departure 7:40 AM
                </span>
              </div>
            </div>

            {/* Logo — top right */}
            <div
              style={{
                width: 215,
                flexShrink: 0,
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(0,0,0,0.35)',
                padding: '14px 16px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* SVG Icon */}
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 14,
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    flexShrink: 0,
                  }}
                >
                  <LogoIcon size={58} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      fontSize: 28,
                      fontWeight: 900,
                      color: 'white',
                      lineHeight: 1,
                      letterSpacing: '0.02em',
                    }}
                  >
                    MÉNDEZ
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      color: '#f87171',
                      textTransform: 'uppercase',
                    }}
                  >
                    TRANSPORT
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── FOTOS DE DESTINOS (3 columnas) ── */}
          <div
            style={{
              marginTop: 18,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10,
              flexShrink: 0,
            }}
          >
            {featured.map((item) => (
              <div
                key={item.name}
                style={{
                  position: 'relative',
                  height: 195,
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    right: 12,
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    fontStyle: 'italic',
                    fontSize: 20,
                    fontWeight: 900,
                    color: 'white',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>

          {/* ── BUS (protagonista) ── */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              marginTop: 12,
            }}
          >
            {/* Glow decorativo */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                height: 120,
                background: 'radial-gradient(ellipse, rgba(227,30,36,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                transform: 'translateX(-50%)',
                width: 700,
                height: '100%',
                borderRadius: 26,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'linear-gradient(135deg, rgba(248,250,252,0.92), rgba(241,245,249,0.96))',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/busito png.png"
                alt="Méndez Transport shuttle"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '6px 20px',
                }}
              />
            </div>
          </div>

          {/* ── CAJA DESTINATIONS & PRICES ── */}
          <div
            style={{
              position: 'relative',
              marginTop: 14,
              borderRadius: 26,
              border: '1.5px solid rgba(251,191,36,0.32)',
              background: 'rgba(0,0,0,0.52)',
              padding: '20px 20px 14px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
              flexShrink: 0,
            }}
          >
            {/* Header de la sección */}
            <div
              style={{
                position: 'absolute',
                top: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(90deg, #064e3b, #065f46)',
                border: '1px solid rgba(251,191,36,0.38)',
                borderRadius: 999,
                padding: '6px 28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <MapPin size={15} color="#fcd34d" />
              <span
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#fcd34d',
                }}
              >
                Destinations &amp; Prices
              </span>
            </div>

            {/* Grid: precios + QR */}
            <div
              style={{
                marginTop: 12,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 160px',
                gap: 12,
                alignItems: 'start',
              }}
            >
              {/* Columna izquierda */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {destinations.slice(0, 3).map((d) => (
                  <div
                    key={d.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: '#dc2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 0 6px rgba(220,38,38,0.6)',
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'white',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.93)' }}>
                        {d.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'Impact, Arial Black, sans-serif',
                        fontSize: 18,
                        fontWeight: 900,
                        color: '#fcd34d',
                        background: 'rgba(251,191,36,0.12)',
                        border: '1px solid rgba(251,191,36,0.25)',
                        borderRadius: 8,
                        padding: '1px 9px',
                      }}
                    >
                      {d.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Columna derecha */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 9,
                  borderLeft: '1px solid rgba(255,255,255,0.10)',
                  paddingLeft: 14,
                }}
              >
                {destinations.slice(3).map((d) => (
                  <div
                    key={d.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: '#dc2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 0 6px rgba(220,38,38,0.6)',
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'white',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,0.93)' }}>
                        {d.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'Impact, Arial Black, sans-serif',
                        fontSize: 18,
                        fontWeight: 900,
                        color: '#fcd34d',
                        background: 'rgba(251,191,36,0.12)',
                        border: '1px solid rgba(251,191,36,0.25)',
                        borderRadius: 8,
                        padding: '1px 9px',
                      }}
                    >
                      {d.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* QR WhatsApp */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  borderRadius: 16,
                  padding: '10px 10px 7px',
                  boxShadow: '0 0 24px rgba(37,211,102,0.35), 0 4px 16px rgba(0,0,0,0.3)',
                  gap: 5,
                }}
              >
                <QRCodeSVG
                  value="https://wa.me/50769255088"
                  size={116}
                  bgColor="#ffffff"
                  fgColor="#1a1a1a"
                  level="H"
                  imageSettings={{
                    src: WA_ICON_B64,
                    height: 27,
                    width: 27,
                    excavate: true,
                  }}
                />
                <span
                  style={{
                    color: '#128C7E',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Scan to Book
                </span>
              </div>
            </div>

            {/* ── Franja WhatsApp ── */}
            <div
              style={{
                marginTop: 12,
                borderRadius: 18,
                background: 'linear-gradient(90deg, rgba(18,140,126,0.45), rgba(37,211,102,0.30), rgba(18,140,126,0.40))',
                border: '1px solid rgba(37,211,102,0.30)',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                boxShadow: '0 4px 16px rgba(37,211,102,0.15)',
              }}
            >
              {/* WA icon + números */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: '#25D366',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(37,211,102,0.5)',
                  }}
                >
                  <WAIcon size={22} color="white" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      fontSize: 14,
                      fontWeight: 900,
                      color: '#fcd34d',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      lineHeight: 1,
                    }}
                  >
                    Book now on WhatsApp
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      fontSize: 24,
                      fontWeight: 900,
                      color: 'white',
                      lineHeight: 1,
                      letterSpacing: '0.02em',
                    }}
                  >
                    +507 69255088
                    <span style={{ color: 'rgba(255,255,255,0.35)', padding: '0 10px' }}>|</span>
                    +507 68768467
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  background:
                    'linear-gradient(135deg, rgba(131,58,180,0.55), rgba(225,48,108,0.55))',
                  border: '1px solid rgba(225,48,108,0.35)',
                  borderRadius: 12,
                  padding: '8px 14px',
                  boxShadow: '0 2px 10px rgba(131,58,180,0.25)',
                }}
              >
                <Instagram size={17} color="#f9a8d4" />
                <span style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>@jblady_507</span>
              </div>
            </div>

            {/* Tagline */}
            <div
              style={{
                marginTop: 10,
                textAlign: 'center',
                fontStyle: 'italic',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.80)',
              }}
            >
              transporte compartido o privado
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
