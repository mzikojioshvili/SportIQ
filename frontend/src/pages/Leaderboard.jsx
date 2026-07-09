import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { leaderboardAllTime, leaderboardWeekly } from '@/data/data'
import DefaultUserIcon from '@/components/DefaultUserIcon'
import { podiumData } from '@/data/data'
import TrophyIcon from '@/components/TrophyIcon'

export default function Leaderboard() {
  const user = useSelector((state) => state.user);
  const [tab, setTab] = useState('weekly')

  const enrichLeaderboard = (list) => {
    return list
      .map((entry) => {
        if (entry.isMe) {
          if (!user.email) return null
          return {
            ...entry,
            name: `${user.firstName} ${user.lastName}`,
            xp: user.xp,
          }
        }
        return entry
      })
      .filter(Boolean)
      .sort((a, b) => b.xp - a.xp)
      .map((entry, index) => ({ ...entry, rank: index + 1 })) 
  }

  const data = tab === 'weekly' ? enrichLeaderboard(leaderboardWeekly) : enrichLeaderboard(leaderboardAllTime)
  const top3 = data.slice(0, 3)
  const rest = data.slice(3)

  const podium = [top3[1], top3[0], top3[2]]
  const podiumHeights = ['h-32', 'h-44', 'h-24']
  const podiumRanks = [2, 1, 3]

  return (
    <div className="max-w-3xl mx-auto px-4 py-5">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Global Standings</h1>
          <p className="text-sm mt-1 text-[#71717A]">Compete with the best worldwide</p>
        </div>
        <div className="flex rounded-2xl p-1 bg-[#18181B] border border-white/[0.07]">
          {['weekly', 'alltime'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${tab === t ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                }`}
            >
              {t === 'weekly' ? 'Weekly' : 'All-Time'}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl p-7 mb-6 bg-[#18181B] border border-white/[0.07]">
        <div className="flex items-end justify-center gap-3 md:gap-6 pt-4">
          {podium.map((user, i) => {
            if (!user) return null
            const rank = podiumRanks[i]
            const config = podiumData[rank]
            const isFirst = rank === 1

            return (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex flex-col items-center gap-2.5 flex-1 max-w-35 ${isFirst ? 'z-10 scale-105' : ''}`}
              >
                <div className="flex items-center justify-center h-20 mb-1">
                  <TrophyIcon
                    className={cn(
                      isFirst ? 'w-20 h-20' : 'w-14 h-14',
                      config.trophyClass,
                    )}
                  />
                </div>

                <div className="text-center w-full">
                  <p className="text-sm font-bold leading-tight truncate">{user.name}</p>
                  <p className="text-xs mt-0.5 text-[#71717A]">
                    {user.xp >= 1000 ? `${(user.xp / 1000).toFixed(1)}K` : user.xp} XP
                  </p>
                </div>

                <div
                  className={cn(
                    'w-full rounded-t-2xl flex items-center justify-center',
                    podiumHeights[i],
                    config.podiumClass,
                  )}
                >
                  <span className={cn('font-black tracking-tighter', config.rankClass)}>
                    {rank}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden border border-white/[0.07]">
        {rest.map((user, i) => (
          <div
            key={user.rank}
            className={cn(
              'flex items-center gap-4 px-5 py-3.5 transition-all',
              user.isMe ? 'bg-[rgba(0,230,118,0.05)]' : 'bg-[#18181B]',
              i < rest.length - 1 && 'border-b border-white/4',
            )}
          >
            <span className="w-7 text-center text-sm font-bold shrink-0 text-[#52525B]">
              {user.rank}
            </span>

            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-inner">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <DefaultUserIcon />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-sm font-bold truncate',
                  user.isMe ? 'text-[#00E676]' : 'text-white',
                )}
              >
                {user.name}
              </p>
              <p className="text-[11px] truncate text-[#52525B]">{user.league}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-black">
                {user.xp >= 1000 ? `${(user.xp / 1000).toFixed(1)}K` : user.xp}
              </p>
              <p className="text-[10px] text-[#52525B]">XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
