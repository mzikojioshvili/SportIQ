import { cn } from '@/lib/utils'

const PartnerStoreCard = ({ store }) => {
    return (
        <div className="flex flex-col overflow-hidden group transition-all duration-300 bg-[#18181B] border border-white/[0.07] rounded-xl hover:border-white/[0.14]">
            <div className="flex items-center gap-3.5 px-5 pt-5 pb-4">
                <div
                    className={cn(
                        'w-9 h-9 flex items-center justify-center shrink-0 text-base text-white',
                        'bg-white/6 border border-white/10 rounded-md',
                        store.markClassName,
                    )}
                >
                    {store.mark}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-white leading-none mb-1 truncate tracking-[-0.01em]">
                        {store.name}
                    </p>
                    <p className="text-[10px] font-semibold truncate text-[#3F3F46]">
                        {store.role}
                    </p>
                </div>
                <div className="shrink-0 text-[9px] font-black uppercase px-2 py-1 rounded-full bg-[rgba(0,230,118,0.08)] border border-[rgba(0,230,118,0.15)] text-[rgba(0,230,118,0.6)] tracking-[0.06em]">
                    ✓ Partner
                </div>
            </div>
            <div className="relative overflow-hidden mx-4 h-32.5 rounded-lg">
                <img
                    src={store.photo}
                    alt={`${store.name} store interior`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] grayscale brightness-[0.42] contrast-[1.25]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[rgba(24,24,27,0.7)] to-[#18181B]" />
                <div className="absolute inset-0 bg-linear-to-b from-[rgba(24,24,27,0.35)] to-transparent" />
            </div>
            <div className="mx-4 mt-4 mb-0 h-px bg-white/5" />
            <div className="px-5 pt-4 pb-5 flex flex-col gap-1.5">
                <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#3F3F46]">
                    {store.branchType}
                </p>
                <p className="text-sm font-semibold text-white leading-tight">
                    {store.address}
                </p>
                <p className="text-xs text-[#71717A]">
                    {store.district}
                </p>
                <button className="self-start mt-1.5 text-[10px] font-semibold transition-colors duration-200 text-white/20 hover:text-white/60">
                    View on Map →
                </button>
            </div>
        </div>
    )
}

export default PartnerStoreCard
