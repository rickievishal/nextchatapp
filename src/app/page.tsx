'use client';

import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import app from "./firebase/firbase";
import { addDoc, collection, getDoc, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { constrainedMemory } from "process";

const Page = () => {
  const db = getFirestore(app);
  const [chatroomname, setChatroomname] = useState("");
  const [link, setLink] = useState("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const [chatroompass, setChatroompass] = useState("")
  const handleGenerate = async () => {
    if (chatroomname.trim() !== "" || chatroompass.trim() !== "") {
      const uuid = uuidv4();
      try {
        const messagedata = await addDoc(collection(db, "chatData"), {
          chatId: uuid,
          messages: [],
          chatname: chatroomname
        });
        const data = {
          chatid: uuid,
          chatroomid: chatroomname
        };
        const chatroomkey = await addDoc(collection(db, "passwords"), {
          chatId: uuid,
          password : chatroompass,
          chatname: chatroomname
        });
      
        const docRef = await addDoc(collection(db, "chatrooms"), data);
        const generatedLink = `https://anonymous-vishal.vercel.app/chatroom/${uuid}`;
        setLink(generatedLink);
        console.log(generatedLink)
        setIsLinkGenerated(true);
        setChatroomname("");
        setChatroompass("");
        console.log("created")

      } catch (error) {
        console.error("Error generating link:", error);
      }
    }
  };
  const handleCopyLink = async () => {
    try {
      // Check if the Clipboard API is supported
      if (navigator.clipboard) {
        // Use the Clipboard API to copy the text
        await navigator.clipboard.writeText(link);
        console.log("Text copied to clipboard:", link);
        alert("Text copied to clipboard!");
      } else {
        // Fallback mechanism for browsers that do not support the Clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = link;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        console.log("Text copied to clipboard:", link);
        alert("Text copied to clipboard!");
      }
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
      alert("Error copying text to clipboard!");
    }
  };

  return (
    <div className="w-full h-full flex flex-col  ">
      <div className="w-full h-full mt-[220px]  sm:my-[300px] flex flex-col justify-start items-center ">
        <p className="text-2xl text-[rgb(197,197,197)] text-center mb-[70px]">Generate the link</p>


        <label htmlFor="chatroomname" className="text-gray-300 text-sm">Chatroom Name</label>
        <input

          type="text"
          id="chatroomname"
          className="w-[300px] bg-[rgb(30,30,30)] text-white outline-none px-3 py-1 rounded-md border border-[rgb(83,83,83)] mb-2 focus:border-blue-500 mt-2"
          value={chatroomname}
          onChange={(e) => setChatroomname(e.target.value)}
        />
        <label htmlFor="chatroompass" className="text-gray-300 text-sm">Chatroom password</label>
        <input
          type="text"
          id="chatroompass"
          className="w-[300px] bg-[rgb(30,30,30)] text-white outline-none px-3 py-1 rounded-md border border-[rgb(83,83,83)] mb-2 focus:border-blue-500 mt-2"
          value={chatroompass}
          onChange={(e) => setChatroompass(e.target.value)}
        />
        <div className="w-full flex justify-center items-center"> <button className="text-sm bg-white text-black w-[90px] py-1 rounded-r-full rounded-l-full shadow-neutral-50 mt-[10px] mb-[30px] hover:bg-white active:scale-95 button" type="submit" onClick={handleGenerate}>Generate</button></div>

        {
          isLinkGenerated && (
            <div className="bg-[rgb(21,21,21)] mx-4 py-2 px-2 sm:h-[60px] flex justify-start items-center border border-[rgb(33,33,33)] relative rounded-md ">
              <button className="absolute right-2 px-2 py-2 rounded-full hover:bg-[rgb(48,48,48)] active:bg-[rgb(37,37,37)] duration-200 ease-in-out" onClick={handleCopyLink}><MdContentCopy className="text-gray-200" /></button>
              <p className=" text-gray-400 pr-[30px]">{`${link}`}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Page;
