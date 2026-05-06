import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';

export function LogisticsCTA() {
    return (
        <section className="py-40 px-6 relative overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px]" />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-10"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-accent/40" />
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">Scale with Trio</span>
                        <div className="h-px w-12 bg-accent/40" />
                    </div>

                    <h2 className="text-5xl md:text-7xl font-heading font-bold text-textPrimary tracking-tight">
                        SCALE YOUR <br />
                        <span className="text-accent underline decoration-accent/20 underline-offset-8">INFRASTRUCTURE.</span>
                    </h2>

                    <p className="text-textPrimary/50 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
                        Partner with TRIO EV to modernize fleet operations, charging coordination, and sustainable transportation systems.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                        <button className="group px-12 py-6 bg-accent text-background font-bold rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(92,240,158,0.2)] flex items-center gap-3">
                            Talk to Operations
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="group px-12 py-6 bg-secondary/60 backdrop-blur-xl border border-white/10 text-textPrimary font-bold rounded-full text-sm uppercase tracking-widest hover:bg-secondary transition-all hover:scale-105 flex items-center gap-3">
                            <Globe size={18} className="text-accent" />
                            Explore EV Network
                        </button>
                    </div>


                </motion.div>
            </div>
            
            {/* Abstract visual elements */}
            <div className="absolute left-10 bottom-20 w-32 h-px bg-white/5" />
            <div className="absolute left-10 bottom-10 w-px h-32 bg-white/5" />
            <div className="absolute right-10 top-20 w-32 h-px bg-white/5" />
            <div className="absolute right-10 top-10 w-px h-32 bg-white/5" />
        </section>
    );
}
