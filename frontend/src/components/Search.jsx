import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {




  return (
    <div className='w-full min-w-[300px]  lg:min-w-[420px] h-10 rounded-lg border overflow-hidden flex bg-white items-center focus-within:border-primary-200'>
        <button className='flex justify-center items-center h-full p-3 text-neutral-500 focus-within:text-primary-200'>
            <IoSearch size={22} />

        </button>
  <div>

        <div >
           <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Search Candles',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Search Designable Candles',
        1000,
        'Search Candles for Gifts',
        1000,
        'Search Candles for Home decor',
        1000,
        'Search Candles For Diwali ',
        1000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
        </div>
  
  </div>
        
    </div>
  )
}

export default Search