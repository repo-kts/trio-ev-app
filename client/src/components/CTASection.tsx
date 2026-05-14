import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTASection() {
    return (
        <section className="py-20 sm:py-24 md:py-32 px-5 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/5" />

            {/* Breathing Gradient Orb */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-accent/20 blur-[150px] rounded-full pointer-events-none"
            />

            {/* ===== MOBILE LAYOUT (redesigned) ===== */}
            <div className="sm:hidden max-w-md mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-2xl p-7 overflow-hidden"
                >
                    {/* Eyebrow chip */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                                Now Shipping
                            </span>
                        </div>
                    </div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.7 }}
                        className="font-heading text-center text-[34px] font-bold uppercase tracking-tight text-textPrimary leading-[1.05]"
                    >
                        The future runs on{' '}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">
                                Trio
                            </span>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute -bottom-1 left-0 w-full h-[5px] bg-gradient-to-r from-transparent via-accent to-transparent origin-left rounded-full blur-[1px]"
                            />
                        </span>
                    </motion.h2>

                    <p className="mt-5 text-center text-sm text-textPrimary/60 leading-relaxed">
                        Join the riders redefining urban mobility.
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-3">
                        <Link 
                            to="/contact"
                            className="w-fit px-8 py-3 bg-accent text-background font-bold rounded-full text-[11px] uppercase tracking-[0.18em] active:scale-[0.97] transition-transform flex items-center justify-center gap-2 shadow-[0_15px_45px_-10px_rgba(92,240,158,0.5)]"
                        >
                            Contact Us
                            <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
                        </Link>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-7 pt-5 border-t border-white/10 flex justify-center items-center gap-3 text-textPrimary/50 text-[10px] uppercase tracking-[0.18em] font-bold">
                        <span>Free Delivery</span>
                        <span className="w-1 h-1 rounded-full bg-textPrimary/30" />
                        <span>2-Yr Warranty</span>
                        <span className="w-1 h-1 rounded-full bg-textPrimary/30" />
                        <span>30-Day Returns</span>
                    </div>
                </motion.div>
            </div>

            {/* ===== DESKTOP / TABLET LAYOUT (unchanged) ===== */}
            <div className="hidden sm:block max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6 sm:mb-8 text-textPrimary leading-tight"
                >
                    The future runs on <span className="text-accent relative inline-block">
                        Trio.
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                            className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1.5 sm:h-2 bg-accent origin-left rounded-full"
                        />
                    </span> Get it now.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-12"
                >
                    <Link 
                        to="/contact"
                        className="px-7 sm:px-10 py-3.5 sm:py-5 bg-accent text-background font-bold rounded-full text-base sm:text-xl hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
