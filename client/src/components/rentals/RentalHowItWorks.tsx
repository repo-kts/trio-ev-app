import { motion } from 'framer-motion';

const steps = [
    {
        n: '01',
        title: 'Pick your hours',
        desc: 'Choose a 12, 16, 20, or 25-hour slot  whichever fits what you have planned for the day.',
    },
    {
        n: '02',
        title: 'VERIFY ONCE',
        desc: 'Upload your ID and driving licence. It is a one-time process. Fast, automated, and done before you know it.',
    },
    {
        n: '03',
        title: 'COLLECT OR RECEIVE',
        desc: 'Pick up from the nearest hub at your convenience — or have the EV brought to where you are.',
    },
    {
        n: '04',
        title: 'GO',
        desc: 'The vehicle is fully charged and ready. Where you go and what you do with your time is entirely up to you.',
    },
    {
        n: '05',
        title: 'Return',
        desc: 'Bring it back when your time is up. No forms. No inspection queues. No follow-up calls. Just hand it over and you are done.',
    },
];

export function RentalHowItWorks() {
    return (
        <section className="py-16 sm:py-20 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4 md:gap-8"
            >
                <h2 className="font-heading text-[clamp(44px,11vw,120px)] md:text-[clamp(52px,8vw,120px)] leading-[0.88] uppercase text-textPrimary">
                    How it <span className="text-accent">works.</span>
                </h2>
                <p className="md:max-w-[300px] text-sm text-textPrimary/60 leading-relaxed">
                    Five steps from booking to riding. Most people are on the road in under ten minutes.
                </p>
            </motion.div>

            {/* ───── MOBILE: vertical timeline ───── */}
            <div className="sm:hidden relative pl-14">
                {/* vertical guide line */}
                <div className="pointer-events-none absolute left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0" />

                <div className="flex flex-col gap-5">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.n}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="relative"
                        >
                            {/* numbered node, absolutely positioned over the guide line */}
                            <div className="absolute -left-14 top-0 flex items-center justify-center">
                                <div className="relative w-[52px] h-[52px] rounded-full bg-background border-2 border-accent/40 flex items-center justify-center shadow-[0_0_20px_rgba(92,240,158,0.15)]">
                                    <span className="font-heading text-accent text-xl leading-none">{step.n}</span>
                                    {/* pulse ring on first step */}
                                    {i === 0 && (
                                        <span className="absolute inset-0 rounded-full border-2 border-accent/40 animate-ping" />
                                    )}
                                </div>
                            </div>

                            {/* content card */}
                            <div className="rounded-2xl border border-white/8 bg-secondary/30 p-4 min-h-[60px]">
                                <h4 className="font-heading text-base uppercase tracking-wide text-textPrimary mb-1.5 leading-tight">{step.title}</h4>
                                <p className="text-[12.5px] text-textPrimary/55 leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* end marker */}
                <div className="absolute left-[18px] -bottom-1 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(92,240,158,0.6)]" />
                </div>
            </div>

            {/* ───── DESKTOP: original grid (unchanged from sm+) ───── */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-5">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.n}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                        className="group pt-6 border-t-2 border-textPrimary/20 hover:border-accent transition-colors duration-300"
                    >
                        <div className="font-heading text-[64px] leading-none text-accent mb-4">{step.n}</div>
                        <h4 className="font-heading text-lg uppercase tracking-wide text-textPrimary mb-3">{step.title}</h4>
                        <p className="text-sm text-textPrimary/50 leading-relaxed">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
