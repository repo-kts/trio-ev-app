import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CreditCard, Wrench, PowerOff } from 'lucide-react';

const COMPLIANCE_ITEMS = [
    { 
        title: "Term Duration", 
        icon: FileText, 
        desc: "Minimum 3 year lease with flexible renewal options available at end of term." 
    },
    { 
        title: "Payment Terms", 
        icon: CreditCard, 
        desc: "Monthly payments due within 5 days of billing. Late payments may incur penalties." 
    },
    { 
        title: "Maintenance", 
        icon: Wrench, 
        desc: "Lessee handles routine upkeep to keep the vehicle in good condition throughout the lease." 
    },
    { 
        title: "Termination", 
        icon: PowerOff, 
        desc: "Either party can terminate with 90-day notice and settlement of all outstanding dues." 
    }
];

function ComplianceMobileStack() {
    const [order, setOrder] = useState([0, 1, 2, 3]);
    const [paused, setPaused] = useState(false);

    const advance = () => setOrder((o) => [...o.slice(1), o[0]]);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(advance, 4500);
        return () => clearInterval(id);
    }, [paused]);

    const pauseBriefly = () => {
        setPaused(true);
        setTimeout(() => setPaused(false), 6000);
    };

    return (
        <div className="md:hidden">
            <div className="relative h-[320px] mb-6">
                {order.map((cardIdx, stackPos) => {
                    const item = COMPLIANCE_ITEMS[cardIdx];
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
                                y: stackPos * 14,
                                zIndex: 10 - stackPos,
                                opacity: stackPos > 2 ? 0 : 1,
                            }}
                            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                            whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
                            className="absolute inset-x-0 top-0 rounded-3xl overflow-hidden border border-white/10 bg-secondary shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
                            style={{ touchAction: isFront ? 'pan-y' : 'auto' }}
                        >
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                            <span className="absolute top-5 right-5 font-heading text-[80px] font-bold leading-none text-white/[0.05] select-none pointer-events-none">
                                {String(cardIdx + 1).padStart(2, '0')}
                            </span>

                            <div className="relative p-6">
                                <div className="p-3 rounded-xl bg-background border border-white/10 w-fit mb-5">
                                    <item.icon className="text-accent w-5 h-5" />
                                </div>
                                <h3 className="font-heading text-xl uppercase text-textPrimary mb-3 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-textPrimary/55 text-sm leading-relaxed">
                                    {item.desc}
                                </p>

                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[9px] uppercase tracking-[0.25em] text-textPrimary/35 font-bold">
                                        Swipe to explore
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent/70 font-bold">
                                        {String(cardIdx + 1).padStart(2, '0')} / {String(COMPLIANCE_ITEMS.length).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex items-center justify-center gap-2">
                {COMPLIANCE_ITEMS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (i !== order[0]) {
                                const rest = COMPLIANCE_ITEMS.map((_, idx) => idx).filter((idx) => idx !== i);
                                setOrder([i, ...rest]);
                                pauseBriefly();
                            }
                        }}
                        className={`h-1.5 rounded-full transition-all ${i === order[0] ? 'w-8 bg-accent' : 'w-1.5 bg-textPrimary/20'}`}
                        aria-label={`Show item ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export function LogisticsCompliance() {
    return (
        <section className="py-16 md:py-32 px-5 md:px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-24">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                    >
                        Legal Framework
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-heading text-[2rem] md:text-5xl font-bold text-textPrimary mb-4 md:mb-6 leading-[0.95]"
                    >
                        LEGAL AGREEMENT <span className="text-accent">HIGHLIGHTS.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-textPrimary/50 max-w-2xl mx-auto text-sm md:text-lg font-medium px-2"
                    >
                        Key points to understand in your EV leasing legal agreement for a transparent and secure partnership.
                    </motion.p>
                </div>

                {/* Mobile: swipeable flash-card stack */}
                <ComplianceMobileStack />

                {/* Desktop: grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {COMPLIANCE_ITEMS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-5 md:p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:bg-secondary/50 transition-all duration-500 overflow-hidden"
                        >
                            {/* Animated Background Highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="p-3 rounded-xl bg-background border border-white/5 w-fit mb-5 md:mb-8 group-hover:border-accent/20 transition-colors">
                                    <item.icon className="text-textPrimary/60 group-hover:text-accent transition-colors duration-500 w-5 h-5 md:w-6 md:h-6" />
                                </div>

                                <h3 className="text-lg md:text-xl font-heading font-bold text-textPrimary mb-2 md:mb-4 flex items-center gap-2">
                                    {item.title}
                                    <div className="h-px w-0 bg-accent group-hover:w-8 transition-all duration-500" />
                                </h3>

                                <p className="text-textPrimary/40 text-[13px] md:text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Thin bottom separator highlight */}
                            <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-white/5 group-hover:bg-accent/40 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
