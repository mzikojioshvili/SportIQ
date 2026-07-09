import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import SignUpForm from '@/components/SignUpForm'
import SignInForm from '@/components/SignInForm'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()
  const [authView, setAuthView] = useState(location.state?.view || 'login')

  const isRegister = authView === 'register'

  const toggleView = (view) => setAuthView(view)

  const handleSignIn = async (data) => {
    await login(data.email, data.password)
    const from = location.state?.from?.pathname || '/'
    navigate(from, { replace: true })
  }

  const handleSignUp = async (data) => {
    await register({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
    })
    const from = location.state?.from?.pathname || '/'
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">

      <div className="px-6 py-4 flex items-center justify-between shrink-0 border-b border-white/5">
        <div onClick={() => navigate('/')} className="flex items-center gap-2.5 shrink-0">
          <img src="/logo.svg" alt="logo" className='w-10 h-10' />
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm transition-colors text-[#71717A] hover:text-white"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-95">

          <div className="flex gap-1 p-1 rounded-2xl mb-8 bg-[#18181B] border border-white/[0.07]">
            {['login', 'register'].map((v) => (
              <button
                key={v}
                onClick={() => toggleView(v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${authView === v ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                  }`}
              >
                {v === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <motion.div
            key={authView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-7 bg-[#18181B] border border-white/[0.07]"
          >
            <h2 className="text-2xl font-black mb-1">
              {isRegister ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-sm mb-7 text-[#71717A]">
              {isRegister
                ? 'Join 284K+ sports quiz enthusiasts worldwide.'
                : 'Sign in to continue your trivia journey.'}
            </p>

            {isRegister
              ? <SignUpForm onSubmit={handleSignUp} />
              : <SignInForm onSubmit={handleSignIn} />
            }
          </motion.div>

          {isRegister ? (
            <p className="text-center text-xs mt-5 text-[#52525B]">
              By signing up, you agree to our{' '}
              <span className="cursor-pointer transition-colors text-[#71717A] hover:text-white">Terms</span>
              {' '}and{' '}
              <span className="cursor-pointer transition-colors text-[#71717A] hover:text-white">Privacy Policy</span>.
            </p>
          ) : (
            <p className="text-center text-xs mt-5 text-[#52525B]">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => toggleView('register')}
                className="transition-colors text-[#71717A] hover:text-white"
              >
                Sign up for free →
              </button>
            </p>
          )}

        </div>
      </div>
    </div>
  )
}

export default Auth