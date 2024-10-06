
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maintainance Pro",
  description: "Manage your maintainace like a Professional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
   <div>
        <Toaster position="top-right" />
        <div className="flex flex-col h-screen">
          <div className="h-12 bg-gray-800 text-white">
            <TopBar />
          </div>
          <div className="flex flex-grow">
            <div className="hidden md:block md:w-1/5 bg-gray-800 text-white overflow-y-auto h-full">
              <SideBar />
            </div>

            <div className="flex-grow bg-gray-100 p-4 md:ml-1/5">
              {children}
            </div>
          </div>
        </div>
        </div>
  );
}
