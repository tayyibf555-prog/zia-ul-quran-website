import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Calendar, MapPin, ArrowRight } from 'lucide-react';

const WomensTafsir = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="womens-tafsir" className="py-20 relative overflow-hidden" ref={ref}>
            {/* Background elements */}
            <div className="absolute inset-0 bg-primary-50/50"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -ml-48 -mb-48"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Image / Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                            {/* Placeholder visuals since we don't have a specific image yet */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center">
                                <BookOpen className="w-32 h-32 text-white/20" />
                            </div>
                            <div className="absolute inset-0 bg-primary-900/40"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                                <h3 className="text-3xl font-display font-bold mb-2">Women's Tafsir</h3>
                                <p className="text-primary-100 italic">Journey through the Qur'an</p>
                            </div>
                        </div>

                        {/* Decorative Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-accent-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-gold-gradient p-2 rounded-full">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Join Us</p>
                                    <p className="font-display font-bold text-primary-900">Weekly Classes</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                            New Series
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-900 mb-6">
                            Women's <span className="text-gold-gradient">Tafsir Series</span>
                        </h2>

                        <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                            Join us for an enlightening journey through the Qur'an, specifically tailored for women.
                            Connect with the words of Allah, find spiritual nourishment, and build sisterhood in a
                            supportive and welcoming environment.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-100 p-2 rounded-lg mt-1">
                                    <Calendar className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary-900">Weekly Sessions</h4>
                                    <p className="text-neutral-600 text-sm">Date & Time Coming Soon</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary-100 p-2 rounded-lg mt-1">
                                    <MapPin className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary-900">Location</h4>
                                    <p className="text-neutral-600 text-sm">Zia-ul-Quran, 257 Kenmure St, Glasgow</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://chat.whatsapp.com/LWeqbYCpsVEG83KF9HQhZb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-all hover:scale-105 shadow-lg shadow-primary-900/20"
                        >
                            Register Interest
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WomensTafsir;
