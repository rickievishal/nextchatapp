"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const Body = () => {

    const [pathname, setPathname] = useState("/chatroom");
    const [msg, setMsg] = useState('');

    return (
        <div className="w-full h-[50px] sm:h-[60px] absolute top-0 right-0 bg-[rgba(0,0,0,0)] backdrop-blur-md z-30 px-3 flex justify-start items-center ">
            <div className="w-full h-full z-40 relative flex flex-col items-start justify-center">
                <p className="text-[20pt] bg-gradient-to-b from-[rgb(241,241,241)] via-white to-stone-700 bg-clip-text text-transparent">Victoria's secret</p>
                <p className="text-gray-400 text-[8pt] hidden sm:block text-center">Create a link for your chatroom. Join chatrooms using the join now button</p>
            </div>
        </div>
    );
};

export default Body;
