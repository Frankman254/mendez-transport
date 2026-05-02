import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ darkMode, onToggle }) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label="Toggle theme"
			className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ddd0c2] bg-white text-[#5f6d67] transition-colors hover:text-[#18231f] dark:border-white/15 dark:bg-white/10 dark:text-[#8fa495] dark:hover:text-white"
		>
			{darkMode ? <Sun size={15} /> : <Moon size={15} />}
		</button>
	);
}
