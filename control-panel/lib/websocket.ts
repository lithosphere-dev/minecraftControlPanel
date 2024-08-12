import { WebSocketServer } from "ws";

let wss: WebSocketServer | null = null;

export function getWebSocketServer() {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        console.log(`Received message => ${message}`);
      });

      ws.send("Hello! Message from the server...");
    });

    console.log("WebSocket server created");
  }

  return wss;
}
