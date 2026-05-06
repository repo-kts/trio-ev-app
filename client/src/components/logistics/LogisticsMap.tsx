import { motion } from 'framer-motion';
import { MapPin, Zap, Truck, Target } from 'lucide-react';
 
 export function LogisticsMap() {
    return (
        <section className="py-32 px-6 bg-secondary/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Content */}
                    <div className="w-full lg:w-1/3 text-left">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                        >
                            Infrastructure Coverage
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-8 leading-tight"
                        >
                            NATIONWIDE <br />
                            <span className="text-accent">INTELLIGENT</span> <br />
                            NETWORK.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-textPrimary/50 text-lg font-medium mb-10 leading-relaxed"
                        >
                            Our logistics ecosystem spans across India’s major economic hubs, providing synchronized EV infrastructure for modern enterprises.
                        </motion.p>

                        <div className="space-y-4">
                            <NetworkMetric label="Active Regions" value="07" />
                            <NetworkMetric label="Charging Hubs" value="250+" />
                            <NetworkMetric label="Monthly Deliveries" value="1.2M+" />
                        </div>
                    </div>

                    {/* Right: Interactive Map Visualization */}
                    <div className="w-full lg:w-2/3 relative h-[700px] flex items-center justify-center">
                        <div className="absolute inset-0 z-0 bg-accent/5 blur-[120px] rounded-full scale-75" />
                        
                        {/* Interactive Map Iframe */}
                        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-secondary/30 backdrop-blur-sm shadow-2xl">
                            <iframe 
                                src="/IndiaMap.html" 
                                className="w-full h-full border-none"
                                title="Interactive India Logistics Map"
                            />
                            
                            {/* Cinematic Overlay Effects */}
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
                            <div className="absolute top-8 right-8 z-10 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                    <span className="text-[10px] text-accent font-bold uppercase tracking-[0.2em]">Live Infrastructure Feed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function NetworkMetric({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
            <span className="text-[11px] text-textPrimary/40 font-bold uppercase tracking-widest">{label}</span>
            <span className="text-lg font-heading font-bold text-textPrimary">{value}</span>
        </div>
    );
}

function StatRow({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-center gap-3">
            <Icon size={14} className="text-textPrimary/30" />
            <span className="text-[11px] text-textPrimary/40 font-bold uppercase tracking-widest flex-1">{label}</span>
            <span className="text-sm font-bold text-textPrimary">{value}</span>
        </div>
    );
}
