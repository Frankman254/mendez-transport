import { useEffect, useState } from 'react';
import { PRICES as DEFAULT_PRICES } from './prices';

const STORAGE_KEY = 'mendez_prices_v1';
const EVENT = 'mendez:prices-updated';

function readStored() {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed !== 'object' || parsed === null) return null;
		return parsed;
	} catch {
		return null;
	}
}

function mergeWithDefaults(stored) {
	return { ...DEFAULT_PRICES, ...(stored || {}) };
}

export function usePrices() {
	const [prices, setPrices] = useState(() => mergeWithDefaults(readStored()));

	useEffect(() => {
		const refresh = () => setPrices(mergeWithDefaults(readStored()));
		window.addEventListener(EVENT, refresh);
		window.addEventListener('storage', refresh);
		return () => {
			window.removeEventListener(EVENT, refresh);
			window.removeEventListener('storage', refresh);
		};
	}, []);

	return prices;
}

export function setPrice(key, value) {
	const current = readStored() || {};
	const next = { ...current, [key]: Number(value) };
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	window.dispatchEvent(new Event(EVENT));
}

export function setAllPrices(next) {
	const sanitized = {};
	for (const key of Object.keys(DEFAULT_PRICES)) {
		const v = Number(next?.[key]);
		if (!Number.isNaN(v)) sanitized[key] = v;
	}
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
	window.dispatchEvent(new Event(EVENT));
}

export function resetPrices() {
	window.localStorage.removeItem(STORAGE_KEY);
	window.dispatchEvent(new Event(EVENT));
}

export function exportPricesJSON() {
	const current = mergeWithDefaults(readStored());
	const blob = new Blob([JSON.stringify(current, null, 2)], {
		type: 'application/json',
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `mendez-prices-${new Date().toISOString().slice(0, 10)}.json`;
	a.click();
	URL.revokeObjectURL(url);
}

export async function importPricesJSON(file) {
	const text = await file.text();
	const parsed = JSON.parse(text);
	setAllPrices(parsed);
}

export { DEFAULT_PRICES };
