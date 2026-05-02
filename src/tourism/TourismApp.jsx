import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import FeaturedDestinations from './components/FeaturedDestinations';
import PricesSection from './components/PricesSection';
import JourneySection from './components/JourneySection';
import VehicleShowcase from './components/VehicleShowcase';
// Testimonios deshabilitados hasta que el cliente provea reviews reales (Google/TripAdvisor/WhatsApp)
// import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { useTheme } from '../lib/useTheme';
import { useLanguage } from '../lib/useLanguage';

export default function TourismApp() {
	const { darkMode, toggleTheme } = useTheme();
	const { language, setLanguage, t } = useLanguage();

	return (
		<div className="min-h-screen bg-[#fffaf4] dark:bg-[#0c1410] overflow-x-hidden">
			<Navbar
				t={t}
				language={language}
				setLanguage={setLanguage}
				darkMode={darkMode}
				onToggleTheme={toggleTheme}
			/>
			<Hero t={t} />
			<Benefits t={t} />
			<FeaturedDestinations t={t} />
			<PricesSection t={t} />
			<JourneySection t={t} />
			<VehicleShowcase t={t} />
			<ContactSection t={t} />
			<Footer t={t} />
			<FloatingWhatsApp t={t} />
		</div>
	);
}
