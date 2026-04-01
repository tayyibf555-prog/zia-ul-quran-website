import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, BookOpen, Palette, Activity } from 'lucide-react';

const YoungExplorers = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="young-explorers" className="py-24 bg-primary-900 relative overflow-hidden" ref={ref}>
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-900/95"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 font-bold uppercase tracking-widest text-xs mb-4 border border-accent-500/20">
                                Registration Open
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                                Young Explorers Programme
                            </h2>
                            <h3 className="text-2xl font-display font-semibold text-gold-gradient italic mb-6">
                                Faith, Learning & Joy Grow Together
                            </h3>
                            <p className="text-lg text-white/90 leading-relaxed font-medium">
                                A weekly programme for children aged 5–11, blending structured Islamic education with creative play and coordinated sport. Every Saturday 10:00 AM – 1:00 PM.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="bg-white/10 p-3 rounded-2xl flex-shrink-0">
                                    <BookOpen className="w-6 h-6 text-accent-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Islamic Learning</h4>
                                    <p className="text-white/80">Safar Academy curriculum, focusing on comprehensive and structured Islamic education for young minds.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="bg-white/10 p-3 rounded-2xl flex-shrink-0">
                                    <Palette className="w-6 h-6 text-accent-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Creative Play</h4>
                                    <p className="text-white/80">Arts, crafts, and cognitive games encouraging teamwork and problem-solving skills.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <div className="bg-white/10 p-3 rounded-2xl flex-shrink-0">
                                    <Activity className="w-6 h-6 text-accent-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Sport & Movement</h4>
                                    <p className="text-white/80">Coordinated activities including table tennis and team games supporting emotional regulation.</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="pt-4"
                        >
                            <a
                                href="https://ziaulquranweeklyclass.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-white text-primary-900 px-8 py-4 rounded-full font-bold hover:bg-neutral-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
                            >
                                Learn More
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowRight className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                                </motion.span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Image / Stats Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square bg-primary-900/20 group">
                            <img
                                src="/young_explorers_bg.png"
                                alt="Young Explorers Programme"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent"></div>

                            {/* Bottom Card Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                                    <p className="text-white font-bold text-lg mb-2">Led by Medical Experts</p>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Designed around how children learn best — supporting emotional regulation, focus, and readiness to learn within a warm, community environment.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 bg-primary-900 p-6 rounded-full shadow-2xl border-4 border-primary-800 flex flex-col items-center justify-center w-32 h-32"
                        >
                            <span className="text-3xl font-bold text-gold-gradient mb-1">Ages</span>
                            <span className="text-xl font-display font-bold text-white">5-11</span>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default YoungExplorers;
