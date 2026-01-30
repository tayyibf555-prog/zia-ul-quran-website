import { motion } from 'framer-motion';
import { Calendar, Clock, Download, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { ramadanData } from '../data/ramadan-times-2026';
import { useState } from 'react';
import QuranTracker from '../components/ramadan/QuranTracker';

const Ramadan = () => {
    const [showFull, setShowFull] = useState(false);

    // Helper to check if a row is today
    const isToday = (dateStr) => {
        const today = new Date();
        const year = 2026;
        const [day, monthStr] = dateStr.split(' ');
        const month = monthStr === 'Feb' ? 1 : 2; // 0-indexed: Feb=1, Mar=2
        const rowDate = new Date(year, month, parseInt(day));

        return today.getDate() === rowDate.getDate() &&
            today.getMonth() === rowDate.getMonth() &&
            today.getFullYear() === year;
    };

    // Show first 15 days (half) by default, or all if expanded
    const displayedData = showFull ? ramadanData : ramadanData.slice(0, 15);

    return (
        <main className="pt-28 min-h-screen bg-neutral-50 pb-20">
            {/* Header */}
            <section className="bg-primary-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/20 text-accent-300 font-bold uppercase tracking-widest text-xs mb-4 border border-accent-500/30">
                            Ramadan 1447 AH
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-gold-gradient mb-6">
                            Ramadan Timetable 2026
                        </h1>
                        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                            "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous." — Surah Al-Baqarah 2:183
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Timetable Section */}
            <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-200"
                >
                    {/* Controls */}
                    <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50 wrap gap-4">
                        <div className="flex items-center gap-2 text-primary-900 font-bold">
                            <Calendar className="text-accent-600" />
                            <span>{showFull ? 'Full Schedule' : 'First 15 Days'}</span>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 transition-colors">
                                <Printer size={16} />
                                <span className="hidden sm:inline">Print</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-primary-700 uppercase bg-primary-50">
                                <tr>
                                    <th className="px-4 py-4 font-display font-bold text-center">Ramadan</th>
                                    <th className="px-4 py-4 font-display font-bold">Day</th>
                                    <th className="px-4 py-4 font-display font-bold">Date</th>
                                    <th className="px-4 py-4 font-display font-bold text-center bg-accent-50 text-accent-800 border-x border-accent-100">Sehri Ends</th>
                                    <th className="px-4 py-4 font-display font-bold text-center">Sunrise</th>
                                    <th className="px-4 py-4 font-display font-bold text-center">Zuhr Begins</th>
                                    <th className="px-4 py-4 font-display font-bold text-center">Asr</th>
                                    <th className="px-4 py-4 font-display font-bold text-center bg-primary-100 text-primary-900 border-x border-primary-200">Iftar / Maghrib</th>
                                    <th className="px-4 py-4 font-display font-bold text-center">Isha Jamaat</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {displayedData.map((row) => {
                                    const active = isToday(row.date);
                                    return (
                                        <tr
                                            key={row.ramadan}
                                            className={`hover:bg-neutral-50 transition-colors ${active ? 'bg-primary-50 ring-1 ring-inset ring-primary-200' : ''}`}
                                        >
                                            <td className="px-4 py-3 font-display font-bold text-center text-primary-900">{row.ramadan}</td>
                                            <td className="px-4 py-3 font-display font-medium text-neutral-600">{row.day}</td>
                                            <td className="px-4 py-3 font-display font-medium text-neutral-900">{row.date}</td>
                                            <td className={`px-4 py-3 font-display font-bold text-center text-accent-700 ${active ? 'bg-accent-100/50' : 'bg-accent-50/30'}`}>
                                                {row.sehri}
                                            </td>
                                            <td className="px-4 py-3 font-display text-center text-neutral-500">{row.sunrise}</td>
                                            <td className="px-4 py-3 font-display text-center text-neutral-500">{row.zuhr}</td>
                                            <td className="px-4 py-3 font-display text-center text-neutral-500">{row.asr}</td>
                                            <td className={`px-4 py-3 font-display font-bold text-center text-primary-800 ${active ? 'bg-primary-200/50' : 'bg-primary-50/50'}`}>
                                                {row.iftar}
                                            </td>
                                            <td className="px-4 py-3 font-display text-center font-medium text-neutral-700">{row.isha}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                        onClick={() => setShowFull(!showFull)}
                        className="w-full py-4 text-center bg-neutral-50 hover:bg-neutral-100 text-primary-600 font-bold text-sm uppercase tracking-wider border-t border-neutral-200 transition-colors flex items-center justify-center gap-2"
                    >
                        {showFull ? (
                            <>
                                Show Less <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                View Full Timetable (15 More Days) <ChevronDown size={16} />
                            </>
                        )}
                    </button>

                    <div className="p-6 bg-white text-center">
                        <p className="text-sm text-neutral-500">
                            * Fajar Jama'at 20 mins after Sehri Ends.
                            <span className="block border-t border-neutral-200 my-2 pt-2">
                                <strong>Eid Jamaat:</strong> 8am, 9am, 10am & 11am
                            </span>
                        </p>
                    </div>
                </motion.div>

                {/* Quran Tracker Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12"
                >
                    <QuranTracker />
                </motion.div>
            </section>
        </main>
    );
};

export default Ramadan;
