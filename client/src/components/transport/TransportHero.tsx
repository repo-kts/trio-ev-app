import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

export function TransportHero() {
    return (
        <section className="relative min-h-[88vh] md:h-[80vh] w-full flex items-center bg-background overflow-hidden border-b border-white/5 pt-24 pb-12 md:pt-0 md:pb-0">
            {/* Animated Grid/Network Background */}
            <div className="absolute inset-0 z-0">
                {/* Accent glow — mobile: top-left for visual anchor, desktop: center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(92,240,158,0.10)_0%,transparent_55%)] md:bg-[radial-gradient(circle_at_50%_50%,rgba(92,240,158,0.05)_0%,transparent_50%)]" />
                {/* Grid — denser & slightly brighter on mobile */}
                <div className="absolute inset-0 md:hidden" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
                <div className="absolute inset-0 hidden md:block" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                {/* Edge vignette so grid fades softly */}
                <div className="absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,13,12,0.85)_100%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    <div className="flex items-center gap-2 mb-5 sm:mb-6">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <Network size={16} />
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Safe · Reliable · Corporate</span>
                    </div>
                    <h1 className="font-heading text-[2rem] sm:text-4xl md:text-6xl font-bold leading-[1.05] sm:leading-[1] mb-5 sm:mb-6 text-textPrimary tracking-tight">
                        Transport that<br />
                        <span className="text-accent">puts people first.</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-textPrimary/60 mb-8 sm:mb-10 leading-relaxed max-w-md">
                        From corporate commutes to women's late-night safety — Trio provides reliable, EV-powered transport for every journey that matters.
                    </p>

                    <div className="flex flex-row flex-wrap gap-2.5 sm:gap-4">
                        <button className="px-4 sm:px-8 py-2.5 sm:py-4 bg-accent text-background font-bold uppercase tracking-widest rounded-full hover:bg-accent/90 transition-all text-[10px] sm:text-xs shadow-[0_15px_30px_rgba(92,240,158,0.2)]">
                            Deploy Smart Fleet
                        </button>
                        <button
                            onClick={() => document.getElementById('corporate-mobility-network')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-4 sm:px-8 py-2.5 sm:py-4 bg-white/5 border border-white/10 text-textPrimary font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all text-[10px] sm:text-xs"
                        >
                            View Simulation
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
