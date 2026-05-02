import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, X } from 'lucide-react';
import FadeIn from '../../shared/FadeIn';
import { usePrices } from '../../lib/usePrices';

export default function FeaturedDestinations({ t }) {
	const prices = usePrices();
	const [lightbox, setLightbox] = useState(null);

	const featured = [
		{
			name: t.destinations.items[0].name,
			tagline: t.destinations.items[0].tagline,
			price: `$${prices.bocasDelToro}`,
			image: '/tourism/destinations/bocas-3.jpg',
			badge: t.destinations.items[0].badge,
			icon: '🏝️',
		},
		{
			name: t.destinations.items[1].name,
			tagline: t.destinations.items[1].tagline,
			price: `$${prices.elValle}`,
			image: '/tourism/destinations/valle-de-anton.jpg',
			badge: t.destinations.items[1].badge,
			icon: '🌋',
		},
		{
			name: t.destinations.items[2].name,
			tagline: t.destinations.items[2].tagline,
			price: `$${prices.panamaCity}`,
			image: '/tourism/destinations/panama-city-skyline.jpg',
			badge: t.destinations.items[2].badge,
			icon: '🏙️',
		},
		{
			name: t.destinations.items[3].name,
			tagline: t.destinations.items[3].tagline,
			price: `$${prices.playaVenado}`,
			image: '/tourism/destinations/bocas-1.jpg',
			badge: t.destinations.items[3].badge,
			icon: '⛵',
		},
	];

	const [hero, ...secondary] = featured;

	const containerVariants = {
		hidden: {},
		visible: {
			transition: { staggerChildren: 0.12 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.97 },
		visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
	};

	return (
		<section id="destinations" className="bg-[#f4ecdf] dark:bg-[#0d150f] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#0f7462] dark:text-[#5fd0c1]">
						{t.destinations.tag}
					</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] dark:text-[#d4e0d7] sm:text-6xl">
						{t.destinations.title}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#66726e] dark:text-[#9eb0a8]">
						{t.destinations.subtitle}
					</p>
				</FadeIn>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start"
				>
					<motion.div variants={itemVariants}>
						<DestinationCard
							destination={hero}
							t={t}
							large
							onPreview={() => setLightbox(hero)}
						/>
					</motion.div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
						{secondary.map((dest) => (
							<motion.div key={dest.name} variants={itemVariants}>
								<DestinationCard
									destination={dest}
									t={t}
									onPreview={() => setLightbox(dest)}
								/>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			<AnimatePresence>
				{lightbox && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setLightbox(null)}
						className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
					>
						<motion.div
							initial={{ scale: 0.92, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.92, opacity: 0 }}
							transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							onClick={(e) => e.stopPropagation()}
							className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white dark:bg-[#101814]"
						>
							<button
								onClick={() => setLightbox(null)}
								className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#18231f] shadow-lg transition-transform hover:scale-105"
								aria-label="Close"
							>
								<X size={20} />
							</button>
							<img
								src={lightbox.image}
								alt={lightbox.name}
								className="h-[60vh] w-full object-cover"
							/>
							<div className="p-8">
								<div className="flex items-center gap-3">
									<span className="text-3xl">{lightbox.icon}</span>
									<h3 className="font-display text-4xl text-[#18231f] dark:text-white">{lightbox.name}</h3>
								</div>
								<p className="mt-3 text-[#66726e] dark:text-[#9eb0a8]">{lightbox.tagline}</p>
								<div className="mt-5 flex items-center justify-between">
									<div className="text-3xl font-black text-[#0f7462] dark:text-[#5fd0c1]">{lightbox.price}</div>
									<a
										href="https://wa.me/50769255088"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-full bg-[#18231f] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white"
									>
										{t.destinations.book}
										<ArrowRight size={14} />
									</a>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}

function DestinationCard({ destination, t, large = false, onPreview }) {
	return (
		<motion.button
			type="button"
			onClick={onPreview}
			whileHover={{ y: -6 }}
			transition={{ type: 'spring', stiffness: 280, damping: 22 }}
			className={`dest-card group relative block w-full overflow-hidden rounded-[2.2rem] cursor-pointer text-left ${
				large ? 'h-[520px]' : 'h-[240px]'
			}`}
		>
			<img
				src={destination.image}
				alt={destination.name}
				className="h-full w-full object-cover"
			/>
			<div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-brand-red px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
				<span>{destination.icon}</span>
				{destination.badge}
			</div>
			<div className="absolute top-6 right-6 z-10 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-base font-black text-white backdrop-blur-md sm:text-lg">
				{destination.price}
			</div>
			<div className="absolute bottom-0 left-0 right-0 z-10 p-7">
				<h3 className={`mb-2 font-display ${large ? 'text-6xl leading-[0.9]' : 'text-4xl'} text-white text-shadow-lg`}>
					{destination.name}
				</h3>
				<p className={`mb-5 max-w-md text-${large ? 'base' : 'sm'} leading-7 text-[#efe7df]`}>
					{destination.tagline}
				</p>
				<div className="flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors group-hover:text-[#f7d7b3]">
					<MapPin size={16} />
					{t.destinations.book}
					<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
				</div>
			</div>
		</motion.button>
	);
}
