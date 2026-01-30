import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-primary-900 flex items-center justify-center top-0 left-0 w-full h-full overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
            onAnimationComplete={() => {
                // We don't necessarily need to do anything here if managing state in parent
            }}
        >
            {/* Background Pattern - Consistent with Hero */}
            <div className="absolute inset-0 z-0">
                {/* Background Image with Overlay Blend */}
                <div className="absolute inset-0 bg-[url('/hero-pattern.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-900/95"></div>
            </div>

            <div className="flex items-center relative z-10">
                {/* Logo - Higher Z-index to sit on top of the emerging text */}
                <motion.div
                    className="relative z-20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                >
                    <img
                        src="/loading-logo.jpg"
                        alt="Zia-ul-Quran Loading Logo"
                        className="h-12 md:h-24 w-auto mix-blend-multiply rounded-full"
                    />
                </motion.div>

                {/* Text animating out from behind (Left to Right) - Lower Z-index */}
                {/* Negative margin to pull it close, padding to push text away from edge */}
                <div className="overflow-hidden relative z-10 -ml-4 pl-5 md:pl-8">
                    <motion.h1
                        className="text-lg md:text-5xl font-bold text-white whitespace-nowrap"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} // smooth custom bezier
                        onAnimationComplete={() => {
                            setTimeout(onComplete, 1500);
                        }}
                    >
                        Zia-ul-Quran
                    </motion.h1>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
