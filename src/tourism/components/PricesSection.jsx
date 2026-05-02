import { ArrowRight } from 'lucide-react';
import FadeIn from '../../shared/FadeIn';
import { usePrices } from '../../lib/usePrices';

export default function PricesSection({ t }) {
	const prices = usePrices();
	const destinations = [
		{ name: t.destinations.items[0].name, price: prices.bocasDelToro, icon: '🏝️', popular: true, note: t.prices.routeNotes.bocas },
		{ name: 'Boquete', price: prices.boquete, icon: '⛰️', popular: true, note: t.prices.routeNotes.boquete },
		{ name: t.destinations.items[3].name, price: prices.playaVenado, icon: '⛵', popular: false, note: t.prices.routeNotes.bocaChica },
		{ name: t.destinations.items[1].name, price: prices.elValle, icon: '🌋', popular: false, note: t.prices.routeNotes.valle },
		{ name: t.destinations.items[2].name, price: prices.panamaCity, icon: '🏙️', popular: false, note: t.prices.routeNotes.city },
		{ name: 'David', price: prices.david, icon: '🏘️', popular: false, note: t.prices.routeNotes.david },
	];

	return (
		<section id="prices" className="bg-[#18231f] py-20 relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-[#00b4a6]/10 blur-3xl" />
				<div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-[#f4a261]/10 blur-3xl" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
							<h3 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
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
										className="group flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-[#101916] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00b4a6]/40 hover:shadow-[0_22px_60px_rgba(0,180,166,0.18)]"
									>
										<div className="flex items-start justify-between gap-3">
											<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#f0b06d]/10 text-xl">
												{d.icon}
											</div>
											<div className="text-right">
												<div className="font-display text-3xl font-black leading-none text-white">
													${d.price}
												</div>
												<div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b9590]">
													/ persona
												</div>
											</div>
										</div>

										<div className="mt-4 min-w-0 flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<h4 className="text-lg font-bold leading-tight text-white">
													{d.name}
												</h4>
												{d.popular && (
													<span className="rounded-full border border-brand-red/30 bg-brand-red/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffb1a8]">
														{t.prices.popular}
													</span>
												)}
											</div>
											<p className="mt-2 text-sm leading-6 text-[#afbbb5]">
												{d.note}
											</p>
										</div>

										<div className="mt-4 inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.18em] text-[#f0b06d]">
											{t.prices.viewRoute}
											<ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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
