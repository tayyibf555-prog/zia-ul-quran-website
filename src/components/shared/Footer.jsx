import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="relative bg-primary-900 text-white overflow-hidden">
            {/* Background Pattern Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: "url('/hero-pattern.jpg')" }}
                ></div>
                {/* Gradient Overlay - Premium Green to Gold transition */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800/90 to-accent-600"></div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid md:grid-cols-4 gap-10">
                    {/* Column 1: About */}
                    <div className="space-y-4">
                        <Link to="/"><h3 className="font-display text-2xl font-bold text-accent-600">Zia-ul-Quran</h3></Link>
                        <p className="text-primary-100 text-sm leading-relaxed">
                            {t('footer.about')}
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="bg-primary-700/50 p-2 rounded-full hover:bg-accent-400 hover:text-primary-900 transition-colors"><Facebook size={18} /></a>
                            <a href="#" className="bg-primary-700/50 p-2 rounded-full hover:bg-accent-400 hover:text-primary-900 transition-colors"><Twitter size={18} /></a>
                            <a href="https://www.instagram.com/ziaulquran.glasgow?igsh=dmJpeWVkNmxzYTZt&utm_source=qr" target="_blank" rel="noopener noreferrer" className="bg-primary-700/50 p-2 rounded-full hover:bg-accent-400 hover:text-primary-900 transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="bg-primary-700/50 p-2 rounded-full hover:bg-accent-400 hover:text-primary-900 transition-colors"><Youtube size={18} /></a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2 text-primary-100 text-sm">
                            <li><NavHashLink smooth to="/#prayer-times" className="hover:text-accent-400 transition-colors">{t('nav.prayer')}</NavHashLink></li>
                            <li><NavHashLink smooth to="/#services" className="hover:text-accent-400 transition-colors">{t('nav.services')}</NavHashLink></li>
                            <li><Link to="/events" className="hover:text-accent-400 transition-colors">{t('nav.events')}</Link></li>
                            <li><a href="https://donate.justgiving.com/charity/ziaulquran/donation-amount" target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors">{t('nav.donate')}</a></li>
                            <li><NavHashLink smooth to="/#contact" className="hover:text-accent-400 transition-colors">{t('nav.contact')}</NavHashLink></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">{t('nav.contact')}</h4>
                        <ul className="space-y-3 text-primary-100 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-accent-400 shrink-0 mt-0.5" />
                                <span>257 Kenmure St, Pollokshields,<br />Glasgow G41 2QX</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-accent-400 shrink-0" />
                                <span>07888 896065</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-accent-400 shrink-0" />
                                <span>ziaulquran.scot@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Donate CTA */}
                    <div className="bg-primary-700/30 p-6 rounded-xl border border-primary-600/50 backdrop-blur-sm">
                        <Heart className="text-accent-400 mb-3" size={32} />
                        <h4 className="font-bold text-lg mb-2">{t('footer.supportMasjid')}</h4>
                        <p className="text-primary-200 text-xs mb-4">{t('footer.donationsRunMasjid')}</p>
                        <a
                            href="https://donate.justgiving.com/charity/ziaulquran/donation-amount"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-gold-gradient hover:scale-[1.02] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-xl shadow-amber-900/40 text-center"
                        >
                            {t('nav.donate')} Now
                        </a>
                    </div>
                </div>

                <div className="border-t border-primary-700/50 mt-12 pt-8 text-center text-primary-300 text-xs">
                    <p>&copy; {currentYear} Jamia Zia-ul-Quran. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
