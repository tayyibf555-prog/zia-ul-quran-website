import { Menu, X, MapPin, Phone, Mail, Globe, Radio, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navItems = [
        { name: t('nav.home'), href: '/#home' },
        { name: 'Our Team', href: '/team', isLink: true },
        { name: t('nav.prayer'), href: '/#prayer-times' },
        { name: t('nav.services'), href: '/#services' },
        { name: t('nav.events'), href: '/events', isLink: true },
    ];

    const moreItems = [
        { name: 'Zakat Calculator', href: '/zakat' },
        { name: 'Community Portal', href: '/portal' },
        { name: 'Resources & Library', href: '/resources' },
    ];

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-28">
                    {/* Logo Area */}
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Link to="/">
                                <img
                                    src="/logo.jpg"
                                    alt="Zia-ul-Quran"
                                    className="h-20 w-auto mix-blend-multiply"
                                />
                            </Link>
                        </motion.div>

                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            item.isLink ? (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <NavHashLink
                                    key={item.name}
                                    smooth
                                    to={item.href}
                                    className="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                                >
                                    {item.name}
                                </NavHashLink>
                            )
                        ))}

                        {/* More Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsMoreOpen(!isMoreOpen)}
                                className="flex items-center gap-1 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
                            >
                                More <ChevronDown size={16} className={`transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isMoreOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden py-2"
                                    >
                                        {moreItems.map(item => (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                onClick={() => setIsMoreOpen(false)}
                                                className="block px-6 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors font-medium border-b border-neutral-50 last:border-0"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Language Toggle */}
                        <div className="flex bg-neutral-100 rounded-full p-1 border border-neutral-200">
                            {['en', 'ur', 'ar'].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang)}
                                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${language === lang ? 'bg-primary-900 text-white shadow-md' : 'text-neutral-400 hover:text-neutral-600'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        <a
                            href="https://donate.justgiving.com/charity/ziaulquran/donation-amount"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gold-gradient text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-900/40"
                        >
                            {t('nav.donate')}
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-neutral-200"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {[...navItems, ...moreItems.map(i => ({ ...i, isLink: true }))].map((item) => (
                                item.isLink ? (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-neutral-700 hover:text-primary-600 transition-colors py-2 font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <NavHashLink
                                        key={item.href}
                                        smooth
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-neutral-700 hover:text-primary-600 transition-colors py-2 font-medium"
                                    >
                                        {item.name}
                                    </NavHashLink>
                                )
                            ))}
                            <div className="pt-4 flex gap-4">
                                {['en', 'ur', 'ar'].map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => setLanguage(lang)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all flex-1 ${language === lang ? 'bg-primary-900 text-white' : 'bg-neutral-100 text-neutral-400'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                            <a
                                href="https://donate.justgiving.com/charity/ziaulquran/donation-amount"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="block bg-gold-gradient text-primary-900 px-6 py-3 rounded-full font-semibold text-center shadow-lg shadow-amber-900/40"
                            >
                                {t('nav.donate')}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
