"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import app from '../../firebase/firbase';

import { collection, doc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { RiCoinsLine } from 'react-icons/ri';
import { time } from 'console';
import Link from 'next/link';
import { match } from 'assert';
import { motion } from "framer-motion"
import { constrainedMemory } from 'process';
import { DiVim } from 'react-icons/di';
const generateUserId = () => {
    // Generate a random user ID (assuming it's unique)
    return Math.random().toString(36).substring(2, 10);
};
const page = ({ params }: any) => {
    const [chatData, setChatData] = useState<any[]>([]);
    const db = getFirestore(app)
    const containerRef = useRef<HTMLDivElement>(null);
    const [textfield, setTextfield] = useState("")
    const [chatname, setChatname] = useState("")
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
                        setChatname(data.data().chatname)
                    })
                })




            }
            catch (e) {
                console.log(e)
            }

        }
        fetchdata();



    }, [])


    const handleSendButton = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        if (textfield === "") {
            return;
        }
    
        console.log(params.chatroomId);
    
        const chatidcheckquery = query(collection(db, "chatData"), where("chatId", "==", `${params.chatroomId}`));
        const matcheddata = await getDocs(chatidcheckquery);
        console.log(matcheddata);
        if (!matcheddata.empty) {
            const docref = matcheddata.docs[0].ref;
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
    

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendButton(e)
        }
    };
    return (
        <div className='w-full h-full overflow-hidden rounded-md'  >

            {!isempty ?
                (<> <div className='w-full h-full overflow-auto relative' ref={containerRef} >


                    <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }} className='w-full min-h-full flex flex-col justify-start items-start px-[30px] pt-[60px] pb-[100px]  gap-y-1   text-white relative overflow-auto z-0' >

                        {

                            chatData.map((data) => {
                                if (data.userId == deviceFingerprint) {
                                    return (<motion.div initial={{ skew: 10, scale: 0.9, x: 50, y: 20, opacity: 0 }} animate={{ skew: 0, scale: 1, x: 0, y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }} key={data.time} className='w-full flex justify-end z-0'>
                                        <div className=' min-w-[50px]  max-w-[300px] bg-[#ff2b00] glow  text-white px-3 py-3 rounded-tl-[30px] rounded-t-[30px] rounded-bl-[30px]   flex justify-center items-center'>{data.message}</div>
                                    </motion.div>)
                                }
                                else {
                                    return (<motion.div key={data.time} initial={{ skew: 10, scale: 0.9, x: -50, y: 20, opacity: 0 }} animate={{ skew: 0, scale: 1, x: 0, y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }} className='w-full  flex justify-start'>
                                        <div className=' min-w-[50px]   max-w-[300px]  overflow-hidden  bg-[#000000]  text-white  glow  px-2 py-2 rounded-tr-[30px] rounded-t-[30px] rounded-br-[30px] border-[1px] flex justify-center items-center'>{data.message}</div>
                                    </motion.div>)
                                    // border-[rgb(219,219,219)]
                                }
                            }
                            )



                        }

                    </motion.div>

                </div>
                    <div className='w-full h-[100px] sticky z-50 bg-gradient-to-b from-transparent via-[rgb(10,10,10)] to-[rgb(10,10,10)] bottom-0'></div>
                    <div className='w-full h-[60px]   absolute z-50 bg-gradient-to-b from-[rgb(10,10,10)] via-[rgba(10,10,10,0.52)] to-transparent top-10 sm:top-0 flex justify-center items-start pt-5 text-gray-400'>{chatname}</div>



                    <form onSubmit={(e)=>handleSendButton}  className='w-full h-[50px] sticky bottom-5 left-0 z-50 px-[30px] flex justify-center items-center'>
                        <input
                            type="text"
                            placeholder='text here...'
                            className='w-full h-full border pl-[80px] border-[rgb(157,157,157)] outline-none bg-black pr-[50px] rounded-r-full rounded-l-full  glow text-[rgb(207,207,207)]'
                            onKeyPress={handleKeyPress}
                            value={textfield}
                            onChange={(e) => { setTextfield(e.target.value) }}
                        />
                        <button type='submit' className='w-[40px] justify-center items-center flex bg-[#ff2b00] hover:bg-[#ff5230] text-white absolute right-[35px] h-[40px] rounded-full glow'>
                            <IoSend />
                        </button>
                        <Link href={"/"} className='left-[35px] absolute h-[42px]'>
                            <button className='px-3  justify-center items-center flex bg-[#ff2b00] hover:bg-[#ff5230] text-white h-full rounded-full glow'>
                                Leave
                            </button>
                        </Link>
                    </form>
                </>) :
                (<><div>Invalide invite</div></>)
            }
        </div>
    )

}
export default page