import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Luggage } from 'lucide-react';
import FadeIn from '../../shared/FadeIn';

export default function JourneySection({ t }) {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start 0.7', 'end 0.3'],
	});
	const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	const icons = [
		<MapPin size={22} key="map" />,
		<Calendar size={22} key="cal" />,
		<Luggage size={22} key="lug" />,
	];

	return (
		<section
			id="journey"
			ref={sectionRef}
			className="relative overflow-hidden bg-[#fffaf4] dark:bg-[#0c1410] py-24"
		>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<FadeIn className="mx-auto max-w-3xl text-center mb-16">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#0f7462] dark:text-[#5fd0c1]">
						{t.journey.tag}
					</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] dark:text-[#d4e0d7] sm:text-6xl">
						{t.journey.title}
					</h2>
					<p className="mt-4 text-lg leading-8 text-[#66726e] dark:text-[#9eb0a8]">
						{t.journey.subtitle}
					</p>
				</FadeIn>

				<div className="relative">
					{/* Background dotted line */}
					<div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#e0d2c4] dark:bg-white/10 hidden md:block" />
					{/* Animated drawing line */}
					<motion.div
						style={{ height: lineHeight }}
						className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#00b4a6] via-[#0f7462] to-[#1f5c52] hidden md:block"
					/>

					<div className="relative space-y-10 md:space-y-20">
						{t.journey.items.map((item, index) => {
							const isEven = index % 2 === 0;
							return (
								<FadeIn
									key={item.title}
									delay={index * 0.12}
									direction={isEven ? 'left' : 'right'}
								>
									<div className={`grid md:grid-cols-2 gap-6 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}>
										<div className={`md:px-10 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
											<div className={`inline-flex items-center gap-2 rounded-full bg-[#00b4a6]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#0f7462] dark:bg-[#00b4a6]/15 dark:text-[#5fd0c1]`}>
												Paso 0{index + 1}
											</div>
											<h3 className="mt-3 text-3xl font-bold text-[#18231f] dark:text-white">
												{item.title}
											</h3>
											<p className="mt-3 text-base leading-7 text-[#66726e] dark:text-[#9eb0a8]">
												{item.desc}
											</p>
										</div>
										<div className="relative md:px-10">
											<motion.div
												whileHover={{ scale: 1.04, rotate: 1 }}
												className="relative h-32 rounded-[1.6rem] border border-[#ebdfd4] bg-white shadow-[0_18px_50px_rgba(46,34,14,0.06)] dark:border-white/10 dark:bg-white/5"
											>
												<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#00b4a6] to-[#0f7462] text-white shadow-xl">
													{icons[index]}
												</div>
											</motion.div>
										</div>
									</div>
									{/* Center dot for timeline */}
									<div className="absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-16 rounded-full border-4 border-white bg-[#00b4a6] shadow-md md:block dark:border-[#0c1410]" style={{ top: `${(index + 1) * 20}%` }} />
								</FadeIn>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
