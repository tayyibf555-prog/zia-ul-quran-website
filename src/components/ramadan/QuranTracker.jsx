import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, BookOpen, X, ChevronRight } from 'lucide-react';

const QuranTracker = () => {
    // Exact Madani Mushaf Page Mapping
    const juzData = [
        { id: 1, start: 1, end: 21 },
        { id: 2, start: 22, end: 41 },
        { id: 3, start: 42, end: 61 },
        { id: 4, start: 62, end: 81 },
        { id: 5, start: 82, end: 101 },
        { id: 6, start: 102, end: 120 },
        { id: 7, start: 121, end: 141 },
        { id: 8, start: 142, end: 161 },
        { id: 9, start: 162, end: 181 },
        { id: 10, start: 182, end: 201 },
        { id: 11, start: 201, end: 221 }, // Note: Juz 11 sometimes typically overlap, using standard mapping
        { id: 12, start: 222, end: 241 },
        { id: 13, start: 242, end: 261 },
        { id: 14, start: 262, end: 281 },
        { id: 15, start: 282, end: 301 },
        { id: 16, start: 302, end: 321 },
        { id: 17, start: 322, end: 341 },
        { id: 18, start: 342, end: 361 },
        { id: 19, start: 362, end: 381 },
        { id: 20, start: 382, end: 401 },
        { id: 21, start: 402, end: 421 },
        { id: 22, start: 422, end: 441 },
        { id: 23, start: 442, end: 461 },
        { id: 24, start: 462, end: 481 },
        { id: 25, start: 482, end: 501 },
        { id: 26, start: 502, end: 521 },
        { id: 27, start: 522, end: 541 },
        { id: 28, start: 542, end: 561 },
        { id: 29, start: 562, end: 581 },
        { id: 30, start: 582, end: 604 }
    ];

    const [completedPages, setCompletedPages] = useState([]);
    const [selectedJuz, setSelectedJuz] = useState(null);

    // Load from local storage on mount
    useEffect(() => {
        const savedProgress = localStorage.getItem('quranTrackerPages2026');
        if (savedProgress) {
            setCompletedPages(JSON.parse(savedProgress));
        }
    }, []);

    // Save to local storage whenever progress changes
    useEffect(() => {
        localStorage.setItem('quranTrackerPages2026', JSON.stringify(completedPages));
    }, [completedPages]);

    const togglePage = (pageNumber) => {
        if (completedPages.includes(pageNumber)) {
            setCompletedPages(completedPages.filter(p => p !== pageNumber));
        } else {
            setCompletedPages([...completedPages, pageNumber]);
        }
    };

    // Calculate progress
    const totalPages = 604;
    const progressPercentage = Math.round((completedPages.length / totalPages) * 100);

    // Helper to check if a Juz is fully complete
    const getJuzProgress = (juz) => {
        const totalInJuz = juz.end - juz.start + 1;
        const completedInJuz = completedPages.filter(p => p >= juz.start && p <= juz.end).length;
        return { completed: completedInJuz, total: totalInJuz, isComplete: completedInJuz === totalInJuz };
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
            <div className="p-8 bg-primary-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] opacity-10 mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                            <BookOpen className="text-accent-500" />
                            Quran Progress Tracker
                        </h2>
                        <p className="text-primary-200 text-sm mt-1">
                            Track page by page. Accurate 15-line Hifz Mushaf standard.
                        </p>
                    </div>

                    {/* Progress Bar Circle */}
                    <div className="flex items-center gap-4 bg-primary-800/50 p-3 rounded-2xl backdrop-blur-sm border border-primary-700">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-accent-500">{completedPages.length}/{totalPages}</div>
                            <div className="text-xs text-primary-200 uppercase tracking-widest">Pages Read</div>
                        </div>
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="transparent"
                                    className="text-primary-800"
                                />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeDasharray={175.92}
                                    strokeDashoffset={175.92 - (175.92 * progressPercentage) / 100}
                                    className="text-accent-500 transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <span className="absolute text-xs font-bold">{progressPercentage}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {juzData.map((juz) => {
                        const { isComplete, completed, total } = getJuzProgress(juz);
                        return (
                            <motion.button
                                key={juz.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedJuz(juz)}
                                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 group overflow-hidden ${isComplete
                                    ? 'bg-primary-50 border-primary-600'
                                    : 'bg-white border-neutral-200 hover:border-accent-400'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs uppercase tracking-widest font-bold ${isComplete ? 'text-primary-700' : 'text-neutral-400'}`}>
                                        Juz {juz.id}
                                    </span>
                                    {isComplete ? (
                                        <div className="bg-primary-600 rounded-full p-1">
                                            <Check size={12} className="text-white" />
                                        </div>
                                    ) : (
                                        <div className="bg-neutral-100 rounded-full p-1 group-hover:bg-accent-100 transition-colors">
                                            <ChevronRight size={12} className="text-neutral-400 group-hover:text-accent-600" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-primary-600' : 'bg-accent-500'}`}
                                            style={{ width: `${(completed / total) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-neutral-500 font-medium">
                                        <span>{completed}/{total} pages</span>
                                    </div>
                                    <div className="text-[10px] text-neutral-400">
                                        Pg {juz.start}-{juz.end}
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Page Selection Modal */}
            <AnimatePresence>
                {selectedJuz && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedJuz(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 bg-primary-900 text-white flex justify-between items-center shrink-0">
                                <div>
                                    <h3 className="text-2xl font-display font-bold">Juz {selectedJuz.id}</h3>
                                    <p className="text-primary-200 text-sm">Pages {selectedJuz.start} - {selectedJuz.end}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedJuz(null)}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                                    {Array.from(
                                        { length: selectedJuz.end - selectedJuz.start + 1 },
                                        (_, i) => selectedJuz.start + i
                                    ).map(pageNum => {
                                        const isDone = completedPages.includes(pageNum);
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => togglePage(pageNum)}
                                                className={`aspect-square rounded-lg flex flex-col items-center justify-center border transition-all duration-200 ${isDone
                                                    ? 'bg-primary-600 border-primary-600 text-white shadow-md'
                                                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-accent-400 hover:bg-neutral-50'
                                                    }`}
                                            >
                                                <span className="text-xs uppercase text-opacity-70 mb-0.5">Pg</span>
                                                <span className="text-lg font-bold">{pageNum}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="p-4 bg-neutral-50 border-t border-neutral-200 shrink-0 flex justify-between items-center text-sm text-neutral-600">
                                <span>
                                    {getJuzProgress(selectedJuz).completed} of {getJuzProgress(selectedJuz).total} completed
                                </span>
                                {getJuzProgress(selectedJuz).isComplete && (
                                    <span className="flex items-center text-primary-600 font-bold bg-primary-100 px-3 py-1 rounded-full">
                                        <Check size={14} className="mr-1" /> Juz Complete
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuranTracker;
