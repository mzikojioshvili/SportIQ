import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const DARK_CARD = 'bg-[#18181B] border border-white/[0.07]'

const QuizResults = ({ quiz, score, totalQuestions, xpEarned, pointsEarned, onBack }) => {
    const perfect = score === totalQuestions

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn('rounded-3xl p-8 text-center flex flex-col items-center gap-6', DARK_CARD)}
            >
                <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', perfect ? 'bg-[rgba(0,230,118,0.1)]' : 'bg-[rgba(255,214,0,0.1)]')}>
                    <Trophy size={32} className={perfect ? 'text-[#00E676]' : 'text-[#FFD600]'} />
                </div>

                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Quiz Completed!</h1>
                    <p className="text-sm text-[#71717A]">You finished the {quiz.title}</p>
                </div>

                <div className="flex gap-4 w-full max-w-sm mt-2">
                    <div className="flex-1 py-4 rounded-2xl text-center bg-[#121212] border border-white/5">
                        <p className="text-xs text-[#52525B] font-bold uppercase tracking-wider">Score</p>
                        <p className="text-3xl font-black mt-1">{score} / {totalQuestions}</p>
                    </div>
                    <div className="flex-1 py-4 rounded-2xl text-center bg-[#121212] border border-white/5">
                        <p className="text-xs text-[#52525B] font-bold uppercase tracking-wider">Rewards</p>
                        <p className="text-sm font-black mt-1.5 text-[#00E676]">+{xpEarned} XP</p>
                        <p className="text-xs text-[#FFD600] font-bold mt-0.5">+{pointsEarned} PTS</p>
                    </div>
                </div>

                <button
                    onClick={onBack}
                    className="w-full max-w-sm py-3.5 rounded-2xl font-black text-sm bg-white text-black hover:bg-white/90 transition-all active:scale-[0.98] mt-4"
                >
                    Back to Quizzes
                </button>
            </motion.div>
        </div>
    )
}

export default QuizResults;