import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import FadeIn from '../../shared/FadeIn';

export default function Testimonials({ t }) {
	const items = t.testimonials.items;
	const [active, setActive] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setActive((prev) => (prev + 1) % items.length);
		}, 5500);
		return () => clearInterval(id);
	}, [items.length]);

	return (
		<section className="relative overflow-hidden bg-[#f6e6cf] dark:bg-[#0e1611] py-24">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#00b4a6]/10 blur-3xl" />
				<div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#e76f51]/15 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-12">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#0f7462] dark:text-[#5fd0c1]">
						{t.testimonials.tag}
					</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] dark:text-white sm:text-6xl">
						{t.testimonials.title}
					</h2>
					<p className="mt-4 text-lg leading-8 text-[#66726e] dark:text-[#9eb0a8]">
						{t.testimonials.subtitle}
					</p>
				</FadeIn>

				<div className="relative h-[320px] sm:h-[280px]">
					<AnimatePresence mode="wait">
						<motion.div
							key={active}
							initial={{ opacity: 0, y: 30, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -30, scale: 0.96 }}
							transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
							className="absolute inset-0 rounded-[2rem] border border-white/60 bg-white p-8 shadow-[0_28px_80px_rgba(40,28,16,0.12)] dark:border-white/10 dark:bg-white/5 sm:p-10"
						>
							<Quote className="mb-4 text-[#00b4a6]" size={32} />
							<p className="font-display text-2xl leading-relaxed text-[#18231f] dark:text-white sm:text-3xl">
								"{items[active].quote}"
							</p>
							<div className="mt-6 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00b4a6] to-[#0f7462] text-2xl">
										{items[active].emoji}
									</div>
									<div>
										<div className="font-bold text-[#18231f] dark:text-white">{items[active].name}</div>
										<div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5b6762] dark:text-[#8fa495]">
											{items[active].country}
										</div>
									</div>
								</div>
								<div className="flex">
									{[0, 1, 2, 3, 4].map((i) => (
										<Star key={i} size={16} className="fill-[#f4a261] text-[#f4a261]" />
									))}
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				<div className="mt-8 flex items-center justify-center gap-2">
					{items.map((_, i) => (
						<button
							key={i}
							onClick={() => setActive(i)}
							aria-label={`Testimonial ${i + 1}`}
							className={`h-2 rounded-full transition-all duration-300 ${
								i === active ? 'w-8 bg-[#0f7462] dark:bg-[#5fd0c1]' : 'w-2 bg-[#0f7462]/20 hover:bg-[#0f7462]/40'
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
