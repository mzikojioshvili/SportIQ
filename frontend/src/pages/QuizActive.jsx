import {clearCurrentQuiz, fetchQuizDetail} from "@/store/quizSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import QuizPreview from "@/components/QuizPreview.jsx";
import QuizCountdown from "@/components/QuizCountdown.jsx";
import QuizResults from "@/components/QuizResults.jsx";
import QuizQuestion from "@/components/QuizQuestion.jsx";
import {useQuizGame} from "@/hooks/useQuizGame.js";

const QuizActive = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { currentQuiz: quiz, activeQuestions, loading, error } = useSelector((s) => s.quizzes)

  useEffect(() => {
    dispatch(fetchQuizDetail(quizId))
    return () => dispatch(clearCurrentQuiz())
  }, [quizId, dispatch])

  const game = useQuizGame(quiz, activeQuestions)

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-[#71717A] text-sm">Loading quiz questions...</p>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-[#E50914] text-sm">{error || 'Quiz not found'}</p>
        <button
          onClick={() => navigate('/quizzes')}
          className="mt-4 px-4 py-2 bg-[#18181B] rounded-xl text-xs font-bold text-white border border-white/10"
        >
          Back to Quizzes
        </button>
      </div>
    )
  }

  if (game.gameState === 'preview') {
    return <QuizPreview quiz={quiz} onStart={game.startQuiz} onBack={() => navigate('/quizzes')} />
  }

  if (game.gameState === 'countdown') {
    return <QuizCountdown text={game.countdownText} />
  }

  if (game.isFinished) {
    return (
      <QuizResults
        quiz={quiz}
        score={game.score}
        totalQuestions={activeQuestions.length}
        xpEarned={game.xpEarned}
        pointsEarned={game.pointsEarned}
        onBack={() => navigate('/quizzes')}
      />
    )
  }

  return (
    <QuizQuestion
      quiz={quiz}
      question={game.currentQuestion}
      currentIndex={game.currentIndex}
      totalQuestions={activeQuestions.length}
      timeLeft={game.timeLeft}
      answered={game.answered}
      selectedAnswer={game.selectedAnswer}
      submitting={game.submitting}
      onAnswer={game.handleAnswer}
      onNext={game.handleNext}
      onBack={() => navigate('/quizzes')}
    />
  )
}

export default QuizActive