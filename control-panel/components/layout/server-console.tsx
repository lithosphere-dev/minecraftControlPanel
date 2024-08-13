import { useEffect, useState } from "react";

export default function ServerConsole() {
  const [logs, setLogs] = useState("Hello");



  return (
    <textarea
      value={logs}
      disabled
      className="resize-none w-full h-full bg-zinc-100 dark:bg-zinc-800"
    />
  );
}
