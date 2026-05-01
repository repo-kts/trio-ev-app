import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "/india.json";

const stats = [
    { label: "Vehicles", value: "5000+" },
    { label: "Users", value: "20000+" },
    { label: "Cities", value: "20+" },
    { label: "Growth", value: "Rapid" }
];

const cities = [
    { name: "Delhi", coordinates: [77.2090, 28.6139] },
    { name: "Mumbai", coordinates: [72.8777, 19.0760] },
    { name: "Bangalore", coordinates: [77.5946, 12.9716] },
    { name: "Hyderabad", coordinates: [78.4867, 17.3850] },
    { name: "Chennai", coordinates: [80.2707, 13.0827] }
];

export function IndiaNetworkMap() {
    return (
        <section id="network" className="py-24 px-6 md:px-12 bg-secondary/20 border-y border-secondary/50">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                
                <div className="flex-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4 text-textPrimary">
                            India's Fastest Growing Network
                        </h2>
                        <p className="text-textPrimary/60 text-lg">
                            We are rapidly expanding across the nation, bringing smart and sustainable mobility to major cities. Join our expanding footprint.
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-secondary">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-3xl font-heading font-bold text-accent mb-1">{stat.value}</div>
                                <div className="text-sm text-textPrimary/60 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex-1 relative w-full max-w-lg aspect-square bg-secondary/30 rounded-[3rem] border border-secondary flex items-center justify-center overflow-hidden"
                >
                    <iframe 
                        src="/IndiaMapAnimation.html" 
                        title="India Network Map" 
                        className="absolute inset-0 w-full h-full border-none outline-none block"
                        scrolling="no"
                    />
                </motion.div>

            </div>
        </section>
    );
}
