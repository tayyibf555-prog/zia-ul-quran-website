import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

const Events = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const upcomingEvents = [
        {
            title: 'Islamic Education Class',
            date: 'Every Saturday',
            time: '12:00 PM - 2:00 PM',
            location: 'Main Prayer Room',
            type: 'Education',
            image: '/education-poster.png'
        },
        {
            title: 'Shimmering Lights Qasidah',
            date: 'Every Friday Night',
            time: 'To be decided',
            location: 'Main Prayer Room',
            type: 'Spiritual',
            image: '/qasidah-poster.png'
        },
        {
            title: 'Mother and Toddlers Group',
            date: 'To be decided',
            time: 'To be decided',
            location: 'Main Prayer Hall',
            type: 'Community',
            image: '/toddlers-poster.png'
        }
    ];

    return (
        <section id="events" className="py-20 bg-neutral-50" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
                        Community Events
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        Join us for regular programs and special events throughout the year
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, index) => {
                        const isEducation = event.title === 'Islamic Education Class';

                        return (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full overflow-hidden group"
                            >
                                {/* Event Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-900 uppercase tracking-widest">
                                        {event.type}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-display font-bold text-primary-900 mb-6 group-hover:text-primary-600 transition-colors">
                                        {event.title}
                                    </h3>
                                    <div className="space-y-4 text-neutral-600 flex-grow">
                                        <div className="flex items-center space-x-3">
                                            <Calendar className="w-5 h-5 text-accent-500 shrink-0" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Clock className="w-5 h-5 text-accent-500 shrink-0" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <MapPin className="w-5 h-5 text-accent-500 shrink-0" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    {isEducation && (
                                        <div className="mt-8 pt-6 border-t border-neutral-100">
                                            <a
                                                href="#contact"
                                                className="inline-flex items-center text-accent-600 font-bold hover:text-accent-700 transition-colors group/btn"
                                            >
                                                Sign up here
                                                <motion.span
                                                    className="ml-2"
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    →
                                                </motion.span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 text-center space-y-6"
                >
                    <p className="text-neutral-600">
                        Stay updated with our latest announcements and special events
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/events"
                            className="bg-primary-900 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-900/40 w-full sm:w-auto text-center"
                        >
                            View Full Calendar
                        </Link>
                        <NavHashLink
                            smooth
                            to="/#contact"
                            className="bg-gold-gradient text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-amber-300/30 shadow-lg shadow-amber-900/40 w-full sm:w-auto text-center"
                        >
                            Contact Us for More Info
                        </NavHashLink>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Events;
