import "@/app/globals.css";
import Breadcrumb from "@/app/components/breadcrumbs";
import { Toaster } from 'react-hot-toast';

export default function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
            <Toaster />
            <div>
                <Breadcrumb 
                    homeElement="Home"
                    separator=">"
                    containerClasses="flex items-center flex-wrap space-x-4 px-4 py-3"
                    listClasses="text-gray-400 hover:text-gray-500"
                    activeClasses="text-violet-400 hover:text-violet-500"
                    capitalizeLinks={true}
                />
            </div>
            <div>{children}</div>
        </>
    )
  }