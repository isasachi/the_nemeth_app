import Navlinks from "./nav-links";
import Logo from "./logo";
import LogoutButton from "./logout-button";

export default function Sidebar() {
    return (
        <div className="h-screen text-sm box-border border-r-slate-200 border-[.5px] flex flex-col justify-between">
            <div>
                <div className="flex flex-row p-2 justify-start items-center">
                    <Logo />
                    <p className="hidden font-semibold ml-2 text-base md:block">The Nemeth Foundation</p>
                </div>
                <div className="flex flex-col">
                    <Navlinks />
                </div>
            </div>
            <LogoutButton />
        </div>
    )   
}