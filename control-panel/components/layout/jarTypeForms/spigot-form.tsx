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
import { Cross1Icon } from "@radix-ui/react-icons";

export const SpigotForm = () => {
  const [version, setVersion] = useState();
  const [disclaimerReset, setDisclaimerReset] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p className="italic dark:text-zinc-700">
        You have choose{" "}
        <span className="text-blue-500 font-semibold">Spigot</span> as your new
        minecraft jar.
      </p>
      <h1 className="text-lg font-semibold">Select spigot version</h1>
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
          new spigot version.
        </p>
      )}
      {version && (
        <div>
          <button
            onClick={() => {
              setDisclaimerReset(true);
            }}
            className="transition duration-150  rounded text-white border border-black/15 dark:border-white/25 bg-red-600 hover:bg-red-700 w-56 h-14 text-lg font-semibold flex flex-col gap-1"
          >
            Reset server
            <span className="text-sm font-light">(spigot {version})</span>
          </button>
        </div>
      )}
      {disclaimerReset && (
        <div className="absolute top-0 left-0 w-screen h-screen z-50 bg-black/70 flex justify-center items-center">
          <div className="relative w-96 p-4 rounded bg-zinc-100 dark:bg-zinc-800 border border-black/15 dark:border-white/15 flex flex-col gap-2">
            <button
              onClick={() => {
                setDisclaimerReset(false);
              }}
              className="absolute right-4"
            >
              <Cross1Icon className="font-bold" />
            </button>
            <div>
              <h2 className="font-semibold">
                Are you sure to reset your server ?
              </h2>
              <p className="text-sm">
                All your data will be removed and a new server with be
                installed.
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setDisclaimerReset(false);
                }}
                className="px-2 py-1 border border-black/15 dark:border-white/15 rounded"
              >
                Cancel
              </button>
              <button className="px-2 py-1 border border-white/15 bg-red-600 rounded">
                Yes, reset the server.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
