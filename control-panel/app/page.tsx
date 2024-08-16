"use client";

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from "react";

export default function Home() {

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter()

  async function fetchSignin(username: string, password: string) {
    const response = await fetch('/api/auth/sign-in',
      {
        method: "POST",
        body: JSON.stringify(
          {
            username: username,
            password: password
          }
        ),
      }
    );

    if (response.status === 200) {
      router.push("/dashboard");
    } else {
      alert("AUTH FAILED");
    }
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <main className="h-screen w-screen flex bg-zinc-900 p-4 text-white">
      <div className="h-full w-full p-4 flex justify-center items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Get started</h1>
          <p className="font-light">
            Enter your username and password set during initialisation script
          </p>
          <div className="flex flex-col gap-3">
            <input
              value={username}
              onChange={handleUsernameChange}
              className="h-10 text-sm rounded border bg-zinc-800 border-white/15 px-2 py-1"
              placeholder="Username"
              type="text"
            />
            <input
              value={password}
              onChange={handlePasswordChange}
              className="h-10 text-sm rounded border bg-zinc-800 border-white/15 px-2 py-1"
              placeholder="Password"
              type="password"
            />
            <button onClick={() => fetchSignin(username, password)} className="transition duration-150 h-10 bg-blue-500 hover:bg-blue-400 rounded border border-black/25 text-white text-lg font-semibold">
              Sing in
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-full p-4">
        <div className="w-full h-full rounded-md bg-black border border-white/15 flex justify-center items-center p-4">
          <h1 className="text-white text-2xl font-semibold">
            Db2 Control Panel
          </h1>
        </div>
      </div>
    </main>
  );
}
