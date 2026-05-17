import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

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

function PlansMobileCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const children = Array.from(el.children) as HTMLElement[];
        if (children.length === 0) return;
        const center = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        children.forEach((child, i) => {
            const childCenter = child.offsetLeft + child.clientWidth / 2;
            const dist = Math.abs(center - childCenter);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        if (closest !== active) setActive(closest);
    };

    const goTo = (i: number) => {
        const el = scrollRef.current;
        if (!el) return;
        const child = el.children[i] as HTMLElement | undefined;
        if (!child) return;
        el.scrollTo({
            left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
            behavior: 'smooth',
        });
    };

    return (
        <div className="sm:hidden">
            <div className="-mx-5">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-5 pb-8 no-scrollbar"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.badge}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative snap-center shrink-0 w-[85%] rounded-3xl p-6 flex flex-col min-h-[340px] bg-secondary/50 border border-white/5 backdrop-blur-md"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[10px] uppercase tracking-widest text-accent font-bold px-2 py-1 rounded bg-accent/10 border border-accent/20">
                                    {plan.badge}
                                </span>
                                <span className="text-[10px] text-textPrimary/20 font-bold">{plan.idx}</span>
                            </div>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-6xl font-bold text-accent tracking-tighter">
                                    {plan.hours}
                                </span>
                                <span className="text-sm uppercase tracking-widest text-textPrimary/30 font-bold">Hours</span>
                            </div>

                            <h3 className="text-lg font-bold uppercase tracking-wide text-textPrimary mb-3 leading-tight">
                                {plan.title}
                            </h3>
                            <p className="text-sm text-textPrimary/40 leading-relaxed flex-grow">{plan.desc}</p>

                            <button className="mt-6 w-full py-4 rounded-xl bg-accent text-background text-xs font-bold uppercase tracking-widest">
                                Book Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
                {plans.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to plan ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                            i === active ? 'w-8 bg-accent' : 'w-2 bg-textPrimary/15'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export function RentalPlans() {
    return (
        <section className="py-16 sm:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 md:gap-8"
            >
                <h2 className="font-heading text-[clamp(36px,9vw,80px)] md:text-[clamp(40px,7vw,80px)] leading-[0.92] uppercase text-textPrimary">
                    Pick a plan that<br />
                    <span className="text-accent">fits your day.</span>
                </h2>
                <p className="md:max-w-[300px] text-sm text-textPrimary/60 leading-relaxed">
                    Four shifts. One fleet. Pick what works for your day and go.
                </p>
            </motion.div>

            {/* ───── MOBILE: snap carousel ───── */}
            <PlansMobileCarousel />


            {/* ───── DESKTOP: original grid (unchanged from sm+) ───── */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
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
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                        <div className="flex justify-between items-start">
                            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-textPrimary/40">{plan.idx}</span>
                            <span className="font-sans text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 text-textPrimary/50">
                                {plan.badge}
                            </span>
                        </div>

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
