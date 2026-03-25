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
	Globe,
	ArrowRight,
	Menu,
	X,
	Calendar,
	Navigation,
	Wifi,
	Award,
	FileDown,
	Lock,
} from 'lucide-react';
import Flyer from './components/Flyer';
import PrintBanner from './components/PrintBanner';
import ShuttleBanner, { PRIVATE_CARD_IMAGE } from './components/ShuttleBanner';
import VerticalBannerPreview from './components/VerticalBannerPreview';
import BannerAssetPreview from './components/BannerAssetPreview';
import BannersTabbedPage from './components/BannersTabbedPage';
import AssetsPortal from './components/AssetsPortal';
import { bannerConfigByRoute, bannerConfigs } from './components/bannerConfigs';

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
					Export QR PNG
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
function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const links = [
		{ label: 'Destinations', href: '#destinations' },
		{ label: 'Prices', href: '#prices' },
		{ label: 'Vehicle', href: '#vehicle' },
		{ label: 'Contact', href: '#contact' },
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
						? 'border-white/10 bg-brand-black/82 backdrop-blur-md shadow-2xl'
						: 'border-white/10 bg-brand-black/30 backdrop-blur-md'
				}`}
			>
				<MendezLogo size={28} showText={true} dark={false} />

				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-6">
					{links.map(link => (
						<a
							key={link.href}
							href={link.href}
							className="text-gray-300/85 hover:text-white text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200 relative group"
						>
							{link.label}
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300" />
						</a>
					))}
					<a
						href="https://wa.me/50769255088"
						target="_blank"
						rel="noopener noreferrer"
						className="btn-whatsapp !py-2 !px-4 !text-xs"
					>
						<WhatsAppIcon size={16} />
						Book Now
					</a>
					<a
						href="/mis-assets"
						className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
					>
						Mis Assets
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
						className="md:hidden bg-brand-black/98 border-t border-brand-red/20"
					>
						<div className="px-4 py-4 flex flex-col gap-4">
							{links.map(link => (
								<a
									key={link.href}
									href={link.href}
									onClick={() => setMenuOpen(false)}
									className="text-gray-300 hover:text-brand-red text-base font-medium py-2 border-b border-white/5 transition-colors"
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
								Book on WhatsApp
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ paidView = false }) {
	if (paidView) {
		return <ShuttleBanner imageSrc={PRIVATE_CARD_IMAGE} />;
	}

	return <ShuttleBanner />;
}

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
function Benefits() {
	const benefits = [
		{
			icon: <Shield size={28} />,
			title: 'Safe & Reliable',
			desc: "Professional drivers with years of experience on Panama's roads.",
			color: 'from-blue-500 to-blue-700',
		},
		{
			icon: <Users size={28} />,
			title: 'Shared or Private',
			desc: 'Choose between shared shuttle rates or full private transport.',
			color: 'from-brand-red to-brand-red-dark',
		},
		{
			icon: <Zap size={28} />,
			title: 'Easy WhatsApp Booking',
			desc: 'Reserve your seat in seconds — no apps, no credit card required.',
			color: 'from-green-500 to-green-700',
		},
		{
			icon: <Award size={28} />,
			title: 'Tourist-Friendly',
			desc: 'English-speaking service tailored for international travelers.',
			color: 'from-amber-500 to-amber-700',
		},
	];

	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-brand-red text-sm font-bold uppercase tracking-widest">
						Why Choose Us
					</span>
					<h2 className="font-display text-5xl text-brand-black mt-2">
						TRAVEL THE WAY YOU DESERVE
					</h2>
					<p className="text-gray-500 mt-3 max-w-xl mx-auto">
						Méndez Transport delivers premium shuttle experiences
						across Panama's most beautiful destinations.
					</p>
				</FadeIn>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{benefits.map((b, i) => (
						<FadeIn key={b.title} delay={i * 0.12} direction="up">
							<div className="card-hover group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-red/20 text-center">
								<div
									className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
								>
									{b.icon}
								</div>
								<h3 className="font-bold text-brand-black text-lg mb-2">
									{b.title}
								</h3>
								<p className="text-gray-500 text-sm leading-relaxed">
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
function FeaturedDestinations() {
	const featured = [
		{
			name: 'Bocas del Toro',
			tagline: 'Turquoise waters & island paradise',
			price: '$65',
			image: '/assets/Bocas-del-toro-1.jpg',
			badge: 'Most Popular',
		},
		{
			name: 'El Valle de Antón',
			tagline: 'Volcanic crater, waterfalls & nature',
			price: '$40',
			image: '/assets/tips-valle-de-anton-panama.jpg',
			badge: 'Nature Escape',
		},
		{
			name: 'Panama City',
			tagline: 'Skyline, canal & urban culture',
			price: '$55',
			image: '/assets/Panama-City.jpg',
			badge: 'City Vibes',
		},
	];

	return (
		<section id="destinations" className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-brand-red text-sm font-bold uppercase tracking-widest">
						Where We Go
					</span>
					<h2 className="font-display text-5xl text-brand-black mt-2">
						FEATURED DESTINATIONS
					</h2>
					<p className="text-gray-500 mt-3 max-w-xl mx-auto">
						Hand-picked destinations for the ultimate Panama
						experience.
					</p>
				</FadeIn>

				<div className="grid md:grid-cols-3 gap-6">
					{featured.map((dest, i) => (
						<FadeIn key={dest.name} delay={i * 0.15}>
							<a
								href="https://wa.me/50769255088"
								target="_blank"
								rel="noopener noreferrer"
								className="dest-card block rounded-3xl overflow-hidden h-[480px] relative cursor-pointer group"
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
								<div className="absolute top-5 right-5 z-10 bg-white/15 backdrop-blur-md border border-white/30 text-white text-lg font-black px-4 py-2 rounded-full">
									{dest.price}
								</div>
								{/* Bottom content */}
								<div className="absolute bottom-0 left-0 right-0 z-10 p-7">
									<h3 className="font-display text-4xl text-white text-shadow-lg leading-none mb-1">
										{dest.name}
									</h3>
									<p className="text-gray-200 text-sm mb-5">
										{dest.tagline}
									</p>
									<div className="flex items-center gap-2 text-white/90 text-sm font-semibold group-hover:text-[#25D366] transition-colors">
										<WhatsAppIcon size={16} />
										Book this route
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
function PricesSection() {
	const destinations = [
		{ name: 'Panama City', price: 55, icon: '🏙️', popular: false },
		{ name: 'Boquete', price: 35, icon: '⛰️', popular: true },
		{ name: 'David', price: 30, icon: '🏘️', popular: false },
		{ name: 'El Valle de Antón', price: 40, icon: '🌋', popular: false },
		{ name: 'Playa Venado', price: 40, icon: '🏖️', popular: false },
		{ name: 'Bocas del Toro', price: 65, icon: '🏝️', popular: true },
	];

	return (
		<section id="prices" className="py-20 gradient-dark">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-brand-red text-sm font-bold uppercase tracking-widest">
						Transparent Pricing
					</span>
					<h2 className="font-display text-5xl text-white mt-2">
						DESTINATIONS & PRICES
					</h2>
					<p className="text-gray-400 mt-3 max-w-xl mx-auto">
						Flat rates, no hidden fees. Daily departures at 7:40 AM.
					</p>
				</FadeIn>

				<FadeIn delay={0.15}>
					<div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
						{/* Header */}
						<div className="bg-brand-red px-8 py-5 flex justify-between items-center">
							<div className="flex items-center gap-3">
								<Navigation size={20} className="text-white" />
								<span className="text-white font-bold uppercase tracking-widest text-sm">
									Destination
								</span>
							</div>
							<span className="text-white font-bold uppercase tracking-widest text-sm">
								Price / Person
							</span>
						</div>

						{/* Rows */}
						<div className="bg-brand-black divide-y divide-white/5">
							{destinations.map((d, i) => (
								<motion.a
									key={d.name}
									href="https://wa.me/50769255088"
									target="_blank"
									rel="noopener noreferrer"
									className="price-row flex items-center justify-between px-8 py-5 group cursor-pointer"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.07 }}
								>
									<div className="flex items-center gap-4">
										<span className="text-2xl">
											{d.icon}
										</span>
										<div>
											<span className="text-white font-semibold text-lg group-hover:text-brand-red transition-colors">
												{d.name}
											</span>
											{d.popular && (
												<span className="ml-3 text-xs bg-brand-red/20 text-brand-red border border-brand-red/30 px-2 py-0.5 rounded-full font-semibold">
													Popular
												</span>
											)}
										</div>
									</div>
									<div className="flex items-center gap-4">
										<span className="text-white font-black text-2xl">
											${d.price}
										</span>
										<div className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
											<WhatsAppIcon size={14} />
										</div>
									</div>
								</motion.a>
							))}
						</div>

						{/* Footer note */}
						<div className="bg-white/5 px-8 py-4 flex items-center gap-3">
							<Clock size={16} className="text-brand-red" />
							<span className="text-gray-400 text-sm">
								All routes depart daily at{' '}
								<strong className="text-white">7:40 AM</strong>{' '}
								· Private transport available upon request
							</span>
						</div>
					</div>
				</FadeIn>

				<FadeIn delay={0.3} className="mt-8 text-center">
					<a
						href="https://wa.me/50769255088"
						target="_blank"
						rel="noopener noreferrer"
						className="btn-whatsapp text-lg mx-auto"
					>
						<WhatsAppIcon size={22} />
						Reserve Your Seat Now
					</a>
				</FadeIn>
			</div>
		</section>
	);
}

// ─── VEHICLE SHOWCASE ─────────────────────────────────────────────────────────
function VehicleShowcase() {
	const features = [
		{ icon: <Shield size={20} />, text: 'Fully insured & licensed' },
		{ icon: <Wifi size={20} />, text: 'Air conditioning' },
		{ icon: <Users size={20} />, text: 'Up to 14 passengers' },
		{ icon: <Calendar size={20} />, text: 'Daily availability' },
		{ icon: <CheckCircle size={20} />, text: 'Luggage space included' },
		{ icon: <Star size={20} />, text: 'Professional drivers' },
	];

	return (
		<section id="vehicle" className="py-20 bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Text side */}
					<FadeIn direction="left">
						<span className="text-brand-red text-sm font-bold uppercase tracking-widest">
							Our Vehicle
						</span>
						<h2 className="font-display text-5xl text-brand-black mt-2 mb-5">
							TRAVEL IN
							<br />
							<span className="text-brand-red">COMFORT</span> &
							<br />
							CONFIDENCE
						</h2>
						<p className="text-gray-600 mb-8 leading-relaxed text-lg">
							Our Toyota HiAce "Turismo" minibus is equipped for
							the road and ready for tourists. Spacious,
							air-conditioned and maintained to the highest
							standard — your journey is in safe hands.
						</p>
						<div className="grid grid-cols-2 gap-3 mb-8">
							{features.map(f => (
								<div
									key={f.text}
									className="flex items-center gap-3 text-gray-700"
								>
									<div className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red flex-shrink-0">
										{f.icon}
									</div>
									<span className="text-sm font-medium">
										{f.text}
									</span>
								</div>
							))}
						</div>
						<a
							href="https://wa.me/50769255088"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-primary"
						>
							<WhatsAppIcon size={20} />
							Book Your Seat
						</a>
					</FadeIn>

					{/* Images side */}
					<FadeIn direction="right">
						<div className="relative">
							{/* Main van image */}
							<div className="relative rounded-3xl overflow-hidden shadow-2xl">
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
							<div className="mt-4 rounded-2xl overflow-hidden shadow-xl relative">
								<img
									src="/assets/f4bc0dee-5102-4474-9b16-911fcaeabfa7.jpg"
									alt="Van interior ready for tourists"
									className="w-full object-cover h-48"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 to-transparent" />
								<div className="absolute left-5 top-1/2 -translate-y-1/2">
									<p className="text-white font-bold text-lg">
										Spacious Interior
									</p>
									<p className="text-gray-300 text-sm">
										Comfortable seating for every journey
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
									Daily AM
								</div>
							</motion.div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

// ─── BANNER SECTION ───────────────────────────────────────────────────────────
function BannerSection() {
	return (
		<section className="py-16 gradient-dark overflow-hidden relative">
			{/* Background Bocas image */}
			<div className="absolute inset-0">
				<img
					src="/assets/Bocas-del-toro-3.jpg"
					alt=""
					className="w-full h-full object-cover opacity-10"
				/>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-3 gap-8 items-center">
					{/* Left - Main CTA */}
					<FadeIn direction="left" className="lg:col-span-2">
						<div className="glass rounded-3xl p-10">
							<h2 className="font-display text-6xl text-white mb-4 leading-none">
								YOUR PANAMA
								<br />
								<span className="text-brand-red">
									ADVENTURE
								</span>
								<br />
								STARTS HERE
							</h2>
							<p className="text-gray-300 text-lg mb-8 max-w-lg">
								From the lush highlands of Boquete to the
								crystal lagoons of Bocas del Toro — Méndez
								Transport takes you there in comfort and style.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<a
									href="https://wa.me/50769255088"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-whatsapp text-lg"
								>
									<WhatsAppIcon size={22} />
									+507 6925-5088
								</a>
								<a
									href="https://wa.me/50768768467"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-whatsapp text-lg"
								>
									<WhatsAppIcon size={22} />
									+507 6876-8467
								</a>
							</div>
						</div>
					</FadeIn>

					{/* Right - Logo mascot */}
					<FadeIn direction="right">
						<div className="relative mx-auto max-w-xs flex items-center justify-center">
							<div className="absolute inset-0 bg-brand-red/20 blur-3xl rounded-full" />
							<img
								src="/assets/mascotas.png"
								alt="Méndez Transport"
								className="relative w-full drop-shadow-2xl"
							/>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

// ─── BUSINESS CARD SECTION ────────────────────────────────────────────────────
function BusinessCardSection({ paidView = false }) {
	const firstPreviewImage = paidView
		? '/assets/mis-assets/Tarjeta_4k.png'
		: '/assets/Panama-City.jpg';
	const secondPreviewImage = paidView
		? '/assets/mis-assets/Banner_oscuro_4k.png'
		: '/assets/tips-valle-de-anton-panama.jpg';

	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-brand-red text-sm font-bold uppercase tracking-widest">
						Always With You
					</span>
					<h2 className="font-display text-5xl text-brand-black mt-2">
						SAVE OUR CONTACT
					</h2>
					<p className="text-gray-500 mt-3 max-w-xl mx-auto">
						Scan the QR code to open WhatsApp instantly or save our
						info for your trip.
					</p>
				</FadeIn>

				<div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
					{/* Business cards */}
					<FadeIn direction="left">
						<div className="space-y-6">
							<motion.div
								whileHover={{ scale: 1.02, rotate: -1 }}
								transition={{ type: 'spring', stiffness: 300 }}
								className="rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
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
								className="rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
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
						<div className="bg-brand-black rounded-3xl p-8 text-center">
							<MendezLogo
								size={48}
								showText={true}
								dark={false}
							/>
							<div className="mt-8 flex justify-center">
								<WhatsAppQR
									url="https://wa.me/50769255088"
									size={180}
									label="Scan to open WhatsApp"
									showExportButton={true}
									pdfTitle="Mendez Transport WhatsApp QR"
								/>
							</div>

							<div className="mt-8 space-y-3">
								<a
									href="https://wa.me/50769255088"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl py-3 px-5 transition-colors group"
								>
									<WhatsAppIcon size={20} />
									<span className="text-white font-semibold">
										+507 6925-5088
									</span>
								</a>
								<a
									href="https://wa.me/50768768467"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl py-3 px-5 transition-colors group"
								>
									<WhatsAppIcon size={20} />
									<span className="text-white font-semibold">
										+507 6876-8467
									</span>
								</a>
							</div>

							<div className="mt-4 flex items-center justify-center gap-4 pt-4 border-t border-white/10">
								<a
									href="https://instagram.com/blady_507"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors text-sm"
								>
									<Instagram size={16} />
									@blady_507
								</a>
								<span className="text-gray-700">·</span>
								<a
									href="/banners"
									className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
								>
									<Globe size={16} />
									Banners
								</a>
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</section>
	);
}

function LandingPage({ paidView = false }) {
	return (
		<div className="min-h-screen">
			<Navbar />
			<Hero paidView={paidView} />
			<Benefits />
			<FeaturedDestinations />
			<PricesSection />
			<VehicleShowcase />
			<BannerSection />
			<BusinessCardSection paidView={paidView} />
			<ContactSection />
			<Footer />
		</div>
	);
}

function PaidViewLogin({ onSuccess }) {
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
				<h1 className="font-display text-3xl text-white mb-1">
					Vista Pagada
				</h1>
				<p className="text-gray-400 text-sm mb-6">
					Ingresa la contraseña para continuar.
				</p>
				<form onSubmit={handleSubmit} className="space-y-3">
					<input
						type="password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
							if (error) setError(false);
						}}
						placeholder="Contraseña"
						autoFocus
						className={`w-full rounded-xl border px-4 py-3 text-center text-white bg-white/8 outline-none transition-colors text-sm font-medium tracking-widest ${
							error
								? 'border-red-500 bg-red-500/10'
								: 'border-white/15 focus:border-brand-red/60 focus:bg-white/10'
						}`}
					/>
					{error && (
						<p className="text-xs text-red-400 font-semibold">
							Contraseña incorrecta.
						</p>
					)}
					<button
						type="submit"
						className="w-full rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 transition-colors"
					>
						Entrar
					</button>
				</form>
			</div>
		</div>
	);
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection() {
	return (
		<section
			id="contact"
			className="py-20 bg-brand-black relative overflow-hidden"
		>
			{/* Background decoration */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
			</div>

			<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<FadeIn>
					<span className="text-brand-red text-sm font-bold uppercase tracking-widest">
						Get In Touch
					</span>
					<h2 className="font-display text-6xl text-white mt-2 mb-4">
						RESERVE YOUR
						<br />
						<span className="text-brand-red">SEAT TODAY</span>
					</h2>
					<p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
						Don't miss your departure. Contact us on WhatsApp right
						now and confirm your spot for tomorrow's 7:40 AM
						shuttle.
					</p>
				</FadeIn>

				{/* Large QR */}
				<FadeIn delay={0.2} className="flex justify-center mb-12">
					<div className="relative">
						<div className="absolute inset-0 bg-[#25D366]/10 blur-3xl rounded-full scale-150" />
						<WhatsAppQR
							url="https://wa.me/50769255088"
							size={220}
							label="Scan · Tap · Book"
							showExportButton={true}
							pdfTitle="Mendez Transport Booking QR"
						/>
					</div>
				</FadeIn>

				{/* Two WhatsApp buttons */}
				<FadeIn delay={0.3}>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<a
							href="https://wa.me/50769255088"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-whatsapp text-xl py-5 px-10"
						>
							<WhatsAppIcon size={26} />
							+507 6925-5088
						</a>
						<a
							href="https://wa.me/50768768467"
							target="_blank"
							rel="noopener noreferrer"
							className="btn-whatsapp text-xl py-5 px-10"
						>
							<WhatsAppIcon size={26} />
							+507 6876-8467
						</a>
					</div>
				</FadeIn>

				{/* Social links */}
				<FadeIn delay={0.4}>
					<div className="flex items-center justify-center gap-6 text-gray-500">
						<a
							href="https://instagram.com/blady_507"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 hover:text-pink-400 transition-colors font-medium"
						>
							<Instagram size={20} />
							@blady_507
						</a>
						<span>·</span>
						<a
							href="/banners"
							className="flex items-center gap-2 hover:text-blue-400 transition-colors font-medium"
						>
							<Globe size={20} />
							Banners
						</a>
						<span>·</span>
						<a
							href="tel:+50769255088"
							className="flex items-center gap-2 hover:text-brand-red transition-colors font-medium"
						>
							<Phone size={20} />
							Call Us
						</a>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
	return (
		<footer className="bg-[#0d0d0d] border-t border-white/5 py-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<MendezLogo size={36} showText={true} dark={false} />

					<div className="text-center text-gray-500 text-sm">
						<p className="font-semibold text-gray-300 mb-1">
							Shared or Private Transportation
						</p>
						<div className="flex items-center justify-center gap-2">
							<Clock size={13} className="text-brand-red" />
							<span>Daily Departure 7:40 AM</span>
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
					</div>
				</div>

				<div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-700 text-xs">
					© {new Date().getFullYear()} Méndez Transport · Panama · All
					rights reserved
				</div>
			</div>
		</footer>
	);
}

// ─── APP MAIN ─────────────────────────────────────────────────────────────────
export default function App() {
	const [paidViewAuthenticated, setPaidViewAuthenticated] = useState(() =>
		window.sessionStorage.getItem('paid_view_access') === 'granted'
	);
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
					onSuccess={() => setPaidViewAuthenticated(true)}
				/>
			);
		}
		return <LandingPage paidView={true} />;
	}

	if (window.location.pathname === '/vista-muestra') {
		return <LandingPage paidView={false} />;
	}

	return <LandingPage paidView={false} />;
}
