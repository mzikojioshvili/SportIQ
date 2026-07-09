import { motion } from 'framer-motion'

const QuizCountdown = ({ text }) => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-20 flex items-center justify-center min-h-[50vh]">
            <motion.div
                key={text}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tight text-white uppercase"
            >
                {text}
            </motion.div>
        </div>
    )
}

export default QuizCountdown;