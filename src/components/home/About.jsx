import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Users, Heart, Landmark } from 'lucide-react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const values = [
        {
            icon: Landmark,
            title: 'Faith & Spiritual Growth',
            description: 'Strengthening a lived connection to Allah through prayer, Qur’an, and reflection.'
        },
        {
            icon: BookOpen,
            title: 'Learning & Development',
            description: 'Providing engaging Islamic education and support for academic growth.'
        },
        {
            icon: Heart,
            title: 'Youth & Family Wellbeing',
            description: 'Creating safe, supportive spaces for children and families to thrive.'
        },
        {
            icon: Users,
            title: 'Community & Belonging',
            description: 'Fostering a welcoming, inclusive community across all generations.'
        }
    ];

    return (
        <section id="about" className="py-20 bg-white" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gold-gradient mb-6 font-playfair leading-tight">
                            Welcome to Zia-ul-Quran Glasgow
                        </h2>
                        <div className="space-y-6 text-neutral-700 text-lg leading-relaxed">
                            <p>
                                Zia-ul-Quran Glasgow is a welcoming mosque and community hub dedicated to faith, learning, and personal growth.
                            </p>
                            <p>
                                Alongside daily prayers and Islamic education, we are building a vibrant space for children, young people, and families to grow spiritually, develop strong character, and thrive in everyday life.
                            </p>
                            <p>
                                From Qur’an and Islamic studies to youth activities, educational support, sports, and creative programmes, our aim is to make the mosque a positive, inspiring place to learn, belong, and grow.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column - Values Grid */}
                    <div className="flex flex-col gap-6">
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            className="text-2xl font-display font-bold text-primary-900"
                        >
                            Our Core Pillars
                        </motion.h3>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        >
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 border border-primary-100/50"
                                    >
                                        <div className="bg-white p-3 rounded-full w-fit mb-4 shadow-sm">
                                            <Icon className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <h3 className="text-lg font-display font-bold text-primary-800 mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-neutral-600 text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
