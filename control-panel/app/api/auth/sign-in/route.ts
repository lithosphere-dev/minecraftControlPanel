import { NextResponse } from "next/server";
import crypto from 'crypto';

interface SignInInfo {
    username: string;
    password: string;
}


export async function POST(request: Request) {
    try {
        // Parse the incoming request JSON data
        const data: SignInInfo = await request.json();

        // Extract stored login credentials from environment variables
        const storedLogin = process.env.ADMIN_LOGIN;
        const storedPassword = process.env.ADMIN_PASSWORD;

        console.log(storedLogin, storedPassword);
        console.log(data)

        if (!storedLogin || !storedPassword) {
            return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 });
        }

        // Use a secure comparison to prevent timing attacks
        const isLoginValid = crypto.timingSafeEqual(Buffer.from(data.username), Buffer.from(storedLogin));
        const isPasswordValid = crypto.timingSafeEqual(Buffer.from(data.password), Buffer.from(storedPassword));

        if (isLoginValid && isPasswordValid) {
            // Authentication successful
            return NextResponse.json({ message: 'Authentication successful' }, { status: 200 });
        } else {
            // Authentication failed
            return NextResponse.json({ message: 'Invalid login or password' }, { status: 401 });
        }
    } catch (error) {
        // Handle any unexpected errors
        return NextResponse.json({ message: 'Authentication failed due to an error', error }, { status: 500 });
    }
}