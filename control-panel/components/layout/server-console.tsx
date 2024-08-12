import { useEffect, useState } from "react";

export default function ServerConsole() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/api/server/console");

    ws.onmessage = (event) => {
      setOutput((prev) => prev + event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <textarea
      disabled
      className="resize-none w-full h-full bg-zinc-100 dark:bg-zinc-800"
    />
  );
}
