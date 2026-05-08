import { motion } from 'framer-motion';

const plans = [
    {
        idx: '— 01',
        badge: 'Short Trip',
        hours: '12',
        title: 'FOR THE SHORT RUN',
        desc: 'Enough time to get where you need to go, do what you need to do, and be back before the day ends.',
        dark: false,
    },
    {
        idx: '— 02',
        badge: 'THE DAY SHIFT',
        hours: '16',
        title: 'FOR A FULL DAY OUT',
        desc: 'A solid block of time that covers your morning, your afternoon, and gets you home before midnight.',
        dark: true,
    },
    {
        idx: '— 03',
        badge: 'EXTENDED DAY',
        hours: '20',
        title: 'FOR THE LONG RUN',
        desc: ' Early starts, late finishes, and everything that falls in between — covered without having to watch the clock.',
        dark: false,
    },
    {
        idx: '— 04',
        badge: 'OVERNIGHT',
        hours: '25',
        title: 'FOR THE FULL STRETCH',
        desc: "Take it out today. Use it through the night. Return it tomorrow. No rushing. No cutoffs. Your time.",
        dark: true,
    },
];

export function RentalPlans() {
    return (
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8"
            >
                <h2 className="font-heading text-[clamp(40px,7vw,80px)] leading-[0.92] uppercase text-textPrimary">
                    Pick a plan that<br />
                    <span className="text-accent">fits your day.</span>
                </h2>
                <p className="md:max-w-[300px] text-sm text-textPrimary/60 leading-relaxed">
                    Four shifts. One fleet. Pick what works for your day and go.                </p>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.badge}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                        whileHover={{ y: -6 }}
                        className={`
                            relative rounded-3xl p-8 flex flex-col justify-between min-h-[340px] overflow-hidden border transition-all duration-300 cursor-pointer group
                            ${plan.dark
                                ? 'bg-secondary border-white/5 text-textPrimary'
                                : 'bg-secondary/30 border-white/8 text-textPrimary'
                            }
                        `}
                    >
                        {/* Hover accent glow */}
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                        {/* Top row */}
                        <div className="flex justify-between items-start">
                            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-textPrimary/40">{plan.idx}</span>
                            <span className="font-sans text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 text-textPrimary/50">
                                {plan.badge}
                            </span>
                        </div>

                        {/* Hours + Info */}
                        <div>
                            <div className="flex items-baseline gap-2 mt-6 mb-1">
                                <span className="font-heading leading-none text-accent" style={{ fontSize: 'clamp(64px, 8vw, 84px)' }}>
                                    {plan.hours}
                                </span>
                                <span className="font-sans text-[18px] uppercase tracking-widest text-textPrimary/40 font-bold">hrs</span>
                            </div>
                            <h3 className="font-heading text-xl uppercase tracking-wider mb-2 text-textPrimary">{plan.title}</h3>
                            <p className="text-sm text-textPrimary/50 leading-relaxed">{plan.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
