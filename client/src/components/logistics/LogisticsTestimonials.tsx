import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: "Vikram Mehta",
        role: "Director of Operations",
        company: "Nexus Supply Chain",
        text: "The integration of TRIO's EV infrastructure has reduced our last-mile delivery costs by 42% while simultaneously achieving our sustainability targets two years ahead of schedule.",
        metric: "42% Cost Reduction",
        efficiency: "99.2%"
    },
    {
        name: "Ananya Iyer",
        role: "Chief Sustainability Officer",
        company: "GreenLogix India",
        text: "TRIO's real-time battery analytics and charging coordination are game-changers. Their platform provides the level of operational transparency that enterprise logistics requires.",
        metric: "100% EV Transition",
        efficiency: "97.8%"
    },
    {
        name: "Sanjay Singhania",
        role: "VP of Fleet Management",
        company: "SwiftConnect",
        text: "Moving to an intelligent EV network was a massive undertaking, but TRIO's end-to-end management made the transition seamless. Their predictive maintenance alone saved us millions.",
        metric: "₹1.2Cr Saved / Year",
        efficiency: "98.5%"
    }
];

export function LogisticsTestimonials() {
    return (
        <section className="py-32 px-6 bg-secondary/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                    >
                        Enterprise Trust
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-6"
                    >
                        TRUSTED BY <span className="text-accent">LEADERS.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-secondary/40 border border-white/5 relative flex flex-col justify-between"
                        >
                            <Quote className="text-accent/20 absolute top-8 right-8" size={40} />
                            
                            <div>
                                <div className="flex gap-1 mb-8">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-1 h-1 rounded-full bg-accent" />
                                    ))}
                                </div>
                                <p className="text-textPrimary/70 text-lg italic leading-relaxed mb-12">
                                    "{t.text}"
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                                        <span className="text-[9px] text-textPrimary/30 font-bold uppercase tracking-widest block mb-1">Operational Impact</span>
                                        <span className="text-sm font-bold text-accent">{t.metric}</span>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                                        <span className="text-[9px] text-textPrimary/30 font-bold uppercase tracking-widest block mb-1">Efficiency Score</span>
                                        <span className="text-sm font-bold text-textPrimary">{t.efficiency}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                                        <span className="text-accent font-heading font-bold text-lg">{t.name[0]}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-heading font-bold text-textPrimary">{t.name}</h4>
                                        <p className="text-[10px] text-textPrimary/40 font-bold uppercase tracking-widest">{t.role} • {t.company}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
