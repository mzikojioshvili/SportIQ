import React from 'react'
import { motion } from 'framer-motion'
import DriverStripe from './DriverStripe'
import { cn } from '@/lib/utils'
import teamLogos from "../assets/teamLogos"

const matches = [
  {
    id: 'ucl',
    type: 'match',
    sport: 'Football',
    competition: 'UEFA Champions League',
    teamA: 'Real Madrid',
    teamB: 'Bayern',
    scoreA: 2,
    scoreB: 1,
    time: "82'",
    logoA: teamLogos.realMadrid,
    logoB: teamLogos.bayernMunich,
  },
  {
    id: 'monaco',
    type: 'race',
    sport: 'Formula 1',
    competition: 'Monaco Grand Prix',
    time: 'LAP 42 / 57',
    drivers: [
      { pos: 'P1', code: 'LEC', surname: 'LECLERC', gap: 'LEADER', teamColor: '#E8002D' },
      { pos: 'P2', code: 'VER', surname: 'VERSTAPPEN', gap: '+0.847s', teamColor: '#3671C6' },
      { pos: 'P3', code: 'NOR', surname: 'NORRIS', gap: '+2.241s', teamColor: '#FF8000' },
    ],
  },
  {
    id: 'nba',
    type: 'match',
    sport: 'Basketball',
    competition: 'NBA Playoffs · Game 5',
    teamA: 'LA Lakers',
    teamB: 'Celtics',
    scoreA: 98,
    scoreB: 94,
    time: 'Q4  2:14',
    logoA: teamLogos.laLakers,
    logoB: teamLogos.bostonCeltics,
  },
]

const LiveScores = () => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
          Live Scores &amp; Matches
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#E50914] animate-[pulse_1.2s_cubic-bezier(.4,0,.6,1)_infinite]" />
          <span className="text-xs font-semibold text-[#52525B]">
            3 Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: i * 0.08 }}
            className="flex flex-col bg-black border border-[#18181B] rounded-[20px]"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#18181B]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#52525B]">
                  {match.sport}
                </p>
                <p className="text-[11px] font-medium mt-0.5 text-[#3F3F46]">
                  {match.competition}
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0 bg-[rgba(229,9,20,0.1)] border border-[rgba(229,9,20,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-[pulse_1.1s_cubic-bezier(.4,0,.6,1)_infinite]" />
                <span className="text-[10px] font-black tabular-nums text-[#E50914]">
                  {match.time}
                </span>
              </div>
            </div>

            <div className="px-5 py-5 flex-1 flex flex-col justify-center">
              {match.type === 'match' && match.logoA && match.logoB ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img src={match.logoA} alt={match.teamA} className="w-8.5 h-8.5 object-contain shrink-0" />
                    <span className="font-black text-sm uppercase tracking-wide flex-1 min-w-0 truncate">
                      {match.teamA}
                    </span>
                    <span className="text-3xl font-black tabular-nums shrink-0 leading-none tracking-[-0.03em]">
                      {match.scoreA}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8.5 shrink-0" />
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] font-bold shrink-0 text-[#3F3F46]">vs</span>
                    <div className="flex-1 h-px bg-white/5" />
                    <div className="w-8 shrink-0" />
                  </div>

                  <div className="flex items-center gap-3">
                    <img src={match.logoB} alt={match.teamB} className="w-8.5 h-8.5 object-contain shrink-0" />
                    <span className="font-black text-sm uppercase tracking-wide flex-1 min-w-0 truncate">
                      {match.teamB}
                    </span>
                    <span className="text-3xl font-black tabular-nums shrink-0 leading-none tracking-[-0.03em] text-white/45">
                      {match.scoreB}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {match.drivers?.map((d) => (
                    <div key={d.pos} className="flex items-center gap-3">
                      <span className="text-[10px] font-black tabular-nums w-5 shrink-0 text-[#52525B]">
                        {d.pos}
                      </span>

                      <DriverStripe color={d.teamColor} />

                      <div className="flex-1 min-w-0">
                        <span
                          className="text-xs font-black tracking-widest text-(--team-color)"
                          style={{ '--team-color': d.teamColor }}
                        >
                          {d.code}
                        </span>
                        <span className="text-xs font-semibold ml-1.5 text-white/55">
                          {d.surname}
                        </span>
                      </div>

                      <span
                        className={cn(
                          'text-xs tabular-nums font-semibold shrink-0',
                          d.gap === 'LEADER' ? 'text-[#00E676]' : 'text-[#52525B]',
                        )}
                      >
                        {d.gap}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LiveScores