import { useEffect } from 'react';
import TourismApp from './tourism/TourismApp';
import ClientPortalApp from './client-portal/ClientPortalApp';
import AdminApp from './admin/AdminApp';

export default function App() {
	const path = window.location.pathname;

	useEffect(() => {
		// Compatibility redirects
		if (path === '/mis-assets' || path === '/vista-pagada' || path === '/vista-muestra') {
			const map = {
				'/mis-assets': '/portal-cliente',
				'/vista-pagada': '/portal-cliente/vista-pagada',
				'/vista-muestra': '/portal-cliente/vista-muestra',
			};
			window.location.replace(map[path]);
		}
	}, [path]);

	if (path.startsWith('/admin')) {
		return <AdminApp />;
	}

	if (
		path.startsWith('/portal-cliente') ||
		path === '/mis-assets' ||
		path === '/vista-pagada' ||
		path === '/vista-muestra'
	) {
		return <ClientPortalApp />;
	}

	return <TourismApp />;
}
