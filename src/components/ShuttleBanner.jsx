import { QRCodeSVG } from 'qrcode.react'

const DESTINATION_LINES = [
  'Panama City — $55',
  'Boquete — $35',
  'David — $30',
  'El Valle de Antón — $40',
  'Playa Venado — $40',
  'Bocas del Toro — $65',
]

function WhatsAppQrOverlay({ size = 150 }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-[0.2rem] bg-[#fffdf7] p-[7%] shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
      <QRCodeSVG
        value="https://wa.me/50769255088"
        size={size}
        bgColor="#fffdf7"
        fgColor="#171717"
        level="H"
      />
    </div>
  )
}

export default function ShuttleBanner() {
  return (
    <section className="relative overflow-hidden bg-[#07110c] pt-16 sm:pt-20">
      <div className="absolute inset-0">
        <img
          src="/assets/bannersGPT/banner.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-110 object-cover blur-md opacity-45"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,209,123,0.16),transparent_24%),linear-gradient(180deg,rgba(5,12,9,0.2)_0%,rgba(5,12,9,0.54)_18%,rgba(5,12,9,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,17,12,0.72)_0%,rgba(6,17,12,0.18)_26%,rgba(6,17,12,0.18)_74%,rgba(6,17,12,0.72)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-3 py-5 sm:px-6 sm:py-8 lg:py-10">
        <div className="relative flex h-[calc(100vh-6rem)] max-h-[1080px] w-full max-w-[760px] items-center justify-center sm:h-[calc(100vh-7rem)]">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(255,205,108,0.18)_0%,rgba(255,205,108,0)_68%)] blur-3xl" />
          <div className="absolute inset-x-10 bottom-2 h-10 rounded-full bg-black/55 blur-2xl sm:bottom-0 sm:h-12" />

          <div className="relative aspect-[2/3] h-full max-w-full overflow-hidden rounded-[2rem] border border-white/20 bg-black/20 shadow-[0_34px_110px_rgba(0,0,0,0.58)]">
            <img
              src="/assets/bannersGPT/banner.png"
              alt="BOOK YOUR SHUTTLE HERE! MÉNDEZ TRANSPORT Shared or Private Transportation Daily Departure 7:40 AM"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-[72.25%] top-[72.4%] z-20 h-[10.6%] w-[19.9%]">
              <WhatsAppQrOverlay />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-[#f3c863]/25" />
          </div>
        </div>

        <div className="sr-only">
          <h1>BOOK YOUR SHUTTLE HERE!</h1>
          <p>MÉNDEZ TRANSPORT</p>
          <p>Shared or Private Transportation</p>
          <p>Daily Departure 7:40 AM</p>
          <p>Bocas del Toro</p>
          <p>El Valle de Antón</p>
          <p>Panama City</p>
          <p>DESTINATIONS & PRICES</p>
          {DESTINATION_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>+507 69255088</p>
          <p>+507 68768467</p>
          <p>blady_507</p>
          <p>transporte compartido o privado</p>
        </div>
      </div>
    </section>
  )
}
