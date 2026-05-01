import { motion } from 'framer-motion';
import { TravelHero } from '../components/rentals/travel-mode/TravelHero';
import { DestinationGrid } from '../components/rentals/travel-mode/DestinationGrid';
import { TripSimulator } from '../components/rentals/travel-mode/TripSimulator';
import { TravelTimeline } from '../components/rentals/travel-mode/TravelTimeline';
import { FloatingBookingPanel } from '../components/rentals/travel-mode/FloatingBookingPanel';

export function Rentals() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen bg-background"
        >
            <TravelHero />
            <DestinationGrid />
            <TripSimulator />
            <FloatingBookingPanel />
            <TravelTimeline />
        </motion.div>
    );
}
