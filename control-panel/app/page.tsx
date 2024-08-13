"use client";

import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { UpdateIcon, PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { io } from "socket.io-client";

const socket = io();

export default function Home() {
  const [logs, setLogs] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [minecraftServerStatus, setMinecraftServerStatus] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

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

  const startMinecraftDockerContainer = async () => {
    try {
      const response = await fetch('/api/server/start');
      const data = await response.json();
      const status = data.status;


    } catch (error) {
      console.error('Error fetching minecraft docker status:', error);
    }
  };

  const restartMinecraftDockerContainer = async () => {
    try {
      const response = await fetch('/api/server/start');
      const data = await response.json();
      const status = data.status;


    } catch (error) {
      console.error('Error fetching minecraft docker status:', error);
    }
  };

  const stopMinecraftDockerContainer = async () => {
    try {
      const response = await fetch('/api/server/stop');
      const data = await response.json();
      const status = data.status;


    } catch (error) {
      console.error('Error fetching minecraft docker status:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMincraftDockerStatus();
    }, 5000);

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {


      setInputValue('');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-2 p-24">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Server informations</h1>
        <div className="flex flex-col gap-2">
          <div className="border rounded border-black/15 dark:border-white/15 px-2 py-1 w-fit flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full bg-${minecraftServerStatus ? "green" : "red"}-500`} />
            <h2>Status: {minecraftServerStatus ? "running" : "not running"}</h2>
          </div>
          <div className="border rounded border-black/15 dark:border-white/15 px-2 py-1 w-fit flex items-center gap-2">
            <h2>127.0.0.1:25565</h2>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2">
        <button onClick={() => startMinecraftDockerContainer()} disabled={minecraftServerStatus ? true : false} className="disabled:opacity-50 transition duration-150 text-white bg-green-700 hover:bg-green-500 disabled:hover:bg-green-700 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <PlayIcon />
          Start
        </button>
        <button onClick={() => restartMinecraftDockerContainer()} disabled={minecraftServerStatus ? false : true} className="disabled:opacity-50 transition duration-150 text-white bg-yellow-700 hover:bg-yellow-500 disabled:hover:bg-yellow-700 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <UpdateIcon />
          Reload
        </button>
        <button onClick={() => stopMinecraftDockerContainer()} disabled={minecraftServerStatus ? false : true} className="disabled:opacity-50 transition duration-150 text-white bg-red-700 hover:bg-red-500 disabled:hover:bg-red-700 rounded px-2 py-1 border border-white/15 flex items-center gap-2">
          <StopIcon />
          Stop
        </button>
      </div>
      <div className="w-full h-96">
        <div className="flex flex-col w-full h-full rounded border border-black/15 dark:border-white/25">
          <textarea
            value={!minecraftServerStatus ? "[WARNING]: Server not started " : logs}
            disabled
            className={`p-2 ${minecraftServerStatus ? "text-zinc-500 dark:text-zinc-300" : "text-zinc-300 dark:text-zinc-500"} text-sm resize-none w-full h-full bg-zinc-100 dark:bg-zinc-800`}
          />
          <input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!minecraftServerStatus}
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
