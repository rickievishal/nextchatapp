"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import app from '../../firebase/firbase';

import { collection, doc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { RiCoinsLine } from 'react-icons/ri';
import { time } from 'console';
import Link from 'next/link';
import { match } from 'assert';
import { constrainedMemory } from 'process';
const generateUserId = () => {
    // Generate a random user ID (assuming it's unique)
    return Math.random().toString(36).substring(2, 10);
};
const page = ({ params }: any) => {
    const [chatData, setChatData] = useState<any[]>([]);
    const db = getFirestore(app)
    const containerRef = useRef<HTMLDivElement>(null);
    const [textfield, setTextfield] = useState("")

    const [isempty, setIsempty] = useState(false)

    function generateDeviceFingerprint(): string {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
            // Collect properties for the device fingerprint
            const userAgent = navigator.userAgent;
            const language = navigator.language;
            const platform = navigator.platform;
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const colorDepth = window.screen.colorDepth;

            // Combine properties into a single string
            const fingerprint = `${userAgent}${language}${platform}${screenWidth}${screenHeight}${colorDepth}`;

            // Hash the fingerprint to ensure consistent length and prevent direct identification


            return fingerprint;
        } else {
            // Handle the case where window or navigator is not defined (for server-side rendering)
            return 'unknown';
        }
    }

    // Function to hash a string using a simple hashing algorithm

    useEffect(() => {
        // Scroll to bottom when chatData changes
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollHeight = container.scrollHeight;
            const currentScroll = container.scrollTop;
            const targetScroll = scrollHeight - container.clientHeight;
            const distance = targetScroll - currentScroll;
            const duration = 500; // Adjust the duration as needed
    
            let startTime: number | null = null;
    
            const easeInOutQuad = (t: number) => {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };
    
            const scrollStep = (timestamp: number) => {
                if (!startTime) {
                    startTime = timestamp;
                }
    
                const elapsedTime = timestamp - startTime;
                const scrollAmount = distance * easeInOutQuad(Math.min(elapsedTime / duration, 1));
    
                container.scrollTop = currentScroll + scrollAmount;
    
                if (elapsedTime < duration) {
                    requestAnimationFrame(scrollStep);
                } else {
                    container.scrollTop = targetScroll;
                }
            };
    
            requestAnimationFrame(scrollStep);
        }
    }, [chatData]);
    
    // Example usage
    const deviceFingerprint = generateDeviceFingerprint();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const checkchatidQuery = query(collection(db, "chatrooms"), where("chatid", "==", `${params.chatroomId}`));
                const fetchchatdataQuery = query(collection(db, "chatData"), where("chatId", "==", `${params.chatroomId}`))
                const chatrooms = await getDocs(checkchatidQuery);
                // const messages = await getDocs(fetchchatdataQuery);
                const unsubscribe = onSnapshot(fetchchatdataQuery, (data) => {
                    data.forEach((data) => {

                        setChatData(data.data().messages);

                    })
                })




            }
            catch (e) {
                console.log(e)
            }

        }
        fetchdata();



    }, [])


    const handleSendButton = async () => {
    if (textfield === "") {
        return;
    }

    console.log(params.chatroomId);

    const chatidcheckquery = query(collection(db, "chatData"), where("chatId", "==", `${params.chatroomId}`));
    const matcheddata = await getDocs(chatidcheckquery);
    console.log(matcheddata);
    if (!matcheddata.empty) {
        const  docref = matcheddata.docs[0].ref;
        const messages = {
            message: textfield,
            time: Date.now(),
            userId: deviceFingerprint
        };
        setIsempty(false)
        console.log(isempty)
        try {
            await updateDoc(docref, { messages: [...chatData, messages] });
            console.log("message sent");
        } catch (e) {
            console.log(e);
        }
    }
    else {
        setIsempty(true)
    }
    
    setTextfield("");
};


    return (
        <div className='w-full h-full overflow-hidden rounded-md'  >

           { !isempty ?
                 (<> <div className='w-full h-full overflow-auto relative' ref={containerRef} >
                <div className='w-full min-h-full flex flex-col justify-start items-start px-[30px] pt-[60px] pb-[80px] sm:pt-[60px] sm:pb-[80px] gap-y-1  z-40 text-white relative overflow-auto' >

                    {
                        chatData.map((data) => {
                            if (data.userId == deviceFingerprint) {
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
            <div className='w-full h-[50px]  fixed sm:sticky bottom-5 left-0 z-50 px-[30px]  flex justify-center items-center'>
                <input type="text" placeholder='text here...' className='w-full h-full border pl-[80px] border-[rgb(157,157,157)] outline-none bg-black  pr-[50px]  rounded-r-full rounded-l-full relative glow text-[rgb(207,207,207)]' value={textfield} onChange={(e) => { setTextfield(e.target.value) }} />
                <button className='w-[40px] justify-center items-center flex bg-[#ff2b00] hover:bg-[#ff5230] text-white  absolute right-[35px] h-[40px] rounded-full glow' onClick={handleSendButton} ><IoSend /></button>
                <Link href={"/"} className='left-[35px] absolute h-[40px]'><button className='px-3 justify-center items-center flex bg-[#ff2b00] hover:bg-[#ff5230] text-white h-[40px] rounded-full glow' onClick={handleSendButton} >Leave</button></Link>
            </div></>) :
            (<><div>Invalide invite</div></>)
           }
        </div>
    )

}
export default page