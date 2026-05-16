import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const audiences = [
    {
        idx: '01',
        title: 'THE INDEPENDENT DRIVER',
        desc: 'You work on your own terms. Your schedule changes week to week. You need a vehicle that shows up when you do — without locking you into an EMI or a lease you didnt ask for.',
        shortDesc: 'A vehicle that shows up when you do — no EMI, no lease.',
        icon: (size: number) => (
            <svg className="text-accent" width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="16" />
                <path d="M24 14v10l7 4" />
            </svg>
        ),
    },
    {
        idx: '02',
        title: 'THE DAILY COMMUTER',
        desc: 'You know exactly when you need a vehicle and when you dont. Early mornings, late nights, the gaps public transport leaves behind. Pay for those hours. Not the rest.',
        shortDesc: 'Pay for the hours you ride. Not the rest.',
        icon: (size: number) => (
            <svg className="text-accent" width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="8" y="10" width="32" height="28" rx="2" />
                <path d="M8 18h32M16 26h8M16 30h6" />
            </svg>
        ),
    },
    {
        idx: '03',
        title: 'THE OCCASIONAL TRAVELLER',
        desc: 'Not every trip needs a car you own. Family visits, weekend plans, a day outside the city — rent what you need, go where you want, return it when you are back.',
        shortDesc: 'Rent what you need. Go. Return. Done.',
        icon: (size: number) => (
            <svg className="text-accent" width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 36 L20 14 L28 24 L34 18 L40 36 Z" />
                <circle cx="32" cy="14" r="3" />
                <path d="M6 40h36" />
            </svg>
        ),
    },
];

function MobileCardStack() {
    const [order, setOrder] = useState([0, 1, 2]);
    const [paused, setPaused] = useState(false);

    const advance = () => setOrder((o) => [...o.slice(1), o[0]]);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setOrder((o) => [...o.slice(1), o[0]]);
        }, 4000);
        return () => clearInterval(id);
    }, [paused]);

    const pauseBriefly = () => {
        setPaused(true);
        setTimeout(() => setPaused(false), 6000);
    };

    return (
        <div className="md:hidden">
            <div className="relative h-[340px] mb-6">
                {order.map((cardIdx, stackPos) => {
                    const aud = audiences[cardIdx];
                    const isFront = stackPos === 0;
                    return (
                        <motion.div
                            key={cardIdx}
                            drag={isFront ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.6}
                            onDragStart={() => setPaused(true)}
                            onDragEnd={(_, info) => {
                                if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
                                    advance();
                                }
                                pauseBriefly();
                            }}
                            animate={{
                                scale: 1 - stackPos * 0.05,
                                y: stackPos * 16,
                                zIndex: 10 - stackPos,
                            }}
                            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                            whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                            className="absolute inset-x-0 top-0 rounded-[1.5rem] overflow-hidden bg-secondary border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
                            style={{ touchAction: isFront ? 'pan-y' : 'auto' }}
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                            {/* Ambient glow */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative p-6">
                                {/* Header row */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/25 to-accent/5 border border-accent/30 flex items-center justify-center backdrop-blur-sm">
                                            {aud.icon(22)}
                                        </div>
                                        <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl -z-10" />
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-heading text-2xl font-black text-accent leading-none">
                                            {aud.idx}
                                        </span>
                                        <span className="text-[9px] uppercase tracking-[0.25em] text-textPrimary/40 font-bold">
                                            / 03
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="h-1 w-1 rounded-full bg-accent" />
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
                                        Persona {aud.idx}
                                    </span>
                                </div>

                                <h4 className="text-base font-bold uppercase tracking-wide text-textPrimary mb-2">
                                    {aud.title}
                                </h4>
                                <p className="text-xs text-textPrimary/55 leading-relaxed">
                                    {aud.shortDesc}
                                </p>

                                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[9px] uppercase tracking-[0.25em] text-textPrimary/35 font-bold">
                                        Swipe to explore
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-accent font-bold">
                                        Rent now
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Pagination dots + nav */}
            <div className="flex items-center justify-center gap-3">
                {audiences.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (i !== order[0]) {
                                const rest = audiences.map((_, idx) => idx).filter((idx) => idx !== i);
                                setOrder([i, ...rest]);
                                pauseBriefly();
                            }
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                            i === order[0] ? 'w-8 bg-accent' : 'w-1.5 bg-textPrimary/20'
                        }`}
                        aria-label={`Show persona ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export function RentalAudience() {
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
                <h2 className="font-heading text-[clamp(36px,9vw,72px)] md:text-[clamp(36px,5vw,72px)] leading-[0.9] uppercase text-textPrimary">
                    Who it's <span className="text-accent">for.</span>
                </h2>
                <p className="md:max-w-[300px] text-sm text-textPrimary/60 leading-relaxed">
                    If you need a vehicle for a few hours — not a lifetime commitment — this is built for you.
                </p>
            </motion.div>

            <MobileCardStack />

            {/* ───── DESKTOP: original full cards (unchanged) ───── */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-5">
                {audiences.map((aud, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                        whileHover={{ y: -6 }}
                        className="group relative bg-secondary/30 border border-white/8 rounded-3xl p-9 min-h-[260px] flex flex-col justify-between overflow-hidden transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                        {aud.icon(48)}

                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-textPrimary/40">— {aud.idx}</span>
                            <h4 className="font-heading text-3xl uppercase leading-tight mt-2 mb-3 text-textPrimary whitespace-pre-line">
                                {aud.title}
                            </h4>
                            <p className="text-sm text-textPrimary/55 leading-relaxed">{aud.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
