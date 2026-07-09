import { motion } from "framer-motion";
import images from "../assets/images.js"

const HomeQuizCard = ({ quiz, delay, onStart }) => {
    const cardBgSrc = images[quiz.cardBg] || quiz.cardBg;

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay }}
            className="relative overflow-hidden cursor-pointer group rounded-2xl min-h-77.5 border border-white/8 bg-[#18181B]"
            onClick={onStart}
        >
            <img
                src={cardBgSrc}
                alt={`${quiz.sport} action`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05] brightness-[0.75] contrast-[1.15] saturate-[1.12]"
            />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,transparent_38%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_top,#18181B_0%,rgba(24,24,27,0.96)_22%,rgba(24,24,27,0.6)_45%,transparent_72%)]" />
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/52 text-white/75 backdrop-blur-sm border border-white/10">
                    {quiz.sport}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-3">
                <h3 className="text-lg font-black leading-tight text-white mb-1.5 tracking-[-0.02em]">
                    {quiz.title}
                </h3>
                <p className="text-[10px] mb-4 text-white/30">
                    {quiz.questionsCount || 10} Questions
                </p>
                <button
                    onClick={(e) => { e.stopPropagation(); onStart(); }}
                    className="cursor-pointer text-[11px] font-bold px-4 py-2 rounded-full text-white/75 bg-black/35 border border-white/18 backdrop-blur-md transition-all hover:bg-white/[0.14] hover:text-white"
                >
                    Start Quiz →
                </button>
            </div>
        </motion.div>
    )
}

export default HomeQuizCard
