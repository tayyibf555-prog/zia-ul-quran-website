import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Hammer, Paintbrush, Building, GraduationCap, CheckCircle2, Clock, Zap } from 'lucide-react';

const phases = [
    {
        title: "Restructuring of our education system within Zia Ul Quran",
        date: "Ongoing 2026",
        description: "We are revitalizing our educational structure to cultivate a generation of enlightened scholars. By integrating digital interactive learning, expanding our library resources, and refining our curriculum, we aim to bridge traditional Islamic sciences with modern educational standards for both youth and adult learners.",
        status: "active",
        icon: GraduationCap,
        details: ["Digital Classrooms", "Islamic Library", "Youth Resource Center"]
    },
    {
        title: "Phase 2: Interior Craftsmanship",
        date: "Summer 2026",
        description: "Handcrafted Arabic calligraphy, premium eco-friendly carpeting, and bespoke lighting fixtures designed to create a serene sanctuary.",
        status: "upcoming",
        icon: Paintbrush,
        details: ["Classic Calligraphy", "High-Grade Carpeting", "Mood Lighting Installation"]
    },
    {
        title: "Phase 3: Structural Reinforcement & Expansion",
        date: "Expected 2027",
        description: "Expansion of the masjid to the newly acquired land behind the current building, alongside essential reinforcement of the main hall foundations to support the larger structure.",
        status: "upcoming",
        icon: Hammer,
        details: ["Land Expansion", "Foundation Strengthening", "Capacity Increase"]
    },
    {
        title: "Phase 4: Educational Hub",
        date: "Vision 2027",
        description: "Expansion of the Madrassa facilities with digital interactive boards and a new resource library for youth and adult learning.",
        status: "upcoming",
        icon: GraduationCap,
        details: ["Digital Classrooms", "Islamic Library", "Youth Resource Center"]
    }
];

const ProjectTimeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="projects" className="py-24 bg-white overflow-hidden" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-600 mb-4">Development Roadmap</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-6">
                        Phases <span className="text-accent-500">to Come</span>
                    </h3>
                    <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Investing in our future. Witness the evolution of Zia-ul-Quran as we transform our vision into a spiritual landmark.
                    </p>
                </motion.div>
            </div>

            <div className="relative max-w-5xl mx-auto">
                {/* Vertical Line */}
                <motion.div
                    className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-100 origin-top -translate-x-1/2 hidden lg:block"
                    style={{ scaleY }}
                >
                    <div className="h-full w-full bg-gradient-to-b from-primary-600 to-accent-400"></div>
                </motion.div>

                <div className="space-y-16 lg:space-y-24 relative z-10">
                    {phases.map((phase, index) => (
                        <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Card Wrapper */}
                            <motion.div
                                className="w-full lg:w-[45%]"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative">
                                    {/* Status Badge */}
                                    <div className={`absolute top-6 right-8 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        phase.status === 'active' ? 'bg-primary-100 text-primary-700 animate-pulse' :
                                            'bg-neutral-100 text-neutral-500'
                                        }`}>
                                        {phase.status === 'completed' ? <CheckCircle2 size={12} /> : phase.status === 'active' ? <Zap size={12} /> : <Clock size={12} />}
                                        {phase.status}
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary-600 group-hover:bg-primary-900 group-hover:text-white transition-colors duration-500">
                                            <phase.icon size={28} />
                                        </div>
                                        <div className="pr-24">
                                            <h4 className="text-xl font-bold text-primary-900">{phase.title}</h4>
                                            <p className="text-sm font-bold text-accent-600 uppercase tracking-widest">{phase.date}</p>
                                        </div>
                                    </div>

                                    <p className="text-neutral-600 mb-8 leading-relaxed">
                                        {phase.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {phase.details.map((detail, dIndex) => (
                                            <span key={dIndex} className="bg-white border border-neutral-200 px-3 py-1.5 rounded-xl text-[11px] font-medium text-neutral-500">
                                                • {detail}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Middle Icon Node */}
                            <div className="hidden lg:flex w-10 h-10 rounded-full bg-white border-4 border-primary-50 relative z-20 items-center justify-center shadow-lg">
                                <div className={`w-3 h-3 rounded-full ${phase.status === 'completed' ? 'bg-green-500' : phase.status === 'active' ? 'bg-primary-600' : 'bg-neutral-300'}`}></div>
                            </div>

                            {/* Offset Placeholder */}
                            <div className="hidden lg:block w-[45%]"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectTimeline;
