import { motion } from 'framer-motion';
import { useState } from 'react';
import { Download, FileText, Image as ImageIcon, ExternalLink, Library, LayoutGrid } from 'lucide-react';

const Resources = () => {
    const libraryItems = [
        { title: 'Zia-ul-Quran Syllabus', category: 'Education', size: '2.4 MB', type: 'PDF' },
        { title: 'Friday Khutbah Summary', category: 'General', size: '1.1 MB', type: 'PDF' },
        { title: 'Ramadan Guideline 2026', category: 'Spiritual', size: '3.5 MB', type: 'PDF' },
        { title: 'Arabic Alphabet for Beginners', category: 'Education', size: '1.8 MB', type: 'PDF' }
    ];

    const galleryImages = [
        { title: 'Main Prayer Hall', url: '/hero-pattern.jpg', tag: 'Architecture' },
        { title: 'Madrassa Classroom', url: '/hero-pattern.jpg', tag: 'Facilities' },
        { title: 'Central Chandelier', url: '/hero-pattern.jpg', tag: 'Interior' },
        { title: 'Exterior View', url: '/hero-pattern.jpg', tag: 'Architecture' }
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-4">
                        Resources & Gallery
                    </h1>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        Your central hub for educational downloads and a visual journey through the Masjid.
                    </p>
                </div>

                {/* Digital Library Section */}
                <section className="mb-24">
                    <div className="flex items-center gap-3 mb-8 border-l-4 border-accent-500 pl-4">
                        <Library className="text-primary-600" size={32} />
                        <h2 className="text-2xl font-display font-bold text-primary-900">Digital Library</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {libraryItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-xl transition-all group"
                            >
                                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-900 transition-colors">
                                    <FileText className="text-primary-600 group-hover:text-white" size={24} />
                                </div>
                                <h3 className="font-bold text-primary-900 mb-2 truncate">{item.title}</h3>
                                <div className="flex items-center justify-between text-sx text-neutral-400 font-bold uppercase tracking-wider mb-6">
                                    <span>{item.category}</span>
                                    <span>{item.size}</span>
                                </div>
                                <button className="w-full bg-neutral-50 text-neutral-600 py-3 rounded-xl font-bold hover:bg-accent-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                    <Download size={16} />
                                    Download {item.type}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Gallery Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8 border-l-4 border-accent-500 pl-4">
                        <LayoutGrid className="text-primary-600" size={32} />
                        <h2 className="text-2xl font-display font-bold text-primary-900">Virtual Gallery</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative aspect-square rounded-3xl overflow-hidden cursor-zoom-in shadow-lg"
                            >
                                <img
                                    src={image.url}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={image.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                    <span className="text-accent-400 text-[10px] font-bold uppercase tracking-widest mb-1">{image.tag}</span>
                                    <h4 className="text-white font-bold text-lg">{image.title}</h4>
                                    <div className="mt-4 w-10 h-10 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center text-white">
                                        <ImageIcon size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Resources;
