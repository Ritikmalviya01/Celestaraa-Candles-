import React from 'react'
import HeroBanner from '../components/HeroBaner'
import Features from '../components/Features'
import LandingPageCardsSection from '../components/LandingPageCardsSection'
import TestimonialCarousel from '../components/TestimonialCarousel'

const Home = () => {
  return (
    <div className='bg-bg  '>
      <HeroBanner />
      <LandingPageCardsSection/>
      <Features />
      <TestimonialCarousel />
    </div>
  )
}

export default Home