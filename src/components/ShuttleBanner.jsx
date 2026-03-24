import { Clock3, Instagram, MapPin, Phone, QrCode } from 'lucide-react'

const FEATURED_DESTINATIONS = [
  {
    name: 'Bocas del Toro',
    image: '/assets/wallpaperflare.com_wallpaper.jpg',
    position: 'center',
    size: 'cover',
  },
  {
    name: 'El Valle de Antón',
    image: '/assets/bannersGPT/banner.png',
    position: '50% 31%',
    size: '275%',
  },
  {
    name: 'Panama City',
    image: '/assets/bannersGPT/banner.png',
    position: '84% 31%',
    size: '285%',
  },
]

const DESTINATIONS_AND_PRICES = [
  'Panama City — $55',
  'Boquete — $35',
  'David — $30',
  'El Valle de Antón — $40',
  'Playa Venado — $40',
  'Bocas del Toro — $65',
]

const CONTACT_NUMBERS = ['+507 69255088', '+507 68768467']

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function BrandMark() {
  return (
    <div
      aria-label="MÉNDEZ TRANSPORT"
      className="inline-flex items-center gap-4 rounded-[28px] border border-white/15 bg-black/30 px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm"
    >
      <svg width="74" height="74" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="#ffffff" fillOpacity="0.95" />
        <path d="M12 72 Q28 45 50 50 Q28 50 18 68 Z" fill="#e31e24" opacity="0.96" />
        <path d="M88 72 Q72 45 50 50 Q72 50 82 68 Z" fill="#e31e24" opacity="0.96" />
        <path d="M50 50 L50 70" stroke="#111111" strokeWidth="2" strokeDasharray="4 4" />
        <text
          x="50"
          y="56"
          fill="#141414"
          fontFamily="Arial Black, Impact, sans-serif"
          fontSize="40"
          fontWeight="900"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          M
        </text>
        <path d="M30 20 Q50 15 70 20" stroke="#e31e24" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M35 14 Q50 10 65 14" stroke="#e31e24" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>

      <div className="leading-none text-white">
        <div className="text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-[0.16em] text-white">
          MÉNDEZ
        </div>
        <div className="mt-2 text-sm font-bold uppercase tracking-[0.5em] text-[#f3c863] sm:text-base">
          TRANSPORT
        </div>
      </div>
    </div>
  )
}

function DestinationCard({ destination }) {
  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-[#f3c863]/70 shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
      <div
        className="h-40 w-full transition-transform duration-500 group-hover:scale-105 sm:h-44"
        style={{
          backgroundImage: `url('${destination.image}')`,
          backgroundPosition: destination.position,
          backgroundSize: destination.size,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-[1.7rem]">
          {destination.name}
        </p>
      </div>
    </article>
  )
}

export default function ShuttleBanner() {
  return (
    <section className="relative overflow-hidden bg-[#02110a] pt-20 pb-8 sm:pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/wallpaperflare.com_wallpaper (2).jpg')" }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "url('/assets/bannersGPT/tarjeta.png')", backgroundPosition: 'center', backgroundSize: 'cover' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,185,77,0.24),transparent_30%),radial-gradient(circle_at_top_right,rgba(20,109,66,0.45),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(15,172,198,0.26),transparent_30%),linear-gradient(180deg,rgba(3,10,7,0.22)_0%,rgba(4,10,7,0.56)_22%,rgba(3,10,7,0.84)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-[#f3c863]/30 bg-[#08120d]/45 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[url('/assets/bannersGPT/banner.png')] bg-cover bg-center opacity-[0.08]" />
            <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#f6c45e]/15 blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#0e653e]/25 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-[#10b7d0]/15 blur-3xl" />
            <div className="absolute inset-3 rounded-[28px] border border-white/10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(4,11,8,0)_0%,rgba(4,11,8,0.75)_100%)]" />
          </div>

          <div className="relative z-10 px-4 pt-4 pb-5 sm:px-6 sm:pt-6 sm:pb-7 lg:px-8 lg:pt-8 lg:pb-8 xl:px-10">
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <BrandMark />
              </div>

              <div className="lg:col-span-7 lg:col-start-6 lg:pl-2">
                <div className="flex flex-col gap-3">
                  <h1
                    aria-label="BOOK YOUR SHUTTLE HERE!"
                    className="leading-[0.88] uppercase"
                    style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' }}
                  >
                    <span
                      className="block text-[clamp(2.9rem,7vw,5.25rem)] text-[#f6c04f]"
                      style={{
                        textShadow: '0 4px 0 rgba(98,57,0,0.55), 0 18px 28px rgba(0,0,0,0.36)',
                        WebkitTextStroke: '1px rgba(86,49,0,0.28)',
                      }}
                    >
                      BOOK YOUR
                    </span>
                    <span
                      className="block text-[clamp(3.15rem,8.2vw,6rem)] text-[#ea2327]"
                      style={{
                        textShadow: '0 4px 0 rgba(84,8,10,0.7), 0 18px 28px rgba(0,0,0,0.42)',
                        WebkitTextStroke: '1.2px #fff1bd',
                      }}
                    >
                      SHUTTLE HERE!
                    </span>
                  </h1>

                  <p className="max-w-2xl text-xl font-medium text-white/95 sm:text-2xl">
                    Shared or Private Transportation
                  </p>

                  <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#f3c863]/60 bg-black/35 px-4 py-2.5 text-[#f6d37e] shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                    <Clock3 size={20} />
                    <span className="text-sm font-black uppercase tracking-[0.14em] sm:text-base">
                      Daily Departure 7:40 AM
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <div className="grid gap-3 sm:grid-cols-3 lg:mt-2">
                  {FEATURED_DESTINATIONS.map((destination) => (
                    <DestinationCard key={destination.name} destination={destination} />
                  ))}
                </div>
              </div>

              <div className="lg:hidden">
                <div className="relative mx-auto mt-1 max-w-xl">
                  <div className="absolute inset-x-10 bottom-4 h-12 rounded-full bg-black/60 blur-2xl" />
                  <div className="absolute left-10 right-10 top-10 h-24 rounded-full bg-[#ffd27a]/25 blur-3xl" />
                  <img
                    src="/assets/e237ef51-f38b-4682-9997-9b0fa5de9254.jpg"
                    alt="Méndez Transport shuttle"
                    className="relative w-full mix-blend-multiply drop-shadow-[0_26px_38px_rgba(0,0,0,0.48)]"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6 lg:pb-32">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="rounded-[28px] border border-[#f3c863]/60 bg-[#08120d]/84 p-5 shadow-[0_24px_45px_rgba(0,0,0,0.42)] backdrop-blur-md sm:p-6">
                    <div className="mb-4 inline-flex items-center rounded-full border border-[#f3c863]/55 bg-[#182216]/85 px-4 py-2 text-[0.95rem] font-black uppercase tracking-[0.14em] text-[#f3c863] shadow-[0_8px_22px_rgba(0,0,0,0.25)]">
                      DESTINATIONS & PRICES
                    </div>

                    <div className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
                      {DESTINATIONS_AND_PRICES.map((destination) => (
                        <div
                          key={destination}
                          className="flex items-start gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-[0.98rem] font-semibold text-white/92"
                        >
                          <MapPin size={16} className="mt-0.5 shrink-0 text-[#f3c863]" />
                          <span>{destination}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-[#f3c863]/60 bg-[#0b120d]/82 p-4 shadow-[0_24px_45px_rgba(0,0,0,0.35)] backdrop-blur-md">
                    <div className="flex h-full min-h-[210px] flex-col items-center justify-center rounded-[22px] border border-dashed border-[#f3c863]/45 bg-white/[0.03] px-4 text-center">
                      <div className="mb-4 rounded-2xl border border-[#f3c863]/45 bg-black/25 p-4 text-[#f3c863]">
                        <QrCode size={44} />
                      </div>
                      <p className="text-lg font-bold uppercase tracking-[0.16em] text-white">
                        QR WhatsApp
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Espacio reservado para QR real.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-12">
                <div className="rounded-[28px] border border-[#f3c863]/55 bg-[#07120d]/88 p-4 shadow-[0_22px_45px_rgba(0,0,0,0.4)] backdrop-blur-md sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)]">
                        <WhatsAppIcon size={34} />
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {CONTACT_NUMBERS.map((number) => (
                          <a
                            key={number}
                            href={`https://wa.me/${number.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border border-[#25D366]/35 bg-[#25D366]/10 px-4 py-3 text-lg font-black text-white transition-colors hover:bg-[#25D366]/18"
                          >
                            <Phone size={18} className="text-[#73f0a0]" />
                            <span>{number}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <a
                      href="https://instagram.com/blady_507"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 self-start rounded-2xl border border-pink-400/35 bg-pink-400/10 px-4 py-3 text-lg font-bold text-white transition-colors hover:bg-pink-400/16 lg:self-auto"
                    >
                      <Instagram size={20} className="text-pink-300" />
                      <span>blady_507</span>
                    </a>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 text-white/85 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#f3c863]">
                      <WhatsAppIcon size={16} />
                      <span>WhatsApp</span>
                    </div>
                    <p className="text-base font-medium sm:text-lg">
                      transporte compartido o privado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-[7.25rem] left-[-1rem] hidden w-[53%] lg:block xl:left-0 xl:w-[50%]">
              <div className="absolute inset-x-12 bottom-3 h-12 rounded-full bg-black/60 blur-2xl" />
              <div className="absolute inset-x-10 top-16 h-28 rounded-full bg-[#ffd27a]/24 blur-3xl" />
              <div className="absolute left-10 right-4 top-8 h-24 rounded-full bg-[#2ac8dd]/12 blur-3xl" />
              <img
                src="/assets/e237ef51-f38b-4682-9997-9b0fa5de9254.jpg"
                alt="Méndez Transport shuttle"
                className="relative w-full mix-blend-multiply drop-shadow-[0_30px_44px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
