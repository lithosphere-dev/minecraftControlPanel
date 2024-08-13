import { exec } from "child_process";
import { NextResponse } from "next/server";

type Params = {
    containerName: string
}

export async function GET() {

    const status = await isContainerRunning("minecraft-server");;


    return NextResponse.json({
        status: status,
    });
}

function isContainerRunning(containerName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const command = `docker ps`;

        exec(command, (error, stdout) => {
            if (error) {
                resolve(false);
            }
            const isRunning = stdout.includes(containerName);
            resolve(isRunning);
        });
    });
}
