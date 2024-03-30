"use client"
import LottiePlayer from '@lottiefiles/lottie-player';
import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[10px] h-[10px] rounded-full border-t border-r border-[10px] border-t-orange-600 animate-spin'></div>
    </div>

    </div>
  )
}

export default loading