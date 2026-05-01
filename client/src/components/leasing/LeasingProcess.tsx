const steps = [
    { title: "Consultation", desc: "Fleet audit and ROI analysis." },
    { title: "Selection", desc: "Custom configuration of EVs." },
    { title: "Deployment", desc: "Seamless onboarding and delivery." },
    { title: "Support", desc: "24/7 maintenance and tech support." }
];

export function LeasingProcess() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-white/5">
            <h2 className="text-3xl font-heading font-black uppercase mb-16 text-center">Seamless <span className="text-accent">Onboarding</span></h2>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                {steps.map((step, i) => (
                    <div key={i} className="flex-1 relative">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent font-black text-xs">
                                {i + 1}
                            </div>
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute left-10 top-5 w-full h-px bg-white/10" />
                            )}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                        <p className="text-xs text-textPrimary/40 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
