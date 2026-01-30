import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Trash2 } from 'lucide-react';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Assalamu Alaikum! I am the Zia-Ul-Quran Assistant. How can I help you today?', time: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const knowledgeBase = [
        {
            keywords: ['prayer', 'namaz', 'time', 'salah', 'jamaat', 'juma', 'jummah'],
            response: 'Daily prayers are held at Zia-Ul-Quran. We also facilitate 2 Jummah congregations to accommodate everyone. You can find the specific prayer timings in the Prayer Times section at the top of our homepage!'
        },
        {
            keywords: ['address', 'location', 'where', 'place', 'find', 'map'],
            response: 'We are located at 257 Kenmure St, Glasgow, G41 2QX. You can find a live Google Maps view in our Contact section!'
        },
        {
            keywords: ['contact', 'phone', 'email', 'reach', 'call'],
            response: 'You can reach us at 07888 896065 or email us at ziaulquran.scot@gmail.com. Feel free to use the contact form on our page as well!'
        },
        {
            keywords: ['services', 'nikah', 'marriage', 'madrassa', 'education', 'shahadah', 'therapy', 'counselling'],
            response: 'We offer many services including Madrassa, Nikah (Marriage) ceremonies, Shahadah support, iSyllabus for schools, and faith-sensitive Counselling. Which one would you like to know more about?'
        },
        {
            keywords: ['imam', 'shaykh', 'hassan', 'rabbani'],
            response: 'Our lead Imam is Shaykh Hassan Rabbani, a dedicated scholar who oversees our spiritual guidance and community programs.'
        },
        {
            keywords: ['events', 'happen', 'classes', 'dhikr', 'program', 'saturday'],
            response: 'We have regular events including Saturday Islamic Education classes (12-2 PM), Weekly Dhikr sessions, and a Mother/Toddlers group. Check our Community Events section for updates!'
        },
        {
            keywords: ['youtube', 'video', 'channel', 'watch'],
            response: 'You can watch our latest talks and events on our YouTube channel @zia-ul-quranglasgow3573. There is a video feed right here on our website!'
        },
        {
            keywords: ['thank', 'thanks', 'jazakallah', 'jazak'],
            response: 'You are very welcome! May Allah bless you. Is there anything else I can help you with?'
        },
        {
            keywords: ['hi', 'hello', 'salam', 'assalamu', 'hey'],
            response: 'Wa Alaikum Assalam! Hello! I am here to answer any questions you have about Zia-Ul-Quran Mosque and our services.'
        }
    ];

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input, time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const botResponse = generateResponse(input);
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse, time: new Date() }]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();

        for (const item of knowledgeBase) {
            if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
                return item.response;
            }
        }

        return "I'm not quite sure about that, but I'm learning! You can reach our team directly at 07888 896065 or ziaulquran.scot@gmail.com for more detailed information.";
    };

    const quickActions = [
        { label: 'Prayer Times', query: 'What are the prayer times?' },
        { label: 'Nikah Service', query: 'Tell me about Nikah services' },
        { label: 'Madrassa', query: 'Is there a Madrassa?' },
        { label: 'Location', query: 'Where are you located?' }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-primary-100"
                    >
                        {/* Header */}
                        <div className="bg-primary-900 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center p-2 shadow-lg">
                                    <Bot className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-display font-bold">Zia-Ul-Quran AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-primary-200 text-xs">Always here to help</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary-200 hover:text-white transition-colors p-1"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-primary-50/30">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.type === 'bot'
                                        ? 'bg-white text-neutral-800 rounded-tl-none border border-primary-100'
                                        : 'bg-accent-500 text-white rounded-tr-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-primary-100 shadow-sm flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* quick actions */}
                        {messages.length < 3 && (
                            <div className="p-4 bg-white border-t border-primary-50 flex gap-2 flex-wrap justify-center">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.label}
                                        onClick={() => {
                                            setInput(action.query);
                                            // Trigger send automatically after small delay
                                            setTimeout(() => handleSend(), 10);
                                        }}
                                        className="text-xs px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-900 hover:text-white transition-all border border-primary-100"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-primary-50">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your question..."
                                    className="w-full pl-4 pr-12 py-3 bg-neutral-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-200 text-neutral-700 text-sm transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 p-2 bg-primary-900 text-white rounded-xl hover:bg-primary-800 transition-colors shadow-lg"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-4 border-white/20 ${isOpen ? 'bg-primary-900 rotate-90' : 'bg-accent-500 hover:bg-accent-600'
                    }`}
            >
                {isOpen ? (
                    <X className="text-white w-8 h-8" />
                ) : (
                    <div className="relative">
                        <MessageCircle className="text-white w-8 h-8" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default ChatAssistant;
