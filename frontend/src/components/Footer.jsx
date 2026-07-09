import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="max-w-6xl mx-auto px-4 md:px-6 mt-16 font-sans">

      <div className="h-px mb-10 bg-white/[0.07]" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

        <div>
          <div className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.svg" alt="logo" className='w-10 h-10' />
          </div>
          <p className="text-sm leading-relaxed max-w-55 text-[#71717A]">
            The world&apos;s premier sports trivia and prediction platform.
          </p>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-[#52525B]">
            Platform
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Home', target: '/' },
              { label: 'Leaderboard', target: '/leaderboard' },
              { label: 'Rewards', target: '/profile' },
            ].map(({ label, target }) => (
              <button
                key={label}
                onClick={() => navigate(target)}
                className="text-sm text-left w-fit transition-colors text-[#71717A] hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-[#52525B]">
            Legal
          </p>
          <div className="flex flex-col gap-3">
            {['Rules', 'Privacy Policy', 'Terms of Service'].map((link) => (
              <button
                key={link}
                className="text-sm text-left w-fit transition-colors text-[#71717A] hover:text-white"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-6 border-t border-white/5">
        <p className="text-xs text-[#3F3F46]">
          © 2026 SportIQ Inc. All rights reserved.
        </p>
        <button
          onClick={() => navigate('/auth', { state: { view: 'login' } })}
          className="text-xs transition-colors text-[#3F3F46] hover:text-[#71717A]"
        >
          Sign in to your account →
        </button>
      </div>
    </footer>
  )
}
