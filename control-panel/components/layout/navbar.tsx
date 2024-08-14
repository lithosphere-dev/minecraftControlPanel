"use client";

import { ClipboardIcon, CodeIcon, DashboardIcon, DownloadIcon, ArchiveIcon, HamburgerMenuIcon, ResetIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useState } from "react";

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  return (
    <nav className={`h-screen transition duration-150 ease-in-out ${toggleMenu ? "w-80" : ""} p-2 flex flex-col justify-between gap-2 border-r border-black/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900`}>
      <div className="flex flex-col gap-2">
        <button onClick={() => setToggleMenu(!toggleMenu)} className="w-8 rounded border border-black/15 dark:border-white/15 w-8 h-8 bg-zinc-300 dark:bg-zinc-800 p-2 flex justify-center items-center">
          <HamburgerMenuIcon />
        </button>
        <div className="flex flex-col gap-2">
          <Link className="w-full border border-black/15 dark:border-white/15 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex gap-2 items-center" href="/dashboard">
            <div className="h-full w-8 px-1 rounded bg-zinc-300 dark:bg-zinc-800 flex justify-center items-center">
              <DashboardIcon />
            </div>
            {toggleMenu && <span>Dashboard</span>}
          </Link>
          <Link className="w-full border border-black/15 dark:border-white/15 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex gap-2 items-center" href="/console">
            <div className="h-full w-8 px-1 rounded bg-zinc-300 dark:bg-zinc-800 flex justify-center items-center">
              <CodeIcon />
            </div>
            {toggleMenu && <span>Console</span>}
          </Link>
          <Link className="w-full border border-black/15 dark:border-white/15 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex gap-2 items-center" href="/console">
            <div className="h-full w-8 px-1 rounded bg-zinc-300 dark:bg-zinc-800 flex justify-center items-center">
              <ClipboardIcon />
            </div>
            {toggleMenu && <span>Whitelist</span>}
          </Link>
          <Link className="w-full border border-black/15 dark:border-white/15 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex gap-2 items-center" href="/ftp">
            <div className="h-full w-8 px-1 rounded bg-zinc-300 dark:bg-zinc-800 flex justify-center items-center">
              <ArchiveIcon />
            </div>
            {toggleMenu && <span>FTP</span>}
          </Link>
          <Link className="border border-black/15 dark:border-white/15 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex gap-2 items-center" href="">
            <div className="h-full w-8 px-1 rounded bg-zinc-300 dark:bg-zinc-800 flex justify-center items-center">
              <DownloadIcon />
            </div>
            {toggleMenu && <span>Backup</span>}
          </Link>
          <Link className="border border-black/15 dark:border-white/15 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex gap-2 items-center" href="/reset">
            <div className="h-full w-8 px-1 rounded bg-zinc-300 dark:bg-zinc-800 flex justify-center items-center">
              <ResetIcon />
            </div>
            {toggleMenu && <span>Reset</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}