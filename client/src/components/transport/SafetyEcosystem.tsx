import { ShieldCheck, Eye, Zap, Bell, CheckCircle } from 'lucide-react';

export function SafetyEcosystem() {
    return (
        <section className="py-16 md:py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
            {/* Mobile Heading (above visual) */}
            <div className="md:hidden mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck size={12} className="text-accent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">Safety First</span>
                </div>
                <h2 className="font-heading text-[2rem] font-bold mb-4 leading-[0.95] tracking-tight">
                    Built for <span className="text-accent">safety,</span><br />
                    designed for sanity.
                </h2>
                <p className="text-sm text-textPrimary/60 leading-relaxed">
                    An ecosystem that prioritizes human safety above all — security for every employee, peace of mind for every administrator.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                {/* Left Side: Visual "Command Center" */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-[3rem] group-hover:bg-accent/10 transition-colors" />
                    <div className="relative bg-secondary/30 backdrop-blur-xl border border-white/10 rounded-[1.75rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-white/5 pb-3 md:pb-4">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-[10px] md:text-xs font-heading font-bold tracking-widest text-accent uppercase">Safety Network</span>
                            </div>
                            <span className="text-[9px] md:text-[10px] text-textPrimary/40 uppercase font-bold tracking-wider font-sans">256 Nodes</span>
                        </div>

                        {/* Interactive-looking Safety Status */}
                        <div className="space-y-6">
                            <div className="bg-black/40 rounded-2xl p-4 md:p-6 border border-white/5 flex items-center justify-between group/item">
                                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-background transition-all">
                                        <Eye size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Live GPS & In-Cab Feed</div>
                                        <p className="text-[10px] text-textPrimary/40">Real-time telematics stream</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-accent">STABLE</div>
                                    <div className="text-[10px] text-textPrimary/30">99.9% uptime</div>
                                </div>
                            </div>

                            <div className="bg-black/40 rounded-2xl p-4 md:p-6 border border-white/5 flex items-center justify-between group/item">
                                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-background transition-all">
                                        <Bell size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Instant SOS Network</div>
                                        <p className="text-[10px] text-textPrimary/40">Direct link to response teams</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-accent">READY</div>
                                    <div className="text-[10px] text-textPrimary/30">{"< 5s Response"}</div>
                                </div>
                            </div>

                            <div className="bg-black/40 rounded-2xl p-4 md:p-6 border border-white/5 flex items-center justify-between group/item">
                                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-background transition-all">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Biometric Authentication</div>
                                        <p className="text-[10px] text-textPrimary/40">Verified driver start-up</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-accent">SECURE</div>
                                    <div className="text-[10px] text-textPrimary/30">100% Compliance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div>
                    <h2 className="hidden md:block text-4xl md:text-5xl font-heading font-bold mb-8 leading-[1.1] tracking-tight">
                        Built for <span className="text-accent">safety,</span><br />
                        designed for sanity.
                    </h2>
                    <p className="hidden md:block text-lg text-textPrimary/60 mb-10 leading-relaxed font-sans">
                        Transportation isn't just about the vehicle — it's about the security of every employee and the peace of mind of every administrator. We've built an ecosystem that prioritizes human safety above all.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-accent">
                                <Zap size={18} />
                                <span className="font-bold text-sm uppercase tracking-wider">Sanity Driven</span>
                            </div>
                            <p className="text-sm text-textPrimary/50 leading-relaxed font-sans">
                                Silent, smooth EV rides that turn stressful commutes into productive morning routines.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-accent">
                                <CheckCircle size={18} />
                                <span className="font-bold text-sm uppercase tracking-wider">Total Transparency</span>
                            </div>
                            <p className="text-sm text-textPrimary/50 leading-relaxed font-sans">
                                Admins see exactly where every employee is, with predictive alerts for any route deviations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
