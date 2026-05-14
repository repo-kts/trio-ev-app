import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const subItems = [
    { idx: '— 02', title: 'NO LONG TERM COMMITMENT', desc: 'No EMI stretching across years. No insurance renewals. No service appointments. Use it for your hours and walk away with nothing owed.', bg: 'bg-secondary/40 border border-white/8' },
    { idx: '— 03', title: 'NO OWNERSHIP BURDEN', desc: 'A vehicle sitting idle costs money every single day. Renting means you only pay when you actually need to move.', bg: 'bg-secondary border border-white/5' },
    { idx: '— 04', title: 'CLEAN BY DEFAULT', desc: 'Every vehicle runs on electric. No fuel costs eating into your day. No emissions. Just a fully charged vehicle ready to go.', bg: 'bg-secondary/40 border border-white/8' },
    { idx: '— 05', title: 'ON YOUR SCHEDULE', desc: 'Morning. Afternoon. Late night. There are no fixed windows and no minimum days. Rent when it makes sense for you — not when it suits someone else.', bg: 'bg-secondary border border-white/5' },
];

function MobileCarousel() {
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
        <>
            <div className="-mx-5">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-10 no-scrollbar"
                >
                    {subItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className={`snap-center shrink-0 w-[82%] rounded-[2rem] p-7 flex flex-col justify-between min-h-[240px] shadow-xl border border-white/5 ${item.bg} backdrop-blur-md`}
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-textPrimary/20 font-bold">{item.idx}</span>
                                <div className="h-1 w-8 rounded-full bg-accent/20" />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <h4 className="font-heading text-lg uppercase leading-tight text-textPrimary font-bold tracking-tight">{item.title}</h4>
                                <p className="text-[13.5px] text-textPrimary/45 leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
                {subItems.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to card ${i + 1}`}
                        className={`h-1 rounded-full transition-all ${
                            i === active ? 'w-12 bg-accent' : 'w-2 bg-white/15'
                        }`}
                    />
                ))}
            </div>
        </>
    );
}

export function RentalWhyHourly() {
    return (
        <section className="py-16 sm:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 md:gap-8"
            >
                <h2 className="font-heading text-[clamp(34px,9vw,68px)] md:text-[clamp(36px,5vw,68px)] leading-[0.9] uppercase text-textPrimary">
                    Why SHORT-TERM<br />
                    <span className="text-accent">rentals work.</span>
                </h2>
                <p className="md:max-w-[300px] text-sm text-textPrimary/60 leading-relaxed">
                    Five reasons people are choosing to rent over own.
                </p>
            </motion.div>

            {/* ───── MOBILE: hero tile + horizontal snap carousel ───── */}
            <div className="md:hidden">
                {/* Hero green tile */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7 }}
                    className="bg-accent rounded-[2rem] p-8 flex flex-col justify-between min-h-[220px] overflow-hidden relative mb-6 shadow-[0_20px_50px_rgba(92,240,158,0.15)]"
                >
                    {/* decorative background patterns */}
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <span className="font-heading text-9xl font-black leading-none text-black">01</span>
                    </div>
                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/5 blur-3xl" />

                    <div className="flex items-center justify-between relative z-10">
                        <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-black/40 font-black">— Priority One</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-black/30 animate-pulse" />
                    </div>
                    
                    <div className="relative z-10">
                        <h4 className="text-2xl sm:text-3xl font-bold uppercase leading-tight text-[#0a0a0a]">
                            PAY ONLY FOR<br />THE TIME YOU NEED.
                        </h4>
                    </div>
                </motion.div>

                <MobileCarousel />
            </div>

            {/* ───── DESKTOP: original bento (unchanged) ───── */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7 }}
                    className="col-span-1 sm:col-span-2 md:col-span-2 row-span-1 md:row-span-2 bg-accent rounded-3xl p-10 flex flex-col justify-between min-h-[240px] md:min-h-[460px] overflow-hidden relative group"
                >
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-black/45">— 01</span>
                    <h4 className="font-heading text-[clamp(32px,5vw,48px)] uppercase leading-tight text-[#0a0a0a]">
                        PAY ONLY FOR THE TIME YOU NEED.
                    </h4>
                </motion.div>

                {subItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                        whileHover={{ y: -4 }}
                        className={`col-span-1 sm:col-span-1 md:col-span-2 rounded-3xl p-10 flex flex-col justify-between min-h-[220px] ${item.bg} transition-transform duration-300`}
                    >
                        <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-textPrimary/40">{item.idx}</span>
                        <div className="flex flex-col gap-3">
                            <h4 className="font-heading text-2xl uppercase leading-tight text-textPrimary">{item.title}</h4>
                            <p className="text-sm text-textPrimary/50 leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
