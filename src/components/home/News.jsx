import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const newsItems = [
        {
            date: 'January 24, 2026',
            title: 'Ramadan 2026 Timetable',
            excerpt: 'The blessed month is here. View and download the detailed Ramadan 1447AH timetable including Sehri and Iftar times for Glasgow. Stay on track with your Quran progress with our new Quran tracker.',
            image: '/ramadan-poster.png',
            link: '/ramadan'
        },
        {
            date: 'January 24, 2026',
            title: 'Our Islamic Education Programme Registration Now Open',
            excerpt: 'The registration is now open for 7-11 year olds. Our comprehensive syllabus covers Quranic reading, Islamic studies, and character building in a fun and engaging environment.',
            image: '/education-poster.png',
            link: '#'
        },
        {
            date: 'January 24, 2026',
            title: 'Mother and Toddlers Group Coming Soon',
            excerpt: 'We are starting a new group for mothers and toddlers to connect, play, and learn in a warm, welcoming Islamic environment. Watch this space for details!',
            image: '/toddlers-poster.png',
            link: '#'
        }
    ];

    return (
        <section id="news" className="py-20 bg-white" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
                        Our News
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        Stay updated with the latest announcements, events, and stories from Zia-ul-Quran
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {newsItems.map((item, index) => (
                        <motion.article
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100"
                        >
                            {/* News Image/Thumb */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 flex items-center text-white text-sm font-medium">
                                    <Calendar className="w-4 h-4 mr-2 text-accent-400" />
                                    {item.date}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-display font-bold text-primary-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-neutral-600 leading-relaxed mb-6 flex-grow">
                                    {item.excerpt}
                                </p>

                                <Link
                                    to={item.link}
                                    className="flex items-center text-accent-600 font-bold hover:text-accent-700 transition-colors group/btn"
                                >
                                    Read More
                                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
