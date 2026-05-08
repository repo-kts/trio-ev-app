import { motion, useScroll, useTransform } from 'framer-motion';
import { BatteryCharging, Zap, MapPin } from 'lucide-react';
import { useRef } from 'react';

export function HeroSection() {
    const text = "Cities Move Electric".split(" ");
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    return (
        <section ref={ref} className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
            {/* Background Video with Parallax */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 origin-top h-[120%] -top-[10%]">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
            </motion.div>

            {/* Glowing ambient orb behind text */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-start text-left px-8 md:px-12 lg:px-24 w-full mt-16 max-w-7xl">

                {/* Small Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-white/10 backdrop-blur-md mb-6"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="text-xs font-sans tracking-widest uppercase text-textPrimary/80">City = trio.ev</span>
                </motion.div>

                <div className="flex flex-wrap justify-start gap-x-4 gap-y-1 mb-6 overflow-hidden max-w-3xl">
                    {text.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="font-heading text-4xl md:text-6xl lg:text-[4.5rem] font-bold uppercase tracking-tight text-textPrimary leading-none"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-sm md:text-base text-textPrimary/70 mb-10 max-w-md font-sans"
                >
                    Not a platform. Not an aggregator. Eastern India's intelligently operated electric mobility network — built to move cities. We are not on the map. We are the map.                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 origin-left"
                >
                    <button className="px-6 py-3 bg-accent text-background font-bold rounded-full text-base hover:bg-accent/90 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(92,240,158,0.3)]">
                        Explore Services
                    </button>
                    <button className="px-6 py-3 bg-secondary/40 backdrop-blur-md border border-white/10 text-textPrimary font-bold rounded-full text-base hover:bg-secondary transition-transform hover:scale-105 active:scale-95">
                        Get Started
                    </button>
                </motion.div>
            </div>

            {/* Floating Tech Widget (Right Side) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="hidden lg:flex absolute right-12 lg:right-20 bottom-20 flex-col gap-5 p-5 rounded-3xl bg-secondary/30 backdrop-blur-xl border border-white/10 w-72 shadow-2xl"
            >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-accent">
                        <BatteryCharging size={18} className="animate-pulse" />
                        <span className="font-heading tracking-widest text-xs">NETWORK STATUS</span>
                    </div>
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[10px] text-textPrimary/60 mb-1.5 font-sans uppercase tracking-wider font-semibold">
                            <span>Active Fleet</span>
                            <span className="text-accent">100% Online</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-accent rounded-full shadow-[0_0_10px_#5CF09E]"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                        <div className="flex-1 bg-black/40 rounded-xl p-3.5 border border-white/5 transition-colors hover:bg-black/60">
                            <Zap size={16} className="text-accent mb-2" />
                            <div className="font-heading text-xl">1.2M</div>
                            <div className="text-[9px] text-textPrimary/50 uppercase font-semibold tracking-wider mt-1">kWh Delivered</div>
                        </div>
                        <div className="flex-1 bg-black/40 rounded-xl p-3.5 border border-white/5 transition-colors hover:bg-black/60">
                            <MapPin size={16} className="text-accent mb-2" />
                            <div className="font-heading text-xl">100+</div>
                            <div className="text-[9px] text-textPrimary/50 uppercase font-semibold tracking-wider mt-1">Charging Hubs</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
