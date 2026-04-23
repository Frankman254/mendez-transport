/**
 * Méndez Transport — Portal de Assets del Cliente
 * skipAuth=true → acceso directo sin contraseña (ruta raíz)
 * skipAuth=false (default) → protegido con contraseña (ruta /mis-assets)
 */

import { useState, useEffect } from 'react';
import { Lock, Download, Eye, AlertTriangle, CheckCircle, FileImage, X, LogOut, Layers, Sun, Moon } from 'lucide-react';
import BannerAssetPreview from './BannerAssetPreview';
import { bannerConfigs } from './bannerConfigs';

// ─── Descarga con fondo blanco explícito para imágenes que lo necesitan ─────
// Las imágenes AI tienen bordes irregulares — poner blanco sólido detrás
// garantiza que se vean limpias sin importar dónde se usen.
async function downloadWithWhiteBackground(asset) {
  try {
    const img = new Image();
    img.src = asset.file;
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
    const canvas = document.createElement('canvas');
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const a = document.createElement('a');
    a.href     = canvas.toDataURL('image/png');
    a.download = img.src.split('/').pop().replace(/\.\w+$/, '') + '.png';
    a.click();
  } catch {
    const a = document.createElement('a');
    a.href = asset.file;
    a.download = asset.file.split('/').pop();
    a.click();
  }
}

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
  const [processing, setProcessing] = useState(false);

  const filename = asset.file.split('/').pop();

  const handleDownload = async () => {
    if (asset.whiteBackground) {
      // Imágenes AI con fondos blancos irregulares → renderizar sobre blanco
      // limpio para ocultar bordes feos antes de descargar
      setProcessing(true);
      await downloadWithWhiteBackground(asset);
      setProcessing(false);
    } else {
      // Imágenes con transparencia real → descargar tal cual
      const a = document.createElement('a');
      a.href = asset.file;
      a.download = filename;
      a.click();
    }
  };

  // thumbBg del asset: blanco para logos fondo blanco, oscuro para los demás
  const thumbBg = asset.whiteBackground ? 'bg-white' : 'bg-gray-800';
  const modalBg = asset.whiteBackground ? 'bg-white' : 'bg-[#1a1a2e]';

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-brand-red/30 hover:bg-white/8 hover:shadow-xl">
        {/* Thumbnail */}
        <div className={`relative h-40 ${thumbBg} flex items-center justify-center overflow-hidden`}>
          <img
            src={asset.thumb}
            alt={asset.name}
            className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
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

          <button
            type="button"
            onClick={handleDownload}
            disabled={processing}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white text-xs font-bold py-2.5 px-4 transition-colors duration-200"
          >
            <Download size={14} />
            {processing ? 'Preparando…' : 'Descargar'}
          </button>
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
            <div className={`rounded-2xl overflow-hidden ${modalBg} p-4 shadow-2xl`}>
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
            Aquí están tus diseños finales listos para imprimir o compartir. Descarga cada uno en imagen o en PDF listo para imprimir.
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

function WebViewButton() {
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd === 'mendez7904') {
      window.sessionStorage.setItem('paid_view_access', 'granted');
      window.location.href = '/vista-pagada';
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setPwd(''); setError(false); }}
        className="flex items-center gap-1.5 rounded-full border border-[#f3c863]/30 bg-[#f3c863]/10 px-3 py-1.5 text-xs font-semibold text-[#f7d98a] hover:bg-[#f3c863]/20 transition-colors"
      >
        Ver páginas web
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-white font-bold text-base mb-1">Páginas web</h3>
            <p className="text-gray-400 text-xs mb-4">Ingresa la contraseña para ver las vistas.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="password"
                value={pwd}
                onChange={e => { setPwd(e.target.value); setError(false); }}
                placeholder="Contraseña"
                autoFocus
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-center text-white placeholder-white/30 bg-white/12 outline-none transition-colors tracking-widest ${
                  error ? 'border-red-500 bg-red-500/10' : 'border-white/20 focus:border-[#f3c863]/60 focus:bg-black'
                }`}
              />
              {error && <p className="text-xs text-red-400 text-center font-semibold">Contraseña incorrecta.</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold py-2.5 transition-colors"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Assets view ─────────────────────────────────────────────────────────────
function PortalThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <button
      type="button"
      onClick={() => setDark(d => !d)}
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/8 text-gray-400 hover:text-white transition-colors"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

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
            <WebViewButton />
            <PortalThemeToggle />
            <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/25 px-3 py-1.5">
              <CheckCircle size={12} className="text-green-400" />
              <span className="text-xs font-semibold text-green-400">Acceso activo</span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <LogOut size={12} />
                Salir
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-brand-red/20 bg-brand-red/5 p-6">
          <h2 className="text-white font-bold text-lg mb-1">Tus archivos listos para descargar</h2>
          <p className="text-gray-400 text-sm">
            Aquí encontrarás todos los logos, banners y diseños creados para Méndez Transport.
            Pulsa <strong className="text-white">Descargar</strong> en cualquier archivo para guardarlo en alta calidad.
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
// skipAuth=true → acceso directo sin login (usado en ruta raíz)
export default function AssetsPortal({ skipAuth = false }) {
  const [authenticated, setAuthenticated] = useState(skipAuth);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return <AssetsView onLogout={skipAuth ? undefined : () => setAuthenticated(false)} />;
}
