import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export function SmartNetworkVisual() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-20 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold uppercase">The Smart <span className="text-accent">Network</span></h2>
                <p className="text-textPrimary/60 max-w-lg text-sm">Visualize your enterprise transport network in real-time. Routes, nodes, and fleets synchronized.</p>
            </div>

            <div className="relative h-[600px] w-full bg-secondary/10 rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                {/* Nodes */}
                {[
                    { t: "15%", l: "20%", label: "Hub Alpha" },
                    { t: "60%", l: "15%", label: "Hub Beta" },
                    { t: "30%", l: "50%", label: "Main Office" },
                    { t: "70%", l: "80%", label: "Data Center" },
                    { t: "20%", l: "85%", label: "Logistic Hub" }
                ].map((node, i) => (
                    <div key={i} className="absolute flex flex-col items-center gap-2 z-20" style={{ top: node.t, left: node.l }}>
                        <div className="w-4 h-4 rounded-full bg-accent animate-pulse shadow-[0_0_15px_#5CF09E]" />
                        <span className="text-[10px] font-bold text-textPrimary/40 uppercase tracking-widest">{node.label}</span>
                    </div>
                ))}

                {/* Animated Routes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <motion.path 
                        d="M 200 100 Q 400 200 500 180" 
                        stroke="url(#grad1)" strokeWidth="2" fill="none" strokeDasharray="5 5"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }}
                    />
                    <motion.path 
                        d="M 500 180 Q 700 300 800 420" 
                        stroke="url(#grad1)" strokeWidth="2" fill="none" strokeDasharray="5 5"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path 
                        d="M 150 360 Q 300 300 500 180" 
                        stroke="url(#grad1)" strokeWidth="2" fill="none" strokeDasharray="5 5"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }}
                    />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#5CF09E" stopOpacity="0" />
                            <stop offset="50%" stopColor="#5CF09E" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#5CF09E" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Moving Vehicles */}
                <motion.div 
                    animate={{ offsetDistance: ["0%", "100%"] }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute z-30 text-accent"
                    style={{ offsetPath: 'path("M 200 100 Q 400 200 500 180")', offsetRotate: 'auto' }}
                >
                    <Truck size={20} />
                </motion.div>
                
                <motion.div 
                    animate={{ offsetDistance: ["100%", "0%"] }} 
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute z-30 text-accent opacity-60"
                    style={{ offsetPath: 'path("M 500 180 Q 700 300 800 420")', offsetRotate: 'auto' }}
                >
                    <Truck size={16} />
                </motion.div>

                {/* Overlay Dashboard Snippet */}
                <div className="absolute top-10 left-10 p-6 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 z-40">
                    <div className="text-[10px] font-bold uppercase text-accent mb-3 tracking-[0.2em]">Live Fleet Status</div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-12">
                            <span className="text-xs text-textPrimary/60">Active Units</span>
                            <span className="text-lg font-bold">124</span>
                        </div>
                        <div className="flex items-center justify-between gap-12">
                            <span className="text-xs text-textPrimary/60">Network Load</span>
                            <span className="text-lg font-bold text-accent">92%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
