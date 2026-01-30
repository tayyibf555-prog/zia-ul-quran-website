import { useState, useEffect } from 'react';
import { Loader2, Bell, BellOff, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { getPrayerTimes } from '../../data/prayer-times-2026';

const TopBar = () => {
    const [ayah, setAyah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [nextPrayer, setNextPrayer] = useState({ name: '', time: '' });
    const [timeLeft, setTimeLeft] = useState('');
    const { t } = useLanguage();

    // Helper to convert "6:27 am" to a Date object today
    const parseTime = (timeStr, baseDate = new Date()) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (modifier.toLowerCase() === 'pm' && hours !== '12') hours = parseInt(hours, 10) + 12;
        if (modifier.toLowerCase() === 'am' && hours === '12') hours = '00';

        const date = new Date(baseDate);
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    useEffect(() => {
        const calculateNextPrayer = () => {
            const now = new Date();
            const todayTimes = getPrayerTimes(now);

            if (!todayTimes) return;

            const prayers = [
                { name: 'Fajr', time: todayTimes.fajr.start },
                { name: 'Dhuhr', time: todayTimes.zuhr.start },
                { name: 'Asr', time: todayTimes.asr.start },
                { name: 'Maghrib', time: todayTimes.maghrib.start },
                { name: 'Isha', time: todayTimes.isha.start }
            ];

            // Find the first prayer that is after 'now'
            let found = prayers.find(p => parseTime(p.time) > now);
            let targetDate = new Date();

            if (!found) {
                // If no prayer found today, next is tomorrow's Fajr
                const tomorrow = new Date();
                tomorrow.setDate(now.getDate() + 1);
                const tomorrowTimes = getPrayerTimes(tomorrow);
                if (tomorrowTimes) {
                    found = { name: 'Fajr', time: tomorrowTimes.fajr.start };
                    targetDate = tomorrow;
                }
            }

            if (found) {
                setNextPrayer(found);
                const target = parseTime(found.time, targetDate);
                const diff = target - now;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${hours > 0 ? hours + 'h ' : ''}${mins}m`);
            }
        };

        calculateNextPrayer();
        const timer = setInterval(calculateNextPrayer, 10000); // Check every 10 seconds for smoothness
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchAyah = async () => {
            try {
                const now = new Date();
                const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
                const ayahNumber = (dayOfYear % 6234) + 1;

                const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/editions/quran-uthmani,en.asad`);
                const data = await response.json();

                if (data.status === 'OK') {
                    setAyah({
                        arabic: data.data[0].text,
                        english: data.data[1].text,
                        surah: data.data[0].surah.englishName,
                        numberInSurah: data.data[0].numberInSurah
                    });
                }
            } catch (error) {
                console.error('Failed to fetch Ayah', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAyah();
    }, []);

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-primary-900 text-white relative border-b border-primary-800 z-50 divide-y divide-primary-800"
        >
            {/* Info Row */}
            <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4 text-[10px] font-display font-bold uppercase tracking-widest text-primary-300">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Clock size={12} className="text-accent-500" />
                        Next Prayer: <span className="text-white">{nextPrayer.name} in {timeLeft || '...'}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <MapPin size={12} className="text-accent-500" />
                        Glasgow, Scotland
                    </div>
                </div>

                <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${notificationsEnabled ? 'bg-accent-500 text-white' : 'bg-primary-800 text-primary-300'
                        }`}
                >
                    {notificationsEnabled ? <Bell size={12} /> : <BellOff size={12} />}
                    {notificationsEnabled ? 'Adhan Alerts On' : 'Notify for Adhan'}
                </button>
            </div>

            {/* Ayah Row */}
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 text-center">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 text-xs text-primary-200 uppercase tracking-widest">
                        <Loader2 className="animate-spin" size={12} />
                        <span>Finding Verse...</span>
                    </div>
                ) : ayah && (
                    <div className="space-y-2 max-w-4xl mx-auto">
                        <p className="font-amiri text-lg sm:text-xl text-accent-100 leading-loose">
                            {ayah.arabic}
                        </p>
                        <p className="text-xs sm:text-sm text-primary-100 font-light italic opacity-80">
                            "{ayah.english}" — {ayah.surah} {ayah.numberInSurah}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default TopBar;
