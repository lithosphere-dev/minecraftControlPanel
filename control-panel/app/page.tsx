"use client";

import { useEffect, useState } from "react";
import { UpdateIcon, PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { io } from "socket.io-client";

const socket = io();

export default function Home() {
  const [logs, setLogs] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [minecraftServerStatus, setMinecraftServerStatus] = useState(false);

  const fetchMincraftDockerStatus = async () => {
    try {
      const response = await fetch('/api/server/status');
      const data = await response.json();
      const status = data.status;

      setMinecraftServerStatus(status)

    } catch (error) {
      console.error('Error fetching minecraft docker status:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMincraftDockerStatus();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

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

      socket.on("logs", (value) => {
        console.log(value);
        setLogs(value);
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
        <button disabled={minecraftServerStatus ? true : false} onClick={() => socket.emit("hello", "world")} className="transition duration-150 text-white bg-green-700 hover:bg-green-500 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <PlayIcon />
          Start
        </button>
        <button disabled={minecraftServerStatus ? false : true} className="transition duration-150 text-white bg-yellow-700 hover:bg-yellow-500 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <UpdateIcon />
          Reload
        </button>
        <button disabled={minecraftServerStatus ? false : true} className="transition duration-150 text-white bg-red-700 hover:bg-red-500 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <StopIcon />
          Stop
        </button>
      </div>
      <div className="w-full h-96">
        <div className="flex flex-col w-full h-full rounded border border-black/15 dark:border-white/25">
          <textarea
            value={logs}
            disabled
            className="resize-none w-full h-full bg-zinc-100 dark:bg-zinc-800"
          />
          <input
            placeholder="Type your command here, do not type '/' in your command"
            className="text-sm focus:outline-none w-full p-2 border-t border-black/15 dark:border-white/15 bg-zinc-100 dark:bg-zinc-800"
          />
        </div>
        <div className="w-full flex items-center gap-1">
          {isConnected ? <div className="mt-px rounded-full w-2 h-2 bg-green-500" /> : <div className="mt-px rounded-full w-2 h-2 bg-red-500" />}
          <p className="text-xs">Console status: <span className="font-extralight">{isConnected ? "connected" : "disconnected"} {transport}</span></p>
        </div>
      </div>
    </main>
  );
}
