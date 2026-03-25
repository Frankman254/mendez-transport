import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
	MapPin,
	Clock,
	Phone,
	MessageCircle,
	ChevronDown,
	Star,
	Shield,
	Users,
	Zap,
	CheckCircle,
	Instagram,
	ArrowRight,
	Menu,
	X,
	Calendar,
	Navigation,
	Wifi,
	Award,
	FileDown,
	Lock,
	Compass,
	Luggage,
} from 'lucide-react';
import Flyer from './components/Flyer';
import PrintBanner from './components/PrintBanner';
import ShuttleBanner, { PRIVATE_CARD_IMAGE } from './components/ShuttleBanner';
import VerticalBannerPreview from './components/VerticalBannerPreview';
import BannerAssetPreview from './components/BannerAssetPreview';
import BannersTabbedPage from './components/BannersTabbedPage';
import AssetsPortal from './components/AssetsPortal';
import { bannerConfigByRoute, bannerConfigs } from './components/bannerConfigs';
import { translations } from './translations';

// ─── Logo SVG Component ─────────────────────────────────────────────────────
function MendezLogo({ size = 48, showText = true, dark = false }) {
	return (
		<div className="flex items-center gap-3">
			<svg
				width={size}
				height={size}
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Background circle */}
				<circle
					cx="50"
					cy="50"
					r="48"
					fill={dark ? '#ffffff' : '#1a1a1a'}
				/>
				{/* Road swoosh left */}
				<path
					d="M12 72 Q28 45 50 50 Q28 50 18 68 Z"
					fill="#e31e24"
					opacity="0.9"
				/>
				{/* Road swoosh right */}
				<path
					d="M88 72 Q72 45 50 50 Q72 50 82 68 Z"
					fill="#e31e24"
					opacity="0.9"
				/>
				{/* Center road line dashes */}
				<path
					d="M50 50 L50 70"
					stroke="white"
					strokeWidth="1.5"
					strokeDasharray="3 3"
				/>
				{/* Big M letter */}
				<text
					x="50"
					y="56"
					fontFamily="Arial Black, sans-serif"
					fontSize="40"
					fontWeight="900"
					fill={dark ? '#1a1a1a' : '#ffffff'}
					textAnchor="middle"
					dominantBaseline="middle"
				>
					M
				</text>
				{/* Speed lines top */}
				<path
					d="M30 20 Q50 15 70 20"
					stroke="#e31e24"
					strokeWidth="3"
					strokeLinecap="round"
					fill="none"
				/>
				<path
					d="M35 14 Q50 10 65 14"
					stroke="#e31e24"
					strokeWidth="2"
					strokeLinecap="round"
					fill="none"
					opacity="0.6"
				/>
			</svg>
			{showText && (
				<div className="leading-none">
					<div
						className={`font-display text-2xl tracking-wide leading-none ${dark ? 'text-brand-black' : 'text-white'}`}
					>
						MÉNDEZ
					</div>
					<div
						className={`text-xs font-semibold tracking-widest uppercase ${dark ? 'text-brand-red' : 'text-brand-red'}`}
					>
						TRANSPORT
					</div>
				</div>
			)}
		</div>
	);
}

// ─── WhatsApp Icon SVG ────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 24 }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
		</svg>
	);
}

// ─── QR Code with WhatsApp Icon ───────────────────────────────────────────────
function WhatsAppQR({
	url,
	size = 200,
	label = '',
	showExportButton = false,
	pdfTitle = 'Mendez Transport QR',
	exportLabel = 'Export QR PNG',
}) {
	const qrRef = useRef(null);
	const whatsappSVG = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2325D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  `)}`;

	const handleExportPng = () => {
		const svg = qrRef.current?.querySelector('svg');
		if (!svg) return;
		const qrMarkup = new XMLSerializer().serializeToString(svg);
		const svgBlob = new Blob([qrMarkup], {
			type: 'image/svg+xml;charset=utf-8',
		});
		const objectUrl = URL.createObjectURL(svgBlob);
		const image = new Image();
		const exportSize = Math.max(size, 512);

		image.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = exportSize;
			canvas.height = exportSize;
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				URL.revokeObjectURL(objectUrl);
				return;
			}

			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

			const link = document.createElement('a');
			link.href = canvas.toDataURL('image/png');
			link.download = `${pdfTitle.replaceAll(' ', '-').toLowerCase()}-qr.png`;
			link.click();
			URL.revokeObjectURL(objectUrl);
		};

		image.onerror = () => {
			URL.revokeObjectURL(objectUrl);
		};

		image.src = objectUrl;
	};

	return (
		<div className="flex flex-col items-center gap-3">
			<div ref={qrRef} className="qr-glow rounded-2xl p-3 bg-white">
				<QRCodeSVG
					value={url}
					size={size}
					bgColor="#ffffff"
					fgColor="#1a1a1a"
					level="H"
					imageSettings={{
						src: whatsappSVG,
						x: undefined,
						y: undefined,
						height: size * 0.22,
						width: size * 0.22,
						excavate: true,
					}}
				/>
			</div>
			{label && (
				<p className="text-sm font-semibold text-gray-400 text-center">
					{label}
				</p>
			)}
			{showExportButton && (
				<button
					type="button"
					onClick={handleExportPng}
					className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/16"
				>
					<FileDown size={16} />
					{exportLabel}
				</button>
			)}
		</div>
	);
}

// ─── Section animation wrapper ────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-80px' });
	const variants = {
		hidden: {
			opacity: 0,
			y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
			x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
		},
		visible: { opacity: 1, y: 0, x: 0 },
	};
	return (
		<motion.div
			ref={ref}
			variants={variants}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ t, language, setLanguage }) {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const links = [
		{ label: t.nav.destinations, href: '#destinations' },
		{ label: t.nav.prices, href: '#prices' },
		{ label: t.nav.journey, href: '#journey' },
		{ label: t.nav.vehicle, href: '#vehicle' },
		{ label: t.nav.contact, href: '#contact' },
	];

	return (
		<motion.nav
			initial={{ y: -80 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className="fixed top-3 left-0 right-0 z-50 px-3 transition-all duration-300"
		>
			<div
				className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-4 sm:px-6 lg:px-8 ${
					scrolled
						? 'border-[#d9c8b8] bg-[#fffaf4]/92 shadow-[0_18px_60px_rgba(36,25,10,0.12)] backdrop-blur-md'
						: 'border-white/40 bg-white/55 backdrop-blur-md'
				}`}
			>
				<MendezLogo size={28} showText={true} dark={true} />

				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-6">
					{links.map(link => (
						<a
							key={link.href}
							href={link.href}
							className="relative text-xs font-medium uppercase tracking-[0.18em] text-[#5f6d67] transition-colors duration-200 hover:text-[#18231f] group"
						>
							{link.label}
							<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#b85e34] transition-all duration-300 group-hover:w-full" />
						</a>
					))}
					<button
						type="button"
						onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
						className="rounded-full border border-[#ddd0c2] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#5f6d67] transition-colors hover:text-[#18231f]"
					>
						{language.toUpperCase()}
					</button>
					<a
						href="https://wa.me/50769255088"
						target="_blank"
						rel="noopener noreferrer"
						className="btn-whatsapp !px-4 !py-2 !text-xs"
					>
						<WhatsAppIcon size={16} />
						{t.nav.bookNow}
					</a>
				</div>

				{/* Mobile hamburger */}
				<button
					className="md:hidden text-white p-2"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
				>
					{menuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="border-t border-[#e0d0c1] bg-[#fffaf4]/98 md:hidden"
					>
						<div className="px-4 py-4 flex flex-col gap-4">
							{links.map(link => (
								<a
									key={link.href}
									href={link.href}
									onClick={() => setMenuOpen(false)}
									className="border-b border-[#eadfd4] py-2 text-base font-medium text-[#5f6d67] transition-colors hover:text-[#b85e34]"
								>
									{link.label}
								</a>
							))}
							<a
								href="https://wa.me/50769255088"
								target="_blank"
								rel="noopener noreferrer"
								className="btn-whatsapp justify-center mt-2"
							>
								<WhatsAppIcon size={20} />
								{t.nav.bookWA}
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function PublicHero({ t }) {
	const routeHighlights = [
		{
			name: 'Bocas del Toro',
			meta: 'Islas, mar turquesa y una llegada más relajada',
			image: '/assets/Bocas-del-toro-2.jpg',
		},
		{
			name: 'Boquete',
			meta: 'Montañas frescas, café y escapadas tranquilas',
			image: '/assets/tips-valle-de-anton-panama.jpg',
		},
		{
			name: 'Ciudad de Panamá',
			meta: 'Conexiones urbanas y traslados cómodos',
			image: '/assets/Panama-City-11.jpg',
		},
	];

	return (
		<section className="relative overflow-hidden bg-[#f6efe4] pt-24 text-[#18231f] sm:pt-28">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,30,36,0.10),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(19,76,65,0.14),transparent_24%),linear-gradient(180deg,#f6efe4_0%,#f8f5ee_48%,#fffdf9_100%)]" />
			<div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#d97745]/10 blur-3xl" />

			<div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
				<div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]">
					<FadeIn className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full border border-[#c9b49e] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5e3c]">
							<Compass size={14} />
							{t.hero.eyebrow}
						</div>
						<h1 className="mt-6 max-w-xl font-display text-6xl leading-[0.92] text-[#18231f] sm:text-7xl lg:text-[5.4rem]">
							{t.hero.title1}
							<span className="block text-brand-red">{t.hero.title2}</span>
						</h1>
						<p className="mt-6 max-w-xl text-lg leading-8 text-[#55615d]">
							{t.hero.subtitle}
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<a
								href="#contact"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18231f] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
							>
								{t.hero.primary}
								<ArrowRight size={16} />
							</a>
							<a
								href="#destinations"
								className="inline-flex items-center justify-center gap-2 rounded-full border border-[#18231f]/15 bg-white/70 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#18231f] transition-colors duration-300 hover:bg-white"
							>
								{t.hero.secondary}
							</a>
						</div>

						<div className="mt-10 flex flex-wrap gap-3">
							{t.hero.highlights.map((highlight) => (
								<div
									key={highlight}
									className="rounded-full border border-[#d6c8bb] bg-white/70 px-4 py-2 text-sm font-semibold text-[#40504a]"
								>
									{highlight}
								</div>
							))}
						</div>
					</FadeIn>

					<FadeIn direction="right">
						<div className="relative">
							<div className="absolute -left-6 -top-6 h-28 w-28 rounded-[2rem] bg-[#0f5b4f]/10 blur-2xl" />
							<div className="overflow-hidden rounded-[2rem] border border-[#e6d7c9] bg-white p-4 shadow-[0_28px_80px_rgba(45,35,18,0.12)]">
								<div className="grid gap-4">
									<div className="relative overflow-hidden rounded-[1.6rem]">
										<img
											src="/assets/Panama-City-11.jpg"
											alt="Viaje por Panamá con Méndez Transport"
											className="h-[420px] w-full object-cover"
										/>
										<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,32,29,0.04)_0%,rgba(15,32,29,0.56)_100%)]" />
										<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
											<p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
												{t.hero.cardTitle}
											</p>
											<p className="mt-2 max-w-sm text-sm leading-6 text-white/82">
												{t.hero.cardNote}
											</p>
										</div>
									</div>

									<div className="grid gap-3 sm:grid-cols-3">
										{routeHighlights.map((route) => (
											<div
												key={route.name}
												className="overflow-hidden rounded-[1.4rem] border border-[#efe4da] bg-[#fcfaf6]"
											>
												<img
													src={route.image}
													alt={route.name}
													className="h-28 w-full object-cover"
												/>
												<div className="p-4">
													<p className="text-sm font-bold text-[#18231f]">{route.name}</p>
													<p className="mt-1 text-xs leading-5 text-[#6b7772]">{route.meta}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

function Hero({ paidView = false, t }) {
	if (paidView) {
		return (
			<section className="relative overflow-hidden bg-[#f4ecdf] pt-24 sm:pt-28">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,94,52,0.10),transparent_28%),linear-gradient(180deg,#f4ecdf_0%,#fbf7f1_100%)]" />
				<div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
					<div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
						<FadeIn className="max-w-xl">
							<div className="inline-flex items-center gap-2 rounded-full border border-[#d5c4b5] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b5e3c]">
								<Compass size={14} />
								{t.hero.eyebrow}
							</div>
							<h1 className="mt-6 font-display text-6xl leading-[0.92] text-[#18231f] sm:text-7xl">
								{t.hero.title1}
								<span className="block text-brand-red">{t.hero.title2}</span>
							</h1>
							<p className="mt-6 text-lg leading-8 text-[#5b6762]">
								{t.hero.subtitle}
							</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<a
									href="#contact"
									className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18231f] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white"
								>
									{t.hero.primary}
									<ArrowRight size={16} />
								</a>
								<a
									href="/mis-assets"
									className="inline-flex items-center justify-center gap-2 rounded-full border border-[#18231f]/15 bg-white/70 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#18231f]"
								>
									{t.nav.clientAccess}
								</a>
							</div>
						</FadeIn>

						<FadeIn direction="right">
							<div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
								<div className="overflow-hidden rounded-[2rem] border border-[#e7d8c8] bg-white p-4 shadow-[0_28px_80px_rgba(45,35,18,0.12)]">
									<img
										src={PRIVATE_CARD_IMAGE}
										alt="Vista pagada de los assets de Méndez Transport"
										className="w-full rounded-[1.4rem] object-cover"
									/>
								</div>
								<div className="space-y-5">
									<div className="overflow-hidden rounded-[2rem] border border-[#e7d8c8] bg-white p-4 shadow-[0_22px_60px_rgba(45,35,18,0.10)]">
										<img
											src="/assets/mis-assets/Banner_oscuro_4k.png"
											alt="Banner premium de Méndez Transport"
											className="w-full rounded-[1.4rem] object-cover"
										/>
									</div>
									<div className="rounded-[2rem] border border-[#e7d8c8] bg-[#fcf8f1] p-6">
										<p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a35d37]">
											{t.hero.paidBadge}
										</p>
										<p className="mt-3 text-base leading-7 text-[#5b6762]">
											{t.hero.paidDesc}
										</p>
									</div>
								</div>
							</div>
						</FadeIn>
					</div>
				</div>
			</section>
		);
	}

	return <PublicHero t={t} />;
}

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
function Benefits({ t }) {
	const benefits = [
		{
			icon: <Shield size={28} />,
			title: t.benefits.items[0].title,
			desc: t.benefits.items[0].desc,
			color: 'from-blue-500 to-blue-700',
		},
		{
			icon: <Users size={28} />,
			title: t.benefits.items[1].title,
			desc: t.benefits.items[1].desc,
			color: 'from-brand-red to-brand-red-dark',
		},
		{
			icon: <Zap size={28} />,
			title: t.benefits.items[2].title,
			desc: t.benefits.items[2].desc,
			color: 'from-green-500 to-green-700',
		},
		{
			icon: <Award size={28} />,
			title: t.benefits.items[3].title,
			desc: t.benefits.items[3].desc,
			color: 'from-amber-500 to-amber-700',
		},
	];

	return (
		<section className="bg-[#fffaf4] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#a2552f]">{t.benefits.tag}</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] sm:text-6xl">{t.benefits.title}</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#66726e]">{t.benefits.subtitle}</p>
				</FadeIn>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{benefits.map((b, i) => (
						<FadeIn key={b.title} delay={i * 0.12} direction="up">
							<div className="card-hover group rounded-[2rem] border border-[#eadfd4] bg-white p-7 text-center shadow-[0_18px_50px_rgba(46,34,14,0.06)] hover:border-[#d8bea8]">
								<div
									className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
								>
									{b.icon}
								</div>
								<h3 className="mb-2 text-xl font-bold text-[#18231f]">
									{b.title}
								</h3>
								<p className="text-sm leading-7 text-[#66726e]">
									{b.desc}
								</p>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── FEATURED DESTINATIONS ────────────────────────────────────────────────────
function FeaturedDestinations({ t }) {
	const featured = [
		{
			name: t.destinations.items[0].name,
			tagline: t.destinations.items[0].tagline,
			price: '$65',
			image: '/assets/Bocas-del-toro-3.jpg',
			badge: t.destinations.items[0].badge,
			layout: 'tall',
		},
		{
			name: t.destinations.items[1].name,
			tagline: t.destinations.items[1].tagline,
			price: '$40',
			image: '/assets/tips-valle-de-anton-panama.jpg',
			badge: t.destinations.items[1].badge,
			layout: 'compact',
		},
		{
			name: t.destinations.items[2].name,
			tagline: t.destinations.items[2].tagline,
			price: '$55',
			image: '/assets/Panama-City-11.jpg',
			badge: t.destinations.items[2].badge,
			layout: 'wide',
		},
		{
			name: t.destinations.items[3].name,
			tagline: t.destinations.items[3].tagline,
			price: '$40',
			image: '/assets/Bocas-del-toro-1.jpg',
			badge: t.destinations.items[3].badge,
			layout: 'compact',
		},
	];

	return (
		<section id="destinations" className="bg-[#f4ecdf] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#a2552f]">{t.destinations.tag}</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] sm:text-6xl">{t.destinations.title}</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#66726e]">{t.destinations.subtitle}</p>
				</FadeIn>

				<div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-[320px_280px]">
					{featured.map((dest, i) => (
						<FadeIn key={dest.name} delay={i * 0.15}>
							<a
								href="https://wa.me/50769255088"
								target="_blank"
								rel="noopener noreferrer"
								className={`dest-card group relative block overflow-hidden rounded-[2rem] cursor-pointer ${
									dest.layout === 'tall'
										? 'h-[520px] lg:col-span-5 lg:row-span-2 lg:h-full'
										: dest.layout === 'wide'
											? 'h-[300px] lg:col-span-7 lg:h-full'
											: 'h-[260px] lg:col-span-3 lg:h-full'
								}`}
							>
								<img
									src={dest.image}
									alt={dest.name}
									className="w-full h-full object-cover"
								/>
								{/* Badge */}
								<div className="absolute top-5 left-5 z-10 bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
									{dest.badge}
								</div>
								{/* Price pill */}
								<div className="absolute top-5 right-5 z-10 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-lg font-black text-white backdrop-blur-md">
									{dest.price}
								</div>
								{/* Bottom content */}
								<div className="absolute bottom-0 left-0 right-0 z-10 p-7">
									<h3 className={`font-display leading-none text-white text-shadow-lg ${
										dest.layout === 'wide' ? 'mb-2 text-5xl' : 'mb-2 text-4xl'
									}`}>
										{dest.name}
									</h3>
									<p className={`text-[#efe7df] ${dest.layout === 'compact' ? 'mb-4 text-xs leading-5' : 'mb-5 text-sm leading-6'}`}>
										{dest.tagline}
									</p>
									<div className="flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors group-hover:text-[#f7d7b3]">
										<MapPin size={16} />
										{t.destinations.book}
										<ArrowRight
											size={14}
											className="group-hover:translate-x-1 transition-transform"
										/>
									</div>
								</div>
							</a>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── PRICES / ALL DESTINATIONS ────────────────────────────────────────────────
function PricesSection({ t }) {
	const destinations = [
		{ name: t.destinations.items[0].name, price: 65, icon: '🏝️', popular: true, note: t.prices.routeNotes.bocas },
		{ name: 'Boquete', price: 35, icon: '⛰️', popular: true, note: t.prices.routeNotes.boquete },
		{ name: t.destinations.items[3].name, price: 40, icon: '⛵', popular: false, note: t.prices.routeNotes.bocaChica },
		{ name: t.destinations.items[1].name, price: 40, icon: '🌋', popular: false, note: t.prices.routeNotes.valle },
		{ name: t.destinations.items[2].name, price: 55, icon: '🏙️', popular: false, note: t.prices.routeNotes.city },
		{ name: 'David', price: 30, icon: '🏘️', popular: false, note: t.prices.routeNotes.david },
	];

	return (
		<section id="prices" className="bg-[#18231f] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#f0b06d]">
						{t.prices.tag}
					</span>
					<h2 className="mt-3 font-display text-5xl text-white sm:text-6xl">
						{t.prices.title}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#c0cbc6]">
						{t.prices.subtitle}
					</p>
				</FadeIn>

				<FadeIn delay={0.15}>
					<div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
						<div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm">
							<p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f0b06d]">
								{t.prices.cardEyebrow}
							</p>
							<h3 className="mt-4 font-display text-5xl leading-none text-white">
								{t.prices.cardTitle}
							</h3>
							<p className="mt-4 max-w-md text-base leading-7 text-[#c0cbc6]">
								{t.prices.cardDesc}
							</p>

							<div className="mt-8 space-y-4">
								<div className="rounded-[1.6rem] border border-white/10 bg-black/10 p-5">
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0b06d]">
										{t.prices.shared}
									</p>
									<p className="mt-2 text-sm leading-6 text-[#d7dfdb]">
										{t.prices.note} <strong className="text-white">{t.prices.noteStrong}</strong> {t.prices.noteExtra}
									</p>
								</div>
								<div className="rounded-[1.6rem] border border-white/10 bg-black/10 p-5">
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f0b06d]">
										{t.prices.private}
									</p>
									<p className="mt-2 text-sm leading-6 text-[#d7dfdb]">
										{t.prices.privateDesc}
									</p>
								</div>
							</div>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							{destinations.map((d, i) => (
								<FadeIn key={d.name} delay={i * 0.06}>
									<a
										href="#contact"
										className="group block rounded-[1.8rem] border border-white/10 bg-[#101916] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f0b06d]/30"
									>
										<div className="flex items-start justify-between gap-4">
											<div className="flex items-start gap-4">
												<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0b06d]/10 text-2xl">
													{d.icon}
												</div>
												<div>
													<div className="flex items-center gap-2">
														<h4 className="text-xl font-bold text-white">{d.name}</h4>
														{d.popular && (
															<span className="rounded-full border border-brand-red/30 bg-brand-red/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffb1a8]">
																{t.prices.popular}
															</span>
														)}
													</div>
													<p className="mt-2 text-sm leading-6 text-[#afbbb5]">{d.note}</p>
												</div>
											</div>
											<div className="text-right">
												<div className="text-3xl font-black text-white">${d.price}</div>
												<div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0b06d]">
													{t.prices.viewRoute}
													<ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
												</div>
											</div>
										</div>
									</a>
								</FadeIn>
							))}
						</div>
					</div>
				</FadeIn>

				<FadeIn delay={0.3} className="mt-8 text-center">
					<a
						href="#contact"
						className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0b06d] px-8 py-4 text-base font-bold uppercase tracking-[0.18em] text-[#18231f] transition-transform duration-300 hover:-translate-y-0.5"
					>
						{t.prices.cta}
						<ArrowRight size={16} />
					</a>
				</FadeIn>
			</div>
		</section>
	);
}

// ─── VEHICLE SHOWCASE ─────────────────────────────────────────────────────────
function VehicleShowcase({ t }) {
	const features = [
		{ icon: <Shield size={20} />, text: t.vehicle.features[0] },
		{ icon: <Wifi size={20} />, text: t.vehicle.features[1] },
		{ icon: <Users size={20} />, text: t.vehicle.features[2] },
		{ icon: <Calendar size={20} />, text: t.vehicle.features[3] },
		{ icon: <CheckCircle size={20} />, text: t.vehicle.features[4] },
		{ icon: <Star size={20} />, text: t.vehicle.features[5] },
	];

	return (
		<section id="vehicle" className="overflow-hidden bg-[#fffaf4] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Text side */}
					<FadeIn direction="left">
						<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#a2552f]">
							{t.vehicle.tag}
						</span>
						<h2 className="mt-3 mb-5 font-display text-5xl text-[#18231f] sm:text-6xl">
							{t.vehicle.title1}
							<br />
							<span className="text-brand-red">{t.vehicle.title2}</span>{' '}
							&
							<br />
							{t.vehicle.title3}
						</h2>
						<p className="mb-8 text-lg leading-8 text-[#66726e]">
							{t.vehicle.desc}
						</p>
						<div className="grid grid-cols-2 gap-3 mb-8">
							{features.map(f => (
								<div
								key={f.text}
									className="flex items-center gap-3 text-[#4e5e58]"
								>
									<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#f0e5d9] text-[#b85e34]">
										{f.icon}
									</div>
									<span className="text-sm font-medium">
										{f.text}
									</span>
								</div>
							))}
						</div>
						<a
							href="#contact"
							className="btn-primary"
						>
							{t.vehicle.cta}
							<ArrowRight size={18} />
						</a>
					</FadeIn>

					{/* Images side */}
					<FadeIn direction="right">
						<div className="relative">
							{/* Main van image */}
							<div className="relative overflow-hidden rounded-[2rem] border border-[#eadfd4] shadow-[0_24px_70px_rgba(40,28,16,0.12)]">
								<img
									src="/assets/carro.png"
									alt="Méndez Transport Toyota HiAce"
									className="w-full object-cover h-72"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
								<div className="absolute bottom-5 left-5">
									<MendezLogo
										size={32}
										showText={true}
										dark={false}
									/>
								</div>
							</div>

							{/* Interior/rear image */}
							<div className="relative mt-4 overflow-hidden rounded-[1.6rem] border border-[#eadfd4] shadow-[0_18px_50px_rgba(40,28,16,0.10)]">
								<img
									src="/assets/f4bc0dee-5102-4474-9b16-911fcaeabfa7.jpg"
									alt="Van interior ready for tourists"
									className="w-full object-cover h-48"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 to-transparent" />
								<div className="absolute left-5 top-1/2 -translate-y-1/2">
									<p className="text-white font-bold text-lg">
										{t.vehicle.interior}
									</p>
									<p className="text-gray-300 text-sm">
										{t.vehicle.interiorSub}
									</p>
								</div>
							</div>

							{/* Floating badge */}
							<motion.div
								animate={{ rotate: [0, 5, 0, -5, 0] }}
								transition={{ duration: 5, repeat: Infinity }}
								className="absolute -top-4 -right-4 bg-brand-red text-white rounded-2xl px-4 py-3 shadow-xl text-center"
							>
								<div className="font-display text-3xl leading-none">
									7:40
								</div>
								<div className="text-xs font-semibold uppercase tracking-widest opacity-90">
									{t.vehicle.dailyAM}
								</div>
							</motion.div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

// ─── JOURNEY SECTION ──────────────────────────────────────────────────────────
function JourneySection({ t }) {
	const icons = [<MapPin size={20} />, <Calendar size={20} />, <Luggage size={20} />];

	return (
		<section id="journey" className="bg-[#fffaf4] py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<FadeIn className="mx-auto max-w-3xl text-center">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#a2552f]">
						{t.journey.tag}
					</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] sm:text-6xl">
						{t.journey.title}
					</h2>
					<p className="mt-4 text-lg leading-8 text-[#66726e]">
						{t.journey.subtitle}
					</p>
				</FadeIn>

				<div className="mt-12 grid gap-6 lg:grid-cols-3">
					{t.journey.items.map((item, index) => (
						<FadeIn key={item.title} delay={index * 0.1}>
							<div className="h-full rounded-[2rem] border border-[#ebdfd4] bg-white p-8 shadow-[0_18px_50px_rgba(46,34,14,0.06)]">
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5ede3] text-[#9b532e]">
									{icons[index]}
								</div>
								<div className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#b08968]">
									0{index + 1}
								</div>
								<h3 className="mt-3 text-2xl font-bold text-[#18231f]">{item.title}</h3>
								<p className="mt-3 text-base leading-7 text-[#66726e]">{item.desc}</p>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── BUSINESS CARD SECTION ────────────────────────────────────────────────────
function BusinessCardSection({ paidView = false, t }) {
	const firstPreviewImage = paidView
		? '/assets/mis-assets/Tarjeta_4k.png'
		: '/assets/Panama-City.jpg';
	const secondPreviewImage = paidView
		? '/assets/mis-assets/Banner_oscuro_4k.png'
		: '/assets/tips-valle-de-anton-panama.jpg';

	return (
		<section className="bg-[#f7efe4] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#a2552f]">
						{t.contact.tag}
					</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] sm:text-6xl">
						{t.contact.title}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#66726e]">
						{t.contact.subtitle}
					</p>
				</FadeIn>

				<div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
					{/* Business cards */}
					<FadeIn direction="left">
						<div className="space-y-6">
							<motion.div
								whileHover={{ scale: 1.02, rotate: -1 }}
								transition={{ type: 'spring', stiffness: 300 }}
								className="cursor-pointer overflow-hidden rounded-[1.8rem] border border-[#eadfd4] shadow-[0_24px_70px_rgba(40,28,16,0.10)]"
							>
								<img
									src={firstPreviewImage}
									alt="Méndez Transport preview"
									className="w-full object-cover"
								/>
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.02, rotate: 1 }}
								transition={{ type: 'spring', stiffness: 300 }}
								className="cursor-pointer overflow-hidden rounded-[1.8rem] border border-[#eadfd4] shadow-[0_24px_70px_rgba(40,28,16,0.10)]"
							>
								<img
									src={secondPreviewImage}
									alt="Méndez Transport preview"
									className="w-full object-cover"
								/>
							</motion.div>
						</div>
					</FadeIn>

					{/* QR + Contact info */}
					<FadeIn direction="right">
						<div className="rounded-[2rem] border border-[#eadfd4] bg-[#fffaf4] p-8 text-left shadow-[0_24px_70px_rgba(40,28,16,0.08)]">
							<div className="inline-flex rounded-full border border-[#decfbe] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a35d37]">
								{t.contact.tag}
							</div>
							<h3 className="mt-5 font-display text-5xl leading-none text-[#18231f]">
								{t.contact.title}
							</h3>
							<p className="mt-4 max-w-md text-base leading-7 text-[#66726e]">
								{t.contact.subtitle}
							</p>

							<div className="mt-8 grid gap-3">
								<a
									href="https://wa.me/50769255088"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center gap-3 rounded-full bg-[#18231f] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:-translate-y-0.5"
								>
									<WhatsAppIcon size={20} />
									<span>{t.contact.primary}</span>
								</a>
								<a
									href="tel:+50769255088"
									className="inline-flex items-center justify-center gap-3 rounded-full border border-[#18231f]/12 bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#18231f] transition-colors duration-300 hover:bg-[#f7f1ea]"
								>
									<Phone size={18} />
									<span>{t.contact.secondary}</span>
								</a>
							</div>

							<div className="mt-8 rounded-[1.6rem] border border-[#eadfd4] bg-white p-6">
								<p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a35d37]">
									{t.contact.supportTitle}
								</p>
								<div className="mt-4 space-y-3">
									{t.contact.supportItems.map((item) => (
										<div key={item} className="flex items-start gap-3 text-[#50605a]">
											<CheckCircle size={18} className="mt-1 text-brand-red" />
											<span className="text-sm leading-6">{item}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

function LandingPage({
	paidView = false,
	t,
	language,
	setLanguage,
}) {
	return (
		<div className="min-h-screen bg-[#fffaf4]">
			<Navbar
				t={t}
				language={language}
				setLanguage={setLanguage}
			/>
			<Hero paidView={paidView} t={t} />
			<Benefits t={t} />
			<FeaturedDestinations t={t} />
			<PricesSection t={t} />
			<JourneySection t={t} />
			<VehicleShowcase t={t} />
			<BusinessCardSection paidView={paidView} t={t} />
			<ContactSection t={t} />
			<Footer t={t} />
		</div>
	);
}

function PaidViewLogin({ onSuccess, language }) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const ACCESS_PASSWORD = 'mendez507';

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password === ACCESS_PASSWORD) {
			window.sessionStorage.setItem('paid_view_access', 'granted');
			onSuccess();
			return;
		}
		setError(true);
	};

	return (
		<div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
			<div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
				<h1 className="font-display text-3xl text-white mb-1">{language === 'es' ? 'Vista Pagada' : 'Paid View'}</h1>
				<p className="text-gray-400 text-sm mb-6">
					{language === 'es' ? 'Ingresa la contraseña para continuar.' : 'Enter password to continue.'}
				</p>
				<form onSubmit={handleSubmit} className="space-y-3">
					<input
						type="password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
							if (error) setError(false);
						}}
						placeholder={language === 'es' ? 'Contraseña' : 'Password'}
						autoFocus
						className={`w-full rounded-xl border px-4 py-3 text-center text-white bg-white/8 outline-none transition-colors text-sm font-medium tracking-widest ${
							error
								? 'border-red-500 bg-red-500/10'
								: 'border-white/15 focus:border-brand-red/60 focus:bg-white/10'
						}`}
					/>
					{error && (
						<p className="text-xs text-red-400 font-semibold">
							{language === 'es' ? 'Contraseña incorrecta.' : 'Wrong password.'}
						</p>
					)}
					<button
						type="submit"
						className="w-full rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 transition-colors"
					>
						{language === 'es' ? 'Entrar' : 'Enter'}
					</button>
				</form>
			</div>
		</div>
	);
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection({ t }) {
	return (
		<section
			id="contact"
			className="relative overflow-hidden bg-[#18231f] py-20"
		>
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
				<div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#0f7462]/15 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<FadeIn>
						<span className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0b06d]">
							{t.contact.tag2}
						</span>
						<h2 className="mt-3 font-display text-5xl text-white sm:text-6xl">
							{t.contact.title2}
							<span className="block text-brand-red">{t.contact.span2}</span>
						</h2>
						<p className="mt-5 max-w-xl text-lg leading-8 text-[#c0cbc6]">
							{t.contact.desc2}
						</p>
					</FadeIn>

					<FadeIn delay={0.2}>
						<div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
							<div className="grid gap-4 sm:grid-cols-2">
								<a
									href="https://wa.me/50769255088"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f2719] transition-transform duration-300 hover:-translate-y-0.5"
								>
									<WhatsAppIcon size={20} />
									{t.contact.primary}
								</a>
								<a
									href="tel:+50769255088"
									className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/8 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-white/12"
								>
									<Phone size={18} />
									{t.contact.secondary}
								</a>
							</div>

							<div className="mt-8 grid gap-4 sm:grid-cols-3">
								{t.contact.supportItems.map((item) => (
									<div
										key={item}
										className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5 text-sm leading-6 text-[#d7dfdb]"
									>
										<CheckCircle size={18} className="mb-3 text-[#f0b06d]" />
										{item}
									</div>
								))}
							</div>

							<div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-[#b5c0bb]">
								<a
									href="https://instagram.com/blady_507"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 transition-colors hover:text-white"
								>
									<Instagram size={18} />
									@blady_507
								</a>
								<a
									href="tel:+50769255088"
									className="flex items-center gap-2 transition-colors hover:text-white"
								>
									<Phone size={18} />
									+507 6925-5088
								</a>
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t }) {
	return (
		<footer className="bg-[#0d0d0d] border-t border-white/5 py-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<MendezLogo size={36} showText={true} dark={false} />

					<div className="text-center text-gray-500 text-sm">
						<p className="font-semibold text-gray-300 mb-1">
							{t.footer.tagline}
						</p>
						<div className="flex items-center justify-center gap-2">
							<Clock size={13} className="text-brand-red" />
							<span>{t.footer.daily}</span>
						</div>
					</div>

					<div className="flex items-center gap-4 text-gray-600 text-sm">
						<a
							href="https://instagram.com/blady_507"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-pink-400 transition-colors"
						>
							<Instagram size={18} />
						</a>
						<a
							href="https://wa.me/50769255088"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-[#25D366] transition-colors"
						>
							<MessageCircle size={18} />
						</a>
						<a
							href="https://wa.me/50768768467"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-[#25D366] transition-colors"
						>
							<Phone size={18} />
						</a>
						<a
							href="/mis-assets"
							className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 transition-colors hover:border-white/20 hover:text-gray-300"
						>
							{t.footer.clientAccess}
						</a>
					</div>
				</div>

				<div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-700 text-xs">
					© {new Date().getFullYear()} Méndez Transport · Panama · {t.footer.rights}
				</div>
			</div>
		</footer>
	);
}

// ─── APP MAIN ─────────────────────────────────────────────────────────────────
export default function App() {
	const [language, setLanguage] = useState(
		() => window.localStorage.getItem('lang_pref') || 'es'
	);
	const [paidViewAuthenticated, setPaidViewAuthenticated] = useState(() =>
		window.sessionStorage.getItem('paid_view_access') === 'granted'
	);
	const t = translations[language] ?? translations.es;

	useEffect(() => {
		window.localStorage.setItem('lang_pref', language);
	}, [language]);

	const bannerPreview = bannerConfigByRoute[window.location.pathname];
	if (bannerPreview) {
		return <BannerAssetPreview config={bannerPreview} />;
	}

	if (window.location.pathname === '/banners') {
		return <BannersTabbedPage />;
	}

	if (window.location.pathname === '/tarjeta-4k') {
		return <ShuttleBanner standalone imageSrc={PRIVATE_CARD_IMAGE} />;
	}

	if (window.location.pathname === '/banner-vertical') {
		return <VerticalBannerPreview />;
	}

	// Simple pathname-based routing — no router library needed
	if (window.location.pathname === '/flyer') {
		return <Flyer />;
	}

	if (window.location.pathname === '/banner') {
		return <PrintBanner />;
	}

	if (window.location.pathname === '/mis-assets') {
		return <AssetsPortal />;
	}

	if (window.location.pathname === '/vista-pagada') {
		if (!paidViewAuthenticated) {
			return (
				<PaidViewLogin
					language={language}
					onSuccess={() => setPaidViewAuthenticated(true)}
				/>
			);
		}
		return (
			<LandingPage
				paidView={true}
				t={t}
				language={language}
				setLanguage={setLanguage}
			/>
		);
	}

	if (window.location.pathname === '/vista-muestra') {
		return (
			<LandingPage
				paidView={false}
				t={t}
				language={language}
				setLanguage={setLanguage}
			/>
		);
	}

	return (
		<LandingPage
			paidView={false}
			t={t}
			language={language}
			setLanguage={setLanguage}
		/>
	);
}
