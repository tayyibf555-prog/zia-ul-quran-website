import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User } from 'lucide-react';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Reviews data (User will fill themselves as per request, providing placeholders for now)
    const testimonials = [
        {
            name: "Rizwan Din",
            text: "Two congregations for Juma means if I'm ever late due to work etc I can attend the second one. The imams are always approachable and knowledgeable. A great service and addition to Glasgow.",
        },
        {
            name: "Ahmed Alia",
            text: "A very high spiritual place. I loved the atmosphere of great organisation of the whole masjid ... May Allah bless you all.",
        },
        {
            name: "Adnan AD",
            text: "Personal Experience a place where you can prayers Five times as a Muslim friendly environment and Muslim Community will guide you how we can get knowledge about Religion Only Truth provide there's place",
        },
        {
            name: "Ammar Khan",
            text: "Facilitates 2 Jummah jamaats so one doesn't miss. May God bless this Masjid.",
        },
        {
            name: "Zaheer Ahmed Akmal",
            text: "Ma'sha'Allah Well kept neat and clean, plenty of space",
        },
        {
            name: "Guest 1",
            text: "Great People, Great Staff, Keep doing what your doing. p.s. Darood-e-Ghausiyah",
        },
        {
            name: "Masood Ahmed Qureshi",
            text: "The Best. House of the Almighty Allaah Subhaanhoo Wa Talaa.",
        },
        {
            name: "S Borcea (Shahada)",
            text: "Best place to bond friendships and connect with the local community",
        },
        {
            name: "JERMOULI ABDELAAZIZ",
            text: "Very nice people. A rather nice place",
        },
        {
            name: "MD MASTAN ALI",
            text: "I miss this place.. inshallah I will be there soon.",
        },
        {
            name: "Raf Z",
            text: "Beautiful mosque.",
        },
        {
            name: "Tahir Mohammed",
            text: "Beautiful Masjid"
        }
    ];

    // Double the items for seamless infinite scroll
    const scrollItems = [...testimonials, ...testimonials];

    return (
        <section id="community-heart" className="py-24 bg-white overflow-hidden" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
                        <span className="text-primary-900">The Heart Of </span>
                        <span className="text-accent-600">Our Community</span>
                    </h2>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                        We are grateful to have met such remarkable people through our journey
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative flex whitespace-nowrap overflow-hidden">
                <motion.div
                    className="flex"
                    animate={{
                        x: [0, "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 80, // Much slower for ultra-smooth readability
                            ease: "linear",
                        },
                    }}
                >
                    {scrollItems.map((item, index) => (
                        <div
                            key={`${item.name}-${index}`}
                            className="inline-block w-[480px] shrink-0 pr-12"
                        >
                            <div className="bg-primary-900 rounded-3xl p-12 h-full relative min-h-[340px] flex flex-col shadow-xl shadow-primary-900/20 overflow-hidden border border-primary-800/50">
                                {/* Pattern Layer */}
                                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                                    <div
                                        className="absolute inset-0 bg-[url('/hero-pattern.jpg')] bg-cover bg-center"
                                    ></div>
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-900/90"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Top Decoration: Premium Gold G Logo - Absolute positioned relative to card area */}
                                    <div className="absolute top-0 right-0 text-accent-400/80 text-4xl font-display font-bold">
                                        G
                                    </div>

                                    <div className="flex items-center gap-6 mb-8 relative pr-20">
                                        <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center border border-accent-500/20 shrink-0">
                                            <User className="w-9 h-9 text-accent-400" fill="currentColor" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-white leading-tight flex-1 min-w-0 whitespace-normal">
                                            {item.name}
                                        </h3>
                                    </div>

                                    <p className="text-neutral-100 text-lg leading-relaxed font-sans italic whitespace-normal pr-4">
                                        "{item.text}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
