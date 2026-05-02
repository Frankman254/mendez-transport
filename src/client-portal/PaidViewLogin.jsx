import { useState } from 'react';

const ACCESS_PASSWORD = 'mendez7904';

export default function PaidViewLogin({ onSuccess, language = 'es' }) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password === ACCESS_PASSWORD) {
			window.sessionStorage.setItem('paid_view_access', 'granted');
			onSuccess();
			return;
		}
		setError(true);
	};

	return (
		<div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
			<div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
				<h1 className="font-display text-3xl text-white mb-1">
					{language === 'es' ? 'Vista Pagada' : 'Paid View'}
				</h1>
				<p className="text-gray-400 text-sm mb-6">
					{language === 'es' ? 'Ingresa la contraseña para continuar.' : 'Enter password to continue.'}
				</p>
				<form onSubmit={handleSubmit} className="space-y-3">
					<input
						type="password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
							if (error) setError(false);
						}}
						placeholder={language === 'es' ? 'Contraseña' : 'Password'}
						autoFocus
						className={`w-full rounded-xl border px-4 py-3 text-center text-white bg-white/8 outline-none transition-colors text-sm font-medium tracking-widest ${
							error ? 'border-red-500 bg-red-500/10' : 'border-white/15 focus:border-brand-red/60 focus:bg-white/10'
						}`}
					/>
					{error && (
						<p className="text-xs text-red-400 font-semibold">
							{language === 'es' ? 'Contraseña incorrecta.' : 'Wrong password.'}
						</p>
					)}
					<button
						type="submit"
						className="w-full rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-bold py-3 transition-colors"
					>
						{language === 'es' ? 'Entrar' : 'Enter'}
					</button>
				</form>
			</div>
		</div>
	);
}
