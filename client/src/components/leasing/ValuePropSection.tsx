import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TrendingDown, Zap, ShieldCheck, Layers } from 'lucide-react';

const benefits = [
    {
        icon: TrendingDown,
        title: "Lower Operating Cost",
        desc: "Save up to 40% on monthly overhead compared to traditional diesel fleets."
    },
    {
        icon: Zap,
        title: "Zero Fuel Dependency",
        desc: "Shield your business from fluctuating fuel prices with stable electric costs."
    },
    {
        icon: ShieldCheck,
        title: "Maintenance Included",
        desc: "Full service and maintenance coverage included in your monthly lease."
    },
    {
        icon: Layers,
        title: "Scalable Fleet",
        desc: "Add or remove vehicles as your business needs evolve without capital risk."
    }
];

function FloatingCard({
    item,
    index,
    parallaxOffset,
    className,
    featured = false,
    accent = false,
}: {
    item: typeof benefits[number];
    index: number;
    rotation?: number;
    parallaxOffset: number;
    className?: string;
    featured?: boolean;
    accent?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97, rotate: 0 }}
            className={`
                relative rounded-3xl backdrop-blur-xl
                ${accent
                    ? 'bg-gradient-to-br from-accent/25 via-accent/8 to-transparent border border-accent/40'
                    : 'bg-gradient-to-br from-secondary/70 via-secondary/40 to-secondary/10 border border-white/10'
                }
                shadow-[0_25px_60px_-20px_rgba(0,0,0,0.7),0_0_25px_-5px_rgba(0,255,153,0.15)]
                ${featured ? 'p-6' : 'p-5'}
                ${className ?? ''}
            `}
        >
            {/* Soft ambient glow behind icon */}
            <div className="absolute top-3 left-3 w-20 h-20 rounded-full bg-accent/25 blur-3xl pointer-events-none" />

            {/* Step indicator */}
            <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-[0.25em] text-accent/60">
                0{index + 1}
            </span>

            {/* Icon with neon halo */}
            <div className="relative inline-flex">
                <div className="absolute inset-0 bg-accent/40 rounded-xl blur-xl" />
                <div className={`
                    relative w-12 h-12 rounded-xl flex items-center justify-center text-accent
                    ${accent
                        ? 'bg-accent/20 border border-accent/40'
                        : 'bg-accent/15 border border-accent/25'
                    }
                    shadow-[0_0_20px_-4px_rgba(0,255,153,0.6)]
                `}>
                    <item.icon size={featured ? 26 : 22} />
                </div>
            </div>

            <h3 className={`mt-4 font-bold text-textPrimary leading-tight ${featured ? 'text-xl' : 'text-lg'}`}>
                {item.title}
            </h3>
            <p className={`mt-2 text-textPrimary/55 leading-relaxed ${featured ? 'text-sm' : 'text-sm'}`}>
                {item.desc}
            </p>

            {/* Inner highlight edge */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />
        </motion.div>
    );
}

export function ValuePropSection() {
    return (
        <section className="py-16 md:py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
            {/* ───── MOBILE: floating asymmetric bento ───── */}
            <div className="md:hidden relative">
                {/* Ambient backdrop glow */}
                <div className="absolute inset-x-0 top-1/4 h-2/3 pointer-events-none">
                    <div className="absolute left-1/4 top-0 w-64 h-64 bg-accent/8 rounded-full blur-[100px]" />
                    <div className="absolute right-1/4 bottom-0 w-72 h-72 bg-accent/6 rounded-full blur-[120px]" />
                </div>

                <div className="relative grid grid-cols-2 gap-4 auto-rows-auto">
                    {/* Card 01 — Featured, full-width */}
                    <FloatingCard
                        item={benefits[0]}
                        index={0}
                        rotation={-1.2}
                        parallaxOffset={20}
                        featured
                        accent
                        className="col-span-2 mb-2"
                    />

                    {/* Card 02 — left, slightly raised */}
                    <FloatingCard
                        item={benefits[1]}
                        index={1}
                        rotation={1.5}
                        parallaxOffset={28}
                        className="-mt-2 mr-1"
                    />

                    {/* Card 03 — right, dropped down */}
                    <FloatingCard
                        item={benefits[2]}
                        index={2}
                        rotation={-1.8}
                        parallaxOffset={14}
                        className="mt-6 ml-1"
                    />

                    {/* Card 04 — full-width, offset right */}
                    <FloatingCard
                        item={benefits[3]}
                        index={3}
                        rotation={1.2}
                        parallaxOffset={22}
                        className="col-span-2 mt-2 ml-3 w-[calc(100%-0.75rem)]"
                    />
                </div>
            </div>

            {/* ───── DESKTOP: original (unchanged) ───── */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-[2rem] bg-secondary/20 border border-white/5 hover:border-accent/20 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                            <item.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                        <p className="text-sm text-textPrimary/50 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
