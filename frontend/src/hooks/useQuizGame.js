import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { submitQuizScore } from '../store/userSlice'

export function useQuizGame(quiz, questions) {
    const dispatch = useDispatch()

    const [gameState, setGameState] = useState('preview')
    const [countdownText, setCountdownText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [answered, setAnswered] = useState(false)
    const [timeLeft, setTimeLeft] = useState(15)
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [xpEarned, setXpEarned] = useState(0)
    const [pointsEarned, setPointsEarned] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (gameState !== 'countdown') return
        let counter = 3
        setCountdownText('3')
        const id = setInterval(() => {
            counter -= 1
            if (counter > 0) setCountdownText(String(counter))
            else if (counter === 0) setCountdownText('Start!')
            else {
                clearInterval(id)
                setGameState('playing')
                setTimeLeft(15)
            }
        }, 1000)
        return () => clearInterval(id)
    }, [gameState])

    useEffect(() => {
        if (gameState !== 'playing' || answered || timeLeft === 0) return
        const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
        return () => clearTimeout(t)
    }, [gameState, answered, timeLeft])

    useEffect(() => {
        if (gameState === 'playing' && timeLeft === 0 && !answered) {
            setAnswered(true)
            setSelectedAnswer(null)
        }
    }, [gameState, timeLeft, answered])

    const currentQuestion = questions[currentIndex]

    const startQuiz = useCallback(() => setGameState('countdown'), [])

    const handleAnswer = useCallback(
        (key) => {
            if (answered || !currentQuestion) return
            setSelectedAnswer(key)
            setAnswered(true)
            if (key === currentQuestion.correctKey) setScore((s) => s + 1)
        },
        [answered, currentQuestion]
    )

    const handleNext = useCallback(async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((i) => i + 1)
            setSelectedAnswer(null)
            setAnswered(false)
            setTimeLeft(15)
            return
        }

        setSubmitting(true)
        try {
            const result = await dispatch(submitQuizScore({ quizId: quiz?.id, score, totalQuestions: questions.length }))
            setXpEarned(result?.payload?.xpEarned ?? score * 50)
            setPointsEarned(result?.payload?.pointsEarned ?? score * 30)
        } catch {
            setXpEarned(score * 50)
            setPointsEarned(score * 30)
        } finally {
            setSubmitting(false)
            setIsFinished(true)
        }
    }, [currentIndex, questions.length, quiz?.id, score, dispatch])

    return {
        gameState,
        countdownText,
        currentIndex,
        currentQuestion,
        selectedAnswer,
        answered,
        timeLeft,
        score,
        isFinished,
        xpEarned,
        pointsEarned,
        submitting,
        startQuiz,
        handleAnswer,
        handleNext,
    }
}