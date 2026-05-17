export function TransportCaseStudy() {
    return (
        <section className="py-16 md:py-24 px-5 md:px-12 max-w-7xl mx-auto w-full">
            <div className="p-7 md:p-20 rounded-3xl md:rounded-[4rem] bg-accent text-background flex flex-col lg:flex-row gap-8 md:gap-16 items-stretch md:items-center">
                <div className="flex-1 space-y-4 md:space-y-8 text-left lg:text-left">
                    <div className="flex items-center gap-2 md:hidden">
                        <span className="w-1.5 h-1.5 rounded-full bg-background" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-background font-bold">Case Study</span>
                    </div>
                    <h2 className="font-heading text-[2rem] md:text-5xl leading-[0.95] md:leading-tight uppercase">The Impact of <br />EV Transition.</h2>
                    <p className="text-background/80 text-sm md:text-base max-w-md">How a global tech giant reduced its carbon footprint and commute costs by 40% in just 12 months.</p>
                </div>
                <div className="flex-1 w-full grid grid-cols-2 gap-3 md:gap-8">
                    <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-background/5 border border-background/10">
                        <div className="text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-60 mb-2 text-background">Before</div>
                        <div className="font-heading text-2xl md:text-3xl font-bold">$1.2M</div>
                        <div className="text-[9px] md:text-[10px] font-medium opacity-60 uppercase text-background mt-1">Annual Cost</div>
                    </div>
                    <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-background/20 border border-background/10">
                        <div className="text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-60 mb-2 text-background">After</div>
                        <div className="font-heading text-2xl md:text-3xl font-bold">$720K</div>
                        <div className="text-[9px] md:text-[10px] font-medium opacity-60 uppercase text-background mt-1">Annual Cost</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
