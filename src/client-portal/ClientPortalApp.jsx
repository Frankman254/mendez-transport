import { useState } from 'react';
import AssetsPortal from './AssetsPortal';
import PaidViewLogin from './PaidViewLogin';
import SampleViewLogin from './SampleViewLogin';
import PaidViewTabs from './PaidViewTabs';
import ClientLandingPage from './ClientLandingPage';
import { useTheme } from '../lib/useTheme';
import { useLanguage } from '../lib/useLanguage';

export default function ClientPortalApp() {
	const { darkMode, toggleTheme } = useTheme();
	const { language, setLanguage, t } = useLanguage();
	const path = window.location.pathname;

	const [paidAuth, setPaidAuth] = useState(
		() => window.sessionStorage.getItem('paid_view_access') === 'granted'
	);
	const [sampleAuth, setSampleAuth] = useState(
		() => window.sessionStorage.getItem('sample_view_access') === 'granted'
	);

	if (path === '/portal-cliente/vista-pagada') {
		if (!paidAuth) {
			return <PaidViewLogin language={language} onSuccess={() => setPaidAuth(true)} />;
		}
		return (
			<PaidViewTabs
				t={t}
				language={language}
				setLanguage={setLanguage}
				darkMode={darkMode}
				onToggleTheme={toggleTheme}
			/>
		);
	}

	if (path === '/portal-cliente/vista-muestra') {
		if (!sampleAuth) {
			return (
				<SampleViewLogin
					language={language}
					onSuccess={() => {
						window.sessionStorage.setItem('sample_view_access', 'granted');
						setSampleAuth(true);
					}}
				/>
			);
		}
		return (
			<ClientLandingPage
				paidView={false}
				watermark={true}
				t={t}
				language={language}
				setLanguage={setLanguage}
				darkMode={darkMode}
				onToggleTheme={toggleTheme}
			/>
		);
	}

	return <AssetsPortal skipAuth={false} />;
}
