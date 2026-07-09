import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizzes } from '../store/store'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import QuizCard from '@/components/QuizCard'

const CATEGORIES = ['All', 'Football', 'Formula 1', 'Combat Sports', 'Basketball', 'Tennis', 'Rugby']

const Quizzes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quizzes = useSelector((state) => state.quizzes.quizzes)
  const user = useSelector((state) => state.user)
  const [category, setCategory] = useState('All')

  const handleStart = (quizId) => {
    if (!user.email) {
      toast.error('Please log in to start a quiz');
      return;
    }
    navigate(`/quiz/${quizId}`)
  }
  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [dispatch])

  const filtered = category === 'All' ? quizzes : quizzes.filter((q) => q.sport === category)

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-7">

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">Choose Your Quiz</h1>
        <p className="text-sm text-[#71717A]">
          {quizzes.length} categories available · New quizzes every week
        </p>
      </motion.div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setCategory(cat)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200',
              category === cat
                ? 'bg-white text-black'
                : 'bg-[#18181B] border border-white/[0.07] text-[#71717A] hover:text-white',
            )}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((quiz, i) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            delay={i * 0.07}
            onStart={() => handleStart(quiz.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Quizzes
