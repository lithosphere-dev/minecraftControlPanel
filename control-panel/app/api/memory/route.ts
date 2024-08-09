import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  return NextResponse.json({
    totalMemory: totalMemory / 1024 / 1024,
    freeMemory: freeMemory / 1024 / 1024,
    usedMemory: usedMemory / 1024 / 1024,
  });
}
