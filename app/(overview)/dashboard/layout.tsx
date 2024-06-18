import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "../../components/sidebar";

const open = Open_Sans({ subsets: ["latin"] });

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className={`flex flex-row py-2 h-screen ${open.className}`}>
        <div>
            <Sidebar />
        </div>
        <div className="flex-grow p-1 box-border overflow-y-auto">{children}</div>
      </div>
    )
  }