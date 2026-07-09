import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, Zap, BarChart2, Star, Menu, X, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 text-white cursor-pointer transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] bg-black/95 border-l border-white/10 p-6 flex flex-col gap-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-end pb-4 border-b border-white/10">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/4 hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {isAuthenticated && (
                <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/4 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-black bg-linear-to-br from-[#7a1f09] to-[#00B0FF]"
                      onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}
                    >
                      {getInitials()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold truncate text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-white/50 truncate">
                        {user.email || 'user@sportiq.com'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-[#7a1f09]/20 bg-[#7a1f09]/10 px-3 py-1.5 mt-1 self-start">
                    <Zap size={13} className="text-[#7a1f09]" strokeWidth={2.5} />
                    <span className="text-xs font-bold text-[#7a1f09]">
                      {user.xp.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {[...NAV_ITEMS, ...(isAuthenticated ? [PROFILE_ITEM] : [])].map(({ id, label, Icon, path }) => {
                  const active = isTabActive(path)
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        navigate(path)
                        setIsMenuOpen(false)
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${active
                          ? 'bg-white text-black font-black'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Action Button (Sign In / Logout) */}
              <div className="mt-auto pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    handleSignInOut()
                    setIsMenuOpen(false)
                  }}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${isAuthenticated
                      ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                      : 'bg-white text-black hover:bg-white/90'
                    }`}
                >
                  {isAuthenticated ? (
                    <>
                      <LogOut size={16} />
                      Log Out
                    </>
                  ) : (
                    <>
                      <LogIn size={16} />
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-16 pb-12 min-h-screen">
        <Outlet />

        {showFooter && <Footer />}
      </main>
    </div>
  )
}