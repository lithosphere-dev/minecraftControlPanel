"use client";

import { useState } from "react";
import { EyeNoneIcon, CopyIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface InputPasswordInfo {
  value: string;
}

export const InputPassword = (props: InputPasswordInfo) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="p-1 relative rounded border border-black/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900">
      <input
        disabled
        type={visible ? "text" : "password"}
        value={props.value}
        className="w-4/5 text-zinc-500 bg-transparent"
      />
      <div className="absolute flex gap-2 right-1 top-px h-full justify-center items-center">
        <button
          onClick={() => {
            setVisible(!visible);
          }}
          className="transition duration-150 p-1 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 border border-black/15 dark:border-white/15 flex justify-center items-center"
        >
          {visible ? <EyeOpenIcon /> : <EyeNoneIcon />}
        </button>
        <button className="transition duration-150 p-1 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 border border-black/15 dark:border-white/15 flex justify-center items-center">
          <CopyIcon />
        </button>
      </div>
    </div>
  );
};
