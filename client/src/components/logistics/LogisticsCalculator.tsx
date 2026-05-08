import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Leaf, ShieldCheck, Info } from 'lucide-react';

export function LogisticsCalculator() {
    const [vehicleCost, setVehicleCost] = useState(1500000); // 15 Lakh
    const [monthlyIncome, setMonthlyIncome] = useState(35000);
    const [duration, setDuration] = useState(36);
    const [fleetSize, setFleetSize] = useState(5);

    const [results, setResults] = useState({
        totalReturn: 0,
        roi: 0,
        co2Saved: 0,
        yearlyYield: 0
    });

    useEffect(() => {
        const totalInvestment = vehicleCost * fleetSize;
        const totalIncome = monthlyIncome * duration * fleetSize;
        const totalReturn = totalIncome - totalInvestment;
        const roi = (totalIncome / totalInvestment) * 100;
        const co2Saved = fleetSize * (duration / 12) * 15.5; // Avg 15.5 Tons/year per EV
        const yearlyYield = ((monthlyIncome * 12) / vehicleCost) * 100;

        setResults({
            totalReturn,
            roi,
            co2Saved,
            yearlyYield
        });
    }, [vehicleCost, monthlyIncome, duration, fleetSize]);

    return (
        <section className="py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                    >
                        Investment Infrastructure
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-6"
                    >
                        ROI <span className="text-accent">SIMULATOR.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-textPrimary/50 max-w-2xl mx-auto text-lg font-medium"
                    >
                        Analyze the financial and environmental impact of scaling your EV fleet infrastructure.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Input Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 p-8 md:p-12 rounded-[2.5rem] bg-secondary/40 border border-white/5 backdrop-blur-3xl flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                                <Calculator className="text-accent" size={24} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-textPrimary">Parameters</h3>
                        </div>

                        <div className="space-y-10">
                            <SliderInput 
                                label="Vehicle Cost (₹)" 
                                value={vehicleCost} 
                                min={500000} 
                                max={5000000} 
                                step={50000}
                                onChange={setVehicleCost}
                                format={(v) => `₹${(v / 100000).toFixed(1)}L`}
                            />
                            <SliderInput 
                                label="Monthly Lease Income (₹)" 
                                value={monthlyIncome} 
                                min={10000} 
                                max={100000} 
                                step={1000}
                                onChange={setMonthlyIncome}
                                format={(v) => `₹${(v / 1000).toFixed(0)}K`}
                            />
                            <SliderInput 
                                label="Duration (Months)" 
                                value={duration} 
                                min={12} 
                                max={60} 
                                step={12}
                                onChange={setDuration}
                                format={(v) => `${v}m`}
                            />
                            <SliderInput 
                                label="Fleet Size" 
                                value={fleetSize} 
                                min={1} 
                                max={50} 
                                step={1}
                                onChange={setFleetSize}
                                format={(v) => `${v} Units`}
                            />
                        </div>
                        
                        <div className="mt-12 p-4 rounded-xl bg-accent/5 border border-accent/10 flex gap-3">
                            <Info size={16} className="text-accent shrink-0 mt-0.5" />
                            <p className="text-[10px] text-textPrimary/40 font-medium leading-relaxed">
                                Calculations are based on standard market utilization rates and average operational efficiency metrics. Actual returns may vary based on deployment geography.
                            </p>
                        </div>
                    </motion.div>

                    {/* Result Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 rounded-[2.5rem] bg-gradient-to-br from-accent/10 via-secondary/40 to-secondary/20 border border-accent/20 p-8 md:p-12 backdrop-blur-3xl relative overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
                        
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                            <ResultCard 
                                label="Projected ROI" 
                                value={`${results.roi.toFixed(1)}%`} 
                                subtext="Total Return on Investment"
                                icon={TrendingUp}
                                accent
                            />
                            <ResultCard 
                                label="Annual Yield" 
                                value={`${results.yearlyYield.toFixed(1)}%`} 
                                subtext="Recurring Yearly Revenue"
                                icon={ShieldCheck}
                            />
                            <ResultCard 
                                label="CO₂ Emissions Offset" 
                                value={`${results.co2Saved.toFixed(1)}t`} 
                                subtext="Total Carbon Reduction"
                                icon={Leaf}
                                color="text-accent"
                            />
                            <div className="md:col-span-2 p-8 rounded-3xl bg-black/40 border border-white/5 flex flex-col justify-center">
                                <span className="text-[10px] text-textPrimary/40 font-bold uppercase tracking-widest mb-2">Total Projected Returns</span>
                                <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-textPrimary tracking-tighter">
                                    ₹{new Intl.NumberFormat('en-IN').format(Math.floor(results.totalReturn))}
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-accent">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Optimized Infrastructure Yield</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SliderInput({ label, value, min, max, step, onChange, format }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    format: (v: number) => string;
}) {
    return (
        <div className="group">
            <div className="flex justify-between items-center mb-4">
                <label className="text-[11px] text-textPrimary/50 font-bold uppercase tracking-wider">{label}</label>
                <span className="text-lg font-heading font-bold text-accent">{format(value)}</span>
            </div>
            <input 
                type="range" 
                min={min} 
                max={max} 
                step={step} 
                value={value} 
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-accent"
            />
        </div>
    );
}

function ResultCard({ label, value, subtext, icon: Icon, accent = false, color = "text-textPrimary" }: any) {
    return (
        <div className={`p-8 rounded-3xl border ${accent ? 'bg-accent/10 border-accent/20' : 'bg-black/20 border-white/5'} flex flex-col`}>
            <div className="flex items-center justify-between mb-6">
                <div className={`p-2 rounded-xl ${accent ? 'bg-accent/20' : 'bg-white/5'}`}>
                    <Icon size={18} className={accent ? 'text-accent' : 'text-textPrimary/60'} />
                </div>
                <div className="h-1 w-8 bg-accent/20 rounded-full" />
            </div>
            <span className="text-[10px] text-textPrimary/40 font-bold uppercase tracking-widest mb-2">{label}</span>
            <div className={`text-4xl font-heading font-bold ${color} mb-2 tracking-tight`}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {value}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-[10px] text-textPrimary/30 font-medium">{subtext}</span>
        </div>
    );
}
