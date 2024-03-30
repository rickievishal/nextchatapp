
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Headerdiv from "./Headerdiv";
import Link from "next/link";

import Body from "./Body";

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

        <div className=" w-full lg:w-[800px] h-full flex flex-col justify-center items-center relative z-20  sm:pt-0" >
          <Body></Body>
          <div className="w-full sm:w-full h-full sm:h-[600px] flex flex-col z-20 ">
            <div className="w-full h-full sm:rounded-lg border-[.5px] bg-[rgb(10,10,10)]  border-[rgb(57,57,57)] relative flex flex-col justify-between items-center">
                {children}
            </div>
          </div>
        </div>
      </body>

    </html>
  );
}
