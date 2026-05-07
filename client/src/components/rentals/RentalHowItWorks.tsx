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
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8"
            >
                <h2 className="font-heading text-[clamp(52px,8vw,120px)] leading-[0.88] uppercase text-textPrimary">
                    How it <span className="text-accent">works.</span>
                </h2>
                <p className="md:max-w-[300px] text-sm text-textPrimary/60 leading-relaxed">
                    Five steps from booking to riding. Most people are on the road in under ten minutes.                </p>
            </motion.div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
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
