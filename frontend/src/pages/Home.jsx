import DailyAthleteSection from '@/components/DailyAthleteSection'
import Divider from '@/components/Divider'
import HeroSection from '@/components/HeroSection'
import HomeQuizSection from '@/components/HomeQuizSection'
import LiveScoresSection from '@/components/LiveScoresSection'
import PartnerStoresSection from '@/components/PartnerStoresSection'
import { fetchQuizzes, fetchHomeQuizzes } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchQuizzes())      
    dispatch(fetchHomeQuizzes())
  }, [dispatch])

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <HeroSection />
      <Divider />

      <HomeQuizSection />
      <Divider />

      <DailyAthleteSection />
      <Divider />

      <LiveScoresSection />
      <Divider />
      
      <PartnerStoresSection />
    </div>
  )
}

export default Home