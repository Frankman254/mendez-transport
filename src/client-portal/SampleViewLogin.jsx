import { useState } from 'react';
import { Lock } from 'lucide-react';

const SAMPLE_PASSWORD = 'preview507';

export default function SampleViewLogin({ onSuccess, language = 'es' }) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === SAMPLE_PASSWORD) {
			onSuccess();
			return;
		}
		setError(true);
		setTimeout(() => setError(false), 3000);
	};

	return (
		<div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
			<div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
				<div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a3a2f]">
					<Lock size={24} className="text-[#4ade80]" />
				</div>
				<h1 className="font-display text-2xl text-white mb-1">
					{language === 'es' ? 'Vista Muestra' : 'Preview'}
				</h1>
				<p className="text-gray-500 text-xs mb-6">
					{language === 'es'
						? 'Ingresa la contraseña de acceso para ver la muestra del sitio.'
						: 'Enter the access password to view the site preview.'}
				</p>
				<form onSubmit={handleSubmit} className="space-y-3">
					<input
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							if (error) setError(false);
						}}
						placeholder={language === 'es' ? 'Contraseña' : 'Password'}
						autoFocus
						className={`w-full rounded-xl border px-4 py-3 text-center text-white bg-white/8 outline-none transition-colors text-sm font-medium tracking-widest ${
							error ? 'border-red-500 bg-red-500/10' : 'border-white/15 focus:border-[#4ade80]/60 focus:bg-white/10'
						}`}
					/>
					{error && (
						<p className="text-xs text-red-400 font-semibold">
							{language === 'es' ? 'Contraseña incorrecta.' : 'Wrong password.'}
						</p>
					)}
					<button
						type="submit"
						className="w-full rounded-xl bg-[#1a3a2f] hover:bg-[#1f4535] border border-[#4ade80]/20 text-[#4ade80] font-bold py-3 transition-colors"
					>
						{language === 'es' ? 'Ver muestra' : 'View Preview'}
					</button>
				</form>
			</div>
		</div>
	);
}
