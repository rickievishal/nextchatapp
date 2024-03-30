'use client';

import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import app from "./firebase/firbase";
import { addDoc, collection, getDoc, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const Page = () => {
  const db = getFirestore(app);
  const [chatroomname, setChatroomname] = useState("");
  const [link, setLink] = useState("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);

  const handleGenerate = async () => {
    if (chatroomname.trim() !== "") {
      const uuid = uuidv4();
      const data = {
        chatid: uuid,
        chatroomid: chatroomname
      };
      
      try {
        const docRef = await addDoc(collection(db, "chatrooms"), data);
        const docSnapshot = await getDoc(docRef);
        const chatData = docSnapshot.data();
        await addDoc(collection(db, "chatData"), { 
          chatId: chatData.chatid, 
          messages: [], 
          chatname: chatroomname 
        });
        const generatedLink = `https://visctoriasecret/chatrooms/${chatData.chatid}`;
        setLink(generatedLink);
        setIsLinkGenerated(true);
      } catch (error) {
        console.error("Error generating link:", error);
      }
    }
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col pt-[20px]">
      <div className="w-full h-full my-[30px] px-[30px] flex flex-col justify-start items-center">
        <p className="text-xl text-[rgb(197,197,197)] text-center mb-[70px]">Generate the link</p>

        <label htmlFor="chatroomname" className="text-gray-300 text-sm">Chatroom Name</label>
        <input
          type="text"
          id="chatroomname"
          className="w-[300px] bg-[rgb(30,30,30)] text-white outline-none px-3 py-1 rounded-md border border-[rgb(83,83,83)] mb-2 focus:border-blue-500"
          value={chatroomname}
          onChange={(e) => setChatroomname(e.target.value)}
        />
        <button className="text-sm bg-white text-black w-[90px] py-1 rounded-r-full rounded-l-full shadow-neutral-50 mt-[10px] mb-[30px] hover:bg-white active:scale-95 button" onClick={handleGenerate}>Generate</button>
        {
          isLinkGenerated && (
            <div className="w-[500px] bg-[rgb(21,21,21)] px-3 h-[60px] flex justify-start items-center border border-[rgb(33,33,33)] relative rounded-md">
              <button className="absolute right-2 rounded-full px-2 py-2 hover:bg-[rgb(48,48,48)] active:bg-[rgb(37,37,37)] duration-200 ease-in-out" onClick={handleCopyLink}><MdContentCopy className="text-gray-200" /></button>
              <p className="text-gray-400">{link}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Page;
