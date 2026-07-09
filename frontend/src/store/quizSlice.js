import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../api/client'

const initialState = {
  quizzes: [],
  homeQuizzes: [],
  currentQuiz: null,
  activeQuestions: [],
  loading: false,
  error: null,
}

export const fetchQuizzes = createAsyncThunk('quizzes/fetchQuizzes', async (_, { rejectWithValue }) => {
  try {
    const response = await client.get('/api/quizzes')
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message || 'Failed to fetch quizzes')
  }
})

export const fetchHomeQuizzes = createAsyncThunk('quizzes/fetchHomeQuizzes', async (_, { rejectWithValue }) => {
  try {
    const response = await client.get('/api/quizzes/home')
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message || 'Failed to fetch home quizzes')
  }
})

export const fetchQuizDetail = createAsyncThunk('quizzes/fetchQuizDetail', async (quizId, { rejectWithValue }) => {
  try {
    const { data: quiz } = await client.get(`/api/quizzes/${quizId}`)
    const allQuestions = quiz.questions || []

    const storageKey = `seen_questions_${quizId}`
    let seen = []
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) seen = JSON.parse(stored)
    } catch { }

    let available = allQuestions.filter((q) => !seen.includes(q.text))
    if (available.length < 3) {
      seen = []
      available = [...allQuestions]
    }

    const pool = [...available]
    const selected = []
    for (let i = 0; i < 3 && pool.length > 0; i++) {
      const idx = Math.floor(Math.random() * pool.length)
      selected.push(pool.splice(idx, 1)[0])
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify([...seen, ...selected.map((q) => q.text)]))
    } catch { }

    return { quiz, activeQuestions: selected }
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || error.message || 'Quiz not found')
  }
})

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    clearCurrentQuiz(state) {
      state.currentQuiz = null
      state.activeQuestions = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchQuizzes.fulfilled, (state, action) => { state.loading = false; state.quizzes = action.payload })
      .addCase(fetchQuizzes.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(fetchHomeQuizzes.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchHomeQuizzes.fulfilled, (state, action) => { state.loading = false; state.homeQuizzes = action.payload })
      .addCase(fetchHomeQuizzes.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(fetchQuizDetail.pending, (state) => { state.loading = true; state.error = null; state.currentQuiz = null })
      .addCase(fetchQuizDetail.fulfilled, (state, action) => {
        state.loading = false
        state.currentQuiz = action.payload.quiz
        state.activeQuestions = action.payload.activeQuestions
      })
      .addCase(fetchQuizDetail.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  },
})

export const { clearCurrentQuiz } = quizSlice.actions
export default quizSlice.reducer