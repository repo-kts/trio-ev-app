import { motion } from 'framer-motion';
import { LeasingHero } from '../components/leasing/LeasingHero';
import { ValuePropSection } from '../components/leasing/ValuePropSection';
import { InteractiveCalculator } from '../components/leasing/InteractiveCalculator';
import { FleetGrowthVisual } from '../components/leasing/FleetGrowthVisual';
import { LeasingUseCases } from '../components/leasing/LeasingUseCases';
import { LeasingProcess } from '../components/leasing/LeasingProcess';

export function Leasing() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen bg-background"
        >
            <LeasingHero />
            <ValuePropSection />
            <InteractiveCalculator />
            <FleetGrowthVisual />
            <LeasingUseCases />
            <LeasingProcess />
            
            {/* Final CTA */}
            <div className="py-32 px-6 text-center border-t border-white/5 bg-secondary/5">
                <h2 className="text-4xl md:text-5xl font-heading font-black uppercase mb-8">Ready to <span className="text-accent">Scale?</span></h2>
                <button className="px-12 py-5 bg-accent text-background font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(92,240,158,0.2)] text-xs">
                    Get a Custom Plan
                </button>
            </div>
        </motion.div>
    );
}
