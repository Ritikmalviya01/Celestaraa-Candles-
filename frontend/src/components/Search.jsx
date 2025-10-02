import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {

const navigate= useNavigate()
const location = useLocation()
const [isSearchPage , setIsSearchPage] = useState(false)

useEffect(() => {
const isSearch = location.pathname === "/search-candles"
setIsSearchPage(isSearch)
},[location])

const redirecttoSearchPage = () => {
navigate('/search-candles')
}


  return (
    <div className='w-full min-w-[300px]  lg:min-w-[420px] h-10 rounded-lg border overflow-hidden flex bg-white items-center focus-within:border-primary'>
        <button className='flex justify-center items-center h-full p-3 text-neutral-500 focus-within:text-primary'>
            <IoSearch size={22} />

        </button>
   <div>
{
    !isSearchPage ? (
        <div onClick={redirecttoSearchPage}>
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
    ) : (
        <div>
            <input type="text"
            placeholder='Search for candles' 
            autoFocus
            className='outline-none h-full w-full'/>
        </div>
    )

    
}
  </div>
        
    </div>
  )
}
export default Search