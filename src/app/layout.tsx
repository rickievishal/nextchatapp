
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Headerdiv from "./Headerdiv";
import Link from "next/link";

import Body from "./Body";

const inter = IBM_Plex_Mono({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600"] });

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
        <div className=" w-full  h-full flex flex-col justify-center items-center relative z-20  sm:pt-0 " >
          <Body></Body>
          <div className="w-full h-full  flex flex-col justify-center items-center  z-20 ">
            <div className="w-full max-w-4xl h-full sm:rounded-lg  relative flex flex-col justify-between items-center">
              {children}
            </div>
          </div>
          <div className="w-full text-sm text-gray-400 flex justify-center items-center">Created by Vishal with fking ❤️🫰🏻</div>
        </div>
      </body>

    </html>
  );
}
