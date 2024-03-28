
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Headerdiv from "./Headerdiv";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Victoria'sceret",
  description: "A dynamic chatroom built on nextjs and firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body className="w-screen h-screen flex flex-col items-center relative bg-black 
     ">
        <Headerdiv></Headerdiv>

        <div className=" w-full lg:w-[800px] h-full flex flex-col justify-center items-center relative z-20  sm:pt-0"

        >
          
          {/* <div className="w-full h-[90px] fixed top-0 bg-black flex flex-col justify-center items-center sm:hidden z-50">
            <p className=" text-[20pt] bg-gradient-to-b from-[rgb(241,241,241)] via-white to-stone-700 bg-clip-text text-transparent text-center" >Victoria's secret</p>
            <p className="text-gray-400 text-[8pt] text-center">Create a link for your chatroom. Join chatrooms using the join now button</p>
            <div className="w-full flex justify-center mb-2">
                <Link href={"/chatroom"}>
                  <button className="w-[70px] py-1 bg-[#E72929] hover:bg-[#ff5d5d] text-white rounded-lg text-sm duration-200 ease-in-out" >Join</button></Link>
              </div>
          </div> */}
          <div className="w-full h-[50px] sm:h-[60px] absolute top-0 right-0 bg-[rgba(0,0,0,0)] backdrop-blur-md z-50 px-3 flex justify-start items-center ">
          <div className="w-full h-full relative flex flex-col items-start justify-center">
          <p className=" text-[20pt] bg-gradient-to-b from-[rgb(241,241,241)] via-white to-stone-700 bg-clip-text text-transparent" >Victoria's secret</p>
          <p className="text-gray-400 text-[8pt] hidden sm:block text-center">Create a link for your chatroom. Join chatrooms using the join now button</p>
          <Link href={"/chatroom"}>
                  <button className="w-[70px] py-1 bg-[#ff0000] hover:bg-[#ff5d5d] text-white rounded-r-full rounded-l-full text-sm duration-200 ease-in-out absolute right-3 top-[50%] -translate-y-[50%]" >Leave</button></Link>
          </div>
          </div>
          <div className="w-full sm:w-full h-full sm:h-[600px] flex flex-col z-20 ">
            <div className="w-full h-full flex flex-col">
              
              <div className="w-full h-full sm:rounded-lg border-[.5px] bg-[rgb(10,10,10)]  border-[rgb(57,57,57)]  flex flex-col justify-between items-center">
                <div className="w-full h-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>

    </html>
  );
}
