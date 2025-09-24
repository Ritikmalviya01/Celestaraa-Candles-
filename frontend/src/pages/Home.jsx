import React from 'react'
import HeroBanner from '../components/HeroBaner'
import Features from '../components/Features'
import LandingPageCardsSection from '../components/LandingPageCardsSection'

const Home = () => {
  return (
    <div className='  '>
      <HeroBanner />
      <LandingPageCardsSection/>
      <Features />
    </div>
  )
}

export default Home