import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  return NextResponse.json({
    totalMemory: Math.round((totalMemory / 1024 / 1024 / 1024) * 100) / 100,
    freeMemory: Math.round((freeMemory / 1024 / 1024 / 1024) * 100) / 100,
    usedMemory: Math.round((usedMemory / totalMemory) * 100),
  });
}
