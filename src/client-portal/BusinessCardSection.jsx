import { motion } from 'framer-motion';
import { Phone, CheckCircle } from 'lucide-react';
import WhatsAppIcon from '../shared/WhatsAppIcon';
import WhatsAppQR from '../shared/WhatsAppQR';
import FadeIn from '../shared/FadeIn';

export default function BusinessCardSection({ paidView = false, t }) {
	if (paidView) {
		return (
			<section className="bg-[#f7efe4] dark:bg-[#0e1611] py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<FadeIn className="text-center mb-12">
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

					<FadeIn>
						<motion.div
							whileHover={{ scale: 1.01 }}
							transition={{ type: 'spring', stiffness: 200 }}
							className="overflow-hidden rounded-[2rem] border border-[#eadfd4] shadow-[0_32px_80px_rgba(40,28,16,0.14)] mb-10"
						>
							<img
								src="/client-assets/cards/tarjeta-4k.png"
								alt="Tarjeta Méndez Transport"
								className="w-full object-cover"
							/>
						</motion.div>
					</FadeIn>

					<div className="grid md:grid-cols-2 gap-10 items-start">
						<FadeIn direction="left">
							<motion.div
								whileHover={{ scale: 1.02 }}
								transition={{ type: 'spring', stiffness: 250 }}
								className="overflow-hidden rounded-[1.8rem] border border-[#eadfd4] shadow-[0_24px_70px_rgba(40,28,16,0.10)]"
							>
								<img
									src="/client-assets/banners/banner-oscuro-4k.png"
									alt="Banner Méndez Transport"
									className="w-full object-cover"
								/>
							</motion.div>
						</FadeIn>

						<FadeIn direction="right">
							<div className="rounded-[2rem] border border-[#eadfd4] bg-[#fffaf4] p-8 text-left shadow-[0_24px_70px_rgba(40,28,16,0.08)]">
								<div className="flex justify-center mb-6">
									<WhatsAppQR url="https://wa.me/50769255088" size={160} label={t.contact.primary} />
								</div>

								<div className="grid gap-3">
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

								<div className="mt-6 rounded-[1.6rem] border border-[#eadfd4] bg-white p-6">
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

	return (
		<section className="bg-[#f7efe4] dark:bg-[#0e1611] py-20">
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
					<FadeIn direction="left">
						<div className="space-y-6">
							<motion.div
								whileHover={{ scale: 1.02, rotate: -1 }}
								transition={{ type: 'spring', stiffness: 300 }}
								className="cursor-pointer overflow-hidden rounded-[1.8rem] border border-[#eadfd4] shadow-[0_24px_70px_rgba(40,28,16,0.10)]"
							>
								<img src="/tourism/destinations/panama-city.jpg" alt="Méndez Transport preview" className="w-full object-cover" />
							</motion.div>
							<motion.div
								whileHover={{ scale: 1.02, rotate: 1 }}
								transition={{ type: 'spring', stiffness: 300 }}
								className="cursor-pointer overflow-hidden rounded-[1.8rem] border border-[#eadfd4] shadow-[0_24px_70px_rgba(40,28,16,0.10)]"
							>
								<img src="/tourism/destinations/valle-de-anton.jpg" alt="Méndez Transport preview" className="w-full object-cover" />
							</motion.div>
						</div>
					</FadeIn>

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
