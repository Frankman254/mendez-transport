import { useState } from 'react';
import ClientLandingPage from './ClientLandingPage';

export default function PaidViewTabs({ t, language, setLanguage, darkMode, onToggleTheme }) {
	const [activeTab, setActiveTab] = useState('general');

	return (
		<div className="min-h-screen">
			<div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2">
				<div className="flex items-center gap-1 rounded-full border border-[#ddd0c2] bg-white shadow-xl px-1 py-1">
					<button
						type="button"
						onClick={() => {
							setActiveTab('general');
							window.scrollTo(0, 0);
						}}
						className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${
							activeTab === 'general'
								? 'bg-[#18231f] text-white shadow-sm'
								: 'text-[#5f6d67] hover:text-[#18231f]'
						}`}
					>
						Vista General
					</button>
					<button
						type="button"
						onClick={() => {
							setActiveTab('completa');
							window.scrollTo(0, 0);
						}}
						className={`rounded-full px-5 py-2 text-xs font-semibold transition-colors ${
							activeTab === 'completa'
								? 'bg-brand-red text-white shadow-sm'
								: 'text-[#5f6d67] hover:text-[#18231f]'
						}`}
					>
						Vista Completa
					</button>
				</div>
			</div>

			<ClientLandingPage
				paidView={activeTab === 'completa'}
				watermark={false}
				t={t}
				language={language}
				setLanguage={setLanguage}
				darkMode={darkMode}
				onToggleTheme={onToggleTheme}
			/>
		</div>
	);
}
