import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppIcon from '../../shared/WhatsAppIcon';

export default function FloatingWhatsApp({ t }) {
	const [visible, setVisible] = useState(false);
	const [tooltipOpen, setTooltipOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 320);
		window.addEventListener('scroll', onScroll);
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		if (!visible) return;
		const id = setTimeout(() => setTooltipOpen(true), 1400);
		const id2 = setTimeout(() => setTooltipOpen(false), 6000);
		return () => {
			clearTimeout(id);
			clearTimeout(id2);
		};
	}, [visible]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					transition={{ type: 'spring', stiffness: 220, damping: 18 }}
					className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
				>
					<AnimatePresence>
						{tooltipOpen && (
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 10 }}
								transition={{ duration: 0.3 }}
								className="hidden rounded-2xl bg-[#18231f] px-4 py-2.5 text-sm font-semibold text-white shadow-xl sm:block"
							>
								{t.float.tooltip}
								<span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-[#18231f]" />
							</motion.div>
						)}
					</AnimatePresence>

					<a
						href="https://wa.me/50769255088"
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t.float.cta}
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
						className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,0.5)] transition-transform hover:scale-105 active:scale-95"
					>
						<span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
						<span className="absolute inset-0 rounded-full ring-2 ring-[#25D366]/40" />
						<WhatsAppIcon size={30} />
					</a>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
