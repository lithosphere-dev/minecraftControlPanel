import { NextResponse } from "next/server";
import { Rcon } from "rcon-client";


export async function POST(request: Request) {
    try {
        const data: Request = await request.json();

        console.log(data);

        const rcon = await Rcon.connect({
            host: "localhost", port: 25575, password: "1234"
        })

        console.log(await rcon.send(data.command))


        rcon.end()

        return NextResponse.json({ message: 'Command sended successfully', data });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request', error }, { status: 500 });
    }

}

