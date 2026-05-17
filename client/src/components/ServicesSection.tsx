import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, Zap, Building2, CheckCircle2, Truck, ArrowUpRight } from 'lucide-react';

function MobileSlider({ services }: { services: any[] }) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setIndex((prev) => (prev + 1) % services.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [services.length, index]); // Adding index to reset timer on manual swipe

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = services.length - 1;
            if (nextIndex >= services.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const service = services[index];

    return (
        <div className="relative w-full touch-none">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    variants={{
                        enter: (direction: number) => ({
                            x: direction > 0 ? 50 : -50,
                            opacity: 0
                        }),
                        center: {
                            zIndex: 1,
                            x: 0,
                            opacity: 1
                        },
                        exit: (direction: number) => ({
                            zIndex: 0,
                            x: direction < 0 ? 50 : -50,
                            opacity: 0
                        })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_e, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) * velocity.x;
                        if (swipe < -10000) {
                            paginate(1);
                        } else if (swipe > 10000) {
                            paginate(-1);
                        }
                    }}
                    className="w-full cursor-grab active:cursor-grabbing"
                >
                    <Link
                        to={service.link}
                        className="block bg-secondary/30 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] -z-10" />
                        
                        <div className="w-14 h-14 rounded-2xl bg-secondary border border-white/10 flex items-center justify-center text-accent mb-8 shadow-inner">
                            <service.icon size={28} />
                        </div>

                        <h3 className="text-3xl font-heading font-bold uppercase tracking-tight mb-4 text-textPrimary leading-[1.1]">
                            {service.title}
                        </h3>

                        <p className="text-sm text-textPrimary/60 mb-8 font-sans leading-relaxed">
                            {service.description}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {service.features.map((feature: string, j: number) => (
                                <li key={j} className="flex items-start gap-3 text-sm text-textPrimary/80">
                                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent mt-4">
                            <span>Explore Service</span>
                            <ArrowUpRight size={14} />
                        </div>
                    </Link>
                </motion.div>
            </AnimatePresence>
            
            {/* Dots */}
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
                {services.map((_, i) => (
                    <motion.div 
                        key={i} 
                        initial={false}
                        animate={{ 
                            width: i === index ? 32 : 8,
                            backgroundColor: i === index ? "rgba(34, 211, 238, 1)" : "rgba(255, 255, 255, 0.1)" 
                        }}
                        onClick={() => {
                            setDirection(i > index ? 1 : -1);
                            setIndex(i);
                        }}
                        className="h-1.5 rounded-full cursor-pointer" 
                    />
                ))}
            </div>
        </div>
    );
}

const services = [
    {
        title: "PUT YOUR MONEY ON WHEELS",
        shortTitle: "Money on Wheels",
        description: "Want an EV working for you without buying one outright? Put in a small down payment. We register it, deploy it in our fleet, and send you a fixed return every month. You own the asset. We run the operations.",
        shortDesc: "Invest. We deploy. You earn monthly.",
        icon: Zap,
        link: "/leasing",
        features: ["Low upfront investment", "Fixed monthly returns assured", "Zero operational headache"]
    },
    {
        title: "EV Rentals",
        shortTitle: "EV Rentals",
        description: "Need a vehicle for a shift, a day, or a weekend? Pick up a fully charged Trio EV and hit the road. No long term contracts, no broker cuts, no fuel stops. Just a clean vehicle ready when you are.",
        shortDesc: "Rent by the hour. Drive instantly.",
        icon: Car,
        link: "/rentals",
        features: ["12 to 25-hour rental slots", "Fully charged and ready to go", "Book in minutes. Drive instantly."]
    },
    {
        title: "Corporate Transport",
        shortTitle: "Corporate Transport",
        description: "Stop chasing cab vendors every morning. We run a dedicated electric fleet for your employees — fixed routes, on time pickups, one monthly bill. Your team gets to work. You get peace of mind.",
        shortDesc: "Dedicated EV fleet for your team.",
        icon: Building2,
        link: "/transport",
        features: ["Dedicated fleet for your company", "Fixed routes and scheduled pickups", "Cleaner commute. Lower cost."]
    },
    {
        title: "LAST MILE DELIVERY",
        shortTitle: "Last-Mile Delivery",
        description: "Moving goods across the city? We put electric delivery vehicles on your routes — maintained, charged, and ready for high volume operations every single day. Faster deliveries. Lower running costs. No fuel dependency.",
        shortDesc: "Electric delivery fleet on demand.",
        icon: Truck,
        link: "/logistics",
        features: ["Electric delivery fleet on demand", "Built for daily high volume runs", "Reliable. Consistent. Always on."]
    }
];

export function ServicesSection() {
    return (
        <section id="services" className="pt-10 sm:pt-12 pb-24 sm:pb-32 px-5 sm:px-6 md:px-12 max-w-[85rem] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-12 sm:mb-16"
            >
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-textPrimary leading-tight">PICK YOUR MOVE</h2>
                <p className="text-textPrimary/60 max-w-2xl mx-auto text-base sm:text-lg">One network. Every way to move. All electric.</p>
            </motion.div>

            {/* ───── MOBILE: Full Auto-sliding card ───── */}
            <div className="md:hidden">
                <div className="relative min-h-[500px]">
                    <MobileSlider services={services} />
                </div>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex items-center justify-center gap-3 mt-12"
                >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-textPrimary/20 font-medium">Slide for more</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </motion.div>
            </div>

            {/* ───── DESKTOP: original full cards (unchanged) ───── */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
                            <div className="absolute inset-0 bg-accent/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-[2rem] pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

                            <div className="w-12 h-12 rounded-xl bg-secondary border border-white/5 flex items-center justify-center mb-5 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-background transition-all duration-500 shadow-md">
                                <service.icon size={24} />
                            </div>

                            <h3 className="text-xl font-heading font-bold uppercase tracking-tight mb-2.5 text-textPrimary group-hover:text-accent transition-colors duration-300 md:min-h-[3.5rem] flex items-center">{service.title}</h3>
                            <p className="text-sm text-textPrimary/70 mb-6 font-sans leading-relaxed flex-grow">{service.description}</p>

                            <ul className="space-y-2.5">
                                {service.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-textPrimary/80">
                                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

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
