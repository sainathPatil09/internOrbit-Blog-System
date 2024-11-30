import React from 'react'
import Hero from '../Home/Hero'
import Trending from '../Home/Trending'
import Devotional from '../Home/Devotional'
import Creator from '../Home/Creator'

const Home = () => {
  return (
    <div className='bg-blue-50'>
      <div className="h-1 bg-blue-500"></div>
      <Hero/>
      <Trending/>
      <Devotional/>
      <Creator/>
    </div>
  )
}

export default Home
