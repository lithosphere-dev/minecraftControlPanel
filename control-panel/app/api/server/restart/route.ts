import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {

    const status = true;
    restartContainer("minecraft-server");

    return NextResponse.json({
        status: status,
    });
}

function restartContainer(arg0: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const command = `docker container restart ${arg0}`;

        exec(command, (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    })
}
