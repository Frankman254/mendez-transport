import { Shield, Users, Zap, Award } from 'lucide-react';
import FadeIn from '../../shared/FadeIn';

export default function Benefits({ t }) {
	const benefits = [
		{ icon: <Shield size={28} />, title: t.benefits.items[0].title, desc: t.benefits.items[0].desc, color: 'from-[#0f7462] to-[#1f5c52]' },
		{ icon: <Users size={28} />, title: t.benefits.items[1].title, desc: t.benefits.items[1].desc, color: 'from-brand-red to-brand-red-dark' },
		{ icon: <Zap size={28} />, title: t.benefits.items[2].title, desc: t.benefits.items[2].desc, color: 'from-[#00b4a6] to-[#0f7462]' },
		{ icon: <Award size={28} />, title: t.benefits.items[3].title, desc: t.benefits.items[3].desc, color: 'from-[#f4a261] to-[#e76f51]' },
	];

	return (
		<section className="bg-[#fffaf4] dark:bg-[#0c1410] py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<FadeIn className="text-center mb-14">
					<span className="text-sm font-bold uppercase tracking-[0.24em] text-[#0f7462] dark:text-[#5fd0c1]">
						{t.benefits.tag}
					</span>
					<h2 className="mt-3 font-display text-5xl text-[#18231f] dark:text-[#d4e0d7] sm:text-6xl">
						{t.benefits.title}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#66726e] dark:text-[#9eb0a8]">
						{t.benefits.subtitle}
					</p>
				</FadeIn>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{benefits.map((b, i) => (
						<FadeIn key={b.title} delay={i * 0.12} direction="up">
							<div className="card-hover group rounded-[2rem] border border-[#eadfd4] bg-white p-7 text-center shadow-[0_18px_50px_rgba(46,34,14,0.06)] hover:border-[#00b4a6]/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#00b4a6]/40">
								<div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
									{b.icon}
								</div>
								<h3 className="mb-2 text-xl font-bold text-[#18231f] dark:text-white">
									{b.title}
								</h3>
								<p className="text-sm leading-7 text-[#66726e] dark:text-[#9eb0a8]">
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
