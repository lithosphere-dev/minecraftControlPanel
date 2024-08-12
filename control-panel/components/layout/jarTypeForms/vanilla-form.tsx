"use client";

import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

export const VanillaForm = () => {
  const [version, setVersion] = useState();

  return (
    <div className="flex flex-col gap-4">
      <p className="italic dark:text-zinc-700">
        You have choose{" "}
        <span className="text-blue-500 font-semibold">Vanilla</span> as your
        minecraft jar type !
      </p>
      <h1 className="text-lg font-semibold">Select your minecraft version</h1>
      <Select
        onValueChange={(value: any) => {
          setVersion(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="versions" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>versions</SelectLabel>
            <SelectItem value="1.21.1">1.21.1</SelectItem>
            <SelectItem value="1.20.2">1.20.2</SelectItem>
            <SelectItem value="1.10.2">1.10.2</SelectItem>
            <SelectItem value="1.1.1">1.1.1</SelectItem>
            <SelectItem value="1.0.0">1.0.0</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {version && (
        <p className="italic dark:text-zinc-700">
          You have choose{" "}
          <span className="text-blue-500 font-semibold">{version}</span> as your
          minecraft version !
        </p>
      )}
      {version && (
        <div>
          <button className="transition duration-150  rounded text-white border border-black/15 dark:border-white/15 bg-blue-600 hover:bg-blue-700 w-56 h-14 text-lg font-semibold">
            Reset server
          </button>
        </div>
      )}
    </div>
  );
};
