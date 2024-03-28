"use client"
import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import app from '../../firebase/firbase';

import { collection, doc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { RiCoinsLine } from 'react-icons/ri';
import { time } from 'console';
const generateUserId = () => {
    // Generate a random user ID (assuming it's unique)
    return Math.random().toString(36).substring(2, 10);
  };
const page = ({ params }:any) => {
    const [chatData, setChatData] = useState<any[]>([]);
    
    const db = getFirestore(app)
    
    const userId = generateUserId()
    const [textfield, setTextfield] = useState("")

    
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const checkchatidQuery = query(collection(db, "chatrooms"), where("chatid", "==", `${params.chatroomId}`));
                const fetchchatdataQuery = query(collection(db, "chatData"), where("chatId", "==", `${params.chatroomId}`))
                const chatrooms = await getDocs(checkchatidQuery);
                // const messages = await getDocs(fetchchatdataQuery);
                const unsubscribe = onSnapshot(fetchchatdataQuery, (data) => {
                    data.forEach((data) => {
                        console.log(data.data())
                        setChatData(data.data().messages);
                        console.log(chatData)
                    })
                })


                chatrooms.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    console.log("ehe")
                });

            }
            catch (e) {
                console.log(e)
            }

        }
        fetchdata();

      

    }, [])


    const handleSendButton = async () => {
        if (textfield === "")
            return

        const target = doc(collection(db, "chatData"), params.chatroomId)
        const messages = {
            message: textfield,
            time: Date.now(),
            userId: userId
        }
        try {
            await updateDoc(target, { messages: [...chatData, messages] })
        }
        catch (e) {
            console.log(e)
        }
        setTextfield("")
    }
    console.log(chatData)///this is printing the data in the array 
    return (
        <div className='w-full h-full overflow-hidden rounded-md'>
            <div className='w-full h-full relative overflow-y-scroll
    '>
                <div className='w-full min-h-full flex flex-col justify-start items-start px-[30px] pt-[30px] pb-[80px] gap-y-1  z-40 text-white relative overflow-auto'>

                    {
                        chatData.map((data) => {
                            if (data.userId  == userId) {
                                return (<div key={data.time} className='w-full flex justify-end'>
                                    <div className='h-[50px] min-w-[60px] bg-[#ff2b00] glow  text-white px-2 py-2 rounded-l-full rounded-t-full  flex justify-center items-center'>{data.message}</div>
                                </div>)
                            }
                            else {
                                return (<div key={data.time} className='w-full  flex justify-start'>
                                    <div className='h-[50px] min-w-[60px] overflow-hidden  bg-black  text-white border-[rgb(219,219,219)] glow  px-2 py-2 rounded-r-full rounded-t-full border-[1px] flex justify-center items-center'>{data.message}</div>
                                </div>)
                            }
                        })
                    }
                </div>

            </div>
            <div className='w-full h-[50px]  sticky bottom-5 left-0 z-50 px-[30px]  flex justify-center items-center'>
                <input type="text" placeholder='text here...' className='w-full h-full border border-[rgb(157,157,157)] outline-none bg-black px-[10px]  rounded-r-full rounded-l-full relative glow text-[rgb(207,207,207)]' value={textfield} onChange={(e) => { setTextfield(e.target.value) }} />
                <button className='w-[40px] justify-center items-center flex bg-[#ff2b00] hover:bg-[#ff5230] text-white  absolute right-[35px] h-[40px] rounded-full glow' onClick={handleSendButton} ><IoSend /></button>
            </div>
        </div>
    )
}

export default page