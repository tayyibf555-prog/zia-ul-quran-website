import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // NOTE FOR USER: Replace these placeholders with your actual EmailJS keys
            // 1. Create account at emailjs.com
            // 2. Add email service -> Get SERVICE_ID
            // 3. Create email template -> Get TEMPLATE_ID
            // 4. Get Public Key from Account settings

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'ziaulquran.scot@gmail.com'
            };

            const result = await emailjs.send(
                'YOUR_SERVICE_ID', // e.g., 'service_abc123'
                'YOUR_TEMPLATE_ID', // e.g., 'template_xyz456'
                templateParams,
                'YOUR_PUBLIC_KEY'   // e.g., 'user_7890...'
            );

            if (result.status === 200) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Email failed to send:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="py-20 bg-neutral-50" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gold-gradient mb-4">
                        Contact Us
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                        We're here to answer your questions and serve the community
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-display font-bold text-primary-600 mb-6">
                                Get in Touch
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-full">
                                        <MapPin className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-neutral-800 mb-1">Address</h4>
                                        <p className="text-neutral-600">
                                            257 Kenmure St<br />
                                            Glasgow, Scotland<br />
                                            G41 2QX
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-accent-50 p-3 rounded-full">
                                        <Phone className="w-6 h-6 text-accent-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-neutral-800 mb-1">Phone</h4>
                                        <p className="text-neutral-600">07365 522561</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-full">
                                        <Mail className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-neutral-800 mb-1">Email</h4>
                                        <p className="text-neutral-600">ziaulquran@outlook.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="bg-neutral-200 rounded-2xl h-64 overflow-hidden shadow-inner relative group">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                src="https://maps.google.com/maps?q=Masjid%20Zia-ul-Quran%20257%20Kenmure%20St,%20Glasgow%20G41%202QX&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none border-2 border-primary-500/10 rounded-2xl"></div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center space-x-3 mb-6">
                                <MessageCircle className="w-6 h-6 text-primary-600" />
                                <h3 className="text-2xl font-display font-bold text-primary-600">
                                    Send a Message
                                </h3>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                                        placeholder="Your message..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`w-full ${status === 'sending' ? 'bg-neutral-400 text-white' : 'bg-gold-gradient text-white'} px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2`}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-600 font-medium text-center mt-4"
                                    >
                                        Message sent successfully! We'll be in touch soon.
                                    </motion.p>
                                )}

                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-600 font-medium text-center mt-4"
                                    >
                                        Something went wrong. Please try again or email us directly.
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
