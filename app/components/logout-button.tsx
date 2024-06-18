'use client'

import { PowerIcon } from "@heroicons/react/24/outline"
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return(
        <div className="p-3 pb-5 md:px-3">
            <button type="submit" onClick={() => signOut({ callbackUrl: '/' })} className="flex flex-row gap-1 items-center font-semibold hover:text-red-500">
                <PowerIcon className="w-6 font-semibold hover:text-red-500"/>
                <span className="hidden md:block">Logout</span>
            </button>
        </div>
    )
}