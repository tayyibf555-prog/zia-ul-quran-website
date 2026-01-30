import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageSquare, Heart, ShieldCheck, Send, UserCheck, Users } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ImamPortal = () => {
    const [formType, setFormType] = useState('ask'); // ask, volunteer
    const [inquiryStatus, setInquiryStatus] = useState('idle'); // idle, sending, success, error
    const [volunteerStatus, setVolunteerStatus] = useState('idle');

    const [inquiryForm, setInquiryForm] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
    });

    const [volunteerForm, setVolunteerForm] = useState({
        name: '',
        phone: '',
        interest: '',
        availability: '',
        skills: ''
    });

    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        setInquiryStatus('sending');

        try {
            const templateParams = {
                from_name: inquiryForm.name,
                from_email: inquiryForm.email,
                mobile: inquiryForm.mobile,
                subject: inquiryForm.subject,
                message: inquiryForm.message,
                to_email: 'ziaulquran.scot@gmail.com',
                form_type: 'Spiritual Inquiry'
            };

            await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                templateParams,
                'YOUR_PUBLIC_KEY'
            );

            setInquiryStatus('success');
            setInquiryForm({ name: '', email: '', mobile: '', subject: '', message: '' });
            setTimeout(() => setInquiryStatus('idle'), 5000);
        } catch (error) {
            console.error('Inquiry failed:', error);
            setInquiryStatus('error');
            setTimeout(() => setInquiryStatus('idle'), 5000);
        }
    };

    const handleVolunteerSubmit = async (e) => {
        e.preventDefault();
        setVolunteerStatus('sending');

        try {
            // NOTE FOR USER: Paste your Google Web App URL here
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlCEN01Het3AANcCAJnIza8klI25YALcfVZrYo8cXvqzcuHbjlimtmG9jCb2EF0CAl/exec';

            const formData = new URLSearchParams();
            formData.append('Name', volunteerForm.name);
            formData.append('Phone', volunteerForm.phone);
            formData.append('Interest', volunteerForm.interest);
            formData.append('Availability', volunteerForm.availability);
            formData.append('Skills', volunteerForm.skills);
            formData.append('Date', new Date().toLocaleString());

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Standard for simple Google Script POSTs
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            // Since 'no-cors' doesn't return status, we assume success if no catch
            setVolunteerStatus('success');
            setVolunteerForm({ name: '', phone: '', interest: '', availability: '', skills: '' });
            setTimeout(() => setVolunteerStatus('idle'), 5000);
        } catch (error) {
            console.error('Volunteer submission failed:', error);
            setVolunteerStatus('error');
            setTimeout(() => setVolunteerStatus('idle'), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 pt-28 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-neutral-100 flex gap-2">
                        <button
                            onClick={() => setFormType('ask')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${formType === 'ask'
                                ? 'bg-primary-900 text-white shadow-lg'
                                : 'text-neutral-500 hover:text-primary-600'
                                }`}
                        >
                            Ask the Imam
                        </button>
                        <button
                            onClick={() => setFormType('volunteer')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${formType === 'volunteer'
                                ? 'bg-primary-900 text-white shadow-lg'
                                : 'text-neutral-500 hover:text-primary-600'
                                }`}
                        >
                            Volunteer Portal
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Content Section */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={formType}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-neutral-100"
                        >
                            {formType === 'ask' ? (
                                <>
                                    <h2 className="text-3xl font-display font-bold text-primary-900 mb-6 flex items-center gap-3">
                                        <MessageSquare className="text-accent-500" />
                                        Spiritual Inquiries
                                    </h2>
                                    <p className="text-neutral-600 mb-8 leading-relaxed">
                                        Submit your questions directly to Shaykh Hassan Rabbani. All inquiries are strictly confidential and handled with care.
                                    </p>
                                    <form onSubmit={handleInquirySubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                required
                                                value={inquiryForm.name}
                                                onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                value={inquiryForm.email}
                                                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input
                                                type="tel"
                                                placeholder="Mobile Number"
                                                required
                                                value={inquiryForm.mobile}
                                                onChange={(e) => setInquiryForm({ ...inquiryForm, mobile: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Subject / Topic"
                                                required
                                                value={inquiryForm.subject}
                                                onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            />
                                        </div>
                                        <textarea
                                            rows="5"
                                            placeholder="Your question or message..."
                                            required
                                            value={inquiryForm.message}
                                            onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            disabled={inquiryStatus === 'sending'}
                                            className="w-full bg-gold-gradient text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-[1.01] disabled:bg-neutral-400 disabled:bg-none transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40"
                                        >
                                            {inquiryStatus === 'sending' ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            ) : <Send size={18} />}
                                            {inquiryStatus === 'sending' ? 'Sending...' : 'Submit Securely'}
                                        </button>

                                        {inquiryStatus === 'success' && (
                                            <p className="text-green-600 font-bold text-center mt-4">Inquiry sent successfully!</p>
                                        )}
                                        {inquiryStatus === 'error' && (
                                            <p className="text-red-600 font-bold text-center mt-4">Failed to send. Please try again.</p>
                                        )}
                                    </form>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-display font-bold text-primary-900 mb-6 flex items-center gap-3">
                                        <Heart className="text-accent-500" />
                                        Serve Your Community
                                    </h2>
                                    <p className="text-neutral-600 mb-8 leading-relaxed">
                                        Join our dedicated team of volunteers. Whether it's help with events, cleaning, or teaching, your contribution makes a difference.
                                    </p>
                                    <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                required
                                                value={volunteerForm.name}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            />
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                required
                                                value={volunteerForm.phone}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <select
                                                required
                                                value={volunteerForm.interest}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, interest: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            >
                                                <option value="">Select Area of Interest</option>
                                                <option value="Event Management">Event Management</option>
                                                <option value="Education / Tutoring">Education / Tutoring</option>
                                                <option value="Facilities / Cleaning">Facilities / Cleaning</option>
                                                <option value="Marketing / Social Media">Marketing / Social Media</option>
                                            </select>
                                            <select
                                                required
                                                value={volunteerForm.availability}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                            >
                                                <option value="">Availability</option>
                                                <option value="Weekends">Weekends</option>
                                                <option value="Evenings">Evenings</option>
                                                <option value="Flexible">Flexible</option>
                                            </select>
                                        </div>
                                        <textarea
                                            rows="4"
                                            placeholder="Briefly tell us about your skills..."
                                            required
                                            value={volunteerForm.skills}
                                            onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent-500 outline-none"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            disabled={volunteerStatus === 'sending'}
                                            className="w-full bg-gold-gradient text-white py-4 rounded-xl font-bold hover:shadow-lg hover:scale-[1.01] disabled:bg-neutral-400 disabled:bg-none transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40"
                                        >
                                            {volunteerStatus === 'sending' ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            ) : <UserCheck size={18} />}
                                            {volunteerStatus === 'sending' ? 'Sending...' : 'Apply as Volunteer'}
                                        </button>

                                        {volunteerStatus === 'success' && (
                                            <p className="text-green-600 font-bold text-center mt-4">Application sent successfully!</p>
                                        )}
                                        {volunteerStatus === 'error' && (
                                            <p className="text-red-600 font-bold text-center mt-4">Failed to send. Please try again.</p>
                                        )}
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-primary-900 text-white p-8 rounded-3xl shadow-xl border border-white/10 relative overflow-hidden">
                            <div className="relative z-10">
                                <ShieldCheck className="text-accent-500 mb-4" size={40} />
                                <h4 className="text-xl font-bold mb-4">Your Trust is Our Priority</h4>
                                <ul className="space-y-4 text-primary-100 text-sm">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-1.5 shrink-0"></div>
                                        All questions are strictly confidential.
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-1.5 shrink-0"></div>
                                        Responses go directly to your provided email.
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-1.5 shrink-0"></div>
                                        Typical response time is 3-5 working days.
                                    </li>
                                </ul>
                            </div>
                            <div className="absolute inset-0 z-0 opacity-10 bg-[url('/hero-pattern.jpg')] bg-cover"></div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100">
                            <Users className="text-primary-600 mb-4" size={40} />
                            <h4 className="text-xl font-bold text-primary-900 mb-2">Community Impact</h4>
                            <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                                Our volunteers have contributed over 500 hours this year. Join the family and build your legacy.
                            </p>
                            <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-primary-600"
                                ></motion.div>
                            </div>
                            <div className="mt-2 text-[10px] text-neutral-400 font-bold uppercase tracking-widest text-center">
                                Goal: 75% of Volunteer slots filled
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImamPortal;
