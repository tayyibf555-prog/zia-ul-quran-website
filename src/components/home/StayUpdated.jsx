import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Bell, ArrowRight } from 'lucide-react';

const StayUpdated = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="stay-updated" className="py-20 relative overflow-hidden" ref={ref}>
            {/* Background with Pattern */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-primary-900"
                ></div>
                <div
                    className="absolute inset-0 bg-[url('/hero-pattern.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"
                ></div>
                {/* Gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900/90"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-sm font-bold mb-6">
                        <Bell className="w-4 h-4 animate-bounce" />
                        STAY UP TO DATE
                    </div>

                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Join Our <span className="text-gold-gradient">WhatsApp Community</span>
                    </h2>

                    <p className="text-primary-100 text-lg mb-10 leading-relaxed">
                        Receive daily prayer times, important announcements, and event updates
                        directly on your phone. Be the first to know about everything at Zia-Ul-Quran.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a
                            href="https://chat.whatsapp.com/LWeqbYCpsVEG83KF9HQhZb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-10 py-5 bg-gold-gradient text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl shadow-accent-950/40 border border-accent-300/30 group"
                        >
                            <MessageSquare className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                            Join WhatsApp Group
                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    <p className="mt-8 text-primary-300/60 text-sm">
                        * Your privacy matters. Only admins can see your contact number.
                    </p>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        </section>
    );
};

export default StayUpdated;
