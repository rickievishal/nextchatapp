"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { GiRadarDish } from "react-icons/gi";

const Body = () => {

    const [pathname, setPathname] = useState("/chatroom");
    const [msg, setMsg] = useState('');

    return (
        <div className="w-full h-[100px] sm:h-[90px] absolute top-0 right-0 bg-[rgba(0,0,0,0)] backdrop-blur-md z-30 px-3 flex justify-start items-center ">
            <div className="w-full h-full z-40 relative flex items-start justify-between sm:justify-center lg:justify-between " >
                <div className='h-full flex flex-col justify-center gap-1'>
                <Link href={"https://victoriasecret.vercel.app/"}>
                <p className="text-[20pt] bg-gradient-to-b from-[rgb(241,241,241)] via-white to-stone-700 bg-clip-text text-transparent flex flex-col lg:flex lg:flex-row justify-start items-center" onClick={() => {
                    window.history.back()
                }}><span>Victoria's secret</span> <span className='py-1 text-center w-[180px] h-[25px] text-xs bg-[#dc5131] text-gray-300 rounded-lg ml-3'>anonymous chatroom.</span></p></Link>
                <p className="text-gray-400 text-[8pt] max-w-2xl text-center hidden sm:block">Create a link for your chatroom. Join chatrooms using the join now button</p>
                </div>
                <div className='h-full flex  justify-center items-center gap-2 hidden lg:block lg:flex'>
                <Link href={"https://victoriasecret.vercel.app/chatroom/chatroomlist"}>
                    <Button className='bg-[#d44525] hover:bg-[#d7583c] px-2 py-3 text-gray-200 text-sm flex '>
                        ChatroomRadar<span className='text-lg'><GiRadarDish /></span>
                    </Button></Link>
                    <Link href={"https://victoriasecret.vercel.app/"}>
                    <Button className='bg-[#EEF7FF] hover:bg-[#dadfe4] px-2 py-3 text-[#d44525] text-sm'>
                        Create Room
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Body;
