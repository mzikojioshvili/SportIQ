import { motion } from 'framer-motion'
import { Clock, Gift, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const DARK_CARD = 'bg-[#18181B] border border-white/[0.07]'

function getAnswerClasses(key, answered, selectedAnswer, correctKey) {
    if (!answered) return { button: 'bg-white/[0.03] border-white/[0.08]', label: 'bg-white/[0.06]' }
    if (key === correctKey) return { button: 'bg-[rgba(0,230,118,0.1)] border-[#00E676]', label: 'bg-[rgba(0,230,118,0.2)]' }
    if (key === selectedAnswer) return { button: 'bg-[rgba(229,9,20,0.1)] border-[#E50914]', label: 'bg-[rgba(229,9,20,0.2)]' }
    return { button: 'bg-white/[0.02] border-white/[0.04]', label: 'bg-white/[0.04]' }
}

const QuizQuestion = ({
    quiz,
    question,
    currentIndex,
    totalQuestions,
    timeLeft,
    answered,
    selectedAnswer,
    submitting,
    onAnswer,
    onNext,
    onBack,
}) => {
    const timerColor = timeLeft > 3 ? '#00E676' : timeLeft > 1 ? '#FF6D00' : '#E50914'
    const timerPct = (timeLeft / 4) * 100

    return (
        <div className="max-w-2xl mx-auto px-4 py-5">
            <div className="flex items-center gap-3 mb-7">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-sm text-[#52525B] hover:text-white transition-colors"
                >
                    <ArrowLeft size={15} /> Quizzes
                </button>
                <div className="flex-1 h-1 rounded-full overflow-hidden bg-white/[0.07]">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: quiz.sportColor || '#E50914' }}
                        animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                        transition={{ duration: 0.355 }}
                    />
                </div>
                <span className="text-xs font-semibold text-[#52525B]">{currentIndex + 1} / {totalQuestions}</span>
            </div>

            <div className="flex gap-3 mb-4">
                <div className={cn('shrink-0 w-24 rounded-3xl flex flex-col items-center justify-center gap-2.5 p-4', DARK_CARD)}>
                    <Clock size={13} className="text-[#52525B]" />
                    <span className="text-[2.6rem] font-black tabular-nums leading-none transition-colors duration-600" style={{ color: timerColor }}>
                        {String(timeLeft).padStart(2, '0')}
                    </span>
                    <div className="w-full h-0.5 rounded-full overflow-hidden bg-white/8">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: timerColor }}
                            animate={{ width: `${timerPct}%` }}
                            transition={{ duration: 1, ease: 'linear' }}
                        />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#52525B]">sec</span>
                </div>

                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn('flex-1 rounded-3xl p-6 flex flex-col justify-center', DARK_CARD)}
                >
                    <span
                        className="text-[10px] font-black uppercase tracking-widest mb-3 block"
                        style={{ color: quiz.accent || '#E50914' }}
                    >
                        {quiz.sport} · Question {currentIndex + 1}
                    </span>
                    <h2 className="text-lg md:text-xl font-black leading-snug tracking-tight">{question.text}</h2>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {question.options.map(({ key, text }) => {
                    const { button, label } = getAnswerClasses(key, answered, selectedAnswer, question.correctKey)
                    const isCorrect = key === question.correctKey
                    const isSelected = key === selectedAnswer

                    return (
                        <motion.button
                            key={key}
                            onClick={() => onAnswer(key)}
                            disabled={answered}
                            whileHover={!answered ? { scale: 1.015 } : {}}
                            whileTap={!answered ? { scale: 0.985 } : {}}
                            className={cn('flex items-center gap-3.5 px-4 py-4 rounded-2xl text-left transition-all duration-200 disabled:cursor-default border', button)}
                        >
                            <span className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0', label)}>
                                {key}
                            </span>
                            <span className="font-semibold text-sm flex-1 leading-snug">{text}</span>
                            {answered && isCorrect && <CheckCircle size={17} className="text-[#00E676] shrink-0" />}
                            {answered && isSelected && !isCorrect && <XCircle size={17} className="text-[#E50914] shrink-0" />}
                        </motion.button>
                    )
                })}
            </div>

            <div className={cn('flex items-center justify-between px-5 py-4 rounded-2xl', DARK_CARD)}>
                <div className="flex items-center gap-3">
                    <Gift size={15} className="text-[#FFD600]" />
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#52525B]">Potential Reward</p>
                        <p className="text-sm font-bold">+150 XP &amp; 1× Raffle Ticket</p>
                    </div>
                </div>

                {answered ? (
                    <motion.button
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={onNext}
                        disabled={submitting}
                        className="px-5 py-2.5 rounded-xl font-black text-xs text-black bg-white hover:bg-white/90 transition-all active:scale-[0.98]"
                    >
                        {submitting ? 'Submitting...' : currentIndex < totalQuestions - 1 ? 'Next Question →' : 'Finish Quiz ✓'}
                    </motion.button>
                ) : (
                    <span className="text-[10px] font-semibold text-[#52525B]">Choose an option</span>
                )}
            </div>
        </div>
    )
}

export default QuizQuestion;