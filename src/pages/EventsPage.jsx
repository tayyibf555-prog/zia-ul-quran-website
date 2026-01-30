import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, X, ZoomIn } from 'lucide-react';

const EventsPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Generate some recurring events for the current view
    const events = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const evts = [];

        // Add Mother and Toddlers (Example date)
        evts.push({
            id: 'community-1',
            title: 'Mother and Toddlers Group',
            date: new Date(year, month, 28),
            time: '10:00 AM - 12:00 PM',
            location: 'Main Prayer Hall',
            type: 'Community',
            poster: '/toddlers-poster.png'
        });

        // Add Islamic Significance (Example: Ramadan projection)
        if (month === 2) { // March
            evts.push({
                id: 'ramadan-2026',
                title: 'Expected Start of Ramadan',
                date: new Date(year, month, 18),
                time: 'Sunset',
                location: 'Global',
                type: 'Significance',
                poster: '/ramadan-poster.png'
            });
        }
        if (month === 3) { // April
            evts.push({
                id: 'eid-ul-fitr-2026',
                title: 'Eid-ul-Fitr (Projected)',
                date: new Date(year, month, 17),
                time: '6:30 AM / 8:30 AM',
                location: 'Main Prayer Hall',
                type: 'Significance',
                poster: '/ramadan-poster.png'
            });
        }

        // Generate Saturdays for Islamic Education
        for (let i = 1; i <= 31; i++) {
            const d = new Date(year, month, i);
            if (d.getMonth() !== month) break;
            if (d.getDay() === 6) { // Saturday
                evts.push({
                    id: `edu-${i}`,
                    title: 'Islamic Education Class',
                    date: d,
                    time: '12:00 PM - 2:00 PM',
                    location: 'Main Prayer Room',
                    type: 'Education',
                    recurring: 'Every Saturday',
                    poster: '/education-poster.png'
                });
            }
            if (d.getDay() === 5) { // Friday
                evts.push({
                    id: `dhikr-${i}`,
                    title: 'Shimmering Lights Qasidah',
                    date: d,
                    time: '8:00 PM - 9:30 PM',
                    location: 'Main Prayer Room',
                    type: 'Spiritual',
                    recurring: 'Every Friday Night',
                    poster: '/qasidah-poster.png'
                });
            }
        }
        return evts;
    }, [currentDate]);

    const daysInMonth = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = new Date(year, month, 1);
        const days = [];

        // Add previous month's trailing days
        const firstDayIndex = date.getDay();
        const prevMonthLastDate = new Date(year, month, 0).getDate();
        for (let i = firstDayIndex; i > 0; i--) {
            days.push({
                day: prevMonthLastDate - i + 1,
                month: month - 1,
                year,
                isCurrentMonth: false
            });
        }

        // Add current month's days
        const lastDate = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= lastDate; i++) {
            days.push({
                day: i,
                month,
                year,
                isCurrentMonth: true,
                isToday: i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
            });
        }

        // Add next month's leading days to fill the grid (6 rows * 7 days = 42)
        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({
                day: i,
                month: month + 1,
                year,
                isCurrentMonth: false
            });
        }

        return days;
    }, [currentDate]);

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const getEventsForDay = (day, month) => {
        return events.filter(event =>
            event.date.getDate() === day &&
            event.date.getMonth() === month &&
            event.date.getFullYear() === currentDate.getFullYear()
        );
    };

    return (
        <div className="min-h-screen bg-neutral-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-4">
                        Events Calendar
                    </h1>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        Explore our upcoming community programs, classes, and spiritual gatherings.
                    </p>
                </motion.div>

                {/* Calendar Container */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
                    {/* Calendar Header */}
                    <div className="bg-primary-900 px-8 py-6 flex justify-between items-center text-white">
                        <h2 className="text-2xl font-display font-bold">
                            {monthName} <span className="text-accent-400">{year}</span>
                        </h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={prevMonth}
                                className="p-2 hover:bg-primary-800 rounded-full transition-colors border border-white/10"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextMonth}
                                className="p-2 hover:bg-primary-800 rounded-full transition-colors border border-white/10"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Day Names */}
                    <div className="grid grid-cols-7 border-b border-neutral-100 bg-neutral-50/50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-4 text-center text-sm font-semibold text-primary-600 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7">
                        {daysInMonth.map((dateObj, idx) => {
                            const dayEvents = getEventsForDay(dateObj.day, dateObj.month);
                            return (
                                <div
                                    key={idx}
                                    className={`min-h-[140px] p-2 border-r border-b border-neutral-100 transition-colors ${!dateObj.isCurrentMonth ? 'bg-neutral-50/50 text-neutral-400' : 'bg-white'
                                        } ${dateObj.isToday ? 'bg-primary-50/30' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${dateObj.isToday ? 'bg-accent-500 text-white shadow-lg' : ''
                                            }`}>
                                            {dateObj.day}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        {dayEvents.map(event => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                onClick={() => setSelectedEvent(event)}
                                                className="p-1.5 rounded-lg bg-primary-100/50 border-l-2 border-primary-600 text-[10px] leading-tight text-primary-900 font-medium cursor-pointer hover:bg-primary-200 transition-colors flex items-center justify-between group/pill"
                                            >
                                                <span>{event.title}</span>
                                                <ZoomIn size={10} className="opacity-0 group-hover/pill:opacity-100 text-primary-600" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend / Upcoming Events List */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-display font-bold text-primary-900 border-l-4 border-accent-500 pl-4">
                            Event Details
                        </h3>
                        <div className="space-y-4">
                            {events.map(event => (
                                <div
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex gap-6 group hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="flex-shrink-0 w-16 h-16 bg-primary-900 rounded-xl flex flex-col items-center justify-center text-white">
                                        <span className="text-xs uppercase font-bold">{event.date.toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-xl font-display font-bold leading-none">{event.date.getDate()}</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-lg font-bold text-primary-600 group-hover:text-accent-600 transition-colors">
                                            {event.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-neutral-500">
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} className="text-accent-500" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} className="text-accent-500" />
                                                {event.location}
                                            </div>
                                        </div>
                                        {event.recurring && (
                                            <div className="mt-2 inline-block px-2 py-0.5 bg-accent-50 text-accent-700 text-[10px] rounded uppercase font-bold tracking-wider">
                                                {event.recurring}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-primary-900 rounded-3xl p-8 text-white relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h3 className="text-2xl font-display font-bold mb-4">Want to organize an event?</h3>
                            <p className="text-primary-100 mb-8">
                                Zia-ul-Quran is open to community initiatives, seminars, and gatherings. Get in touch with us to book a hall or suggest a program.
                            </p>
                            <a
                                href="/#contact"
                                className="inline-block bg-gold-gradient text-white px-8 py-3 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all shadow-lg shadow-amber-900/40"
                            >
                                Contact Hall Booking
                            </a>
                        </div>
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 z-0 opacity-10 bg-[url('/hero-pattern.jpg')] bg-cover bg-center"></div>
                    </motion.div>
                </div>
            </div>

            {/* Poster Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                            className="absolute inset-0 bg-primary-950/80 backdrop-blur-sm"
                        ></motion.div>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-white/20"
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                {/* Poster Image Section */}
                                <div className="md:w-3/5 bg-neutral-100 relative group">
                                    <img
                                        src={selectedEvent.poster}
                                        alt={selectedEvent.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                {/* Event Info Section */}
                                <div className="md:w-2/5 p-8 flex flex-col justify-center bg-white">
                                    <h3 className="text-2xl font-display font-bold text-primary-900 mb-4">
                                        {selectedEvent.title}
                                    </h3>

                                    <div className="space-y-4 text-neutral-600 mb-8">
                                        <div className="flex items-center gap-3">
                                            <CalendarIcon size={18} className="text-accent-500" />
                                            <span>{selectedEvent.date.toLocaleDateString('default', { dateStyle: 'long' })}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={18} className="text-accent-500" />
                                            <span>{selectedEvent.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin size={18} className="text-accent-500" />
                                            <span>{selectedEvent.location}</span>
                                        </div>
                                    </div>

                                    {selectedEvent.recurring && (
                                        <div className="mb-8 px-3 py-1 bg-accent-50 text-accent-700 text-xs rounded uppercase font-bold tracking-wider inline-block">
                                            {selectedEvent.recurring}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="w-full bg-primary-900 text-white py-3 rounded-xl font-bold hover:bg-primary-800 transition-colors shadow-lg shadow-primary-900/20"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventsPage;
