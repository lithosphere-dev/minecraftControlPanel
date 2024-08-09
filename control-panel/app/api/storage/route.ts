import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execPromise("df -h --total");
    const lines = stdout.trim().split("\n");
    const diskInfo = lines[lines.length - 1].split(/\s+/);

    const size = parseSizeToGB(diskInfo[1]);
    const used = parseSizeToGB(diskInfo[2]);
    const available = parseSizeToGB(diskInfo[3]);

    const diskUsage = {
      filesystem: diskInfo[0],
      size,
      used,
      available,
      usePercent: parseFloat(diskInfo[4]),
      mountedOn: diskInfo[5],
    };

    return NextResponse.json(diskUsage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve disk usage" },
      { status: 500 }
    );
  }
}

function parseSizeToGB(size: string): number {
  const unit = size.slice(-1);
  const value = parseFloat(size.slice(0, -1));

  switch (unit) {
    case "T":
      return value * 1024; // Convert TB to GB
    case "G":
      return value; // Already in GB
    case "M":
      return value / 1024; // Convert MB to GB
    case "K":
      return value / 1024 ** 2; // Convert KB to GB
    default:
      return value / 1024 ** 3; // Assuming it's in bytes, convert to GB
  }
}
