import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Sun, MapPin, Star } from 'lucide-react';
import FadeIn from '../../shared/FadeIn';

function CountUp({ to = 0, duration = 1800, suffix = '' }) {
	const [value, setValue] = useState(0);
	const ref = useRef(null);
	const started = useRef(false);

	useEffect(() => {
		const obs = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !started.current) {
				started.current = true;
				const start = performance.now();
				const tick = (now) => {
					const elapsed = now - start;
					const t = Math.min(1, elapsed / duration);
					const eased = 1 - Math.pow(1 - t, 3);
					setValue(Math.round(eased * to));
					if (t < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			}
		}, { threshold: 0.4 });
		if (ref.current) obs.observe(ref.current);
		return () => obs.disconnect();
	}, [to, duration]);

	return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

function PalmSilhouette({ className = '', flipped = false }) {
	return (
		<svg
			viewBox="0 0 200 280"
			className={className}
			style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
			fill="currentColor"
		>
			<path d="M98 280 Q96 200 100 130 Q102 90 105 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
			<path d="M100 50 Q60 30 20 35 Q55 38 90 55 Q70 35 100 50 Z" />
			<path d="M100 55 Q150 25 195 45 Q160 38 110 60 Q150 35 100 55 Z" />
			<path d="M100 60 Q70 80 25 110 Q70 90 105 70 Q80 90 100 60 Z" />
			<path d="M100 60 Q140 85 185 105 Q140 90 105 70 Q140 90 100 60 Z" />
			<path d="M100 50 Q90 10 60 0 Q90 15 100 55 Q95 20 100 50 Z" />
			<path d="M100 50 Q115 15 145 5 Q115 18 105 55 Q115 18 100 50 Z" />
		</svg>
	);
}

export default function Hero({ t }) {
	const heroRef = useRef(null);
	const { scrollY } = useScroll();
	const yBack = useTransform(scrollY, [0, 600], [0, 120]);
	const yMid = useTransform(scrollY, [0, 600], [0, 60]);
	const yFront = useTransform(scrollY, [0, 600], [0, -40]);
	const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

	return (
		<section
			ref={heroRef}
			className="relative isolate overflow-hidden pt-24 sm:pt-28"
			style={{ minHeight: '92vh' }}
		>
			{/* Layer 1: tropical sky gradient */}
			<motion.div
				style={{ y: yBack }}
				className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_top,#cdf3ee_0%,#f6e6cf_45%,#fff7eb_100%)] dark:bg-[radial-gradient(ellipse_at_top,#0e3a36_0%,#0a1e1a_55%,#070f0d_100%)]"
			/>
			{/* Layer 2: caribbean photo with overlay */}
			<motion.div style={{ y: yMid, opacity }} className="absolute inset-0 -z-20">
				<div
					className="absolute inset-0 bg-center bg-cover"
					style={{ backgroundImage: 'url(/tourism/destinations/bocas-2.jpg)' }}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-[#fff7eb]/30 via-[#fff7eb]/55 to-[#fff7eb] dark:from-[#070f0d]/35 dark:via-[#070f0d]/55 dark:to-[#070f0d]" />
			</motion.div>
			{/* Layer 3: subtle blobs */}
			<motion.div style={{ y: yMid }} className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -top-10 right-[8%] h-72 w-72 rounded-full bg-[#00b4a6]/20 blur-3xl" />
				<div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-[#f4a261]/25 blur-3xl" />
				<div className="absolute bottom-10 right-1/4 h-60 w-60 rounded-full bg-[#e76f51]/15 blur-3xl" />
			</motion.div>
			{/* Layer 4: foreground palms */}
			<motion.div
				style={{ y: yFront }}
				className="pointer-events-none absolute -bottom-6 left-0 right-0 -z-10 flex justify-between"
			>
				<PalmSilhouette className="h-56 w-40 text-[#1f5c52]/45 sm:h-72 sm:w-52 dark:text-[#0d3a34]/70" />
				<PalmSilhouette flipped className="h-56 w-40 text-[#1f5c52]/35 sm:h-80 sm:w-56 dark:text-[#0d3a34]/60" />
			</motion.div>

			<div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-8 lg:pb-32">
				<FadeIn className="max-w-2xl">
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className="inline-flex items-center gap-2 rounded-full border border-[#cfeae5] bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f7462] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-[#5fd0c1]"
					>
						<Compass size={14} />
						{t.hero.eyebrow}
					</motion.div>

					<h1 className="mt-6 max-w-xl font-display text-6xl leading-[0.92] text-[#0f1e1a] dark:text-[#e7efe9] sm:text-7xl lg:text-[5.6rem]">
						{t.hero.title1}
						<span className="block bg-gradient-to-r from-[#e76f51] via-[#e31e24] to-[#b71519] bg-clip-text text-transparent">
							{t.hero.title2}
						</span>
					</h1>

					<p className="mt-6 max-w-xl text-lg leading-8 text-[#3a4f49] dark:text-[#9eb0a8]">
						{t.hero.subtitle}
					</p>

					{/* Floating "salida 7:40 AM" pill */}
					<motion.div
						animate={{ y: [0, -6, 0] }}
						transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
						className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#f4a261]/40 bg-white px-5 py-3 shadow-[0_18px_45px_rgba(231,111,81,0.18)] dark:border-white/10 dark:bg-white/5"
					>
						<span className="relative flex h-3 w-3">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e76f51] opacity-60" />
							<span className="relative inline-flex h-3 w-3 rounded-full bg-[#e76f51]" />
						</span>
						<span className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f1e1a] dark:text-[#e7efe9]">
							{t.hero.dailyDeparture}
						</span>
					</motion.div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<a
							href="#contact"
							className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0f1e1a] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,30,26,0.35)]"
						>
							{t.hero.primary}
							<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</a>
						<a
							href="#destinations"
							className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f1e1a]/15 bg-white/80 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f1e1a] backdrop-blur transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
						>
							{t.hero.secondary}
						</a>
					</div>

					{/* Stats counter strip */}
					<div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
						{[
							{ to: 4500, suffix: '+', label: t.hero.stats.travelers },
							{ to: 7, suffix: '', label: t.hero.stats.routes },
							{ to: 5, suffix: '★', label: t.hero.stats.rating },
						].map((s, i) => (
							<motion.div
								key={s.label}
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
								className="rounded-2xl border border-white/60 bg-white/70 p-4 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
							>
								<div className="font-display text-3xl text-[#0f1e1a] dark:text-white sm:text-4xl">
									<CountUp to={s.to} suffix={s.suffix} />
								</div>
								<div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5b6762] dark:text-[#8fa495]">
									{s.label}
								</div>
							</motion.div>
						))}
					</div>
				</FadeIn>

				<FadeIn direction="right" delay={0.15}>
					<div className="relative">
						<motion.div
							animate={{ rotate: [0, 1.4, 0, -1.4, 0] }}
							transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
							className="relative overflow-hidden rounded-[2.4rem] border border-white/60 bg-white p-3 shadow-[0_28px_80px_rgba(15,30,26,0.18)] dark:border-white/10 dark:bg-[#101814]"
						>
							<img
								src="/tourism/destinations/panama-city-skyline.jpg"
								alt="Panamá"
								className="h-[360px] w-full rounded-[1.8rem] object-cover sm:h-[440px]"
							/>
							<div className="absolute inset-3 rounded-[1.8rem] bg-gradient-to-t from-[#0f1e1a]/65 via-transparent to-transparent" />
							<div className="absolute bottom-7 left-7 right-7 text-white">
								<div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur">
									<MapPin size={12} />
									{t.hero.cardLocation}
								</div>
								<p className="mt-3 font-display text-3xl leading-tight">
									{t.hero.cardTitle}
								</p>
								<p className="mt-2 text-sm leading-6 text-white/85">{t.hero.cardNote}</p>
							</div>
						</motion.div>

						{/* Floating sun badge */}
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
							className="absolute -top-6 -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f4a261] text-white shadow-xl sm:-top-8 sm:-left-8 sm:h-28 sm:w-28"
						>
							<Sun size={36} />
						</motion.div>

						{/* Rating chip */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.7, duration: 0.6 }}
							className="absolute -bottom-5 -right-3 flex items-center gap-3 rounded-2xl border border-white/60 bg-white px-4 py-3 shadow-xl dark:border-white/10 dark:bg-[#101814]"
						>
							<div className="flex">
								{[0, 1, 2, 3, 4].map((i) => (
									<Star key={i} size={14} className="fill-[#f4a261] text-[#f4a261]" />
								))}
							</div>
							<div>
								<div className="text-sm font-bold text-[#0f1e1a] dark:text-white">5.0 ★</div>
								<div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5b6762] dark:text-[#8fa495]">
									{t.hero.travelerLove}
								</div>
							</div>
						</motion.div>
					</div>
				</FadeIn>
			</div>

			{/* Scroll indicator */}
			<motion.div
				animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
				transition={{ duration: 1.8, repeat: Infinity }}
				className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0f1e1a]/60 dark:text-white/50"
			>
				↓ {t.hero.scroll}
			</motion.div>
		</section>
	);
}
