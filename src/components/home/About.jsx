import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Users, Heart, Landmark } from 'lucide-react';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const values = [
        {
            icon: BookOpen,
            title: 'Knowledge',
            description: 'Spreading Islamic education and understanding of the Quran'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building a strong, united Muslim community in Glasgow'
        },
        {
            icon: Heart,
            title: 'Compassion',
            description: 'Serving with kindness and supporting those in need'
        },
        {
            icon: Landmark,
            title: 'Worship',
            description: 'Providing a welcoming space for prayer and reflection'
        }
    ];

    return (
        <section id="about" className="py-20 bg-white" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-6">
                            About <span className="text-accent-600">Zia-ul-Quran</span>
                        </h2>
                        <div className="space-y-4 text-neutral-700 text-lg leading-relaxed">
                            <p>
                                Zia-ul-Quran Glasgow has been a pillar of faith and community service in Glasgow
                                for many years. Our mission is to provide a welcoming environment for Muslims to
                                worship, learn, and grow together.
                            </p>
                            <p>
                                We are dedicated to spreading the light of the Quran and the teachings of Islam
                                through education, community programs, and spiritual guidance. Our doors are open
                                to all seeking knowledge and connection.
                            </p>
                            <p>
                                From daily prayers to educational programs, community events, and support services,
                                we strive to serve the needs of Muslims in Glasgow and beyond.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column - Values Grid */}
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
                                    className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="bg-white p-3 rounded-full w-fit mb-4">
                                        <Icon className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-primary-600 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-neutral-600 text-sm">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
