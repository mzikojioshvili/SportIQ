import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { fetchProfile, redeemPrize } from '../store/store'
import ShopItemCard from '@/components/ShopItemCard'
import RedeemDialog from '@/components/RedeemDialog'
import { cn } from '@/lib/utils'
import images from '@/assets/images'


const SHOP_ITEMS = [
  {
    id: 'football-jersey',
    title: 'Official Football Jersey',
    photo: images.footballJersey,
    points: 500,
    tag: 'Most Popular',
  },
  {
    id: 'f1-cap',
    title: 'Formula 1 Racing Cap',
    photo: images.f1Cap,
    points: 250,
    tag: 'Best Value',
  },
  {
    id: 'f1-jerseys',
    title: 'Driver Edition F1 Jerseys',
    photo: images.f1Jerseys,
    points: 600,
    tag: 'Limited',
  },
  {
    id: 'basketball-jersey',
    title: 'Classic Basketball Jersey',
    photo: images.basketballJersey,
    points: 450,
    tag: null,
  },
]

export default function Profile() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);

  const [selectedItem, setSelectedItem] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openRedeemDialog = (item) => {
    setSelectedItem(item)
    setDialogOpen(true)
  }

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])

  const handleRedeemItem = async (item, formData) => {
    try {
      await dispatch(
        redeemPrize({
          itemId: item.id,
          pointsCost: item.points,
          title: item.title,
          photo: item.photo,

          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
        })
      ).unwrap()

      toast.success(`Successfully redeemed: ${item.title}!`)

      setDialogOpen(false)
    } catch (err) {
      toast.error(err || "Failed to redeem reward")
    }
  }

  const statCards = [
    { label: 'Total Points', value: user.points, unit: 'pts', gold: true },
    { label: 'Quizzes Completed', value: user.quizzesCompleted, unit: 'quizzes', gold: false },
    { label: 'Day Streak', value: String(user.streak), unit: 'days', gold: false },
    { label: 'Prizes Claimed', value: String(user.claimedPrizes.length), unit: 'prizes', gold: false },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">

      <section className="pt-6 pb-16 md:pb-20">
        <div className="flex items-start justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white mb-2">
              {user.firstName || 'Alex'} {user.lastName || 'Johnson'}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={cn(
                'px-5 py-5 rounded-2xl flex flex-col gap-1 bg-[#18181B] border',
                s.gold ? 'border-[rgba(255,214,0,0.2)]' : 'border-white/[0.07]',
              )}
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-[#52525B]">
                {s.label}
              </p>
              <p
                className={cn(
                  'font-black leading-none text-[2rem] tracking-[-0.03em]',
                  s.gold ? 'text-[#FFD600]' : 'text-white',
                )}
              >
                {s.value}
              </p>
              <p className="text-xs mt-0.5 text-[#3F3F46]">{s.unit}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-px bg-white/6" />

      <section className="py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
          My Earned Prizes
        </h2>

        {user.claimedPrizes.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {user.claimedPrizes.map((prize, i) => (
              <motion.div
                key={prize.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.09 }}
                className="shrink-0 overflow-hidden w-70 bg-[#18181B] border border-white/[0.07] rounded-2xl"
              >
                <div className="relative overflow-hidden h-42">
                  <img
                    src={prize.photo}
                    alt={prize.name}
                    className="w-full h-full object-cover brightness-[0.78] contrast-[1.1] saturate-[1.05]"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_40%,rgba(24,24,27,0.75)_80%,#18181B_100%)]" />
                  <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/55 text-white/50 backdrop-blur-sm border border-white/10">
                    {prize.category}
                  </span>
                </div>

                <div className="px-4 pt-3 pb-4">
                  <p className="font-black text-sm leading-tight text-white mb-3">{prize.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[rgba(0,230,118,0.1)] text-[#00E676] border border-[rgba(0,230,118,0.2)]">
                      ✓ Claimed
                    </span>
                    <span className="text-[10px] text-[#52525B]">{prize.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center rounded-2xl bg-[#18181B] border border-white/5">
            <p className="text-sm text-[#71717A]">You haven't claimed any rewards yet. Play quizzes to earn points!</p>
          </div>
        )}
      </section>

      <div className="h-px bg-white/6" />

      <section className="py-16 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Exchange Points for Rewards
          </h2>
          <p className="text-sm text-[#52525B]">
            Your balance:{' '}
            <span className="text-[#FFD600] font-extrabold">
              {user.points.toLocaleString()} pts
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SHOP_ITEMS.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              userPoints={user.points}
              onRedeem={() => openRedeemDialog(item)}
            />
          ))}
        </div>

        <RedeemDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          item={selectedItem}
          onSubmit={handleRedeemItem}
        />
      </section>
    </div>
  )
}
