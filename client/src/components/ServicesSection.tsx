import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, Zap, Building2, CheckCircle2, Truck } from 'lucide-react';

const services = [
    {
        title: "PUT YOUR MONEY ON WHEELS",
        description: "Want an EV working for you without buying one outright? Put in a small down payment. We register it, deploy it in our fleet, and send you a fixed return every month. You own the asset. We run the operations.",
        icon: Zap,
        link: "/leasing",
        features: ["Low upfront investment", "Fixed monthly returns assured", "Zero operational headache"]
    },
    {
        title: "EV Rentals",
        description: "Need a vehicle for a shift, a day, or a weekend? Pick up a fully charged Trio EV and hit the road. No long term contracts, no broker cuts, no fuel stops. Just a clean vehicle ready when you are.",
        icon: Car,
        link: "/rentals",
        features: ["12 to 25-hour rental slots", "Fully charged and ready to go", "Book in minutes. Drive instantly."]
    },
    {
        title: "Corporate Transport",
        description: "Stop chasing cab vendors every morning. We run a dedicated electric fleet for your employees — fixed routes, on time pickups, one monthly bill. Your team gets to work. You get peace of mind.",
        icon: Building2,
        link: "/transport",
        features: ["Dedicated fleet for your company", "Fixed routes and scheduled pickups", "Cleaner commute. Lower cost."]
    },
    {
        title: "LAST MILE DELIVERY",
        description: "Moving goods across the city? We put electric delivery vehicles on your routes — maintained, charged, and ready for high volume operations every single day. Faster deliveries. Lower running costs. No fuel dependency.",
        icon: Truck,
        link: "/logistics",
        features: ["Electric delivery fleet on demand", "Built for daily high volume runs", "Reliable. Consistent. Always on."]
    }
];

export function ServicesSection() {
    return (
        <section id="services" className="pt-12 pb-20 px-6 md:px-12 max-w-[85rem] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-16"
            >
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4 text-textPrimary">PICK YOUR MOVE</h2>
                <p className="text-textPrimary/60 max-w-2xl mx-auto text-lg">One network. Every way to move. All electric.</p>
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
                            className="bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] group relative overflow-visible shadow-lg transition-all duration-500 h-full flex flex-col"
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
                            <div className="mt-auto pt-5 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
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
