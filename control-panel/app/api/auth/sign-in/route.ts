import { NextResponse } from "next/server";
import crypto from 'crypto';

interface SignInInfo {
    username: string;
    password: string;
}


export async function POST(request: Request) {
    try {
        const data: SignInInfo = await request.json();

        const storedLogin = process.env.ADMIN_LOGIN;
        const storedPassword = process.env.ADMIN_PASSWORD;

        if (!storedLogin || !storedPassword) {
            return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 });
        }

        const isLoginValid = crypto.timingSafeEqual(Buffer.from(data.username), Buffer.from(storedLogin));
        const isPasswordValid = crypto.timingSafeEqual(Buffer.from(data.password), Buffer.from(storedPassword));

        if (isLoginValid && isPasswordValid) {
            return NextResponse.json({ message: 'Authentication successful' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid login or password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Authentication failed due to an error', error }, { status: 500 });
    }
}