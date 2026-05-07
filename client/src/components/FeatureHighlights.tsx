import { motion } from 'framer-motion';


const features = [
    { logo: "https://www.google.com/s2/favicons?domain=kpmg.com&sz=128", title: "KPMG" },
    { logo: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=128", title: "Capgemini" },
    { logo: "https://www.google.com/s2/favicons?domain=tcs.com&sz=128", title: "TCS" },
    { logo: "https://www.google.com/s2/favicons?domain=deloitte.com&sz=128", title: "Deloitte" }
];

// Duplicate features to allow seamless infinite scrolling
const doubledFeatures = [...features, ...features, ...features];

export function FeatureHighlights() {
    return (
        <section id="features" className="py-24 border-y border-white/5 bg-secondary/10 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-16 w-max"
                animate={{ x: [0, -1000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {doubledFeatures.map((feat, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-5 min-w-[240px] bg-secondary/30 backdrop-blur-sm px-6 py-5 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors"
                    >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-sm overflow-hidden">
                            <img 
                                src={feat.logo} 
                                alt={feat.title} 
                                className="w-7 h-7 object-contain" 
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('bg-secondary');
                                    // We can't easily inject a React component here via string replacement in a simple way
                                    // but we can at least hide the broken image.
                                }}
                            />
                        </div>
                        <div>
                            <h4 className="font-heading font-bold text-lg text-textPrimary tracking-wide">{feat.title}</h4>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
