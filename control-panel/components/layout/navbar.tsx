"use client";

import { ClipboardIcon, CodeIcon, DashboardIcon, DownloadIcon, FileIcon, HamburgerMenuIcon, MagicWandIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useState } from "react";

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  return (
    <nav className={`h-screen transition duration-150 ease-in-out ${toggleMenu ? "w-80" : "w-12"} p-2 flex flex-col justify-between gap-2 border-r-2 dark:bg-zinc-900`}>
      <div className="flex flex-col gap-2">
        <button onClick={() => setToggleMenu(!toggleMenu)} className="rounded border border-white/15 w-8 h-8 bg-zinc-300 dark:bg-zinc-800 p-2">
          <HamburgerMenuIcon /> 
        </button>
        <div className="flex flex-col gap-2">
          <Link className="border border-white/25 h-8 bg-zinc-300 dark:bg-zinc-800 rounded flex gap-2 items-center" href="">
            <div className="h-full px-1 rounded bg-zinc-400 dark:bg-zinc-700 flex justify-center items-center">
              <DashboardIcon width={22} height={22}/>
            </div>
            {toggleMenu && <span>Dashboard</span>}
          </Link>
          <Link className="border border-white/25 h-8 bg-zinc-300 dark:bg-zinc-800 rounded flex gap-2 items-center" href="">
            <div className="h-full px-1 rounded bg-zinc-400 dark:bg-zinc-700 flex justify-center items-center">
              <CodeIcon width={22} height={22}/>
            </div>
            {toggleMenu && <span>Console</span>}
          </Link>
          <Link className="border border-white/25 h-8 bg-zinc-300 dark:bg-zinc-800 rounded flex gap-2 items-center" href="">
            <div className="h-full px-1 rounded bg-zinc-400 dark:bg-zinc-700 flex justify-center items-center">
              <ClipboardIcon width={22} height={22}/>
            </div>
            {toggleMenu && <span>Whitelist</span>}
          </Link>
          <Link className="border border-white/25 h-8 bg-zinc-300 dark:bg-zinc-800 rounded flex gap-2 items-center" href="">
            <div className="h-full px-1 rounded bg-zinc-400 dark:bg-zinc-700 flex justify-center items-center">
              <FileIcon width={22} height={22}/>
            </div>
            {toggleMenu && <span>FTP</span>}
          </Link>
          <Link className="border border-white/25 h-8 bg-zinc-300 dark:bg-zinc-800 rounded flex gap-2 items-center" href="">
            <div className="h-full px-1 rounded bg-zinc-400 dark:bg-zinc-700 flex justify-center items-center">
              <DownloadIcon width={22} height={22}/>
            </div>
            {toggleMenu && <span>Backup</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}