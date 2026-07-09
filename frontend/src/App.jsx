import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from './store/store'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quizzes from './pages/Quizzes'
import QuizActive from './pages/QuizActive'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import useScrollToTop from './hooks/useScrollToTop'

const ScrollToTop = () => {
  useScrollToTop();
  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>

            <Route path="/auth" element={<Auth />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="quiz/:quizId" element={
                <ProtectedRoute>
                  <QuizActive />
                </ProtectedRoute>} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster theme="dark" position="top-right" closeButton richColors />
      </AuthProvider>
    </Provider>
  )
}
