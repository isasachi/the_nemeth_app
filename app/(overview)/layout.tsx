import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { QuarterProvider } from '../context/quarterContext';
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

const open = Open_Sans({ subsets: ["latin"] });

export default async function RootLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    const session = await getServerSession();

    return (
      <>
        <div className={`py-2 h-screen ${open.className}`}>
          <Toaster />
          <SessionProvider session={session}>
            <QuarterProvider>
              <div>
                {children}
              </div>
            </QuarterProvider>
          </SessionProvider>
        </div>
      </>
    )
  }