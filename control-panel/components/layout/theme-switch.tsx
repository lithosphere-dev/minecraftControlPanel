"use client"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useTheme } from "next-themes"

export const ThemeSwitch = () => {

  const { setTheme } = useTheme()
  
  return (
    <div className="absolute right-0 p-2">
      <ToggleGroup defaultValue="dark" type="single">
        <ToggleGroupItem onClick={() => setTheme("light")} value="light"><SunIcon /></ToggleGroupItem>
        <ToggleGroupItem onClick={() => setTheme("dark")}value="dark"><MoonIcon /></ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}