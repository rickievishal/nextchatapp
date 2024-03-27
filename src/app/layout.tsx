
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

      <body className="w-screen h-screen flex flex-col items-center relative 
     ">
        <Headerdiv></Headerdiv>

        <div className=" lg:w-[800px] h-full flex flex-col justify-center items-center"

        >
          <div className="w-full flex flex-col my-[50px] px-[20px]">
            <p className=" text-[30pt] bg-gradient-to-b from-[rgb(241,241,241)] via-white to-stone-700 bg-clip-text text-transparent" >Victoria's secret</p>
            <p className="text-gray-400">Create a link for your chatroom. Join chatrooms using the join now button</p>
          </div>
          <div className="w-[95%] sm:w-full h-[600px] flex flex-col z-20 ">
            <div className="w-full h-full flex flex-col">
              <div className="w-full flex justify-end mb-1">
                <Link href={"/chatroom"}>
                  <button className="w-[70px] py-1 bg-[#E72929] hover:bg-[#ff5d5d]  rounded-lg text-sm duration-200 ease-in-out" >Join</button></Link>
              </div>
              <div className="w-full h-full rounded-lg border-[.5px] bg-[rgb(10,10,10)]  border-[rgb(57,57,57)]  flex flex-col justify-between items-center">
                <div className="w-full h-full">{children}</div>
                <div className="w-full flex px-2 py-1">
                  <p className="text-[8pt] text-gray-400">This site is made as an educational outcome*</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>

    </html>
  );
}
