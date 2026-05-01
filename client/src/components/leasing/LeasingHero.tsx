import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export function LeasingHero() {
    return (
        <section className="relative h-[70vh] w-full flex items-center bg-background overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <BarChart3 size={16} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Enterprise Fleet Solutions</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6 text-textPrimary">
                        Scale Your Fleet.<br />
                        <span className="text-accent">Reduce Costs.</span>
                    </h1>
                    <p className="text-base md:text-lg text-textPrimary/60 mb-10 leading-relaxed max-w-md">
                        Flexible EV leasing designed for growing businesses. Unlock lower operating costs and zero fuel dependency today.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-3.5 bg-accent text-background font-bold uppercase tracking-widest rounded-full hover:bg-accent/90 transition-all text-[11px] shadow-[0_10px_20px_rgba(92,240,158,0.15)]">
                            Get a Custom Plan
                        </button>
                        <button className="px-8 py-3.5 bg-white/5 border border-white/10 text-textPrimary font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all text-[11px]">
                            View Fleet Options
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
