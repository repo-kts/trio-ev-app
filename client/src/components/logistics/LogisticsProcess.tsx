import { motion } from 'framer-motion';
import { Truck, Zap, FileText, ShieldCheck } from 'lucide-react';

const STEPS = [
    {
        title: "Explore Our EV Fleet",
        description: "Browse our collection of electric and hybrid vehicles designed for clean, efficient driving.",
        status: "Available",
        icon: Truck,
        delay: 0
    },
    {
        title: "Submit Your Application",
        description: "Fill out a short form to share your preferences and eligibility details for leasing.",
        status: "Register",
        icon: FileText,
        delay: 0.2
    },
    {
        title: "Fast Verification",
        description: "Our team reviews your application and completes verification swiftly to keep you moving.",
        status: "Rapid-Check",
        icon: ShieldCheck,
        delay: 0.4
    },
    {
        title: "Start Driving Sustainably",
        description: "Pick up or receive delivery of your EV and enjoy the benefits of clean, efficient transport.",
        status: "Active",
        icon: Zap,
        delay: 0.6
    }
];

export function LogisticsProcess() {
    return (
        <section className="py-32 px-6 bg-background relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                    >
                        Leasing Workflow
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-6"
                    >
                        HOW EV <span className="text-accent">LEASING WORKS.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-textPrimary/50 max-w-2xl mx-auto text-lg font-medium"
                    >
                        A seamless, intelligent journey from fleet exploration to sustainable driving.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Main connecting line */}
                    <div className="absolute top-[45px] left-0 right-0 h-[1px] bg-white/5 hidden lg:block" />
                    
                    {/* Animated flow line */}
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute top-[45px] left-0 h-[1px] bg-gradient-to-r from-accent/0 via-accent to-accent/0 hidden lg:block"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
                        {STEPS.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: step.delay }}
                                className="group relative"
                            >
                                {/* Step Number / Icon Container */}
                                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                    <div className="relative mb-10">
                                        {/* Connector Dot */}
                                        <div className="hidden lg:block absolute top-[45px] left-1/2 -translate-x-1/2 -translate-y-[45px]">
                                            <div className="w-3 h-3 rounded-full bg-background border border-white/20 group-hover:border-accent group-hover:scale-125 transition-all duration-500 relative z-20" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Icon */}
                                        <div className="w-24 h-24 rounded-[2rem] bg-secondary/50 border border-white/5 flex items-center justify-center group-hover:border-accent/40 transition-all duration-500 relative overflow-hidden group-hover:bg-secondary/80">
                                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <step.icon size={32} className="text-textPrimary group-hover:text-accent transition-colors duration-500 relative z-10" />
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="lg:pr-4">
                                        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                                            <span className="text-[10px] font-bold text-accent/60 font-sans tracking-widest">0{idx + 1}</span>
                                            <div className="px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-[8px] font-bold uppercase tracking-tighter text-accent">
                                                {step.status}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-textPrimary/40 text-sm leading-relaxed font-medium">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Animated Energy Flow (Mobile only vertical lines or desktop horizontal) */}
                                {idx < STEPS.length - 1 && (
                                    <div className="absolute top-[45px] right-0 translate-x-1/2 hidden lg:block pointer-events-none">
                                        <motion.div 
                                            animate={{ x: [0, 40], opacity: [0, 1, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: idx * 0.4 }}
                                            className="w-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
