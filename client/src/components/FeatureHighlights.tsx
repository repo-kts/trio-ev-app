import { motion } from 'framer-motion';


const features = [
    { logo: "https://www.google.com/s2/favicons?domain=kpmg.com&sz=128", title: "KPMG" },
    { logo: "https://www.google.com/s2/favicons?domain=capgemini.com&sz=128", title: "Capgemini" },
    { logo: "https://unavatar.io/tcs.com", title: "TCS" },
    { logo: "https://www.google.com/s2/favicons?domain=deloitte.com&sz=128", title: "Deloitte" }
];

// Duplicate features to allow seamless infinite scrolling
const doubledFeatures = [...features, ...features, ...features];

export function FeatureHighlights() {
    return (
        <section id="features" className="py-16 sm:py-20 md:py-24 border-y border-white/5 bg-secondary/10 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-8 sm:gap-12 md:gap-16 w-max"
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
                        className="flex items-center gap-3 min-w-[160px] sm:min-w-[200px] bg-secondary/30 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/5 hover:border-accent/30 transition-all group"
                    >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shrink-0 border border-white/10 shadow-sm overflow-hidden group-hover:scale-110 transition-transform relative">
                            <img 
                                src={feat.logo} 
                                alt={feat.title} 
                                className="w-5 h-5 sm:w-7 sm:h-7 object-contain z-10" 
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.style.opacity = '0';
                                }}
                            />
                            {feat.title === "TCS" ? (
                                <span className="absolute inset-0 flex items-center justify-center font-black text-[10px] tracking-tighter uppercase bg-gradient-to-tr from-[#ff4d4d] via-[#ff944d] to-[#b366ff] bg-clip-text text-transparent">
                                    tcs
                                </span>
                            ) : (
                                <span className="absolute inset-0 flex items-center justify-center text-secondary font-bold text-xs">
                                    {feat.title[0]}
                                </span>
                            )}
                        </div>
                        <div>
                            <h4 className="text-sm sm:text-base font-bold text-textPrimary tracking-tight">{feat.title}</h4>
                        </div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
