import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const services = [
        {
            title: 'Madrassa',
            description: "Fun, engaging Qur’an and Islamic studies classes that help children learn to read the Qur’an with confidence, understand core Islamic teachings, and develop good character in a supportive, nurturing environment.",
            image: '/madrassa-poster.png',
            theme: 'green'
        },
        {
            title: 'Shahadah Services',
            description: "We are honoured to welcome new Muslims into Islam. Our Shahadah service offers a calm, personal experience, a bespoke certificate to mark the occasion, and ongoing support to help individuals grow in faith and confidence.",
            image: '/shahadah-poster.png',
            theme: 'gold'
        },
        {
            title: 'iSyllabus for Schools',
            description: "Zia-ul-Quran delivers the award-winning iSyllabus for Schools — a structured, five-year Islamic Studies curriculum for ages 10–16. Developed by experienced scholars and educators, it combines traditional Islamic learning with the needs of modern society and school environments.",
            image: '/isyllabus-poster-v3.png',
            theme: 'green',
            link: {
                text: 'Sign up here',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLSeJTMMIBnG9tsbA_HfO03Ebotl_8FoXOFmHMktqy7-kEtFdUA/viewform'
            }
        },
        {
            title: 'Nikah (Marriage Services)',
            description: "Shaykh Hassan Rabbani offers Nikah ceremonies that are meaningful, dignified, and spiritually grounded. Each service includes a heartfelt address, respectful officiation, and a bespoke Nikah certificate, welcoming couples from diverse backgrounds.",
            image: '/nikah-poster-v2.png',
            theme: 'gold',
            link: {
                text: 'Sign up here',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLScbgoxAR3VQ81z2fuYh3imzXNp-EP62RJDKXgGwuGh7osVgMA/viewform'
            }
        },
        {
            title: 'Outreach & Interfaith Initiatives',
            description: "We are committed to positive engagement beyond our community. Through open conversations, educational events, and interfaith dialogue, we welcome opportunities to explore faith, values, and shared understanding — often starting with a cup of tea and an honest discussion.",
            image: '/outreach-poster-v3.png',
            theme: 'green'
        },
        {
            title: 'Counselling & Therapy',
            description: "We provide confidential, faith-sensitive counselling for individuals, couples, and families. Our professional therapists support mental wellbeing, relationships, and personal development with compassion, discretion, and cultural understanding.",
            image: '/counselling-poster-v3.png',
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
                        Services at Zia-ul-Quran Glasgow
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        Comprehensive Islamic services to support our community's spiritual and social needs
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
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
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full group border border-neutral-100"
                            >
                                {/* Header with Image Poster */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-display font-bold text-primary-600 mb-3 underline underline-offset-4 decoration-primary-300/50 group-hover:decoration-primary-500 transition-all">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed flex-grow mb-4 italic font-medium">
                                        {service.description}
                                    </p>

                                    {service.link && (
                                        <div className="mt-auto">
                                            <a
                                                href={service.link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-accent-600 font-bold hover:text-accent-700 transition-colors group/btn text-sm"
                                            >
                                                {service.link.text}
                                                <ExternalLink className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
