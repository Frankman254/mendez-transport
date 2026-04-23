import { useMemo, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FileDown } from 'lucide-react';
import BannerHomeButton from './BannerHomeButton';

const WHATSAPP_ICON = `data:image/svg+xml;base64,${btoa(
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366">' +
		'<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
		'</svg>'
)}`;

function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
	const r = Math.min(radius, width / 2, height / 2);
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + width - r, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + r);
	ctx.lineTo(x + width, y + height - r);
	ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
	ctx.lineTo(x + r, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
}

export default function BannerAssetPreview({
	config,
	embedded = false,
	showHeader = true,
}) {
	const qrRef = useRef(null);
	const imageFrameRef = useRef(null);

	const wrapperClass = useMemo(() => {
		return config.orientation === 'horizontal'
			? 'aspect-[3/2] max-w-[1280px]'
			: 'aspect-[2/3] max-w-[640px]';
	}, [config.orientation]);

	const qrStyle = {
		left: `${config.qr.left}%`,
		top: `${config.qr.top}%`,
		width: `${config.qr.width}%`,
		transform: `scale(${config.qr.scale ?? 1})`,
		transformOrigin: 'top left',
	};

	/**
	 * Renderiza el banner + QR en un canvas usando las coordenadas del config
	 * (nunca DOM measurements) para garantizar que el QR sea siempre cuadrado
	 * y esté perfectamente posicionado.
	 */
	const buildCanvas = async () => {
		const svg = qrRef.current?.querySelector('svg');
		if (!svg) throw new Error('QR SVG not found');

		await document.fonts.ready;

		const [baseImage, waIcon] = await Promise.all([
			loadImage(config.image),
			loadImage(WHATSAPP_ICON),
		]);

		if (!baseImage.naturalWidth) throw new Error('Base image failed to load');

		// Serializar el SVG del QR (contiene el hueco "excavated" pero el <image>
		// del ícono podría no renderizarse en canvas por restricciones de data-URLs
		// anidadas → lo dibujamos por separado después)
		const qrMarkup = new XMLSerializer().serializeToString(svg);
		const qrDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrMarkup)}`;
		const qrImage = await loadImage(qrDataUrl);

		// Canvas en las dimensiones reales de la imagen del banner
		const canvas = document.createElement('canvas');
		canvas.width = baseImage.naturalWidth;
		canvas.height = baseImage.naturalHeight;
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Canvas context unavailable');

		// ── 1. Fondo: imagen del banner ───────────────────────────────────────
		ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

		// ── 2. Geometría del QR desde config (siempre cuadrado) ───────────────
		// config.qr.left/top/width son porcentajes del contenedor del banner.
		// El div del QR tiene aspect-square → usamos canvas.width como referencia.
		const qrLeft    = (config.qr.left  / 100) * canvas.width;
		const qrTop     = (config.qr.top   / 100) * canvas.height;
		const qrSize    = (config.qr.width / 100) * canvas.width;   // cuadrado
		const padding   = qrSize * 0.08;                             // p-[8%]
		const svgSize   = qrSize - 2 * padding;
		const cardR     = qrSize * 0.07;                             // rounded-[1rem]
		const borderW   = Math.max(1.5, qrSize * 0.004);

		// ── 3. Sombra de la tarjeta ───────────────────────────────────────────
		ctx.save();
		ctx.shadowColor   = 'rgba(0,0,0,0.30)';
		ctx.shadowBlur    = qrSize * 0.12;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = qrSize * 0.05;
		drawRoundedRect(ctx, qrLeft, qrTop, qrSize, qrSize, cardR);
		ctx.fillStyle = '#fffdf8';
		ctx.fill();
		ctx.restore();

		// ── 4. Fondo de la tarjeta (sin sombra para el borde) ─────────────────
		ctx.save();
		drawRoundedRect(ctx, qrLeft, qrTop, qrSize, qrSize, cardR);
		ctx.fillStyle = '#fffdf8';
		ctx.fill();
		ctx.restore();

		// ── 5. Borde dorado de la tarjeta ─────────────────────────────────────
		ctx.save();
		drawRoundedRect(ctx, qrLeft, qrTop, qrSize, qrSize, cardR);
		ctx.strokeStyle = '#d4b36b';
		ctx.lineWidth   = borderW;
		ctx.stroke();
		ctx.restore();

		// ── 6. QR SVG (con hueco del excavate) ────────────────────────────────
		ctx.drawImage(
			qrImage,
			qrLeft + padding,
			qrTop  + padding,
			svgSize,
			svgSize,
		);

		// ── 7. Ícono WhatsApp sobre el hueco (dibujado explícitamente) ─────────
		// Posición: centro exacto del SVG del QR
		const iconRatio = config.qr.iconSize / config.qr.pixelSize;
		const iconPx    = svgSize * iconRatio;
		const iconX     = qrLeft + padding + (svgSize - iconPx) / 2;
		const iconY     = qrTop  + padding + (svgSize - iconPx) / 2;

		// Fondo blanco pequeño detrás del ícono para limpiar el hueco
		ctx.save();
		ctx.fillStyle = '#ffffff';
		const holeSize = iconPx * 1.15;
		const holeX    = qrLeft + padding + (svgSize - holeSize) / 2;
		const holeY    = qrTop  + padding + (svgSize - holeSize) / 2;
		ctx.fillRect(holeX, holeY, holeSize, holeSize);
		ctx.restore();

		ctx.drawImage(waIcon, iconX, iconY, iconPx, iconPx);

		return canvas;
	};

	// Descarga directa de la imagen PNG (sin abrir nueva pestaña, sin rotar)
	const downloadImage = async () => {
		try {
			const canvas = await buildCanvas();
			const a = document.createElement('a');
			a.href     = canvas.toDataURL('image/png');
			a.download = `${config.slug}.png`;
			a.click();
		} catch (err) {
			console.error('Image export failed:', err);
		}
	};

	// Abre ventana de impresión para guardar como PDF.
	// La imagen horizontal se rota 90° con CSS para llenar la página portrait.
	const downloadPdf = async () => {
		try {
			const canvas = await buildCanvas();
			const isHorizontal = config.orientation === 'horizontal';
			const dataUrl = canvas.toDataURL('image/png');

			const win = window.open('about:blank', '_blank');
			if (!win) return; // popup bloqueado — el usuario puede usar Descargar Imagen

			const imgStyle = isHorizontal
				? `position:fixed;top:50%;left:50%;width:100vh;height:100vw;transform:translate(-50%,-50%) rotate(90deg);object-fit:fill;`
				: `display:block;width:100vw;height:100vh;object-fit:fill;`;

			win.document.open();
			win.document.write(`<!DOCTYPE html>
<html>
<head>
<title>${config.slug}</title>
<style>
  @page { size: portrait; margin: 0; }
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { overflow: hidden; }
  img { ${imgStyle} }
</style>
</head>
<body>
<img src="${dataUrl}" alt="${config.slug}">
<script>
window.addEventListener('load', function () {
  setTimeout(function () { window.print(); }, 250);
});
<\/script>
</body>
</html>`);
			win.document.close();
		} catch (err) {
			console.error('PDF export failed:', err);
		}
	};

	return (
		<section
			className={`relative overflow-hidden bg-[#08110d] ${embedded ? 'rounded-[2rem]' : 'min-h-screen py-6 sm:py-10'}`}
		>
			{!embedded && <BannerHomeButton />}

			<div className="absolute inset-0">
				<img
					src={config.image}
					alt=""
					aria-hidden="true"
					className="h-full w-full scale-110 object-cover blur-2xl opacity-35"
				/>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,213,128,0.16),transparent_24%),linear-gradient(180deg,rgba(5,11,8,0.22)_0%,rgba(5,11,8,0.5)_20%,rgba(5,11,8,0.84)_100%)]" />
			</div>

			<div
				className={`relative mx-auto flex max-w-7xl items-center justify-center px-3 sm:px-6 lg:px-8 ${embedded ? 'py-6 sm:py-8' : 'min-h-screen'}`}
			>
				<div className="w-full">
					{showHeader && (
						<div className="mb-4 flex flex-col items-center gap-3 text-center">
							<h1 className="text-xl font-black uppercase tracking-[0.18em] text-white sm:text-2xl">
								{config.title}
							</h1>
							<div className="flex flex-wrap items-center justify-center gap-2">
								<button
									type="button"
									onClick={downloadImage}
									className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/16"
								>
									<FileDown size={16} />
									Descargar imagen
								</button>
								<button
									type="button"
									onClick={downloadPdf}
									className="inline-flex items-center gap-2 rounded-full border border-[#f3c863]/40 bg-[#f3c863]/10 px-5 py-2.5 text-sm font-semibold text-[#f7d98a] transition-colors hover:bg-[#f3c863]/20"
								>
									<FileDown size={16} />
									Descargar PDF
								</button>
							</div>
						</div>
					)}

					<div className="relative mx-auto w-full max-w-[1280px]">
						<div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle,rgba(255,205,108,0.16)_0%,rgba(255,205,108,0)_72%)] blur-3xl" />
						<div className="absolute inset-x-20 bottom-0 h-12 rounded-full bg-black/50 blur-2xl" />

						<div
							ref={imageFrameRef}
							className={`relative mx-auto w-full overflow-hidden rounded-[2rem] border border-white/15 bg-black/20 shadow-[0_34px_110px_rgba(0,0,0,0.58)] ${wrapperClass}`}
						>
							<img
								src={config.image}
								alt={config.title}
								className="absolute inset-0 h-full w-full object-cover"
							/>

							<div
								ref={qrRef}
								className="absolute z-30 aspect-square"
								style={qrStyle}
							>
								<div className="flex h-full w-full items-center justify-center rounded-[1rem] border border-[#d4b36b] bg-[#fffdf8] p-[8%] shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
									<QRCodeSVG
										value="https://wa.me/50769255088"
										size={config.qr.pixelSize}
										bgColor="#fffdf8"
										fgColor="#151515"
										level="H"
										imageSettings={{
											src: WHATSAPP_ICON,
											height: config.qr.iconSize,
											width: config.qr.iconSize,
											excavate: true,
										}}
									/>
								</div>
							</div>

							<div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-[#f3c863]/15" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
