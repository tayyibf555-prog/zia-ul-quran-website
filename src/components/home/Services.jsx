import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const services = [
        {
            title: 'Madrassa',
            description: "Helping kids learn to read the Qur'an with confidence, understand Islamic teachings, and build good character, all in a fun and supportive environment!",
            theme: 'green'
        },
        {
            title: 'Shahadah Services',
            description: "We've had the honour of welcoming many new Muslims over the years! We provide a personalised shahadah experience, a bespoke certificate to mark the special moment, and ongoing support to help you on your journey.",
            theme: 'gold'
        },
        {
            title: 'iSyllabus for Schools',
            description: "Zia-Ul-Quran is pleased to offer the award winning iSyllabus for Schools programme, a bespoke, 5 year Islamic Studies curriculum for ages 10–16. Developed by experienced scholars and educators, it blends the rigour of traditional learning with the needs of modern society.",
            theme: 'green',
            link: {
                text: 'Sign up here',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLSeJTMMIBnG9tsbA_HfO03Ebotl_8FoXOFmHMktqy7-kEtFdUA/viewform'
            }
        },
        {
            title: 'Nikah (Marriage Services)',
            description: "Shaykh Hassan Rabbani is in high demand for Nikah ceremonies, delivering a heartfelt and meaningful speech to mark this special occasion. We provide a bespoke Nikah certificate and officiate marriages for Muslims from diverse backgrounds.",
            theme: 'gold',
            link: {
                text: 'Sign up here',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLScbgoxAR3VQ81z2fuYh3imzXNp-EP62RJDKXgGwuGh7osVgMA/viewform'
            }
        },
        {
            title: 'Outreach and Interfaith Initiatives',
            description: "We're committed to interfaith work and love exploring big questions with Muslims and non-Muslims alike. Fancy a cup of tea and a good conversation? Get in touch!",
            theme: 'green'
        },
        {
            title: 'Counselling & Therapy',
            description: "We offer compassionate, faith-sensitive counselling for individuals, couples, and families. Whether you're facing mental health struggles, relationship challenges, or personal growth hurdles, our expert therapists provide confidential support.",
            theme: 'gold',
            link: {
                text: 'Find out more',
                url: 'https://hmuslimcounselling.com/'
            }
        }
    ];

    return (
        <section id="services" className="py-20 bg-neutral-50" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
                        Our Services
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        Comprehensive Islamic services to support our community's spiritual and social needs
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const isGreen = service.theme === 'green';

                        // Defined styles based on Hero implementation
                        // Green: primary-900 base (matches hero)
                        // Gold: premium amber gold (matches hero heading)
                        const baseColorClass = isGreen ? 'bg-primary-900' : 'bg-amber-500';

                        // Gradient overlays
                        // Gradient overlays - Reduced opacity to let pattern show through
                        const gradientOverlayClass = isGreen
                            ? 'bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/80'
                            : 'bg-gradient-to-br from-amber-600/90 via-yellow-400/80 to-amber-500/90';

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? {
                                    opacity: 1,
                                    y: [0, -8, 0] // Floating motion
                                } : {}}
                                transition={{
                                    opacity: { duration: 0.5, delay: index * 0.1 },
                                    y: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.2 // Stagger the floating
                                    }
                                }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                            >
                                {/* Header with Hero Pattern */}
                                <div className={`relative h-24 overflow-hidden ${baseColorClass} ${isInView ? 'shine-effect' : ''}`}>
                                    {/* Pattern Layer */}
                                    <div className="absolute inset-0 z-0">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
                                            style={{ backgroundImage: "url('/hero-pattern.jpg')" }}
                                        ></div>
                                        {/* Gradient Overlay - Reduced opacity to show pattern */}
                                        <div className={`absolute inset-0 ${gradientOverlayClass}`}></div>
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-display font-bold text-primary-600 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed flex-grow mb-4">
                                        {service.description}
                                    </p>

                                    {service.link && (
                                        <div className="mt-auto">
                                            <a
                                                href={service.link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-accent-600 font-bold hover:text-accent-700 transition-colors group text-sm"
                                            >
                                                {service.link.text}
                                                <ExternalLink className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
