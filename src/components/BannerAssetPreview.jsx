import { useMemo, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
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
	const safeRadius = Math.min(radius, width / 2, height / 2);
	ctx.beginPath();
	ctx.moveTo(x + safeRadius, y);
	ctx.lineTo(x + width - safeRadius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
	ctx.lineTo(x + width, y + height - safeRadius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
	ctx.lineTo(x + safeRadius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
	ctx.lineTo(x, y + safeRadius);
	ctx.quadraticCurveTo(x, y, x + safeRadius, y);
	ctx.closePath();
}

function readPx(value, fallback = 0) {
	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

function parseBoxShadow(value) {
	if (!value || value === 'none') return null;

	const colorMatch = value.match(/rgba?\([^)]+\)/);
	const color = colorMatch?.[0] ?? 'rgba(0, 0, 0, 0)';
	const numericPart = value.replace(color, '').match(/-?\d+(\.\d+)?/g) ?? [];
	const [offsetX = 0, offsetY = 0, blur = 0] = numericPart.map(Number);

	return { color, offsetX, offsetY, blur };
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

	const downloadMergedPng = async () => {
		const svg = qrRef.current?.querySelector('svg');
		const qrCard = qrRef.current?.firstElementChild;
		const imageFrame = imageFrameRef.current;
		if (!svg || !qrCard || !imageFrame) return;

		const qrMarkup = new XMLSerializer().serializeToString(svg);
		const qrDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrMarkup)}`;

		try {
			const [baseImage, qrImage] = await Promise.all([
				loadImage(config.image),
				loadImage(qrDataUrl),
			]);

			const canvas = document.createElement('canvas');
			canvas.width = baseImage.naturalWidth;
			canvas.height = baseImage.naturalHeight;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

			const frameRect = imageFrame.getBoundingClientRect();
			const qrRect = svg.getBoundingClientRect();
			const qrCardRect = qrCard.getBoundingClientRect();
			const qrCardStyles = window.getComputedStyle(qrCard);
			const qrScaleX = canvas.width / frameRect.width;
			const qrScaleY = canvas.height / frameRect.height;
			const cardScale = (qrScaleX + qrScaleY) / 2;

			const cardX = (qrCardRect.left - frameRect.left) * qrScaleX;
			const cardY = (qrCardRect.top - frameRect.top) * qrScaleY;
			const cardWidth = qrCardRect.width * qrScaleX;
			const cardHeight = qrCardRect.height * qrScaleY;

			const qrX = (qrRect.left - frameRect.left) * qrScaleX;
			const qrY = (qrRect.top - frameRect.top) * qrScaleY;
			const qrWidth = qrRect.width * qrScaleX;
			const qrHeight = qrRect.height * qrScaleY;

			const radius = readPx(qrCardStyles.borderTopLeftRadius, 16) * cardScale;
			const borderWidth =
				readPx(qrCardStyles.borderTopWidth, 1) * cardScale;
			const shadow = parseBoxShadow(qrCardStyles.boxShadow);

			ctx.save();
			if (shadow) {
				ctx.shadowColor = shadow.color;
				ctx.shadowBlur = shadow.blur * cardScale;
				ctx.shadowOffsetX = shadow.offsetX * qrScaleX;
				ctx.shadowOffsetY = shadow.offsetY * qrScaleY;
			}
			drawRoundedRect(ctx, cardX, cardY, cardWidth, cardHeight, radius);
			ctx.fillStyle = qrCardStyles.backgroundColor || '#fffdf8';
			ctx.fill();
			ctx.restore();

			ctx.save();
			drawRoundedRect(ctx, cardX, cardY, cardWidth, cardHeight, radius);
			ctx.strokeStyle = qrCardStyles.borderTopColor || '#d4b36b';
			ctx.lineWidth = borderWidth;
			ctx.stroke();
			ctx.restore();

			ctx.drawImage(qrImage, qrX, qrY, qrWidth, qrHeight);

			const link = document.createElement('a');
			link.href = canvas.toDataURL('image/png');
			link.download = `${config.slug}-merged.png`;
			link.click();
		} catch (error) {
			console.error('Could not export merged banner image', error);
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
							<div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/75">
								<span>{config.route}</span>
								<span>{`QR: left ${config.qr.left}% · top ${config.qr.top}% · width ${config.qr.width}%`}</span>
							</div>
							<button
								type="button"
								onClick={downloadMergedPng}
								className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/16"
							>
								<Download size={16} />
								Download Merged PNG
							</button>
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
