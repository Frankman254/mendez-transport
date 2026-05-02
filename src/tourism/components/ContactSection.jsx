import { Phone, Instagram, CheckCircle } from 'lucide-react';
import WhatsAppIcon from '../../shared/WhatsAppIcon';
import WhatsAppQR from '../../shared/WhatsAppQR';
import FadeIn from '../../shared/FadeIn';

export default function ContactSection({ t }) {
	return (
		<section id="contact" className="relative overflow-hidden bg-[#18231f] py-20">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#00b4a6]/15 blur-3xl" />
				<div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#e76f51]/15 blur-3xl" />
			</div>

			<div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
					<FadeIn>
						<span className="text-sm font-bold uppercase tracking-[0.22em] text-[#f0b06d]">
							{t.contact.tag2}
						</span>
						<h2 className="mt-3 font-display text-5xl text-white sm:text-6xl">
							{t.contact.title2}
							<span className="block bg-gradient-to-r from-[#00b4a6] to-[#5fd0c1] bg-clip-text text-transparent">
								{t.contact.span2}
							</span>
						</h2>
						<p className="mt-5 max-w-xl text-lg leading-8 text-[#c0cbc6]">
							{t.contact.desc2}
						</p>

						<div className="mt-8 hidden lg:flex">
							<div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
								<WhatsAppQR url="https://wa.me/50769255088" size={150} label={t.contact.scan} />
							</div>
						</div>
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
										<CheckCircle size={18} className="mb-3 text-[#00b4a6]" />
										{item}
									</div>
								))}
							</div>

							<div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-[#b5c0bb]">
								<a
									href="https://instagram.com/jblady_507"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 transition-colors hover:text-white"
								>
									<Instagram size={18} />
									@jblady_507
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
