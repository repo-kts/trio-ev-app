import { motion } from 'framer-motion';
import { Activity, Clock, Zap, Target } from 'lucide-react';

export function AdminDashboardSim() {
    return (
        <section className="py-16 md:py-24 px-5 md:px-12 bg-secondary/5 border-y border-white/5 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Mobile tag */}
                <div className="md:hidden flex items-center gap-2 mb-4 justify-center">
                    <Activity size={12} className="text-accent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">Orchestration</span>
                </div>
                <div className="text-center mb-12 md:mb-24">
                    <h2 className="font-heading text-[2rem] md:text-5xl uppercase mb-3 md:mb-4 tracking-tight md:tracking-tighter leading-[0.95]">System <span className="text-accent">Orchestration</span></h2>
                    <p className="text-textPrimary/40 max-w-xl mx-auto text-sm px-2">Real-time telemetry and predictive analytics for your entire corporate fleet.</p>
                </div>

                {/* Mobile compact dashboard */}
                <div className="md:hidden space-y-4">
                    {/* Hero metric card */}
                    <div className="relative p-6 rounded-3xl bg-secondary/30 border border-white/10 overflow-hidden">

                        {/* EV battery sticker — top right */}
                        <div className="absolute top-5 right-5 flex flex-col items-end gap-1.5">
                            {/* Mini battery with animated fill */}
                            <div className="relative flex items-center">
                                <div className="relative w-12 h-6 rounded-[5px] border-[1.5px] border-accent/60 p-[2px] overflow-hidden bg-black/30">
                                    <motion.div
                                        initial={{ width: '20%' }}
                                        animate={{ width: ['20%', '100%', '20%'] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                        className="h-full rounded-[2px] bg-gradient-to-r from-accent/70 to-accent"
                                    />
                                    <motion.span
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        className="absolute inset-0 flex items-center justify-center text-background"
                                    >
                                        <Zap size={11} fill="currentColor" />
                                    </motion.span>
                                </div>
                                {/* Battery tip */}
                                <div className="w-[3px] h-2.5 rounded-r-sm bg-accent/60" />
                            </div>
                            <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-accent/70">Charging</span>
                        </div>

                        <div className="relative">
                            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">Fleet Utility</div>
                            <div className="font-heading text-6xl font-bold tracking-tighter leading-none">96.4<span className="text-2xl opacity-40">%</span></div>
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                <span className="text-[9px] font-bold uppercase text-accent tracking-widest">Optimized</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-5 rounded-2xl bg-secondary/30 border border-white/10">
                            <Activity className="text-accent mb-3" size={18} />
                            <div className="font-heading text-2xl font-bold">84</div>
                            <div className="text-[9px] font-bold uppercase text-textPrimary/40 tracking-widest mt-1">Active</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-secondary/30 border border-white/10">
                            <Target className="text-blue-400 mb-3" size={18} />
                            <div className="font-heading text-2xl font-bold">1,240</div>
                            <div className="text-[9px] font-bold uppercase text-textPrimary/40 tracking-widest mt-1">Trips</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-secondary/30 border border-white/10">
                            <Clock className="text-purple-400 mb-3" size={18} />
                            <div className="font-heading text-2xl font-bold">4.2m</div>
                            <div className="text-[9px] font-bold uppercase text-textPrimary/40 tracking-widest mt-1">Avg Response</div>
                            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} className="h-full bg-purple-400" />
                            </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-secondary/30 border border-white/10">
                            <Zap className="text-yellow-400 mb-3" size={18} />
                            <div className="font-heading text-2xl font-bold">-32%</div>
                            <div className="text-[9px] font-bold uppercase text-textPrimary/40 tracking-widest mt-1">Energy</div>
                            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '65%' }} viewport={{ once: true }} className="h-full bg-yellow-400" />
                            </div>
                        </div>
                    </div>

                    {/* Mini bar chart */}
                    <div className="p-5 rounded-3xl bg-background border border-white/10">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <div className="text-[10px] font-bold uppercase text-accent tracking-[0.2em]">System Load</div>
                                <div className="text-[10px] text-textPrimary/40 mt-0.5">AI Pathfinding</div>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-[8px] font-bold">
                                <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                                LIVE
                            </div>
                        </div>
                        <div className="h-[80px] flex items-end gap-1.5">
                            {[30, 45, 35, 55, 70, 60, 85, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                    className="flex-1 bg-accent/20 rounded-t-md relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-accent" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Main HUD Visual (Left) */}
                    <div className="flex-1 relative w-full max-w-lg aspect-square">
                        <div className="absolute inset-0 rounded-full border border-white/5 bg-secondary/10 flex items-center justify-center">
                            {/* Inner Rotating Ring */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-[80%] h-[80%] rounded-full border-2 border-dashed border-accent/20"
                            />
                            {/* Stats Centerpiece */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2">Fleet Utility</div>
                                <div className="text-7xl font-bold tracking-tighter">96.4<span className="text-3xl opacity-40">%</span></div>
                                <div className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase text-accent tracking-widest">Optimized</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Satellites Stats */}
                        <motion.div 
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="absolute top-0 -left-4 p-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl z-20"
                        >
                            <Activity className="text-accent mb-4" size={20} />
                            <div className="text-2xl font-bold">84</div>
                            <div className="text-[9px] font-bold uppercase text-textPrimary/40 tracking-widest">Active Units</div>
                        </motion.div>

                        <motion.div 
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="absolute bottom-0 -right-4 p-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl z-20"
                        >
                            <Target className="text-blue-400 mb-4" size={20} />
                            <div className="text-2xl font-bold">1,240</div>
                            <div className="text-[9px] font-bold uppercase text-textPrimary/40 tracking-widest">Completed Trips</div>
                        </motion.div>
                    </div>

                    {/* Data Insights (Right) */}
                    <div className="flex-1 w-full space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2.5rem] bg-secondary/20 border border-white/5 hover:border-accent/30 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                    <Clock size={20} />
                                </div>
                                <div className="text-2xl font-bold mb-1">4.2m</div>
                                <div className="text-[10px] font-bold uppercase text-textPrimary/40 tracking-widest">Avg. Response Time</div>
                                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                                </div>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-secondary/20 border border-white/5 hover:border-yellow-400/30 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                                    <Zap size={20} />
                                </div>
                                <div className="text-2xl font-bold mb-1">-32%</div>
                                <div className="text-[10px] font-bold uppercase text-textPrimary/40 tracking-widest">Energy Overhead</div>
                                <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: '65%' }} className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                                </div>
                            </div>
                        </div>

                        {/* Interactive Analysis HUD */}
                        <div className="p-10 rounded-[3rem] bg-background border border-white/10 relative overflow-hidden group shadow-2xl">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <div className="text-xs font-bold uppercase text-accent tracking-[0.2em] mb-1">System Load Analysis</div>
                                    <div className="text-xs text-textPrimary/40">AI-Predictive Pathfinding enabled.</div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-[9px] font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    REAL-TIME
                                </div>
                            </div>
                            <div className="h-[120px] flex items-end gap-2">
                                {[30, 45, 35, 55, 70, 60, 85, 95].map((h, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.05 }}
                                        className="flex-1 bg-accent/20 rounded-t-lg group-hover:bg-accent/40 transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_10px_#5CF09E]" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
