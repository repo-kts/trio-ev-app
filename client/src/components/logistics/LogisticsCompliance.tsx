import { motion } from 'framer-motion';
import { FileText, CreditCard, Wrench, PowerOff } from 'lucide-react';

const COMPLIANCE_ITEMS = [
    { 
        title: "Term Duration", 
        icon: FileText, 
        desc: "Minimum 3 year lease with flexible renewal options available at end of term." 
    },
    { 
        title: "Payment Terms", 
        icon: CreditCard, 
        desc: "Monthly payments due within 5 days of billing. Late payments may incur penalties." 
    },
    { 
        title: "Maintenance", 
        icon: Wrench, 
        desc: "Lessee handles routine upkeep to keep the vehicle in good condition throughout the lease." 
    },
    { 
        title: "Termination", 
        icon: PowerOff, 
        desc: "Either party can terminate with 90-day notice and settlement of all outstanding dues." 
    }
];

export function LogisticsCompliance() {
    return (
        <section className="py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                    >
                        Legal Framework
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-heading font-bold text-textPrimary mb-6"
                    >
                        LEGAL AGREEMENT <span className="text-accent">HIGHLIGHTS.</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-textPrimary/50 max-w-2xl mx-auto text-lg font-medium"
                    >
                        Key points to understand in your EV leasing legal agreement for a transparent and secure partnership.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {COMPLIANCE_ITEMS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:bg-secondary/50 transition-all duration-500 overflow-hidden"
                        >
                            {/* Animated Background Highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                                <div className="p-3 rounded-xl bg-background border border-white/5 w-fit mb-8 group-hover:border-accent/20 transition-colors">
                                    <item.icon size={24} className="text-textPrimary/60 group-hover:text-accent transition-colors duration-500" />
                                </div>
                                
                                <h3 className="text-xl font-heading font-bold text-textPrimary mb-4 flex items-center gap-2">
                                    {item.title}
                                    <div className="h-px w-0 bg-accent group-hover:w-8 transition-all duration-500" />
                                </h3>
                                
                                <p className="text-textPrimary/40 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Thin bottom separator highlight */}
                            <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-white/5 group-hover:bg-accent/40 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
