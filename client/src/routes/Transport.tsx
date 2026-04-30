import { motion } from 'framer-motion';
import { TransportHero } from '../components/transport/TransportHero';
import { SmartNetworkVisual } from '../components/transport/SmartNetworkVisual';
import { TransportFeatures } from '../components/transport/TransportFeatures';
import { AdminDashboardSim } from '../components/transport/AdminDashboardSim';
import { TransportCaseStudy } from '../components/transport/TransportCaseStudy';

export function Transport() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen bg-background"
        >
            <TransportHero />
            <SmartNetworkVisual />
            <AdminDashboardSim />
            <TransportFeatures />
            <TransportCaseStudy />
            
            {/* Final CTA */}
            <div className="py-32 px-6 text-center border-t border-white/5 bg-secondary/5">
                <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8 tracking-tight">Ready to <span className="text-accent">Automate?</span></h2>
                <button className="px-12 py-5 bg-accent text-background font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(92,240,158,0.2)] text-[11px]">
                    Request System Demo
                </button>
            </div>
        </motion.div>
    );
}
