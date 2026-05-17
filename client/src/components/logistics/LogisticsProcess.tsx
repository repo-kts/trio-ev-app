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

function ProcessMobileBento() {
    const heroStep = STEPS[0];
    const rest = STEPS.slice(1);
    return (
        <div className="md:hidden flex flex-col gap-4">
            {/* Hero green tile — Step 01 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7 }}
                className="bg-accent rounded-[1.75rem] p-7 flex flex-col justify-between min-h-[240px] overflow-hidden relative shadow-[0_20px_50px_rgba(92,240,158,0.15)]"
            >
                <div className="flex items-center justify-between relative z-10">
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-black/55 font-bold">— Step 01</span>
                    <div className="px-2 py-0.5 rounded-md bg-black/15 text-[9px] font-bold uppercase tracking-[0.18em] text-black">
                        {heroStep.status}
                    </div>
                </div>

                <span className="absolute top-12 right-6 font-sans text-[90px] font-black leading-none text-black/10 pointer-events-none select-none">
                    01
                </span>

                <div className="relative z-10 flex items-end gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-black/15 flex items-center justify-center shrink-0">
                        <heroStep.icon className="text-[#0a0a0a] w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-heading text-2xl uppercase leading-[0.95] text-[#0a0a0a]">
                            {heroStep.title}
                        </h4>
                        <p className="text-[12px] text-black/65 leading-snug mt-2">
                            {heroStep.description}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* 2-col grid for steps 02 and 03 */}
            <div className="grid grid-cols-2 gap-4">
                {rest.slice(0, 2).map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className={`rounded-[1.5rem] p-5 flex flex-col justify-between min-h-[210px] ${
                            i === 0 ? 'bg-secondary/40 border border-white/8' : 'bg-secondary border border-white/5'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-textPrimary/40 font-bold">
                                — 0{i + 2}
                            </span>
                            <div className="w-9 h-9 rounded-xl bg-background border border-white/10 flex items-center justify-center">
                                <step.icon className="text-accent w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[8px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent w-fit">
                                {step.status}
                            </span>
                            <h4 className="font-heading text-[15px] uppercase leading-tight text-textPrimary">{step.title}</h4>
                            <p className="text-[11.5px] text-textPrimary/50 leading-relaxed">{step.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Full-width step 04 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="rounded-[1.5rem] p-6 bg-secondary/40 border border-white/8 flex items-center gap-5"
            >
                <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                    {(() => {
                        const Icon = STEPS[3].icon;
                        return <Icon className="text-accent w-6 h-6" />;
                    })()}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-textPrimary/40 font-bold">— 04</span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent">
                            {STEPS[3].status}
                        </span>
                    </div>
                    <h4 className="font-heading text-[15px] uppercase leading-tight text-textPrimary mb-1">
                        {STEPS[3].title}
                    </h4>
                    <p className="text-[11.5px] text-textPrimary/50 leading-relaxed">
                        {STEPS[3].description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export function LogisticsProcess() {
    return (
        <section className="py-16 md:py-32 px-5 md:px-6 bg-background relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-24">
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
                        className="font-heading text-[2rem] md:text-5xl font-bold text-textPrimary mb-4 md:mb-6 leading-[0.95]"
                    >
                        HOW EV <span className="text-accent">LEASING WORKS.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-textPrimary/50 max-w-2xl mx-auto text-sm md:text-lg font-medium px-2"
                    >
                        A seamless, intelligent journey from fleet exploration to sustainable driving.
                    </motion.p>
                </div>

                {/* Mobile: EV charging pipeline */}
                <ProcessMobileBento />

                <div className="relative hidden md:block">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-4 relative z-10">
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
                                <div className="flex flex-row md:flex-col items-start md:items-center lg:items-start gap-5 md:gap-0 text-left md:text-center lg:text-left p-5 md:p-0 rounded-2xl md:rounded-none bg-secondary/20 md:bg-transparent border border-white/5 md:border-0">
                                    <div className="relative md:mb-10 shrink-0">
                                        {/* Connector Dot */}
                                        <div className="hidden lg:block absolute top-[45px] left-1/2 -translate-x-1/2 -translate-y-[45px]">
                                            <div className="w-3 h-3 rounded-full bg-background border border-white/20 group-hover:border-accent group-hover:scale-125 transition-all duration-500 relative z-20" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Icon */}
                                        <div className="w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] bg-secondary/50 border border-white/5 flex items-center justify-center group-hover:border-accent/40 transition-all duration-500 relative overflow-hidden group-hover:bg-secondary/80">
                                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <step.icon className="text-textPrimary group-hover:text-accent transition-colors duration-500 relative z-10 w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 min-w-0 lg:pr-4">
                                        <div className="flex items-center gap-3 mb-2 md:mb-4 justify-start md:justify-center lg:justify-start">
                                            <span className="text-[10px] font-bold text-accent/60 font-sans tracking-widest">0{idx + 1}</span>
                                            <div className="px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-[8px] font-bold uppercase tracking-tighter text-accent">
                                                {step.status}
                                            </div>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-heading font-bold text-textPrimary mb-2 md:mb-3 group-hover:text-accent transition-colors leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-textPrimary/40 text-[13px] md:text-sm leading-relaxed font-medium">
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
