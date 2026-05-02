import { Clock, Instagram, MessageCircle, Phone } from 'lucide-react';
import MendezLogo from '../../shared/MendezLogo';

export default function Footer({ t }) {
	return (
		<footer className="bg-[#0d0d0d] border-t border-white/5 py-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<MendezLogo size={36} showText={true} dark={false} />

					<div className="text-center text-gray-500 text-sm">
						<p className="font-semibold text-gray-300 mb-1">{t.footer.tagline}</p>
						<div className="flex items-center justify-center gap-2">
							<Clock size={13} className="text-[#00b4a6]" />
							<span>{t.footer.daily}</span>
						</div>
					</div>

					<div className="flex items-center gap-4 text-gray-600 text-sm">
						<a
							href="https://instagram.com/jblady_507"
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
							href="tel:+50768768467"
							className="hover:text-[#00b4a6] transition-colors"
						>
							<Phone size={18} />
						</a>
					</div>
				</div>

				<div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-700 text-xs">
					© {new Date().getFullYear()} Méndez Transport · Panama · {t.footer.rights}
					{' · '}
					<a href="/portal-cliente" className="text-gray-600 hover:text-gray-400">
						{t.footer.clientAccess}
					</a>
				</div>
			</div>
		</footer>
	);
}
