import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import images from '@/assets/images'

export default function DailyAthleteFact() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);

  const handleStart = () => {
    if (!user.email) {
      toast.error('Please log in to start a quiz')
      return;
    }
    navigate('/quiz/f1')
  }

  const stats = [
    { label: 'World Titles', value: '7x' },
    { label: 'Race Wins', value: '103' },
    { label: 'F1 Seasons', value: '17' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl overflow-hidden bg-black border border-[#18181B]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">

        <div className="relative overflow-hidden min-h-105">
          <img
            src={images.f1Car}
            alt="Formula 1 Ferrari racing car — vibrant red on track"
            className="absolute inset-0 z-0 w-full h-full object-cover object-center brightness-[0.62] contrast-[1.2] saturate-[1.15]"
          />

          <div className="absolute inset-0 z-1 bg-[linear-gradient(to_bottom,#000_0%,transparent_22%)]" />
          <div className="absolute inset-0 z-1 bg-[linear-gradient(to_top,#000_0%,transparent_35%)]" />
          <div className="absolute inset-0 z-1 bg-[linear-gradient(to_right,#000_0%,transparent_15%)]" />
          <div className="absolute inset-0 z-1 hidden md:block bg-[linear-gradient(to_right,transparent_35%,rgba(0,0,0,0.55)_60%,#000_88%)]" />
          <div className="absolute inset-0 z-1 md:hidden bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,0,0,0.7)_70%,#000_95%)]" />

          <div className="absolute top-6 left-6 z-2">
            <span className="text-[10px] font-semibold tracking-wide text-white/30">
              July 3, 2026
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16 gap-7">

          <div>
            <h2 className="text-5xl md:text-6xl font-black leading-none text-white mb-3 tracking-[-0.035em]">
              Lewis
              <br />
              Hamilton
            </h2>
            <p className="text-sm font-semibold text-[#52525B]">
              Ferrari Formula 1 Team&nbsp;·&nbsp;7× World Champion
            </p>
          </div>

          <div className="flex gap-2.5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-0.5 px-4 py-2.5 rounded-2xl bg-[#18181B] border border-white/6"
              >
                <span className="text-base font-black text-white">{s.value}</span>
                <span className="text-[10px] font-semibold whitespace-nowrap text-[#52525B]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed max-w-sm text-white/60">
            Born in Stevenage, England, Sir Lewis Hamilton discovered motorsport at age 8 and rose to
            become the most decorated driver in Formula 1 history, claiming seven World Championship
            titles and redefining what is possible in the sport.
          </p>

          <div className="pl-5 py-0.5 border-l-2 border-white/10">
            <p className="text-sm leading-relaxed italic text-white/60">
              &quot;Hamilton is the only driver in history to have won at least one Grand Prix in
              every one of 15 consecutive seasons — a record that remains unmatched by any other
              competitor in the sport&apos;s 75-year history.&quot;
            </p>
          </div>

          <div>
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white text-black hover:bg-white/90 transition-all duration-200 active:scale-[0.97] tracking-[-0.01em]"
            >
              <Zap size={13} />
              Take Double XP Quiz
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
