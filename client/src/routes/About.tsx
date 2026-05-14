import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Zap, Users, ShieldCheck, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const missionPoints = [
    "Developing electric cars that are eco-friendly, stylish, reliable, and affordable for everyday use.",
    "Revolutionizing logistics with 100% electric fleets that reduce congestion, minimize noise, and lower emissions.",
    "Supporting sustainability by adopting green practices in design, manufacturing, and operations for healthier cities.",
    "Driving innovation through smart technology, renewable energy integration, and continuous performance improvements.",
    "Empowering communities by raising awareness about eco-friendly mobility and promoting nature-first choices.",
    "Building a connected future where technology, people, and the environment coexist seamlessly.",
];

function ExpandableMobileCard({
    label,
    title,
    image,
    description,
    bullets,
    closingNote,
    defaultOpen = false,
}: {
    label: string;
    title: string;
    image: string;
    description: string;
    bullets?: string[];
    closingNote?: string;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-secondary/20"
        >
            {/* Image with morphing height */}
            <motion.div
                onClick={() => setOpen((v) => !v)}
                animate={{ height: open ? 160 : 320 }}
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                className="relative w-full overflow-hidden cursor-pointer select-none"
            >
                <motion.img
                    src={image}
                    alt={title}
                    animate={{ scale: open ? 1.05 : 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Floating label chip (top-left) */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-background/60 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{label}</span>
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="text-2xl font-heading font-bold text-textPrimary leading-tight">
                        {title}
                    </h2>
                </div>
            </motion.div>

            {/* Body */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-6 pt-2 space-y-4">
                            <p className="text-sm text-textPrimary/60 leading-relaxed font-sans">
                                {description}
                            </p>
                            {bullets && (
                                <ul className="space-y-3">
                                    {bullets.map((b, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-textPrimary/70">
                                            <div className="mt-1 shrink-0 w-5 h-5 rounded-full border border-accent/30 flex items-center justify-center">
                                                <ShieldCheck size={11} className="text-accent" />
                                            </div>
                                            <span className="leading-relaxed">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {closingNote && (
                                <p className="text-sm text-textPrimary/50 font-sans italic border-l-2 border-accent/30 pl-4 py-1">
                                    {closingNote}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint when closed */}
            {!open && (
                <div className="px-5 pb-5 pt-3 flex items-center gap-2">
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-textPrimary/40 font-bold">
                        Tap image to expand
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                </div>
            )}
        </motion.div>
    );
}

export function About() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-background min-h-screen"
        >
            {/* SECTION 1: HERO */}
            <section className="relative pt-28 md:pt-40 pb-16 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none md:hidden" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md mb-5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">About Trio</span>
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[34px] md:text-7xl font-heading font-bold text-textPrimary mb-4 md:mb-6 tracking-tight leading-[1.05]"
                    >
                        Our Commitment to <span className="text-accent">Communities</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm md:text-2xl text-textPrimary/60 max-w-3xl mx-auto font-sans leading-relaxed"
                    >
                        Empowering local communities through clean technology and sustainable practices.
                    </motion.p>
                </div>
            </section>

            {/* SECTION 2: VISION & MISSION */}
            <section className="py-16 md:py-24 px-5 md:px-6 bg-secondary/5">
                {/* ── MOBILE: expandable creative cards ── */}
                <div className="md:hidden max-w-md mx-auto space-y-5">
                    <ExpandableMobileCard
                        label="Vision"
                        title="Our Vision"
                        image="/sustainability.png"
                        description="Trio envisions a world where every ride and every delivery contributes to a healthier planet. Our vision is to eliminate pollution and carbon emissions by creating a fully electric ecosystem for both personal mobility and logistics. We aspire to lead the transformation of the automotive and logistics industries, making sustainable, smart, and connected transportation accessible to all. By combining innovation, responsibility, and care for nature, we aim to build a future where progress and the environment move together in harmony."
                        defaultOpen
                    />
                    <ExpandableMobileCard
                        label="Mission"
                        title="Our Mission"
                        image="/energy.png"
                        description="At Trio, our mission is to redefine the way people move and businesses operate. We are committed to:"
                        bullets={missionPoints}
                        closingNote="Our purpose is clear: to protect nature, reduce pollution, and create a sustainable legacy where clean mobility becomes the heartbeat of modern living."
                    />
                </div>

                {/* ── DESKTOP: original layout (unchanged) ── */}
                <div className="hidden md:block max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <img
                                src="/sustainability.png"
                                alt="Sustainability"
                                className="w-full h-[220px] md:h-[500px] object-cover"
                            />
                            <div className="md:hidden absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                            <div className="md:hidden absolute bottom-3 left-4 flex items-center gap-2">
                                <div className="w-8 h-0.5 bg-accent rounded-full" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Vision</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 md:space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl md:text-4xl font-heading font-bold text-textPrimary mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                                    <div className="w-8 md:w-12 h-1 bg-accent rounded-full" />
                                    Our Vision
                                </h2>
                                <p className="text-sm md:text-lg text-textPrimary/55 leading-relaxed font-sans">
                                    Trio envisions a world where every ride and every delivery contributes to a healthier planet. Our vision is to eliminate pollution and carbon emissions by creating a fully electric ecosystem for both personal mobility and logistics. We aspire to lead the transformation of the automotive and logistics industries, making sustainable, smart, and connected transportation accessible to all. By combining innovation, responsibility, and care for nature, we aim to build a future where progress and the environment move together in harmony.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center flex-row-reverse">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1"
                        >
                            <h2 className="text-2xl md:text-4xl font-heading font-bold text-textPrimary mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                                <div className="w-8 md:w-12 h-1 bg-accent rounded-full" />
                                Our Mission
                            </h2>
                            <p className="text-sm md:text-lg text-textPrimary/55 leading-relaxed font-sans mb-6 md:mb-8">
                                At Trio, our mission is to redefine the way people move and businesses operate. We are committed to:
                            </p>
                            <ul className="space-y-3 md:space-y-4">
                                {[
                                    "Developing electric cars that are eco-friendly, stylish, reliable, and affordable for everyday use.",
                                    "Revolutionizing logistics with 100% electric fleets that reduce congestion, minimize noise, and lower emissions.",
                                    "Supporting sustainability by adopting green practices in design, manufacturing, and operations for healthier cities.",
                                    "Driving innovation through smart technology, renewable energy integration, and continuous performance improvements.",
                                    "Empowering communities by raising awareness about eco-friendly mobility and promoting nature-first choices.",
                                    "Building a connected future where technology, people, and the environment coexist seamlessly."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 md:gap-4 text-sm md:text-base text-textPrimary/70 group">
                                        <div className="mt-1 md:mt-1.5 shrink-0 w-5 h-5 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent transition-colors">
                                            <ShieldCheck size={12} className="text-accent group-hover:text-background" />
                                        </div>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 md:mt-8 text-sm md:text-base text-textPrimary/50 font-sans italic border-l-2 border-accent/30 pl-4 md:pl-6 py-2">
                                Our purpose is clear: to protect nature, reduce pollution, and create a sustainable legacy where clean mobility becomes the heartbeat of modern living.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative order-1 md:order-2 rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <img
                                src="/energy.png"
                                alt="Energy"
                                className="w-full h-[220px] md:h-[600px] object-cover"
                            />
                            <div className="md:hidden absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                            <div className="md:hidden absolute bottom-3 left-4 flex items-center gap-2">
                                <div className="w-8 h-0.5 bg-accent rounded-full" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Mission</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: OUR STORY */}
            <section className="py-16 md:py-32 px-5 md:px-6 bg-secondary/10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-textPrimary mb-3 md:mb-4">Our <span className="text-accent">Story</span></h2>
                        <div className="w-16 md:w-24 h-1 bg-accent mx-auto rounded-full" />
                    </motion.div>

                    <div className="space-y-5 md:space-y-8 text-sm md:text-lg text-textPrimary/60 font-sans leading-[1.7] md:leading-[1.8]">
                        <p>
                            Our journey began in the world of IT and telecom, where one of our founders worked on designing revenue models for Vodafone across Greece, Albania, and the UK. While building systems that directly impacted millions of customers, a realization struck — technology was advancing, but the hidden cost was environmental damage caused by emissions, vibrations, and unsustainable operations.
                        </p>
                        <p>
                            With a background in Computer Science and years of experience in telecom, the seed of an idea was planted: how can technology and business models be re-imagined to serve both people and the planet? This vision led to an entrepreneurial journey beginning in 2018, exploring eco-friendly solutions and sustainability-driven startups.
                        </p>
                        <p>
                            In 2022, the concept of clean transportation took shape. Starting small in Pune with just two leased vehicles, we tested the market, even driving the cars ourselves to understand a driver's real challenges. Those early months gave us invaluable insights into operations, payment irregularities, and the struggles drivers face daily. From there, we expanded to Kolkata, scaling our fleet and building strong foundations.
                        </p>

                        <div className="py-8 md:py-12 text-center relative">
                            <span className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 text-accent/20 font-heading text-6xl leading-none">"</span>
                            <h3 className="text-xl md:text-4xl font-heading font-bold text-accent tracking-tight leading-tight italic px-2">
                                "We're not just offering transport — we're driving a transition to greener, smarter mobility for all."
                            </h3>
                        </div>

                        <p>
                            In July 2024, after two years of groundwork, we officially registered Trio Evolution India Pvt. Ltd. — named to represent the three founders who came together from IT, transportation, and mechanical engineering backgrounds. Though one co-founder eventually moved on, the vision remained strong: to revolutionize mobility through sustainability.
                        </p>
                        <p>
                            We shifted from B2C to a B2B model, partnering with Mahindra Logistics to deploy EV fleets for large enterprises. Soon after, we began serving industry leaders like TCS, Capgemini, Cognizant, KPMG, and Indigo — expanding our fleet and proving that sustainable transport can meet the toughest corporate demands.
                        </p>
                        <p>
                            Recognizing that fleet growth is incomplete without infrastructure, we took the bold step of becoming Kolkata's first fleet owner to build a private EV charging hub in New Town, right at the heart of the city's IT corridor. This hub, set to be completed by August 2025, not only powers our fleet but also supports smaller operators, ensuring accessibility and affordability for all.
                        </p>
                        <p>
                            Today, our services span electric vehicle leasing, fleet management, smart charging infrastructure, and employee transportation solutions. From humble beginnings to city-wide impact, our story is proof that a vision backed by persistence can shape the future of mobility. As we move forward, our commitment remains the same: to empower businesses and communities to progress without compromising our planet. This is our story — and we're just getting started.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 4: LEADERSHIP TEAM */}
            <section className="py-16 md:py-32 px-5 md:px-6 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-textPrimary mb-3 md:mb-4">Leadership <span className="text-accent">Team</span></h2>
                        <p className="text-sm md:text-xl text-textPrimary/50 font-sans max-w-2xl mx-auto">
                            The minds behind our mission to transform transportation through clean energy and community-driven innovation.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-5 md:gap-10 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Subhash Kumar",
                                role: "Founder & CEO",
                                bio: "B.Tech in Computer Science. Former employee at Vodafone. Currently leading Trio as Founder & CEO, driving innovation and sustainable solutions.",
                                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                            },
                            {
                                name: "Somnath Das",
                                role: "Founder & COO",
                                bio: "M.A. graduate. Former employee at Uber. Now serving as Founder & COO of Trio, ensuring smooth operations and impactful strategies.",
                                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                            }
                        ].map((leader, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-secondary/20 rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 md:border md:border-white/5 md:hover:border-accent/40 transition-all duration-500 group overflow-hidden"
                            >
                                {/* Mobile: horizontal layout with image on left */}
                                <div className="md:hidden flex items-start gap-4">
                                    <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent/30">
                                        <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-heading font-bold text-textPrimary leading-tight">{leader.name}</h3>
                                        <p className="text-accent font-heading font-bold text-[10px] uppercase tracking-[0.2em] mt-1 mb-2">{leader.role}</p>
                                        <p className="text-xs text-textPrimary/55 font-sans leading-relaxed">{leader.bio}</p>
                                    </div>
                                </div>

                                {/* Desktop: original centered layout */}
                                <div className="hidden md:block text-center">
                                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-8 border-4 border-accent/20 group-hover:border-accent/50 transition-all">
                                        <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-textPrimary mb-2">{leader.name}</h3>
                                    <p className="text-accent font-heading font-bold text-sm uppercase tracking-widest mb-6">{leader.role}</p>
                                    <p className="text-textPrimary/50 font-sans leading-relaxed">{leader.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: OUR IMPACT */}
            <section className="py-16 md:py-32 px-5 md:px-6 bg-secondary/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 md:mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-textPrimary mb-3 md:mb-4">Our <span className="text-accent">Impact</span></h2>
                        <p className="text-sm md:text-xl text-textPrimary/50 font-sans max-w-2xl mx-auto">
                            We are dedicated to accelerating a clean, equitable future by integrating technology and sustainability in every journey.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                        {[
                            {
                                icon: TrendingUp,
                                title: "EV-First Fleet",
                                desc: "Deploying electric vehicles and hybrid transport solutions across all regions by 2026."
                            },
                            {
                                icon: TreePine,
                                title: "Commitment to Nature",
                                desc: "Investing in reforestation and renewable projects to exceed net-zero impact by 2030."
                            },
                            {
                                icon: Zap,
                                title: "Sustainable Smart Roads",
                                desc: "Implementing road-based energy harvesting to power streetlights and EV charging stations."
                            },
                            {
                                icon: Users,
                                title: "Innovation & Inclusion",
                                desc: "Fostering R&D and skill-building programs to empower rural communities in clean tech adoption."
                            }
                        ].map((impact, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-background border-t-4 border-accent p-4 md:p-8 rounded-2xl shadow-xl hover:translate-y-[-8px] transition-transform duration-300"
                            >
                                <div className="text-accent mb-3 md:mb-6">
                                    <impact.icon className="w-7 h-7 md:w-10 md:h-10" />
                                </div>
                                <h4 className="text-sm md:text-xl font-heading font-bold text-textPrimary mb-2 md:mb-4 leading-tight">{impact.title}</h4>
                                <p className="text-textPrimary/50 text-xs md:text-sm font-sans leading-relaxed">{impact.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: CONTACT / CTA */}
            <section className="py-16 md:py-32 px-5 md:px-6 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-textPrimary mb-3 md:mb-4 tracking-tight">Get in <span className="text-accent">Touch</span> with Us</h2>
                        <p className="text-sm md:text-xl text-textPrimary/60 font-sans mb-6 md:mb-8">
                            Have questions, suggestions, or collaboration ideas? Reach out and our team will get back to you promptly.
                        </p>
                        <h3 className="text-xl md:text-3xl font-heading font-bold text-accent mb-2 md:mb-4 tracking-tight">Partner With Us for a Greener Future</h3>
                        <p className="text-xs md:text-lg text-textPrimary/40 font-sans">
                            Join hands with TRIO EV and be part of the green mobility revolution.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-8 md:px-12 py-4 md:py-5 bg-accent text-background font-sans font-bold text-sm md:text-lg uppercase tracking-widest rounded-full hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(92,240,158,0.3)]"
                        >
                            Contact Us
                            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
