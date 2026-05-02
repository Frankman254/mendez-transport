import { useState } from 'react';
import { LogOut, DollarSign, Map, ExternalLink, Eye } from 'lucide-react';
import MendezLogo from '../shared/MendezLogo';
import PricesEditor from './PricesEditor';

const TABS = [
	{ id: 'prices', label: 'Precios', icon: <DollarSign size={16} /> },
	{ id: 'destinations', label: 'Destinos', icon: <Map size={16} />, soon: true },
];

export default function AdminDashboard({ onLogout }) {
	const [tab, setTab] = useState('prices');

	return (
		<div className="min-h-screen bg-[#0c1410] text-white">
			<header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c1410]/95 backdrop-blur">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
					<div className="flex items-center gap-4">
						<MendezLogo size={32} showText={true} dark={false} />
						<span className="hidden h-6 w-px bg-white/10 sm:block" />
						<span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-[#5fd0c1] sm:inline">
							Panel admin
						</span>
					</div>
					<div className="flex items-center gap-2">
						<a
							href="/"
							target="_blank"
							rel="noopener noreferrer"
							className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
						>
							<Eye size={12} />
							Ver sitio
							<ExternalLink size={11} />
						</a>
						<button
							onClick={onLogout}
							className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-red-300"
						>
							<LogOut size={12} />
							Salir
						</button>
					</div>
				</div>

				<div className="mx-auto flex max-w-6xl gap-1 px-4 sm:px-6">
					{TABS.map((t) => (
						<button
							key={t.id}
							onClick={() => !t.soon && setTab(t.id)}
							disabled={t.soon}
							className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
								tab === t.id
									? 'text-white'
									: t.soon
										? 'text-gray-600'
										: 'text-gray-400 hover:text-white'
							}`}
						>
							{t.icon}
							{t.label}
							{t.soon && (
								<span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-gray-400">
									Pronto
								</span>
							)}
							{tab === t.id && (
								<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00b4a6] to-[#0f7462]" />
							)}
						</button>
					))}
				</div>
			</header>

			<main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
				{tab === 'prices' && <PricesEditor />}
			</main>
		</div>
	);
}
