import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {

    const status = true;
    startContainer("minecraft-server");

    return NextResponse.json({
        status: status,
    });
}

function startContainer(arg0: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const command = `docker container stop ${arg0}`;

        exec(command, (error) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    })
}
