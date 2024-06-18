import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

const open = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <div className={`py-2 h-screen ${open.className}`}>
          <Toaster />
          <div>
            {children}
          </div>
        </div>
      </>
    )
  }