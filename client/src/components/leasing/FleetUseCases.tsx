import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Navigation } from 'lucide-react';

const useCases = [
    {
        icon: Building2,
        tag: '— Corporate Transport',
        title: 'Enterprise Fleet Operations',
        desc: 'Leased EVs serve as the backbone of corporate shuttle and last-mile transport networks for large companies. Vehicles are tracked, managed and optimised for maximum coverage and efficiency.',
        metrics: [
            { label: 'Avg. Daily Trips', value: '12–18' },
            { label: 'Coverage Area', value: '40 km' },
        ],
        highlight: true,
        num: '01',
        image: '/assets/cinematic/enterprise_fleet.png'
    },
    {
        icon: Users,
        tag: '— Employee Commute',
        title: 'Staff Mobility Services',
        desc: 'Scheduled pick-up and drop-off routes for employee commutes. Vehicles are deployed in fixed shifts — morning, afternoon and evening — with predictable utilisation.',
        metrics: [
            { label: 'Shift Coverage', value: '3× /day' },
            { label: 'Utilisation', value: '85%+' },
        ],
        highlight: false,
        num: '02',
        image: '/assets/cinematic/staff_mobility.png'
    },
    {
        icon: Navigation,
        tag: '— Mobility Operations',
        title: 'Urban Mobility Network',
        desc: 'Integrated into city mobility ecosystems to power last-mile connectivity across residential, commercial and industrial zones. Creating cleaner, smarter and green urban transport.',
        metrics: [
            { label: 'Platform Type', value: 'Multi-use' },
            { label: 'Revenue Model', value: 'Per-km' },
        ],
        highlight: false,
        num: '03',
        image: '/assets/cinematic/urban_mobility.png'
    },
];


function FleetUseCasesStack() {
    const [order, setOrder] = useState([0, 1, 2]);
    const [paused, setPaused] = useState(false);

    const advance = () => setOrder((o) => [...o.slice(1), o[0]]);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setOrder((o) => [...o.slice(1), o[0]]);
        }, 4500);
        return () => clearInterval(id);
    }, [paused]);

    const pauseBriefly = () => {
        setPaused(true);
        setTimeout(() => setPaused(false), 6000);
    };

    return (
        <div className="md:hidden px-5">
            <div className="relative h-[400px] mb-6">
                {order.map((cardIdx, stackPos) => {
                    const uc = useCases[cardIdx];
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
                            className={`absolute inset-x-0 top-0 rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border ${uc.highlight
                                    ? 'bg-secondary border-accent/30'
                                    : 'bg-secondary border-white/10'
                                }`}
                            style={{ touchAction: isFront ? 'pan-y' : 'auto' }}
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                            {/* Ambient glow */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                            {/* Faded big number watermark */}
                            <span className="absolute top-6 right-5 font-heading text-[80px] font-bold leading-none text-white/[0.05] select-none pointer-events-none">
                                {uc.num}
                            </span>

                            <div className="relative p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-accent ${uc.highlight ? 'bg-accent/20 border border-accent/40' : 'bg-accent/10 border border-accent/25'
                                        }`}>
                                        <uc.icon size={20} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
                                        {uc.tag.replace('— ', '')}
                                    </span>
                                </div>

                                <h3 className="font-heading text-lg uppercase leading-tight text-textPrimary mb-3">
                                    {uc.title}
                                </h3>
                                <p className="text-sm text-textPrimary/55 leading-relaxed mb-5">
                                    {uc.desc}
                                </p>

                                <div className="flex gap-6 pt-4 border-t border-white/8">
                                    {uc.metrics.map((m, j) => (
                                        <div key={j} className="flex flex-col gap-1">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-textPrimary/35 font-bold">{m.label}</span>
                                            <span className="font-heading text-base text-accent font-bold leading-none">{m.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[9px] uppercase tracking-[0.25em] text-textPrimary/35 font-bold">
                                        Swipe to explore
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent/70 font-bold">
                                        {uc.num} / 03
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex items-center justify-center gap-3">
                {useCases.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (i !== order[0]) {
                                const rest = useCases.map((_, idx) => idx).filter((idx) => idx !== i);
                                setOrder([i, ...rest]);
                                pauseBriefly();
                            }
                        }}
                        className={`h-1.5 rounded-full transition-all ${i === order[0] ? 'w-10 bg-accent' : 'w-1.5 bg-textPrimary/20'
                            }`}
                        aria-label={`Show use case ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export function FleetUseCases() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="py-20 md:py-20 md:px-12 max-w-7xl mx-auto w-full relative bg-background">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-12 px-5 md:px-0"
            >
                <div className="max-w-3xl">
                    <h2 className="font-heading text-5xl md:text-7xl text-textPrimary leading-[0.9] tracking-tighter uppercase">
                        HOW THE FLEET <br />
                        <span className="text-accent">IS USED.</span>
                    </h2>
                </div>
                <div className="md:max-w-[320px]">
                    <p className="text-sm md:text-base text-textSecondary font-medium leading-relaxed">
                        Every leased vehicle is deployed in one or more of these operations — generating daily revenue.
                    </p>
                </div>
            </motion.div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 px-5 md:px-0">
                {useCases.map((uc, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group relative rounded-[28px] p-8 flex flex-col gap-6 border border-white/10 bg-[#0A0A0A] transition-all duration-500 hover:border-white/20"
                    >
                        <div className="absolute inset-0 bg-accent/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px] pointer-events-none" />

                        {/* Header: Icon + Tag */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-accent/10 text-accent border border-accent/20">
                                <uc.icon size={20} strokeWidth={1.75} />
                            </div>
                            <span className="text-[11px] uppercase tracking-[0.25em] text-textSecondary/60 font-sans font-medium">
                                {uc.tag}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-lg lg:text-xl font-sans font-medium text-textPrimary leading-tight uppercase tracking-normal whitespace-nowrap">
                                {uc.title}
                            </h3>
                            <p className="text-textSecondary/70 text-sm leading-relaxed">
                                {uc.desc}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-white/5" />

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            {uc.metrics.map((m, j) => (
                                <div key={j} className="flex flex-col gap-1.5">
                                    <span className="text-[10px] uppercase tracking-widest text-textSecondary/40 font-sans">
                                        {m.label}
                                    </span>
                                    <span className="text-lg font-sans font-medium text-accent">
                                        {m.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>


            <FleetUseCasesStack />
        </section>
    );
}


