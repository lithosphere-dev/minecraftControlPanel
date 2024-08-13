import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { spawn } from 'child_process';

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);


    io.on("connection", (socket) => {
        const dockerLogs = spawn('docker', ['logs', '-f', 'funny_wescoff']);

        dockerLogs.stdout.on('data', (data) => {
            console.log(data.toString());
            io.emit("logs", data.toString());
        });

        dockerLogs.stderr.on('data', (data) => {
            io.send(`Error: ${data}`);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> WSocket Ready on http://${hostname}:${port}`);
        });
});