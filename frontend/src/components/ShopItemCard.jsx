import { cn } from '@/lib/utils'

const ShopItemCard = ({ item, userPoints, onRedeem }) => {
    const canAfford = userPoints >= item.points

    return (
        <div className="flex flex-col overflow-hidden group transition-all duration-300 bg-[#18181B] border border-white/[0.07] rounded-2xl hover:border-white/[0.14]">

            <div className="relative overflow-hidden shrink-0 h-57.5">
                <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05] brightness-[0.82] contrast-[1.12] saturate-[1.08]"
                />
                <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-[rgba(24,24,27,0.65)] to-[#18181B]" />

                {item.tag && (
                    <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/55 text-white/55 backdrop-blur-sm border border-white/10">
                        {item.tag}
                    </span>
                )}

                <div
                    className={cn(
                        'absolute top-3 right-3 text-xs font-black tabular-nums px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-xl tracking-wide',
                        canAfford
                            ? 'bg-[#FFD600] text-black border-[#FFE66D] shadow-[#FFD600]/40'
                            : 'bg-zinc-800/90 text-zinc-500 border-zinc-700',
                    )}
                >
                    {item.points.toLocaleString()} PTS
                </div>
            </div>

            <div className="px-4 pt-3.5 pb-4 flex flex-col gap-3">
                <h3 className="font-black text-sm leading-tight text-white tracking-[-0.01em]">
                    {item.title}
                </h3>
                <button
                    onClick={canAfford ? onRedeem : undefined}
                    className={cn(
                        'w-full py-2.5 rounded-full text-xs font-bold transition-all active:scale-[0.97]',
                        canAfford
                            ? 'bg-white text-black cursor-pointer'
                            : 'bg-white/4 text-[#3F3F46] border border-white/[0.07] cursor-not-allowed',
                    )}
                >
                    {canAfford ? 'Redeem →' : 'Insufficient Points'}
                </button>
            </div>
        </div>
    )
}

export default ShopItemCard
