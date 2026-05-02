import { motion } from 'framer-motion';
import { Shield, Wifi, Users, Calendar, CheckCircle, Star, ArrowRight } from 'lucide-react';
import MendezLogo from '../../shared/MendezLogo';
import FadeIn from '../../shared/FadeIn';

export default function VehicleShowcase({ t }) {
	const features = [
		{ icon: <Shield size={20} />, text: t.vehicle.features[0] },
		{ icon: <Wifi size={20} />, text: t.vehicle.features[1] },
		{ icon: <Users size={20} />, text: t.vehicle.features[2] },
		{ icon: <Calendar size={20} />, text: t.vehicle.features[3] },
		{ icon: <CheckCircle size={20} />, text: t.vehicle.features[4] },
		{ icon: <Star size={20} />, text: t.vehicle.features[5] },
	];

	return (
		<section id="vehicle" className="overflow-hidden bg-[#fffaf4] dark:bg-[#0c1410] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<FadeIn direction="left">
						<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#0f7462] dark:text-[#5fd0c1]">
							{t.vehicle.tag}
						</span>
						<h2 className="mt-3 mb-5 font-display text-5xl text-[#18231f] dark:text-white sm:text-6xl">
							{t.vehicle.title1}
							<br />
							<span className="bg-gradient-to-r from-[#e76f51] to-[#e31e24] bg-clip-text text-transparent">
								{t.vehicle.title2}
							</span>{' '}
							&
							<br />
							{t.vehicle.title3}
						</h2>
						<p className="mb-8 text-lg leading-8 text-[#66726e] dark:text-[#9eb0a8]">
							{t.vehicle.desc}
						</p>
						<div className="grid grid-cols-2 gap-3 mb-8">
							{features.map((f) => (
								<div key={f.text} className="flex items-center gap-3 text-[#4e5e58] dark:text-[#b8c4be]">
									<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#00b4a6]/15 text-[#0f7462] dark:bg-[#00b4a6]/20 dark:text-[#5fd0c1]">
										{f.icon}
									</div>
									<span className="text-sm font-medium">{f.text}</span>
								</div>
							))}
						</div>
						<a href="#contact" className="btn-primary">
							{t.vehicle.cta}
							<ArrowRight size={18} />
						</a>
					</FadeIn>

					<FadeIn direction="right">
						<div className="relative">
							<div className="relative overflow-hidden rounded-[2rem] border border-[#eadfd4] shadow-[0_24px_70px_rgba(40,28,16,0.12)] dark:border-white/10">
								<img
									src="/tourism/vehicles/van-toyota.png"
									alt="Méndez Transport Toyota HiAce"
									className="w-full object-cover h-72"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
								<div className="absolute bottom-5 left-5">
									<MendezLogo size={32} showText={true} dark={false} />
								</div>
							</div>

							<div className="relative mt-4 overflow-hidden rounded-[1.6rem] border border-[#eadfd4] shadow-[0_18px_50px_rgba(40,28,16,0.10)] dark:border-white/10">
								<img
									src="/tourism/vehicles/interior.jpg"
									alt="Van interior"
									className="w-full object-cover h-48"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 to-transparent" />
								<div className="absolute left-5 top-1/2 -translate-y-1/2">
									<p className="text-white font-bold text-lg">{t.vehicle.interior}</p>
									<p className="text-gray-300 text-sm">{t.vehicle.interiorSub}</p>
								</div>
							</div>

							<motion.div
								animate={{ rotate: [0, 5, 0, -5, 0] }}
								transition={{ duration: 5, repeat: Infinity }}
								className="absolute -top-4 -right-4 bg-brand-red text-white rounded-2xl px-4 py-3 shadow-xl text-center"
							>
								<div className="font-display text-3xl leading-none">7:40</div>
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
