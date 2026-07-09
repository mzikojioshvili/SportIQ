import { motion } from 'framer-motion'
import { ArrowLeft, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const DARK_CARD = 'bg-[#18181B] border border-white/[0.07]'

const QuizPreview = ({ quiz, onStart, onBack }) => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn('rounded-3xl p-8 text-center flex flex-col items-center gap-6', DARK_CARD)}
            >
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-sm text-[#71717A] hover:text-white transition-colors self-start"
                >
                    <ArrowLeft size={15} /> Back to Quizzes
                </button>

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/3 border border-white/8">
                    <Trophy size={32} className="text-[#FFD600]" />
                </div>

                <div>
                    <span
                        className="text-[10px] font-black uppercase tracking-widest mb-2 block"
                        style={{ color: quiz.accent || '#E50914' }}
                    >
                        {quiz.sport}
                    </span>
                    <h1 className="text-3xl font-black tracking-tight mb-2">{quiz.title}</h1>
                    <p className="text-sm text-[#71717A] max-w-md mx-auto">{quiz.description}</p>
                </div>

                <div className="flex gap-4 w-full max-w-sm mt-2">
                    {[
                        { label: 'Questions', value: quiz.questionsCount },
                        { label: 'Time Limit', value: <>15s <span className="text-xs font-normal text-[#52525B]">/ Q</span></> },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex-1 py-4 rounded-2xl text-center bg-[#121212] border border-white/5">
                            <p className="text-xs text-[#52525B] font-bold uppercase tracking-wider">{label}</p>
                            <p className="text-3xl font-black mt-1">{value}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onStart}
                    className="w-full max-w-sm py-4 rounded-2xl font-black text-sm bg-white text-black hover:bg-white/90 transition-all active:scale-[0.98] mt-4"
                >
                    Start Quiz
                </button>
            </motion.div>
        </div>
    )
}

export default QuizPreview