import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
	const [authenticated, setAuthenticated] = useState(
		() => window.sessionStorage.getItem('admin_access') === 'granted'
	);

	const handleLogout = () => {
		window.sessionStorage.removeItem('admin_access');
		setAuthenticated(false);
	};

	if (!authenticated) {
		return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
	}

	return <AdminDashboard onLogout={handleLogout} />;
}
