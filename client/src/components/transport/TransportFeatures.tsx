import { motion } from 'framer-motion';
import { Route, Navigation, BarChart2, Smartphone } from 'lucide-react';

const features = [
    { icon: Route, title: "Route Optimization", desc: "Dynamic adjustment based on traffic and demand." },
    { icon: Navigation, title: "Live Tracking", desc: "Pinpoint accuracy for every vehicle in the fleet." },
    { icon: BarChart2, title: "Cost Analytics", desc: "Granular reporting on savings and performance." },
    { icon: Smartphone, title: "Commute App", desc: "Intuitive employee experience for easy booking." }
];

export function TransportFeatures() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-10 rounded-[2.5rem] bg-secondary/10 border border-white/5 hover:bg-secondary/20 transition-all flex gap-8 items-start group"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform flex-shrink-0">
                            <f.icon size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-sm text-textPrimary/50 leading-relaxed">{f.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
