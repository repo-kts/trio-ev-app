import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, Zap, Building2, CheckCircle2, Truck } from 'lucide-react';

const services = [
    {
        title: "EV Leasing",
        description: "Flexible long-term EV leasing solutions for businesses and individuals.",
        icon: Zap,
        link: "/leasing",
        features: ["Low upfront cost", "Maintenance included", "Scalable fleet options"]
    },
    {
        title: "EV Rentals",
        description: "On-demand electric vehicle rentals for short-term usage.",
        icon: Car,
        link: "/rentals",
        features: ["Hourly / daily plans", "App-based booking", "Wide vehicle availability"]
    },
    {
        title: "Corporate Transport",
        description: "Smart and sustainable fleet solutions for enterprises.",
        icon: Building2,
        link: "/transport",
        features: ["Employee commute solutions", "Dedicated fleet management", "Cost optimization"]
    },
    {
        title: "Logistics",
        description: "End-to-end intelligent supply chain and fleet logistics for large scale operations.",
        icon: Truck,
        link: "/logistics",
        features: ["AI-powered route planning", "Live fleet visibility", "Sustainability reporting"]
    }
];

export function ServicesSection() {
    return (
        <section id="services" className="py-20 px-6 md:px-12 max-w-[85rem] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-12"
            >
                <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mb-3 text-textPrimary">Our Mobility Services</h2>
                <p className="text-textPrimary/60 max-w-2xl mx-auto text-base">Comprehensive electric mobility solutions tailored for every journey.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, i) => (
                    <Link key={service.title} to={service.link} className="block group">
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                            whileHover={{ y: -12, scale: 1.01 }}
                            className="bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] group relative overflow-visible shadow-lg transition-all duration-500 h-full"
                        >
                            {/* Hover Glowing Orb Behind Card */}
                            <div className="absolute inset-0 bg-accent/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-[2rem] pointer-events-none" />

                            {/* Internal Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                            
                            <div className="w-12 h-12 rounded-xl bg-secondary border border-white/5 flex items-center justify-center mb-5 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-background transition-all duration-500 shadow-md">
                                <service.icon size={24} />
                            </div>
                            
                            <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-2.5 text-textPrimary group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                            <p className="text-sm text-textPrimary/70 mb-6 font-sans leading-relaxed">{service.description}</p>
                            
                            <ul className="space-y-2.5">
                                {service.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-textPrimary/80">
                                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Click Indicator */}
                            <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                                <span>Explore Service</span>
                                <Zap size={10} className="fill-current" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
