import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Youtube, ExternalLink, Play } from 'lucide-react';

const YouTubeFeed = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Placeholder data for the latest 3 videos
    // These should be updated with actual video data from the channel
    const videos = [
        {
            id: 'q1Na6GJbDUI',
            title: 'The Empathy of Rasullulah - Shaykh Hassan Rabbani',
            thumbnail: 'https://img.youtube.com/vi/q1Na6GJbDUI/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=q1Na6GJbDUI'
        },
        {
            id: 'H858PbmETlk',
            title: 'Interfaith Mawlid (2016) - Zia-Ul-Quran',
            thumbnail: 'https://img.youtube.com/vi/H858PbmETlk/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=H858PbmETlk'
        },
        {
            id: 'a7kvQyY4Z8o',
            title: 'Importance of Laylatul Qadr - Shaykh Hassan Rabbani',
            thumbnail: 'https://img.youtube.com/vi/a7kvQyY4Z8o/hqdefault.jpg',
            url: 'https://www.youtube.com/watch?v=a7kvQyY4Z8o'
        }
    ];

    return (
        <section id="youtube" className="py-24 bg-neutral-50" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
                            Stay Connected With Us <span className="text-accent-600">On YouTube</span>
                        </h2>
                        <p className="text-neutral-600 text-lg">
                            Never miss out on the latest updates, insightful discussions, and educational content.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <a
                            href="https://www.youtube.com/@zia-ul-quranglasgow3573"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 bg-gold-gradient text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-accent-500/20 group hover:-translate-y-1"
                        >
                            Explore Our Channel
                            <ExternalLink className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                                    {/* Thumbnail Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent opacity-80"></div>
                                    </div>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-accent-500/90 group-hover:border-accent-400 transition-all duration-300">
                                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                                        </div>
                                    </div>

                                    {/* Video Title Overlay (Matches reference image style) */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                        <h3 className="text-white font-display font-semibold text-lg leading-snug line-clamp-2 group-hover:text-accent-400 transition-colors">
                                            {video.title}
                                        </h3>
                                    </div>

                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default YouTubeFeed;
