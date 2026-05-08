import { motion } from 'framer-motion';
import { Monitor, Cpu, Wrench, Battery, Users, ArrowUpRight, Zap } from 'lucide-react';

const FEATURES = [
    { title: "Live Fleet Monitoring", icon: Monitor },
    { title: "Smart Route AI", icon: Cpu },
    { title: "Predictive Maintenance", icon: Wrench },
    { title: "Charging Coordination", icon: Zap },
    { title: "Battery Analytics", icon: Battery },
    { title: "Driver Insights", icon: Users },
];

export function LogisticsControlCenter() {
    return (
        <section className="py-32 px-6 bg-secondary/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">

                {/* Left Side: Content */}
                <div className="w-full lg:w-1/2">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                    >
                        Management Interface
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-textPrimary mb-8 leading-tight"
                    >
                        BUILT FOR <br />
                        <span className="text-accent">INTELLIGENT</span> FLEET <br />
                        OPERATIONS.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-textPrimary/50 text-lg md:text-xl font-medium mb-12 leading-relaxed"
                    >
                        TRIO EV combines electric mobility, live analytics, charging coordination, and AI route optimization into one seamless logistics ecosystem.
                    </motion.p>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FEATURES.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="group flex items-center gap-4 p-5 rounded-2xl bg-secondary/40 border border-white/5 hover:border-accent/20 transition-all duration-300"
                            >
                                <div className="p-3 rounded-xl bg-background border border-white/5 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all">
                                    <feature.icon size={20} className="text-textPrimary group-hover:text-accent transition-colors" />
                                </div>
                                <span className="text-sm font-bold text-textPrimary/80 group-hover:text-textPrimary transition-colors">
                                    {feature.title}
                                </span>
                                <ArrowUpRight size={14} className="ml-auto text-textPrimary/20 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Visual Dashboard */}
                <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]">
                    {/* Main "Monitor" Frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-secondary/80 to-secondary/40 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center backdrop-blur-3xl"
                    >
                        {/* Mock UI Background */}
                        <div className="absolute inset-4 rounded-[2rem] bg-black/40 border border-white/5 overflow-hidden">
                            {/* Header */}
                            <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between bg-white/2">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/40" />
                                </div>
                                <div className="text-[10px] text-textPrimary/20 font-bold tracking-[0.2em] uppercase font-sans">TRIO OS v2.4.0</div>
                            </div>

                            {/* India Fleet Map */}
                            <div className="p-6 h-[calc(100%-3rem)]">
                                <div className="relative h-full w-full rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-full relative">
                                            <iframe 
                                                src="/IndiaMap.html" 
                                                className="w-full h-full border-none opacity-80"
                                                title="Control Center Map"
                                            />
                                            {/* Scanline / CRT Effect Overlay */}
                                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-10 opacity-30" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </motion.div>

                    {/* Background Decorative Orbs */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
