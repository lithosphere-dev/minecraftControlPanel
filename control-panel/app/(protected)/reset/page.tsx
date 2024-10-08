"use client"

import { Suspense, useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VanillaForm } from "@/components/layout/jarTypeForms/vanilla-form";
import { SpigotForm } from "@/components/layout/jarTypeForms/spigot-form";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "./loading";

type JarType = "vanilla" | "spigot" | "paper";

export default function Reset() {

  const [jarType, setJarType] = useState<JarType>();

  return (
    <main className="h-screen w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="font-bold text-xl">Choose minecraft jar</h1>
        <div className="w-full">
          <Suspense fallback={<Loading />}>
            <ToggleGroup
              onValueChange={(value: any) => {
                if (value) setJarType(value);
              }}
              className="justify-start"
              type="single"
            >
              <ToggleGroupItem
                value="vanilla"
                className={`transition duration-150 flex flex-col gap-2 justify-center items-center w-24 h-24 border dark:border-white/15 ${jarType === "vanilla" ? "font-semibold" : "font-light"}`}
              >
                Vanilla
              </ToggleGroupItem>
              <ToggleGroupItem
                value="spigot"
                className={`transition duration-150 flex flex-col gap-2 justify-center items-center w-24 h-24 border dark:border-white/15 ${jarType === "spigot" ? "font-semibold" : "font-light"}`}
              >
                Spigot
              </ToggleGroupItem>
              <ToggleGroupItem
                value="paper"
                className={`transition duration-150 flex flex-col gap-2 justify-center items-center w-24 h-24 border dark:border-white/15 ${jarType === "paper" ? "font-semibold" : "font-light"}`}
              >
                Paper
              </ToggleGroupItem>
            </ToggleGroup>
          </Suspense>
        </div>
        {jarType === "vanilla" && <VanillaForm />}
        {jarType === "spigot" && <SpigotForm />}
      </div>
    </main >
  )
}