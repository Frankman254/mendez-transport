import Navbar from '../tourism/components/Navbar';
import Hero from '../tourism/components/Hero';
import Benefits from '../tourism/components/Benefits';
import FeaturedDestinations from '../tourism/components/FeaturedDestinations';
import PricesSection from '../tourism/components/PricesSection';
import JourneySection from '../tourism/components/JourneySection';
import VehicleShowcase from '../tourism/components/VehicleShowcase';
import Testimonials from '../tourism/components/Testimonials';
import ContactSection from '../tourism/components/ContactSection';
import Footer from '../tourism/components/Footer';
import BusinessCardSection from './BusinessCardSection';
import WatermarkOverlay from './WatermarkOverlay';

export default function ClientLandingPage({
	paidView = false,
	watermark = false,
	t,
	language,
	setLanguage,
	darkMode,
	onToggleTheme,
}) {
	return (
		<div className="min-h-screen bg-[#fffaf4] dark:bg-[#0c1410] overflow-x-hidden">
			{watermark && <WatermarkOverlay />}
			<Navbar
				t={t}
				language={language}
				setLanguage={setLanguage}
				darkMode={darkMode}
				onToggleTheme={onToggleTheme}
			/>
			<Hero t={t} />
			<Benefits t={t} />
			<FeaturedDestinations t={t} />
			<PricesSection t={t} />
			<JourneySection t={t} />
			<VehicleShowcase t={t} />
			<Testimonials t={t} />
			<BusinessCardSection paidView={paidView} t={t} />
			<ContactSection t={t} />
			<Footer t={t} />
		</div>
	);
}
