import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import HomeQuizCard from '../components/HomeQuizCard'

const HomeQuizSection = () => {
    const navigate = useNavigate()
    const quizzes = useSelector((state) => state.quizzes.homeQuizzes)
    const user = useSelector((state) => state.user)

    const handleStart = (quizId) => {
        if (!user.email) {
            toast.error('Please log in to start a quiz')
            return
        }
        navigate(`/quiz/${quizId}`)
    }

    return (
        <section className="py-20 md:py-24">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-10">
                Explore Quizzes
            </h2>

            {quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quizzes.map((quiz, i) => (
                        <HomeQuizCard
                            key={quiz.id}
                            quiz={quiz}
                            delay={i * 0.06}
                            onStart={() => handleStart(quiz.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center rounded-2xl h-50 bg-[#18181B] border border-white/5">
                    <p className="text-sm text-[#52525B]">No quizzes yet.</p>
                </div>
            )}
        </section>
    )
}

export default HomeQuizSection