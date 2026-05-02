import { useEffect, useState } from 'react';
import { translations } from './translations';

export function useLanguage() {
	const [language, setLanguage] = useState(
		() => window.localStorage.getItem('lang_pref') || 'es'
	);

	useEffect(() => {
		window.localStorage.setItem('lang_pref', language);
	}, [language]);

	const t = translations[language] ?? translations.es;
	return { language, setLanguage, t };
}
