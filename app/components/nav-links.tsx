'use client'

import { HomeIcon,
    CalendarDaysIcon,
    UsersIcon,
    AcademicCapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Classrooms', href: '/dashboard/classroom', icon: UsersIcon },
    { name: 'Attendance', href: '/dashboard/attendance', icon: CalendarDaysIcon },
    { name: 'Grading', href: '/dashboard/grading', icon: AcademicCapIcon }
    ];

export default function Navlinks() {
    const pathname = usePathname();

    return (
        // <ul className="px-4">
        //     <li className="flex flex-row justify-start items-end gap-2"><HomeIcon className="w-6"/><span className="hidden md:inline">Home</span></li>
        //     <li className="flex flex-row justify-start items-end gap-2"><UsersIcon className="w-6"/><span className="hidden md:inline">Classes</span></li>
        //     <li className="flex flex-row justify-start items-end gap-2"><CalendarDaysIcon className="w-6"/><span className="hidden md:inline">Attendance</span></li>
        //     <li className="flex flex-row justify-start items-end gap-2"><AcademicCapIcon className="w-6"/><span className="hidden md:inline">Grading</span></li>
        // </ul>

        <>
            {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-violet-100 hover:text-violet-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-violet-100 text-violet-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
        </>
    )
}