"use client";

import { useEffect, useState } from "react";
import { UpdateIcon, PlayIcon, StopIcon } from "@radix-ui/react-icons";
import ServerConsole from "@/components/layout/server-console";
import { io } from "socket.io-client";

const socket = io();

export default function Home() {
  const [output, setOutput] = useState("");
  const [toggleMinecraftConfig, setToggleMinecraftConfig] = useState(false);
  const [configstep, setConfigStep] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <div className="w-full flex gap-4">
        <button className="transition duration-150 text-white bg-green-700 hover:bg-green-500 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <PlayIcon />
          Start
        </button>
        <button className="transition duration-150 text-white bg-yellow-700 hover:bg-yellow-500 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <UpdateIcon />
          Reload
        </button>
        <button className="transition duration-150 text-white bg-red-700 hover:bg-red-500 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <StopIcon />
          Stop
        </button>
      </div>
      <div className="w-full h-96">
        <div className="flex flex-col w-full h-full rounded border border-black/15 dark:border-white/25">
          <p>Status: {isConnected ? "connected" : "disconnected"}</p>
          <p>Transport: {transport}</p>
          <ServerConsole />
          <input
            placeholder="Type your command here, do not type '/' in your command"
            className="focus:outline-none w-full p-2 border-t border-black/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-800"
          />
        </div>
      </div>
    </main>
  );
}
