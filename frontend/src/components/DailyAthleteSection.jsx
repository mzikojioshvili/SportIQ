import DailyAthleteFact from '../components/DailyAthleteFact'

const DailyAthleteSection = () => {
    return (
        <section className="py-20 md:py-24">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-10">
                Daily Athlete Fact
            </h2>
            <DailyAthleteFact />
        </section>
    )
}

export default DailyAthleteSection