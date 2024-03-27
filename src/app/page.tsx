'use client'

import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";


const page = () => {
  const [iscopied, setIscopied] = useState(false)
  return (
    <>
      <div className="w-full h-full flex flex-col ">
        <div className="w-full my-[30px] px-[30px] flex flex-col justify-center items-center">
          <p className="text-xl text-[rgb(197,197,197)] text-center ">Generate the link</p>
          <button className="text-sm bg-white text-black w-[90px] py-1 rounded-r-full rounded-l-full shadow-neutral-50 my-[20px] hover:bg-white active:scale-95 button">Generate</button>
          {
            1 && (<><div className="w-[500px] bg-[rgb(21,21,21)] px-3 h-[40px] flex justify-start items-center border border-[rgb(33,33,33)] relative rounded-md">
              <button className="absolute right-2 rounded-full px-2 py-2 hover:bg-[rgb(48,48,48)] active:bg-[rgb(37,37,37)] duration-200 ease-in-out"><MdContentCopy className="text-gray-200" /></button><p className="text-gray-400 ">https://victoriasecret/chatrooms/id</p></div></>)

          }
        </div> 
      </div>
    </>
  );
};

export default page;
