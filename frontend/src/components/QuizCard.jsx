import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import images from "../assets/images.js"

const QuizCard = ({ quiz, delay, onStart }) => {
    const equipmentImgSrc = images[quiz.equipmentImg] || quiz.equipmentImg;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="relative overflow-hidden cursor-pointer group flex flex-col bg-[#18181B] border border-white/[0.07] rounded-2xl min-h-57.5 transition-[border-color] duration-200 hover:border-white/15"
            onClick={onStart}
        >

            <div className="absolute top-0 right-0 bottom-0 w-2/5 overflow-hidden">
                <img
                    src={equipmentImgSrc}
                    alt={`${quiz.sport} equipment`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06] brightness-[0.58] contrast-[1.2] saturate-[1.1]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181B_0%,rgba(24,24,27,0.82)_28%,rgba(24,24,27,0.25)_62%,transparent_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#18181B_0%,transparent_22%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,#18181B_0%,transparent_22%)]" />
            </div>

            <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
                <span className="text-[10px] font-semibold text-[#52525B]">
                    {quiz.questionsCount || 10} Qs
                </span>
            </div>

            <div className="relative z-10 flex flex-col gap-3.5 p-6 flex-1 max-w-[62%]">
                <span
                    className="text-[10px] font-black uppercase tracking-widest text---quiz-accent)"
                    style={{ '--quiz-accent': quiz.accent }}
                >
                    {quiz.sport}
                </span>

                <h3 className="text-xl font-black leading-tight tracking-[-0.02em]">
                    {quiz.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#71717A]">{quiz.description}</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onStart()
                    }}
                    className="self-start cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold mt-auto text-white/65 border border-white/12 transition-all hover:bg-white/8 hover:text-white"
                >
                    Start Quiz
                    <ChevronRight size={12} />
                </button>
            </div>
        </motion.div>
    )
}

export default QuizCard