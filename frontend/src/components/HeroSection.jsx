import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import images from '../assets/images.js'


const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative overflow-hidden rounded-3xl flex flex-col items-center text-center pt-24 pb-28 md:pt-32 md:pb-36">
            <img
                src={images.heroBackground}
                alt="Football stadium packed with fans under stadium floodlights"
                className="absolute inset-0 z-0 w-full h-full object-cover object-center brightness-[0.65] contrast-[1.15] saturate-[1.1]"
            />
            <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(to_bottom,#000_0%,transparent_28%)]" />
            <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(to_top,#000_0%,transparent_32%)]" />
            <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(to_right,#000_0%,transparent_18%)]" />
            <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(to_left,#000_0%,transparent_18%)]" />
            <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_90%_75%_at_50%_50%,transparent_15%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />

            <div className="relative z-10 flex flex-col items-center px-4 mt-5">
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.18 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 max-w-3xl tracking-[-0.03em] leading-[1.05] [text-shadow:0_2px_32px_rgba(0,0,0,0.7)]"
                >
                    Test Your Sports<br className="hidden sm:block" /> Intelligence.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.28 }}
                    className="text-base md:text-lg leading-relaxed max-w-xl mb-10 text-white/60 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]"
                >
                    Play daily curated quizzes across major sports, level up your ranking,
                    and unlock real rewards with zero gambling risks.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.38 }}
                    onClick={() => navigate('/quizzes')}
                    className="bg-white text-black font-bold px-8 py-3.5 rounded-full text-sm hover:bg-white/90 transition-all duration-200 active:scale-[0.97] tracking-[-0.01em]"
                >
                    Explore Quizzes →
                </motion.button>
            </div>
        </section>
    )
}

export default HeroSection