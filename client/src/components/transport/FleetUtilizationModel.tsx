import { motion } from 'framer-motion';
import { Layers, Users, Navigation, TrendingUp } from 'lucide-react';

const flow = [
    {
        icon: Layers,
        label: 'Fleet',
        sub: 'Acquired via leasing capital',
        color: 'border-accent/40 bg-accent/5 text-accent',
    },
    {
        icon: Users,
        label: 'Employees',
        sub: 'Assigned routes & schedules',
        color: 'border-white/15 bg-secondary/30 text-textPrimary',
    },
    {
        icon: Navigation,
        label: 'Trips',
        sub: 'Daily utilisation tracked',
        color: 'border-white/15 bg-secondary/30 text-textPrimary',
    },
    {
        icon: TrendingUp,
        label: 'Revenue',
        sub: 'Per-trip earnings generated',
        color: 'border-accent/40 bg-accent/8 text-accent',
    },
];

const stats = [
    { label: 'Avg. trips / vehicle / day', value: '14' },
    { label: 'Utilisation rate',           value: '87%' },
    { label: 'Cost per km (EV vs diesel)', value: '↓62%' },
    { label: 'Revenue per vehicle / mo',   value: '₹18K' },
];

export function FleetUtilizationModel() {
    return (
        <section className="py-16 md:py-20 px-5 md:px-12 max-w-7xl mx-auto w-full">
            {/* Mobile tag */}
            <div className="md:hidden flex items-center gap-2 mb-4">
                <Layers size={12} className="text-accent" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">Capital Flow</span>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-5 md:gap-8"
            >
                <h2 className="font-heading text-[2rem] md:text-[clamp(36px,5vw,72px)] leading-[0.95] md:leading-[0.9] text-textPrimary">
                    Fleet utilisation<br />
                    <span className="text-accent">model.</span>
                </h2>
                <p className="md:max-w-[300px] text-sm text-textPrimary/55 leading-relaxed">
                    Vehicles acquired through investor capital are immediately deployed for corporate transport — generating daily revenue from day one.
                </p>
            </motion.div>

            {/* Mobile flow — vertical compact list */}
            <div className="md:hidden mb-10 relative">
                <div className="absolute left-[43px] top-10 bottom-10 w-px -translate-x-1/2 bg-gradient-to-b from-accent/40 via-white/10 to-accent/40 pointer-events-none -z-10" />
                <div className="flex flex-col gap-3">
                    {flow.map((node, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                            className={`relative flex items-center gap-4 p-4 rounded-2xl border ${node.color}`}
                        >
                            <div className="w-14 h-14 shrink-0 rounded-xl bg-background/40 border border-white/10 flex items-center justify-center">
                                <node.icon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-heading text-base uppercase tracking-wide leading-none mb-1">{node.label}</div>
                                <div className="text-[11px] opacity-55 leading-snug">{node.sub}</div>
                            </div>
                            <span className="font-mono text-[10px] opacity-40">0{i + 1}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Desktop Flow */}
            <div className="hidden md:flex flex-col md:flex-row items-center gap-4 mb-14">
                {flow.map((node, i) => (
                    <div key={i} className="flex md:flex-col flex-row items-center flex-1 w-full gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.12 }}
                            whileHover={{ y: -5 }}
                            className={`flex flex-col items-center justify-center text-center p-7 rounded-2xl border w-full min-h-[150px] cursor-default transition-all duration-300 ${node.color}`}
                        >
                            <node.icon size={24} className="mb-3 opacity-80" />
                            <div className="font-heading text-xl uppercase tracking-wide mb-1">{node.label}</div>
                            <div className="text-[11px] opacity-55 leading-snug">{node.sub}</div>
                        </motion.div>

                        {/* Arrow connector */}
                        {i < flow.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.12 }}
                                className="flex-shrink-0 flex items-center justify-center w-10 h-10"
                            >
                                <svg viewBox="0 0 40 40" className="w-8 h-8 rotate-90 md:rotate-0">
                                    <motion.path
                                        d="M4 20 L32 20"
                                        stroke="#5cf09e" strokeWidth="1.5" strokeLinecap="round" fill="none"
                                        strokeDasharray="5 3"
                                        animate={{ strokeDashoffset: [0, -16] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                    />
                                    <path d="M26 14 L34 20 L26 26" stroke="#5cf09e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="p-4 md:p-6 rounded-2xl border border-white/8 bg-secondary/15 flex flex-col gap-1.5 md:gap-2"
                    >
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-textPrimary/35 leading-tight">{s.label}</span>
                        <span className="font-heading text-xl md:text-2xl text-accent">{s.value}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
