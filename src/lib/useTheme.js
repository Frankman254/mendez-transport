import { useEffect, useState } from 'react';

export function useTheme() {
	const [darkMode, setDarkMode] = useState(
		() => window.localStorage.getItem('theme') === 'dark'
	);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode);
		window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
	}, [darkMode]);

	const toggleTheme = () => setDarkMode((d) => !d);

	return { darkMode, toggleTheme };
}
