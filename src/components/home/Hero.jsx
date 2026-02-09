import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { NavHashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="home" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-primary-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-900/95"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Mobile optimization: adjusted padding */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-3 pt-4 md:pt-12"
                    >
                        {/* Gold Gradient Title - Poppins Bold */}
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold py-2 leading-tight md:leading-normal text-gold-gradient"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            <span className="block md:inline">Young Minds Gather</span>
                            <span className="hidden md:inline"> - </span>
                            <span className="block md:inline">Purpose Awakens</span>
                        </h1>
                        {/* White Subtitle */}
                        <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-3xl mx-auto leading-snug md:leading-relaxed px-4">
                            To grow with understanding, resilience and purposeful intention.
                        </p>
                    </motion.div>

                    {/* Buttons Row */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4 justify-center items-center">
                        {/* Ramadan 2026 Button - Dark with gold dot */}
                        <Link
                            to="/ramadan"
                            className="bg-primary-900/60 backdrop-blur-md text-white border border-white/20 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base hover:bg-primary-900/80 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2 group"
                        >
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400 animate-pulse group-hover:bg-amber-300"></span>
                            Ramadan 2026
                        </Link>
                        {/* Prayer Times Button - White */}
                        <NavHashLink
                            smooth
                            to="/#prayer-times"
                            className="bg-white text-primary-800 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
                        >
                            {t('nav.prayer')}
                        </NavHashLink>
                        {/* Donate Button - Gold Gradient */}
                        <a
                            href="https://donate.justgiving.com/charity/ziaulquran/donation-amount"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gold-gradient text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center shadow-lg shadow-amber-900/30"
                        >
                            {t('nav.donate')}
                        </a>
                    </div>
                </motion.div>


            </div >

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <ChevronDown className="text-white/70" size={32} />
            </motion.div>
        </section >
    );
};

export default Hero;
