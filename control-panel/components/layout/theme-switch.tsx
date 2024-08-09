"use client"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useTheme } from "next-themes"

export const ThemeSwitch = () => {

  const { theme , setTheme } = useTheme()
  
  return (
    <div className="absolute right-4 top-4">
      <ToggleGroup defaultValue="dark" type="single">
        <ToggleGroupItem className="border" onClick={() => setTheme("light")} value="light"><SunIcon /></ToggleGroupItem>
        <ToggleGroupItem className="border" onClick={() => setTheme("dark")} value="dark"><MoonIcon /></ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}