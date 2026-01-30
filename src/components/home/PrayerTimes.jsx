import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Clock, Calendar, X, ChevronRight, BookOpen } from 'lucide-react';
import { getPrayerTimes } from '../../data/prayer-times-2026';

const SunriseIcon = ({ className }) => (
    <div className={`relative w-5 h-5 overflow-hidden ${className}`}>
        {/* Horizon Line */}
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-current opacity-40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Rising Sun */}
        <motion.div
            className="absolute bottom-1 left-1.5 right-1.5 h-3 w-3 rounded-full border-[1.5px] border-current flex items-center justify-center"
            initial={{ y: 8, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.4
            }}
        >
            {/* Sun Core */}
            <div className="w-1 h-1 bg-current rounded-full" />

            {/* Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <motion.div
                    key={angle}
                    className="absolute w-[1px] h-1 bg-current"
                    style={{
                        rotate: angle,
                        translateY: -3,
                        transformOrigin: "bottom"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </motion.div>
    </div>
);

const prayerDetails = {
    Fajr: {
        title: "The Virtues of Fajr",
        content: `
            <div class="space-y-6">
                <p class="text-neutral-600 leading-relaxed italic">"For many of us, waking up for Fajr can be difficult and burdensome however, there are some virtues that we fail to realise!"</p>
                
                <div class="space-y-4">
                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">1. Oath by Fajr</h4>
                        <p class="text-sm text-neutral-600">In the beginning of Surah Fajr, Allah begins the Surah by swearing upon the dawn: <span class="text-primary-800 font-medium">”By the dawn” [89:1]</span>. Every oath made by Allah emphasizes its importance.</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">2. Better Than the Entire World</h4>
                        <p class="text-sm text-neutral-600">The Prophet (PBUH) said: <span class="italic">“Two Rakahs of prayer before the Fajr (Fardh) prayer are better than the world and whatever is in it.”</span> [Muslim]</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">3. Under Allah's Protection</h4>
                        <p class="text-sm text-neutral-600">“He who performs the Fajr will be under the protection of Allah.” [Muslim]. For the one who offers the Fardh of Fajr, Allah will protect them the whole day.</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">4. Witnessed by Angels</h4>
                        <p class="text-sm text-neutral-600">“Indeed, the recitation of Fajr is ever witnessed.” [17:78]. The Prophet (PBUH) said: <span class="italic">“It is witnessed by the angels of the night and the day.”</span></p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">5. Reward of Hajj & Umrah</h4>
                        <p class="text-sm text-neutral-600">“Whoever prays Fajr in congregation, then sits remembering Allah until the sun rises and prays two Rakahs (Duha) will have a reward similar to Hajj and Umrah.” [Tirmidhi]</p>
                    </div>
                </div>
            </div>
        `
    },
    Dhuhr: {
        title: "The Significance of Dhuhr",
        content: `
            <div class="space-y-6">
                <p class="text-neutral-600 leading-relaxed italic">"The Prophet Muhammad (PBUH) used to pray four rak'ah before Zuhr prayer and said that it was an hour when the gates of heaven were opened."</p>
                
                <div class="bg-primary-50 p-6 rounded-3xl border border-primary-100">
                     <h4 class="font-bold text-primary-900 mb-4 flex items-center gap-2">
                        <BookOpen size={20} class="text-primary-600" />
                        Hadith Reference
                     </h4>
                     <p class="text-neutral-600 leading-relaxed">
                        'Abdullah bin As-Sa'ib (RA) reported: The Messenger of Allah ﷺ used to perform four Rak'ah prayer after the declining of the sun before Zuhr prayer and would say:
                     </p>
                     <p class="mt-4 p-4 bg-white rounded-xl font-medium text-primary-800 italic border border-primary-50">
                        "This is an hour at which the gates of heaven are opened, and I like that my good deeds should rise to heaven at that time"
                     </p>
                     <p class="mt-2 text-right text-xs text-neutral-400 font-bold">— AT-TIRMIDHI</p>
                </div>
            </div>
        `
    },
    Asr: {
        title: "Preserving the Asr Prayer",
        content: `
            <div class="space-y-6">
                <div class="space-y-4">
                    <div class="bg-primary-50 p-5 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">1. Testing Faith and Commitment</h4>
                        <p class="text-sm text-neutral-600 leading-relaxed">Asr falls in the middle of the day, the busiest time for many. Offering this salah at its appointed interval is a test of commitment and devotion, demanding an interruption of daily work activities.</p>
                    </div>

                    <div class="bg-primary-50 p-5 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">2. Reminder of Life Transition</h4>
                        <p class="text-sm text-neutral-600 italic">“Whoever prays the two cool prayers [Asr and Fajr] will go to Paradise”</p>
                        <p class="text-xs text-neutral-400 mt-1 font-bold">— SAHIH AL-BUKHARI 574</p>
                        <p class="text-sm text-neutral-600 mt-2">The Prophet (PBUH) called Asr the “cool prayer,” referring to the transitional late afternoon and evening.</p>
                    </div>

                    <div class="bg-primary-50 p-5 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">3. Protection from Negligence</h4>
                        <p class="text-sm text-neutral-600 leading-relaxed italic">“Whoever misses the Asr prayer [intentionally] then it is as if he lost his family and property.”</p>
                        <p class="text-xs text-neutral-400 mt-1 font-bold">— SAHIH AL-BUKHARI 552</p>
                        <p class="text-sm text-neutral-600 mt-2">This serves as a stern reminder of how detrimental it is to intentionally skip the time for Asr.</p>
                    </div>
                </div>
            </div>
        `
    },
    Maghrib: {
        title: "The Blessings of Maghrib",
        content: `
            <div class="space-y-6">
                <p class="text-neutral-600 leading-relaxed">Performing Maghrib consistently strengthens faith, protects from evil, and brings light to the heart and home.</p>
                
                <div class="grid gap-4">
                    <div class="bg-primary-50 p-4 rounded-2xl">
                        <h4 class="font-bold text-primary-900 mb-1">1. Shift of Angels</h4>
                        <p class="text-sm text-neutral-600">Maghrib is when angels of day and night change shifts. It is a moment witnessed by both groups. (Sahih Bukhari 555)</p>
                    </div>
                    <div class="bg-primary-50 p-4 rounded-2xl">
                        <h4 class="font-bold text-primary-900 mb-1">2. Protection from Shaytan</h4>
                        <p class="text-sm text-neutral-600">The Prophet (PBUH) specifically warned against wandering at sunset: “When the night approaches... keep children inside, for devils spread out then.” (Sahih Bukhari 3280)</p>
                    </div>
                    <div class="bg-primary-50 p-4 rounded-2xl">
                        <h4 class="font-bold text-primary-900 mb-1">3. Time for Acceptance</h4>
                        <p class="text-sm text-neutral-600">The Prophet (PBUH) said: “Seek the hour (of acceptance) on Friday after Asr until sunset.” Moving into Maghrib is a time when Allah answers sincere prayers.</p>
                    </div>
                    <div class="bg-primary-50 p-4 rounded-2xl">
                        <h4 class="font-bold text-primary-900 mb-1">4. Gratitude and Renewal</h4>
                        <p class="text-sm text-neutral-600">Maghrib marks the closure of daily efforts; a time for reflection and peace before the night.</p>
                    </div>
                </div>
            </div>
        `
    },
    Isha: {
        title: "Isha: The Worship of the Night",
        content: `
            <div class="space-y-6">
                <p class="text-neutral-600 italic">“If people knew the reward for praying Isha and Fajr in congregation, they would come to them even if they had to crawl.” (Sahih Bukhari 7224)</p>

                <div class="space-y-4">
                    <div class="bg-primary-50 p-5 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">1. Equivalent to Night Worship</h4>
                        <p class="text-sm text-neutral-600 italic">“Whoever prays Isha in congregation, it is as if he has prayed half the night; and whoever prays Fajr in congregation, it is as if he has prayed the whole night.”</p>
                        <p class="text-xs text-neutral-400 mt-1 font-bold">— SAHIH MUSLIM 656</p>
                    </div>

                    <div class="bg-primary-50 p-5 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">2. Perfect Light on Judgment Day</h4>
                        <p class="text-sm text-neutral-600 italic">“Give glad tidings to those who walk to the mosques in darkness that they will have perfect light on the Day of Judgment.”</p>
                        <p class="text-xs text-neutral-400 mt-1 font-bold">— SUNAN ABU DAWOOD 561</p>
                    </div>

                     <div class="bg-primary-50 p-5 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">3. Peace Before Rest</h4>
                        <p class="text-sm text-neutral-600">Isha cleanses the heart before sleep, ensuring the night begins with remembrance. The Prophet (PBUH) encouraged spending this time in worship, reflection, or rest.</p>
                    </div>
                </div>
            </div>
        `
    },
    Jummah: {
        title: "The Virtues of Jumu'ah",
        content: `
            <div class="space-y-6">
                 <p class="text-neutral-600 leading-relaxed italic">"Friday is the master of days, and the greatest of them before Allah."</p>
                 
                 <div class="space-y-4">
                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">1. The Best Day</h4>
                        <p class="text-sm text-neutral-600">Rasulullah (PBUH) said: “Friday is the best of days. It was on this day that Hadrat Aadam (AS) was created, entered Jannah, and was removed from it. The day of resurrection will also take place on this day.” (Sahih Muslim)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">2. Higher than Laylatul Qadr?</h4>
                        <p class="text-sm text-neutral-600">Imam Ahmad (RA) stated that in certain aspects, the night of Jumu’ah is higher than Laylatul Qadr because Rasulullah (PBUH) appeared in the womb of his mother on this night, bringing blessings to the world. (Ash’atul Lama’aat)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">3. The Hour of Acceptance</h4>
                        <p class="text-sm text-neutral-600">“There is such an hour on Friday that if any Muslim makes dua in it, his dua will definitely be accepted.” (Bukhari, Muslim). Opinions suggest this hour is either from the start of the Khutbah until the prayer ends, or towards the end of the day (preferred by many Ulama). (Ash’atul Lama’aat)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">4. Presentation of Durood</h4>
                        <p class="text-sm text-neutral-600">Rasulullah (PBUH) said: “Send abundant durood upon me on Fridays because they are presented to me on that day.” Allah has made the earth haraam upon the prophets forever. (Abu Daud)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">5. The Witnessed Day</h4>
                        <p class="text-sm text-neutral-600">The word “Shaahid” in Surah Burooj refers to Friday. There is no day more virtuous. (Tirmidhi)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">6. The Mother of All Days</h4>
                        <p class="text-sm text-neutral-600">“Friday is the ‘mother’ of all days and the most virtuous in the sight of Allah, having more greatness than Eid ul-Fitr and Eid ul-Ad’haa.” (Ibn Majah)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">7. Protection from the Grave</h4>
                        <p class="text-sm text-neutral-600">“The Muslim who passes away on the night or during the day of Friday, Allah Ta’ala saves him from the punishment of the grave.” (Tirmidhi)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">8. A Day of Two Eids</h4>
                        <p class="text-sm text-neutral-600">Ibn Abbas (RA) explained to a Jew that the verse “This day, I have completed your Deen” was revealed on a day of two Eids: Jumu’ah and Arafah.</p>
                    </div>

                     <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">9. Lustrous Day and Night</h4>
                        <p class="text-sm text-neutral-600">Rasulullah (PBUH) called the night and day of Jumu’ah lustrous (filled with light). (Mishkaat)</p>
                    </div>

                     <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">10. The Greatest Gathering in Jannah</h4>
                        <p class="text-sm text-neutral-600">On Friday in Jannah, believers will gather in the "jungles of abundance." Allah will reveal His beauty to them, doubling their own beauty and attractiveness through His light. This is the day of giving in abundance. (Sharh Sifrus-Sa’aadah)</p>
                    </div>
                    
                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">11. Protection from Jahannam's Heat</h4>
                        <p class="text-sm text-neutral-600">The heat of Jahannam is normally increased every afternoon, but not on Fridays due to its blessings. (Ihyaa ul-Uloom)</p>
                    </div>

                    <div class="bg-primary-50 p-4 rounded-2xl border-l-4 border-primary-600">
                        <h4 class="font-bold text-primary-900 mb-2">12. Sunnah Acts</h4>
                        <p class="text-sm text-neutral-600">Allah made this day an Eid. Bathe, apply perfume, and use the Miswaak. (Ibn Majah)</p>
                    </div>

                 </div>
            </div>
        `
    }
};

const PrayerTimes = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [todaySchedule, setTodaySchedule] = useState(null);
    const [selectedPrayer, setSelectedPrayer] = useState(null);

    useEffect(() => {
        const today = new Date();
        const times = getPrayerTimes(today);

        if (times) {
            setTodaySchedule([
                { name: 'Fajr', adhan: times.fajr.start, iqamah: times.fajr.iqamah },
                { name: 'Dhuhr', adhan: times.zuhr.start, iqamah: times.zuhr.iqamah },
                { name: 'Asr', adhan: times.asr.start, iqamah: times.asr.iqamah },
                { name: 'Maghrib', adhan: times.maghrib.start, iqamah: times.maghrib.iqamah },
                { name: 'Isha', adhan: times.isha.start, iqamah: times.isha.iqamah },
            ]);
        } else {
            // Fallback
            setTodaySchedule([
                { name: 'Fajr', adhan: '6:30 AM', iqamah: '7:00 AM' },
                { name: 'Dhuhr', adhan: '12:45 PM', iqamah: '1:00 PM' },
                { name: 'Asr', adhan: '2:45 PM', iqamah: '3:00 PM' },
                { name: 'Maghrib', adhan: '4:30 PM', iqamah: '4:35 PM' },
                { name: 'Isha', adhan: '7:00 PM', iqamah: '8:00 PM' },
            ]);
        }
    }, []);

    const prayerSchedule = todaySchedule || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="prayer-times" className="py-20 bg-neutral-50" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2
                        className="text-4xl md:text-5xl font-bold text-gold-gradient mb-4"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Daily Prayer Times
                    </h2>
                    <div className="space-y-1">
                        <p
                            className="text-accent-600 font-bold text-xl uppercase tracking-wider"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {new Intl.DateTimeFormat('en-GB-u-ca-islamic', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            }).format(new Date(Date.now() - 24 * 60 * 60 * 1000))}
                        </p>
                        <p
                            className="text-neutral-600 font-bold text-lg max-w-2xl mx-auto"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                </motion.div>

                {/* Jummah Highlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative rounded-2xl p-8 mb-8 text-white shadow-xl overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #CA8A04 0%, #EAB308 50%, #CA8A04 100%)' }}
                >
                    {/* Background Pattern Layer */}
                    <div className="absolute inset-0 z-0">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
                            style={{ backgroundImage: "url('/hero-pattern.jpg')" }}
                        ></div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-6 mb-4 md:mb-0">
                            <Calendar className="w-12 h-12 text-white/90" strokeWidth={1.5} />
                            <div className="text-left">
                                <h3
                                    className="text-3xl font-bold text-white mb-1"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    Jummah Prayer
                                </h3>
                                <p
                                    className="text-white/90 mb-4 font-bold text-sm"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    Every Friday
                                </p>
                                <button
                                    onClick={() => setSelectedPrayer('Jummah')}
                                    className="flex items-center gap-2 text-xs font-bold text-primary-900 bg-white hover:bg-neutral-50 transition-colors py-2.5 px-5 rounded-lg shadow-sm"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    <BookOpen size={14} />
                                    Virtues of Jumu'ah
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 text-center md:text-right items-center">
                            <div>
                                <p
                                    className="text-xs text-white/80 font-bold mb-1"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    1st Jamaat
                                </p>
                                <p
                                    className="text-4xl font-bold text-white"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    1:00 PM
                                </p>
                            </div>
                            <div className="h-12 w-px bg-white/30 hidden md:block"></div>
                            <div>
                                <p
                                    className="text-xs text-white/80 font-bold mb-1"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    2nd Jamaat
                                </p>
                                <p
                                    className="text-4xl font-bold text-white"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    2:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Prayer Times Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
                >
                    {prayerSchedule.map((prayer, index) => (
                        <motion.div
                            key={prayer.name}
                            variants={itemVariants}
                            className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center group min-h-[340px] border border-neutral-100"
                        >
                            <div className="w-full flex flex-col items-center pt-4">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="bg-primary-100 p-3 rounded-full">
                                        <Clock className="w-6 h-6 text-primary-900" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h3
                                    className="text-3xl font-bold text-primary-900 text-center mb-8"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    {prayer.name}
                                </h3>
                                <div className="w-full space-y-6 text-center">
                                    <div className="space-y-1">
                                        <p
                                            className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] mb-1"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            Adhan
                                        </p>
                                        <p
                                            className="text-xl font-bold text-neutral-900"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {prayer.adhan}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p
                                            className="text-[10px] text-neutral-500 uppercase font-bold tracking-[0.2em] mb-1"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            Iqamah
                                        </p>
                                        <p
                                            className="text-2xl font-bold text-neutral-900"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {prayer.iqamah}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedPrayer(prayer.name)}
                                className="mt-8 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-primary-900 hover:text-primary-800 transition-colors py-3 px-4 rounded-xl bg-primary-100 hover:bg-primary-200"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                About {prayer.name}
                                <ChevronRight size={14} />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12 text-neutral-500 text-sm"
                >
                    * Prayer times are approximate and may change. Please check with the Masjid for exact timings.
                </motion.p>
            </div>

            {/* Prayer Info Modal */}
            <AnimatePresence>
                {selectedPrayer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPrayer(null)}
                            className="absolute inset-0 bg-primary-950/80 backdrop-blur-sm"
                        ></motion.div>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] overflow-hidden max-w-2xl w-full shadow-2xl border border-white/20 max-h-[90vh] flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPrayer(null)}
                                className="absolute top-6 right-6 z-20 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="p-8 pb-4 bg-primary-900 text-white relative overflow-hidden shrink-0">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-primary-500/20 p-2 rounded-xl">
                                            <BookOpen size={24} className="text-primary-400" />
                                        </div>
                                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-400">Prayer Insights</h3>
                                    </div>
                                    <h2 className="text-3xl font-display font-bold">
                                        {prayerDetails[selectedPrayer]?.title}
                                    </h2>
                                </div>
                                <div className="absolute inset-0 z-0 opacity-10 bg-[url('/hero-pattern.jpg')] bg-cover"></div>
                            </div>

                            {/* Scrollable Content */}
                            <div
                                className="p-8 pt-6 overflow-y-auto"
                                dangerouslySetInnerHTML={{ __html: prayerDetails[selectedPrayer]?.content }}
                            ></div>

                            {/* Footer */}
                            <div className="p-8 pt-4 border-t border-neutral-100 bg-neutral-50 shrink-0">
                                <button
                                    onClick={() => setSelectedPrayer(null)}
                                    className="w-full bg-primary-900 text-white py-4 rounded-2xl font-bold hover:bg-primary-800 transition-colors shadow-lg shadow-primary-900/20"
                                >
                                    Close Insights
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PrayerTimes;
