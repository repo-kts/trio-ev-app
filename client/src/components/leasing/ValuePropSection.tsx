import { motion } from 'framer-motion';
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

export function ValuePropSection() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

            {/* Comparison vs Petrol */}
            <div className="mt-24 p-12 rounded-[3rem] bg-secondary/10 border border-white/5 flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-6">
                    <h2 className="text-3xl font-heading font-black uppercase">The <span className="text-accent">Efficiency</span> Gap</h2>
                    <p className="text-textPrimary/60 max-w-md italic text-sm">Real-world performance comparison between Trio EV fleets and traditional ICE vehicles.</p>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                <span>Trio EV Fleet</span>
                                <span className="text-accent">$0.04 / mi</span>
                            </div>
                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '25%' }} className="h-full bg-accent" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                                <span>Traditional ICE Fleet</span>
                                <span className="text-red-400">$0.18 / mi</span>
                            </div>
                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-red-400/50" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-sm aspect-square rounded-[3rem] border border-accent/20 bg-accent/5 flex flex-col items-center justify-center p-10 text-center">
                        <div className="text-6xl font-heading font-black text-accent mb-2">78%</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-textPrimary/60">Average Monthly Savings</div>
                        <p className="mt-6 text-[10px] text-textPrimary/40">Calculated based on a 10-vehicle fleet over 36 months.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
