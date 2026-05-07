import { motion } from 'framer-motion';
import { LogisticsHero } from '../components/logistics/LogisticsHero';
import { LogisticsProcess } from '../components/logistics/LogisticsProcess';
import { LogisticsCompliance } from '../components/logistics/LogisticsCompliance';
import { LogisticsCTA } from '../components/logistics/LogisticsCTA';
import { IndiaFleetMap } from '../components/logistics/IndiaFleetMap';

export function Logistics() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen bg-background"
        >
            <LogisticsHero />
            <LogisticsProcess />
            
            <section className="py-20 px-6 bg-secondary/10 border-y border-white/5 relative overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <div>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-4 text-textPrimary">
                                Nationwide <span className="text-accent">Fleet Coverage.</span>
                            </h2>
                            <p className="text-textPrimary/60 text-base md:text-lg">
                                Real-time visualization of our intelligent EV logistics infrastructure across major Indian economic hubs.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full max-w-md aspect-square bg-secondary/30 rounded-[2.5rem] border border-white/10 flex items-center justify-center overflow-hidden">
                        <IndiaFleetMap />
                    </div>
                </div>
            </section>

            <LogisticsCompliance />
            <LogisticsCTA />
        </motion.div>
    );
}
