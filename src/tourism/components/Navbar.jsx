import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MendezLogo from '../../shared/MendezLogo';
import WhatsAppIcon from '../../shared/WhatsAppIcon';
import ThemeToggle from '../../shared/ThemeToggle';

export default function Navbar({ t, language, setLanguage, darkMode = false, onToggleTheme }) {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	const links = [
		{ label: t.nav.destinations, href: '#destinations' },
		{ label: t.nav.prices, href: '#prices' },
		{ label: t.nav.journey, href: '#journey' },
		{ label: t.nav.vehicle, href: '#vehicle' },
		{ label: t.nav.contact, href: '#contact' },
	];

	return (
		<>
			<AnimatePresence>
				{menuOpen && (
					<motion.button
						type="button"
						aria-label="Close menu overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setMenuOpen(false)}
						className="fixed inset-0 z-40 bg-[rgba(24,35,31,0.22)] backdrop-blur-[2px] md:hidden"
					/>
				)}
			</AnimatePresence>

			<motion.nav
				initial={{ y: -80 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				className="fixed top-3 left-0 right-0 z-50 px-3 transition-all duration-300"
			>
				<div className="relative mx-auto max-w-6xl">
					<div
						className={`flex h-14 items-center justify-between rounded-full border px-4 sm:px-6 lg:px-8 ${
							scrolled
								? 'border-[#d9c8b8] bg-[#fffaf4]/92 shadow-[0_18px_60px_rgba(36,25,10,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-[#0c1410]/95 dark:shadow-[0_18px_60px_rgba(0,0,0,0.5)]'
								: 'border-white/40 bg-white/55 backdrop-blur-md dark:border-white/15 dark:bg-[#0c1410]/80'
						}`}
					>
						<MendezLogo size={28} showText={true} dark={!darkMode} />

						<div className="hidden md:flex items-center gap-6">
							{links.map((link) => (
								<a
									key={link.href}
									href={link.href}
									className="relative text-xs font-medium uppercase tracking-[0.18em] text-[#5f6d67] transition-colors duration-200 hover:text-[#18231f] group dark:text-[#8fa495] dark:hover:text-white"
								>
									{link.label}
									<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#00b4a6] transition-all duration-300 group-hover:w-full" />
								</a>
							))}
							<button
								type="button"
								onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
								className="rounded-full border border-[#ddd0c2] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#5f6d67] transition-colors hover:text-[#18231f] dark:border-white/15 dark:bg-white/10 dark:text-[#8fa495] dark:hover:text-white"
							>
								{language.toUpperCase()}
							</button>
							{onToggleTheme && <ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} />}
							<a
								href="https://wa.me/50769255088"
								target="_blank"
								rel="noopener noreferrer"
								className="btn-whatsapp !px-4 !py-2 !text-xs"
							>
								<WhatsAppIcon size={16} />
								{t.nav.bookNow}
							</a>
						</div>

						<button
							className="rounded-full p-2 text-[#18231f] dark:text-[#e7efe9] md:hidden"
							onClick={() => setMenuOpen(!menuOpen)}
							aria-label="Toggle menu"
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>

					<AnimatePresence>
						{menuOpen && (
							<motion.div
								initial={{ opacity: 0, y: -12, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -8, scale: 0.98 }}
								transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
								className="absolute left-0 right-0 top-[calc(100%+0.75rem)] overflow-hidden rounded-[2rem] border border-[#e0d0c1] bg-[#fffaf4] shadow-[0_24px_70px_rgba(40,28,16,0.16)] dark:border-white/10 dark:bg-[#101814] dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)] md:hidden"
							>
								<div className="flex flex-col gap-2 px-5 py-5">
									{links.map((link, index) => (
										<motion.a
											key={link.href}
											href={link.href}
											onClick={() => setMenuOpen(false)}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 6 }}
											transition={{ delay: 0.04 * index, duration: 0.18 }}
											className="rounded-[1.2rem] border border-[#efe3d7] bg-white px-4 py-3 text-base font-medium text-[#5f6d67] transition-colors hover:text-[#00b4a6] dark:border-white/10 dark:bg-white/5 dark:text-[#9eb0a8] dark:hover:text-white"
										>
											{link.label}
										</motion.a>
									))}

									<div className="mt-2 flex items-center gap-3">
										<button
											type="button"
											onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
											className="rounded-full border border-[#ddd0c2] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f6d67] dark:border-white/10 dark:bg-white/5 dark:text-[#9eb0a8]"
										>
											{language.toUpperCase()}
										</button>
										<a
											href="https://wa.me/50769255088"
											target="_blank"
											rel="noopener noreferrer"
											className="btn-whatsapp flex-1 justify-center"
										>
											<WhatsAppIcon size={20} />
											{t.nav.bookWA}
										</a>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.nav>
		</>
	);
}
