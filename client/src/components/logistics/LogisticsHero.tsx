import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

export function LogisticsHero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const headingText = "POWERING INDIA’S ELECTRIC MOVEMENT.".split(" ");

    return (
        <section ref={ref} className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
            {/* Cinematic Video Background */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-90 scale-105"
                >
                    <source src="/logistics-hero.mp4" type="video/mp4" />
                </video>
                
                {/* Simplified Readability Overlays (Matching Home Page) */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-transparent" />
            </motion.div>

            {/* Ambient Accent Glow */}
            <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Main Content (Aligned Left) */}
            <div className="relative z-10 flex flex-col items-start text-left px-8 md:px-12 lg:px-24 w-full max-w-7xl mt-16">
                
                {/* Small Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/10 backdrop-blur-md mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-textPrimary/80 font-bold">Intelligent EV Logistics Network</span>
                </motion.div>

                {/* Heading */}
                <div className="flex flex-wrap justify-start gap-x-4 gap-y-1 mb-8 max-w-3xl overflow-hidden">
                    {headingText.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-heading text-3xl md:text-5xl lg:text-[4rem] font-bold uppercase tracking-tight text-textPrimary leading-none"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-lg md:text-2xl text-textPrimary/70 mb-12 max-w-xl font-sans leading-relaxed"
                >
                    AI-driven EV logistics and fleet infrastructure designed for scalable, sustainable transportation operations across India.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-5 origin-left"
                >
                    <button className="px-8 py-4 bg-accent text-background font-bold rounded-full text-[12px] uppercase tracking-widest hover:bg-accent/90 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(92,240,158,0.3)]">
                        Explore Logistics
                    </button>
                    <button className="px-8 py-4 bg-secondary/40 backdrop-blur-md border border-white/10 text-textPrimary font-bold rounded-full text-[12px] uppercase tracking-widest hover:bg-secondary transition-transform hover:scale-105 active:scale-95">
                        Contact Operations
                    </button>
                </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
        </section>
    );
}
