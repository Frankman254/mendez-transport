import { Home } from 'lucide-react';

export default function BannerHomeButton({
	href = '/',
	label = 'Inicio',
	fixed = true,
	className = '',
}) {
	return (
		<a
			href={href}
			className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#08110d]/78 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-colors hover:bg-[#112018]/92 ${fixed ? 'fixed left-4 top-4 z-50' : ''} ${className}`.trim()}
		>
			<Home size={16} />
			{label}
		</a>
	);
}
