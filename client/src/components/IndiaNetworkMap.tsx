import { motion } from 'framer-motion';

const stats = [
    { label: "Vehicles", value: "100+" },
    { label: "Years", value: "4" },
    { label: "Cities", value: "3" },
    { label: "Network", value: "1" }
];

export function IndiaNetworkMap() {
    const apiBase = import.meta.env.VITE_API_URL ?? '';
    const iframeSrc = `/IndiaMap.html?api=${encodeURIComponent(apiBase)}`;
    return (
        <section id="network" className="py-12 sm:py-16 md:py-24 px-5 sm:px-6 md:px-12 bg-secondary/20 border-y border-secondary/50 overflow-hidden">
            {/* ──────── MOBILE LAYOUT (compact, dashboard-style) ──────── */}
            {/* ──────── MOBILE LAYOUT (compact, dashboard-style) ──────── */}
            <div className="lg:hidden">
                {/* Tiny eyebrow pill */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-5"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                        </span>
                        <span className="text-[10px] font-heading tracking-[0.15em] uppercase text-accent font-bold">Network Status: Live</span>
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 px-4"
                >
                    <h2 className="text-3xl font-bold uppercase mb-1 text-textPrimary leading-none">
                        THE GRID IS <span className="text-accent">SPREADING</span>
                    </h2>
                    <p className="text-textPrimary/40 text-[10px] uppercase tracking-widest mx-auto">
                        Three cities live · More coming
                    </p>
                </motion.div>

                {/* Map - Integrated (no box) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[400px] aspect-square mx-auto mb-4 flex items-center justify-center overflow-visible"
                >
                    <iframe
                        src={iframeSrc}
                        title="India Network Map"
                        className="w-full h-full border-none outline-none block pointer-events-auto"
                        scrolling="no"
                    />
                </motion.div>

                {/* Stat Row — Single line for maximum premium feel */}
                <div className="relative w-full">
                    <div className="flex flex-row items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-2">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center min-w-[80px] shrink-0"
                            >
                                <div className="text-2xl font-bold text-accent leading-none mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-[8px] text-textPrimary/30 uppercase tracking-[0.2em] font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ──────── DESKTOP LAYOUT (unchanged) ──────── */}
            <div className="hidden lg:block max-w-7xl mx-auto">
                <div className="flex flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4 text-textPrimary">
                                THE GRID IS SPREADING
                            </h2>
                            <p className="text-textPrimary/60 text-lg">
                                Three cities live. More coming. Every vehicle we add, every city we enter, every client we serve makes the Trio network stronger for everyone inside it
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-secondary">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="text-3xl font-heading font-bold text-accent mb-1">{stat.value}</div>
                                    <div className="text-sm text-textPrimary/60 uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full max-w-lg aspect-square bg-secondary/30 rounded-[3rem] border border-secondary flex items-center justify-center overflow-hidden"
                    >
                        <iframe
                            src={iframeSrc}
                            title="India Network Map"
                            className="absolute inset-0 w-full h-full border-none outline-none block"
                            scrolling="no"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
