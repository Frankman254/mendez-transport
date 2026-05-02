import { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

const ADMIN_PASSWORD = 'admin507';

export default function AdminLogin({ onSuccess }) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === ADMIN_PASSWORD) {
			window.sessionStorage.setItem('admin_access', 'granted');
			onSuccess();
			return;
		}
		setError(true);
		setTimeout(() => setError(false), 2500);
	};

	return (
		<div className="relative min-h-screen bg-gradient-to-br from-[#0c1410] via-[#101a14] to-[#0c1410] flex items-center justify-center px-4">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#00b4a6]/10 blur-3xl" />
			</div>

			<div className="relative w-full max-w-sm">
				<div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-md">
					<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00b4a6] to-[#0f7462] shadow-lg">
						<ShieldCheck size={28} className="text-white" />
					</div>

					<h1 className="font-display text-3xl text-white mb-1">Panel Admin</h1>
					<p className="text-gray-400 text-sm mb-8">Configuración del sitio · Méndez Transport</p>

					<form onSubmit={handleSubmit} className="space-y-3">
						<div className="relative">
							<Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
							<input
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									if (error) setError(false);
								}}
								placeholder="Contraseña de admin"
								autoFocus
								className={`w-full rounded-xl border px-4 py-3 pl-11 text-center text-white bg-white/8 outline-none transition-colors text-sm font-medium tracking-widest ${
									error ? 'border-red-500 bg-red-500/10' : 'border-white/15 focus:border-[#00b4a6]/60 focus:bg-white/10'
								}`}
							/>
						</div>
						{error && (
							<p className="text-xs text-red-400 font-semibold">Contraseña incorrecta.</p>
						)}
						<button
							type="submit"
							className="w-full rounded-xl bg-gradient-to-r from-[#00b4a6] to-[#0f7462] hover:from-[#5fd0c1] hover:to-[#00b4a6] text-white font-bold py-3 transition-all"
						>
							Entrar al panel
						</button>
					</form>

					<p className="mt-6 text-xs text-gray-600">
						Acceso restringido al administrador del sitio.
					</p>
				</div>
			</div>
		</div>
	);
}
