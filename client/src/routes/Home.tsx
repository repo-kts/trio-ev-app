import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { IndiaNetworkMap } from '../components/IndiaNetworkMap';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { CTASection } from '../components/CTASection';

export function Home() {
    return (
        <div className="flex flex-col w-full">
            <HeroSection />
            <ServicesSection />
            <IndiaNetworkMap />
            <FeatureHighlights />
            <CTASection />
        </div>
    );
}
