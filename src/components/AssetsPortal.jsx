/**
 * Méndez Transport — Portal de Assets del Cliente
 * Ruta: /mis-assets
 * Contraseña hardcoded — sólo para entregar al cliente una vez que pague.
 */

import { useState } from 'react';
import { Lock, Download, Eye, AlertTriangle, CheckCircle, Image, FileImage, X, LogOut, Layers } from 'lucide-react';
import BannerAssetPreview from './BannerAssetPreview';
import { bannerConfigs } from './bannerConfigs';

// ─── Contraseña hardcoded ───────────────────────────────────────────────────
const ACCESS_PASSWORD = 'mendez507';

// ─── Definición de assets ───────────────────────────────────────────────────
const ASSET_GROUPS = [
  {
    title: 'Logos',
    desc: 'Diferentes versiones del logo para usar en distintos fondos y medios.',
    icon: <FileImage size={20} />,
    color: 'from-blue-600 to-blue-800',
    assets: [
      {
        name: 'Logo Grande',
        desc: 'Logo principal en alta resolución.',
        file: '/assets/logo_grande.png',
        thumb: '/assets/logo_grande.png',
        thumbBg: 'bg-gray-800',
        whiteBackground: false,
      },
      {
        name: 'Logo Transparente',
        desc: 'Logo con fondo transparente (PNG). Ideal para fondos de color.',
        file: '/assets/logo_transparente.png',
        thumb: '/assets/logo_transparente.png',
        thumbBg: 'bg-gray-700',
        whiteBackground: false,
      },
      {
        name: 'Logo Vectorizado (SVG)',
        desc: 'Archivo SVG vectorial — escalable a cualquier tamaño sin pérdida de calidad.',
        file: '/assets/logo_vectorizado.svg',
        thumb: '/assets/logo_vectorizado.svg',
        thumbBg: 'bg-gray-800',
        whiteBackground: false,
      },
      {
        name: 'Logo con Bus — Fondo Blanco',
        desc: 'Logo con ilustración de bus. Fondo blanco.',
        file: '/assets/logobus-fondo-blanco.png',
        thumb: '/assets/logobus-fondo-blanco.png',
        thumbBg: 'bg-white',
        whiteBackground: true,
      },
      {
        name: 'Logo — Fondo Blanco',
        desc: 'Logo sobre fondo blanco.',
        file: '/assets/logo-fondo-blanco.png',
        thumb: '/assets/logo-fondo-blanco.png',
        thumbBg: 'bg-white',
        whiteBackground: true,
      },
      {
        name: 'Logo Variante — Fondo Blanco',
        desc: 'Variante del logo sobre fondo blanco.',
        file: '/assets/logo-fondo-blanco3.png',
        thumb: '/assets/logo-fondo-blanco3.png',
        thumbBg: 'bg-white',
        whiteBackground: true,
      },
      {
        name: 'Logo Mascota — Fondo Blanco',
        desc: 'Logo con mascota sobre fondo blanco.',
        file: '/assets/logomascota-fondo-blanco.png',
        thumb: '/assets/logomascota-fondo-blanco.png',
        thumbBg: 'bg-white',
        whiteBackground: true,
      },
      {
        name: 'Logo Mascota 2 — Fondo Blanco',
        desc: 'Segunda variante del logo con mascota, fondo blanco.',
        file: '/assets/logomascota-fondo-blanco2.png',
        thumb: '/assets/logomascota-fondo-blanco2.png',
        thumbBg: 'bg-white',
        whiteBackground: true,
      },
      {
        name: 'Mascota',
        desc: 'Ilustración de mascota de Méndez Transport.',
        file: '/assets/mascotas.png',
        thumb: '/assets/mascotas.png',
        thumbBg: 'bg-gray-800',
        whiteBackground: false,
      },
    ],
  },
];

// ─── Componente de asset card ────────────────────────────────────────────────
function AssetCard({ asset }) {
  const [preview, setPreview] = useState(false);

  const filename = asset.file.split('/').pop();

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-brand-red/30 hover:bg-white/8 hover:shadow-xl">
        {/* Thumbnail */}
        <div className={`relative h-40 ${asset.thumbBg} flex items-center justify-center overflow-hidden`}>
          <img
            src={asset.thumb}
            alt={asset.name}
            className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
          {/* White background warning */}
          {asset.whiteBackground && (
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-bold text-white">
              <AlertTriangle size={10} />
              Fondo blanco
            </div>
          )}
          {/* Preview button */}
          <button
            onClick={() => setPreview(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100"
          >
            <span className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <Eye size={13} />
              Vista previa
            </span>
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-4">
          <p className="font-bold text-white text-sm leading-tight">{asset.name}</p>
          <p className="mt-1 text-xs text-gray-400 leading-relaxed flex-1">{asset.desc}</p>

          {asset.whiteBackground && (
            <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-2">
              <AlertTriangle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-300">
                Este archivo tiene <strong>fondo blanco</strong>. No usar sobre fondos claros.
              </p>
            </div>
          )}

          <a
            href={asset.file}
            download={filename}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold py-2.5 px-4 transition-colors duration-200"
          >
            <Download size={14} />
            Descargar
          </a>
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreview(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(false)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X size={16} />
            </button>
            <div className={`rounded-2xl overflow-hidden ${asset.thumbBg} p-4 shadow-2xl`}>
              <img
                src={asset.thumb}
                alt={asset.name}
                className="max-h-[80vh] max-w-full mx-auto object-contain"
              />
            </div>
            <p className="mt-3 text-center text-sm text-gray-300">{asset.name}</p>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Banners section (idéntico a /banners, con QR overlay) ──────────────────
function BannersSection() {
  const [activeSlug, setActiveSlug] = useState(bannerConfigs[0].slug);
  const activeConfig = bannerConfigs.find(c => c.slug === activeSlug) ?? bannerConfigs[0];

  return (
    <section className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <Layers size={20} />
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">Banners & Tarjeta (con QR)</h2>
          <p className="text-xs text-gray-500">
            Vista exacta del diseño final — usa el botón <strong className="text-white">Download Merged PNG</strong> para descargar con el QR incluido.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {bannerConfigs.map(config => (
          <button
            key={config.slug}
            type="button"
            onClick={() => setActiveSlug(config.slug)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeConfig.slug === config.slug
                ? 'border-[#f3c863] bg-[#f3c863]/15 text-[#f7d98a]'
                : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
            }`}
          >
            {config.title}
          </button>
        ))}
      </div>

      {/* Banner preview — same as /banners page */}
      <div className="rounded-[2rem] overflow-hidden border border-white/10">
        <BannerAssetPreview
          config={activeConfig}
          embedded={true}
          showHeader={true}
        />
      </div>
    </section>
  );
}

// ─── Login screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === ACCESS_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/8 rounded-full blur-3xl" />
      </div>

      <div
        className={`relative w-full max-w-sm transition-transform duration-150 ${shake ? 'translate-x-2' : ''}`}
        style={{ animation: shake ? 'shake 0.5s ease' : 'none' }}
      >
        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
          {/* Logo icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red shadow-lg">
            <Lock size={28} className="text-white" />
          </div>

          <h1 className="font-display text-3xl text-white mb-1">Portal de Assets</h1>
          <p className="text-gray-400 text-sm mb-2">Méndez Transport</p>
          <p className="text-gray-500 text-xs mb-8">
            Ingresa la contraseña para acceder a tus logos y banners.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Contraseña"
                autoFocus
                className={`w-full rounded-xl border px-4 py-3 text-center text-white bg-white/8 outline-none transition-colors text-sm font-medium tracking-widest
                  ${error
                    ? 'border-red-500 bg-red-500/10 placeholder-red-400'
                    : 'border-white/15 focus:border-brand-red/60 focus:bg-white/10 placeholder-gray-600'
                  }`}
              />
              {error && (
                <p className="mt-2 text-xs text-red-400 font-semibold">
                  Contraseña incorrecta. Intenta de nuevo.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 transition-colors"
            >
              Acceder
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-600">
            ¿No tienes la contraseña? Contacta a tu diseñador.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

// ─── Assets view ─────────────────────────────────────────────────────────────
function AssetsView({ onLogout }) {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/8 bg-brand-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-display text-xl text-white">Portal de Assets</h1>
            <p className="text-xs text-gray-500">Méndez Transport · Archivos del cliente</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/vista-pagada"
              className="flex items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#9df6bf] hover:text-white hover:bg-[#25D366]/20 transition-colors"
            >
              Pagina completa
            </a>
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white">
              Assets
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/25 px-3 py-1.5">
              <CheckCircle size={12} className="text-green-400" />
              <span className="text-xs font-semibold text-green-400">Acceso activo</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={12} />
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-brand-red/20 bg-brand-red/5 p-6">
          <h2 className="text-white font-bold text-lg mb-1">Tus archivos listos para descargar</h2>
          <p className="text-gray-400 text-sm">
            Aquí encontrarás todos los logos y diseños creados para Méndez Transport.
            Haz clic en <strong className="text-white">Descargar</strong> en cada archivo.
            Los archivos con el aviso <span className="text-amber-400 font-semibold">Fondo blanco</span> no
            deben usarse sobre fondos claros — úsalos sobre fondos oscuros o de color.
          </p>
        </div>

        {/* Banners con QR — idéntico a /banners */}
        <BannersSection />

        {/* Logos & otros archivos */}
        {ASSET_GROUPS.map((group) => (
          <section key={group.title} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${group.color} text-white`}>
                {group.icon}
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">{group.title}</h2>
                <p className="text-xs text-gray-500">{group.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {group.assets.map((asset) => (
                <AssetCard key={asset.file} asset={asset} />
              ))}
            </div>
          </section>
        ))}

        {/* Footer note */}
        <div className="mt-6 rounded-xl border border-white/8 bg-white/3 p-4 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Méndez Transport · Archivos de uso exclusivo del cliente
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AssetsPortal() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return <AssetsView onLogout={() => setAuthenticated(false)} />;
}
