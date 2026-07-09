import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, Zap, BarChart2, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Footer from './Footer'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: Home, path: '/' },
  { id: 'quiz-select', label: 'Quizzes', Icon: Zap, path: '/quizzes' },
  { id: 'leaderboard', label: 'Leaderboard', Icon: BarChart2, path: '/leaderboard' },
]

const PROFILE_ITEM = {
  id: 'profile',
  label: 'Rewards',
  Icon: Star,
  path: '/profile',
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const user = useSelector((state) => state.user)

  const showFooter =
    location.pathname === '/' ||
    location.pathname === '/quizzes' ||
    location.pathname === '/leaderboard' ||
    location.pathname === '/profile'

  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return (user.firstName[0] + user.lastName[0]).toUpperCase()
    }
    return 'ME'
  }

  const handleSignInOut = () => {
    if (isAuthenticated) {
      logout()
      navigate('/')
    } else {
      navigate('/auth', { state: { view: 'login' } })
    }
  }

  const isTabActive = (itemPath) => {
    if (itemPath === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(itemPath)
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 backdrop-blur-3xl bg-black/82 border-b border-white/6">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between gap-4">

          <div onClick={() => navigate('/')} className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.svg" alt="logo" className='w-10 h-10' />
          </div>

          <div className="hidden md:flex items-center gap-1 rounded-2xl px-1.5 py-1.5 bg-white/4 border border-white/[0.07]">
            {[...NAV_ITEMS, ...(isAuthenticated ? [PROFILE_ITEM] : [])].map(({ id, label, Icon, path }) => {
              const active = isTabActive(path)
              return (
                <button
                  key={id}
                  onClick={() => navigate(path)}
                  className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${active ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                    }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-1.5 rounded-2xl border border-[#7a1f09]/20 bg-[#7a1f09]/10 px-3 py-1.5">
                <Zap size={13} className="text-[#7a1f09]" strokeWidth={2.5} />
                <span className="text-sm font-bold text-[#7a1f09]">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>
            )}
            <button
              onClick={handleSignInOut}
              className="hidden md:block text-sm font-semibold text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              {isAuthenticated ? 'Logout' : 'Sign In'}
            </button>
            {isAuthenticated && (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-black shrink-0 cursor-pointer bg-linear-to-br from-[#7a1f09] to-[#00B0FF]"
                onClick={() => navigate('/profile')}
              >
                {getInitials()}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-2 backdrop-blur-xl bg-black/92 border-t border-white/6">
        <div className="flex items-center justify-around">
          {[...NAV_ITEMS, ...(isAuthenticated ? [PROFILE_ITEM] : [])].map(({ id, label, Icon, path }) => {
            const active = isTabActive(path)
            return (
              <button
                key={id}
                onClick={() => navigate(path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${active ? 'text-white' : 'text-white/30'
                  }`}
              >
                <Icon size={18} />
                <span className="text-[10px] font-semibold">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <main className="pt-16 pb-28 md:pb-12 min-h-screen">
        <Outlet />

        {showFooter && <Footer />}
      </main>
    </div>
  )
}
