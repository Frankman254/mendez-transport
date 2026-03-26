import { useEffect, useMemo, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Download, ImagePlus, Link2, Type, X } from 'lucide-react';
import { defaultQrCenterIcons } from './qrGeneratorIconOptions';

function cn(...values) {
  return values.filter(Boolean).join(' ');
}

export default function QrGeneratorWindow({
  open = false,
  onClose,
  title = 'QR Generator',
  description = 'Write the content or link, choose a center icon and export the final QR as PNG.',
  initialValue = '',
  initialSize = 280,
  iconOptions = defaultQrCenterIcons,
  defaultIconId = 'whatsapp',
}) {
  const qrRef = useRef(null);
  const fileInputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [size, setSize] = useState(initialSize);
  const [selectedIconId, setSelectedIconId] = useState(defaultIconId);
  const [customIcon, setCustomIcon] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const selectedIcon = useMemo(() => {
    if (selectedIconId === 'custom') return customIcon?.src ?? '';
    return iconOptions.find((option) => option.id === selectedIconId)?.src ?? '';
  }, [customIcon?.src, iconOptions, selectedIconId]);

  const qrIsEmpty = value.trim().length === 0;

  const handleCopy = async () => {
    if (qrIsEmpty) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handleIconUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCustomIcon({
        id: 'custom',
        label: file.name,
        src: typeof reader.result === 'string' ? reader.result : '',
      });
      setSelectedIconId('custom');
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg || qrIsEmpty) return;

    const markup = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    const exportSize = Math.max(size, 720);

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = exportSize;
      canvas.height = exportSize;
      const context = canvas.getContext('2d');

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        return;
      }

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, exportSize, exportSize);
      context.drawImage(image, 0, 0, exportSize, exportSize);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'generated-qr.png';
      link.click();
      URL.revokeObjectURL(objectUrl);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close QR generator"
        onClick={() => onClose?.()}
        className="absolute inset-0 bg-[rgba(14,20,18,0.56)] backdrop-blur-sm"
      />

      <div className="relative z-[121] grid w-full max-w-6xl gap-6 overflow-hidden rounded-[2rem] border border-[#e5d6c8] bg-[#fffaf3] shadow-[0_30px_90px_rgba(0,0,0,0.22)] lg:grid-cols-[1fr_380px]">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a35d37]">
                Ready to reuse
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#18231f] sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#60706a] sm:text-base">
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onClose?.()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8dbcf] bg-white text-[#55635e] transition-colors hover:text-[#18231f]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <div className="rounded-[1.6rem] border border-[#eadfd4] bg-white p-5">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#24312d]">
                  <Link2 size={16} />
                  Content or link
                </label>
                <textarea
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="https://example.com or any text you want inside the QR"
                  className="min-h-[132px] w-full resize-none rounded-[1.2rem] border border-[#ebdfd4] bg-[#fffdf9] px-4 py-3 text-sm text-[#1d2a26] outline-none transition-colors placeholder:text-[#92a09a] focus:border-[#b85e34]"
                />
              </div>

              <div className="rounded-[1.6rem] border border-[#eadfd4] bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#24312d]">
                    <Type size={16} />
                    QR size
                  </label>
                  <span className="text-sm font-bold text-[#a35d37]">{size}px</span>
                </div>

                <input
                  type="range"
                  min="180"
                  max="420"
                  step="10"
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                  className="mt-4 w-full accent-[#b85e34]"
                />
              </div>

              <div className="rounded-[1.6rem] border border-[#eadfd4] bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[#24312d]">Center icon</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-full border border-[#e4d4c4] bg-[#fcf6ef] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8b5e3c] transition-colors hover:bg-white"
                  >
                    <ImagePlus size={14} />
                    Upload custom
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="hidden"
                />

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {iconOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedIconId(option.id)}
                      className={cn(
                        'rounded-[1.2rem] border p-3 text-left transition-all',
                        selectedIconId === option.id
                          ? 'border-[#b85e34] bg-[#fff5ed] shadow-[0_10px_30px_rgba(184,94,52,0.12)]'
                          : 'border-[#efe3d7] bg-[#fffdf9] hover:border-[#dcc9b7]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white ring-1 ring-[#f0e6db]">
                          {option.src ? (
                            <img src={option.src} alt={option.label} className="h-7 w-7 object-contain" />
                          ) : (
                            <div className="h-7 w-7 rounded-full border border-dashed border-[#d3c1b0]" />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-[#24312d]">{option.label}</span>
                      </div>
                    </button>
                  ))}

                  {customIcon && (
                    <button
                      type="button"
                      onClick={() => setSelectedIconId('custom')}
                      className={cn(
                        'rounded-[1.2rem] border p-3 text-left transition-all',
                        selectedIconId === 'custom'
                          ? 'border-[#b85e34] bg-[#fff5ed] shadow-[0_10px_30px_rgba(184,94,52,0.12)]'
                          : 'border-[#efe3d7] bg-[#fffdf9] hover:border-[#dcc9b7]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white ring-1 ring-[#f0e6db]">
                          <img src={customIcon.src} alt={customIcon.label} className="h-7 w-7 object-contain" />
                        </div>
                        <span className="text-sm font-semibold text-[#24312d]">Custom icon</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[#eadfd4] bg-[linear-gradient(180deg,#fcf7ef_0%,#fffdf9_100%)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a35d37]">
                Live preview
              </p>

              <div className="mt-5 rounded-[1.6rem] border border-[#ece0d5] bg-white p-5 shadow-[0_18px_50px_rgba(46,34,14,0.06)]">
                <div className="flex min-h-[420px] items-center justify-center">
                  {qrIsEmpty ? (
                    <div className="max-w-[260px] text-center text-[#76847f]">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f6eee4] text-[#b85e34]">
                        <Link2 size={28} />
                      </div>
                      <p className="text-lg font-bold text-[#24312d]">Your QR will appear here</p>
                      <p className="mt-2 text-sm leading-6">
                        Add a link or any text in the left panel to generate the preview.
                      </p>
                    </div>
                  ) : (
                    <div ref={qrRef} className="rounded-[1.8rem] border border-[#efe3d7] bg-white p-4 shadow-[0_16px_40px_rgba(46,34,14,0.08)]">
                      <QRCodeSVG
                        value={value}
                        size={size}
                        bgColor="#ffffff"
                        fgColor="#18231f"
                        level="H"
                        imageSettings={
                          selectedIcon
                            ? {
                                src: selectedIcon,
                                x: undefined,
                                y: undefined,
                                height: size * 0.22,
                                width: size * 0.22,
                                excavate: true,
                              }
                            : undefined
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={qrIsEmpty}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ead6c6] bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#24312d] transition-colors hover:bg-[#fff8f1] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Copy size={16} />
                  {copied ? 'Copied' : 'Copy content'}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={qrIsEmpty}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18231f] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download size={16} />
                  Download PNG
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#eadfd4] bg-[#fcf6ef] p-6 lg:border-l lg:border-t-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a35d37]">
            Implementation notes
          </p>

          <div className="mt-4 space-y-4 text-sm leading-7 text-[#5b6762]">
            <p>This module is isolated on purpose, so you can move the whole folder into another React project with the same dependencies.</p>
            <p>Use `defaultQrCenterIcons` as-is or replace them with your project icons, partner logos or social media marks.</p>
            <p>The PNG export is handled from the generated SVG, so it works without extra QR packages.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
