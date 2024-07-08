"use client"

import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from '../../firebase/firbase';
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/react"
import { GoLock } from 'react-icons/go';
import { IoCloseSharp } from "react-icons/io5";
import Link from 'next/link'
import Image from 'next/image';
type ChatroomData = {
    chatroomid: string;
    chatid: string;
    // Add other properties of the chatroom object as needed
};
const page = () => {

    const [data, setdata] = useState<ChatroomData[]>([])
    const [ischatroomclicked, setIschatroomclicked] = useState(false)

    useEffect(() => {
        const getchatrooms = async () => {
            const db = getFirestore(app)
            const getchatroomsquery = query(collection(db, "chatrooms"))
            const chatroomlist = await getDocs(getchatroomsquery)
            const data: ChatroomData[] = []
            chatroomlist.forEach((doc) => data.push(doc.data() as ChatroomData))

            setdata(data)
        }
        getchatrooms()
    }, [])


    return (
        <>
            <div className='w-full col-span-1 hidden lg:block flex justify-center items-center '>
                <p className='text-4xl flex flex-col gap-3 items-start'>
                <span>Wear a <span className='bg-[#B60071]'>mask.</span> and</span>

                <span>dont be a <span className='bg-[#EB5B00]'> menace.</span></span>
                
                <span className='bg-[#E4003A]'>peace✌️</span>
                </p>
            </div>
            <div className='w-full h-screen relative pt-[100px] lg:pb-2 col-span-1 lg-pr-[50px]' >
                {
                    ischatroomclicked && (<div className='absolute top-0 right-0 z-40 w-full h-full opacity-50 backdrop-blur-md flex justify-center items-center'>
                        <div className='relative w-[500px] h-[600px] bg-[#160d08] border-[#F2613F] border rounded-lg flex flex-col justify-start items-center'>
                            <IoCloseSharp className='text-[#F2613F] text-4xl absolute top-3 right-3' onClick={() => {
                                setIschatroomclicked(false)
                            }} />
                            <p className='pt-[100px] w-[150px] text-center leading-tight'>You know what I want. The password. Now!!</p>
                            <input className='mt-2 w-[150px]  border-[#F2613F] border text-[#F2613F] active:outline-none focus:outline-none px-3' type="password" />
                            <Image className='absolute bottom-0' src={`/frog.png`} alt={""} width="400" height="400" />
                            <Button className='px-2 py-1 mt-1 z-30 border-[#F2613F] border rounded-md hover:bg-[#F2613F] hover:text-[#160d08]'>Enter</Button>
                        </div>
                    </div>)
                }

                <div className='max-w-7xl h-full mx-auto bg-[#0C0C0C] border-[#9B3922] border rounded-lg  relative chatroom overflow-hidden'>
                    <div className='w-full h-[50px] text-[#F2613F] bg-[#481E14] flex flex-row justify-between items-center px-3 sticky top-0 right-0'>
                        <p className="">ChatRooms</p>
                        <Tooltip content="The stats are live" className='bg-[#0C0C0C] text-[#ef7154] border border-[#ef7154] px-2 text-sm rounded-lg overflow-hidden mb-1'>
                            <p className='px-5 text-sm rounded-md  bg-[#F2613F] text-black'>Live</p>
                        </Tooltip>
                    </div>
                    <div className='w-full h-full overflow-hidden flex flex-col '>
                        <div className='h-auto overflow-y-auto my-3 selection:bg-[#0C0C0C]'>
                            {
                                data.map((data) => (

                                    <div className='w-full group hover:bg-[#F2613F] flex justify-between items-center cursor-pointer px-4' onClick={() => {
                                    }}>
                                        <div className='w-full  px-4 group-hover:text-[#0C0C0C] text-[#F2613F] py-2'>{data.chatroomid}</div>
                                        <div className='events-buttons'>
                                            <Link href={"https://victoriasecret.vercel.app/chatroom/" + data.chatid}>
                                                <Tooltip content="Get in??" className='bg-[#0C0C0C] text-[#ef7154] border border-[#ef7154] px-2 text-sm rounded-lg overflow-hidden mb-2'>
                                                    <button className='hover:underline group-hover:text-[#0C0C0C] text-[#ef7154]'>Join</button>
                                                </Tooltip>
                                            </Link>

                                        </div>
                                        <div className='text-[#ef7154] ml-4'>
                                            <Tooltip content="protected mfers" className='bg-[#0C0C0C] text-[#ef7154] border border-[#ef7154] px-2 text-sm rounded-lg overflow-hidden mb-2'>
                                                <button className='text-xl group-hover:text-[#0C0C0C]' >
                                                    <GoLock />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page