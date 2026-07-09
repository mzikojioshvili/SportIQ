import PartnerStoreCard from '../components/PartnerStoreCard'
import images from "../assets/images.js"

const PARTNER_STORES = [
    {
        id: "nike", mark: "N", markClassName: "font-black tracking-[0.02em]", name: "Nike",
        role: "Official Performance Partner",
        photo: images.nike,
        branchType: "Flagship Store", address: "Rustaveli Ave 33", district: "Tbilisi, Georgia",
    },
    {
        id: "adidas", mark: "a", markClassName: "font-bold tracking-[-0.02em] italic", name: "adidas",
        role: "Official Apparel Supplier",
        photo: images.adidas,
        branchType: "Flagship Store", address: "Chavchavadze Ave 14", district: "Tbilisi, Georgia",
    },
    {
        id: "puma", mark: "P", markClassName: "font-black italic tracking-[0.02em]", name: "PUMA",
        role: "Official Footwear Partner",
        photo: images.puma,
        branchType: "Galleria Mall Branch", address: "Rustaveli Ave 2", district: "Tbilisi, Georgia",
    },
    {
        id: "fanatics", mark: "F", markClassName: "font-bold tracking-[0.01em]", name: "Fanatics",
        role: "Official Merchandise Partner",
        photo: images.fanatics,
        branchType: "Premium Outlet", address: "Saburtalo District", district: "Tbilisi, Georgia",
    },
]

const PartnerStoresSection = () => {
    return (
        <section className="py-16 md:py-20">
            <p className="text-[10px] font-black uppercase mb-8 tracking-[0.18em] text-[#3F3F46]">
                Our Official Rewards Partners
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PARTNER_STORES.map((store) => (
                    <PartnerStoreCard key={store.id} store={store} />
                ))}
            </div>
        </section>
    )
}

export default PartnerStoresSection