"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Chatroom = () => {
  const [roomId, setRoomId] = useState("")
  const handlejoin = () =>{
    
  }
  return (
    <div className='w-full h-full flex flex-col justify-start items-center py-[100px] '>
      <div><p className='font-thin'>Enter room id</p></div>
      <input type="text" className='text-sm bg-[rgb(0,0,0)] border-[1px] border-[rgb(167,167,167)] outline-none px-2 w-[200px] h-[30px] rounded-md mt-3' value={roomId} onChange={(e) => {
        setRoomId(e.target.value)
      }} />
      <Link href={"/chatroom/"+roomId}>
        <button className="w-[70px] py-1 bg-[#E72929] hover:bg-[#ff5d5d]  rounded-lg text-sm duration-200 ease-in-out mt-3" onClick={handlejoin}>Join</button></Link>
    </div>
  )
}

export default Chatroom