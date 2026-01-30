import { motion } from 'framer-motion';
import { Mail, Phone, User } from 'lucide-react';

const Team = () => {
    const teamMembers = [
        {
            name: "Shaykh Hassan Rabbani",
            role: "Imam and Chaplain",
            bio: "Shaykh Hassan is a graduate of Jamia Al-Karam, Al-Azhar University, and Cambridge Muslim College. He holds M.A. degrees in Islamic Studies (Aberdeen) and Philosophy (Glasgow), and is a trained therapist. As a BACP-registered counsellor, he co-founded Healers Muslim Counselling. He serves as the Muslim Chaplain at Heriot-Watt University and leads educational programmes at Zia-Ul-Quran.",
            image: "/shaykh-hassan.jpg"
        },
        {
            name: "Allamah Shabir Hussain Rabbani",
            role: "Founder & Head Imam",
            bio: "Allamah Shabir Hussain Rabbani is the head Imam and founder of Zia-Ul-Quran. He began his studies at Dār al-ʿUlūm Muḥammadiyyah al-Ghauthiyah, founded by Justice Shaykh Muhammad Karam Shah Al-Azhari. After completing his Dawra Hadith and earning Ijazāt (certificates) equivalent to an M.A. in Arabic and Islamic Studies, he served as an Imam and teacher in Pakistan before moving to the UK in 1981. In 1983, he established Zia-Ul-Quran in Middlesbrough, and in 1985, he moved to Glasgow, where he continued expanding his efforts to spread traditional Islam. He remains a key religious figure, dedicated to education and community service.",
            image: "/allamah-shabir.png"
        },
        {
            name: "Dr Mohsan Rabbani, MD",
            role: "Activities Lead",
            bio: "Dr Mohsan Rabbani brings specialised expertise to our youth and community programmes. With a Level 3 Award in Education and Training (AET), he is an Early Years Provision Strategist and Child Development specialist. He utilises his medical and educational background to design engaging, developmentally appropriate activities that nurture the growth and well-being of our younger community members. He is also a trustee of the Muslim Council of Scotland.",
            image: "/dr-mohsan.jpg"
        }
    ];

    return (
        <main className="pt-28 min-h-screen bg-neutral-50">
            {/* Header */}
            <section className="bg-primary-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-gold-gradient mb-6"
                    >
                        Our Team
                    </motion.h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        The dedicated individuals working behind the scenes to serve our community.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="h-64 bg-neutral-200 flex items-center justify-center text-neutral-400">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={64} />
                                    )}
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-display font-bold text-primary-900 mb-2">{member.name}</h3>
                                    <p className="text-accent-600 font-bold uppercase tracking-widest text-xs mb-4">{member.role}</p>
                                    <p className="text-neutral-600 mb-6">{member.bio}</p>

                                    <div className="flex gap-4 pt-6 border-t border-neutral-100">
                                        <button className="text-neutral-400 hover:text-primary-600 transition-colors">
                                            <Mail size={20} />
                                        </button>
                                        <button className="text-neutral-400 hover:text-primary-600 transition-colors">
                                            <Phone size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Team CTA */}
            <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] opacity-10 mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-gold-gradient mb-6">
                            Become Part of the Team
                        </h2>
                        <p className="text-xl text-primary-100 mb-10 leading-relaxed">
                            We are always looking for dedicated volunteers to help serve the community. Whether you have skills in event planning, maintenance, teaching, or just want to lend a hand, we'd love to have you.
                        </p>
                        <a
                            href="https://docs.google.com/forms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gold-gradient text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-900/20"
                        >
                            <User size={20} />
                            Volunteer With Us
                        </a>
                    </motion.div>
                </div>
            </section>
        </main >
    );
};

export default Team;
