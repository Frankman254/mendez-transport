import { useEffect, useState } from 'react';
import { Save, RotateCcw, Download, Upload, Check, AlertCircle } from 'lucide-react';
import {
	usePrices,
	setAllPrices,
	resetPrices,
	exportPricesJSON,
	importPricesJSON,
	DEFAULT_PRICES,
} from '../lib/usePrices';

const FIELDS = [
	{ key: 'bocasDelToro', label: 'Bocas del Toro', icon: '🏝️' },
	{ key: 'boquete', label: 'Boquete', icon: '⛰️' },
	{ key: 'panamaCity', label: 'Ciudad de Panamá', icon: '🏙️' },
	{ key: 'elValle', label: 'El Valle de Antón', icon: '🌋' },
	{ key: 'david', label: 'David', icon: '🏘️' },
	{ key: 'playaVenado', label: 'Playa Venado / Boca Chica', icon: '⛵' },
];

export default function PricesEditor() {
	const livePrices = usePrices();
	const [draft, setDraft] = useState(livePrices);
	const [savedFlash, setSavedFlash] = useState(false);

	useEffect(() => {
		setDraft(livePrices);
	}, [livePrices]);

	const dirty = FIELDS.some((f) => Number(draft[f.key]) !== Number(livePrices[f.key]));

	const handleSave = () => {
		setAllPrices(draft);
		setSavedFlash(true);
		setTimeout(() => setSavedFlash(false), 2000);
	};

	const handleReset = () => {
		if (confirm('¿Restaurar los precios por defecto? Esto borrará tus cambios.')) {
			resetPrices();
		}
	};

	const handleImport = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			await importPricesJSON(file);
			setSavedFlash(true);
			setTimeout(() => setSavedFlash(false), 2000);
		} catch (err) {
			alert('Archivo inválido: ' + err.message);
		}
		e.target.value = '';
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="text-2xl font-bold text-white">Precios</h2>
					<p className="mt-1 text-sm text-gray-400">
						Edita los precios mostrados en el sitio público. Los cambios se guardan en el navegador (localStorage).
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-2">
					<button
						onClick={exportPricesJSON}
						className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-white/10"
					>
						<Download size={14} />
						Exportar JSON
					</button>
					<label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-white/10">
						<Upload size={14} />
						Importar JSON
						<input type="file" accept="application/json" onChange={handleImport} className="hidden" />
					</label>
					<button
						onClick={handleReset}
						className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-red-500/10 hover:text-red-300"
					>
						<RotateCcw size={14} />
						Restaurar
					</button>
				</div>
			</div>

			<div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
				<table className="w-full text-left">
					<thead className="bg-white/5">
						<tr>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
								Destino
							</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
								Precio actual
							</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
								Por defecto
							</th>
							<th className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
								Nuevo precio (USD)
							</th>
						</tr>
					</thead>
					<tbody>
						{FIELDS.map((field, i) => (
							<tr
								key={field.key}
								className={i !== 0 ? 'border-t border-white/5' : ''}
							>
								<td className="px-5 py-4">
									<div className="flex items-center gap-3">
										<span className="text-xl">{field.icon}</span>
										<span className="font-medium text-white">{field.label}</span>
									</div>
								</td>
								<td className="px-5 py-4 text-sm text-gray-300">
									${Number(livePrices[field.key])}
								</td>
								<td className="px-5 py-4 text-sm text-gray-500">
									${DEFAULT_PRICES[field.key]}
								</td>
								<td className="px-5 py-4">
									<div className="relative inline-flex w-32 items-center">
										<span className="absolute left-3 text-gray-500">$</span>
										<input
											type="number"
											min={0}
											step={1}
											value={draft[field.key] ?? ''}
											onChange={(e) =>
												setDraft({ ...draft, [field.key]: e.target.value })
											}
											className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 pl-7 text-white outline-none transition-colors focus:border-[#00b4a6]/60 focus:bg-white/10"
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
				<div className="flex items-center gap-2 text-sm">
					{savedFlash ? (
						<>
							<Check size={16} className="text-[#00b4a6]" />
							<span className="text-[#5fd0c1]">Cambios guardados</span>
						</>
					) : dirty ? (
						<>
							<AlertCircle size={16} className="text-[#f4a261]" />
							<span className="text-gray-300">Tienes cambios sin guardar</span>
						</>
					) : (
						<span className="text-gray-500">Sin cambios pendientes</span>
					)}
				</div>
				<button
					onClick={handleSave}
					disabled={!dirty}
					className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00b4a6] to-[#0f7462] px-6 py-2.5 text-sm font-bold text-white transition-all hover:from-[#5fd0c1] hover:to-[#00b4a6] disabled:opacity-40"
				>
					<Save size={14} />
					Guardar cambios
				</button>
			</div>
		</div>
	);
}
