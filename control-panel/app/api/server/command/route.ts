interface Request {
    command: string;
}

export async function POST(request: Request) {
    try {
        const data: Request = await request.json();
        const command = data.command;

        console.log(command);
    
        return NextResponse.json({ message: 'Command sended successfully', data });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request', error }, { status: 500 });
    }
    //const status = true;
    //const rcon = await Rcon.connect({
    //    host: "localhost", port: 25575, password: "1234"
    //})
    
    //let responses = await Promise.all([
    //    rcon.send("help"),
    //    rcon.send("whitelist list")
    //])
    
    //for (response of responses) {
    //    console.log(response)
    //}
    
    rcon.end()
}

