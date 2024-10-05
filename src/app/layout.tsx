
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body>
     

            <div className="flex-grow bg-gray-100 p-4 md:ml-1/5">
              {children}
            </div>
       
      </body>
    </html>
  );
}
