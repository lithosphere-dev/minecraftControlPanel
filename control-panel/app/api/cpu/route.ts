import { NextResponse } from "next/server";
import os from "os";

interface CPUUsage {
  idle: number;
  total: number;
}

function calculateCPUUsage(): CPUUsage {
  const cpus = os.cpus();

  let idle = 0;
  let total = 0;

  cpus.forEach((cpu) => {
    for (const type in cpu.times) {
      total += cpu.times[type as keyof typeof cpu.times];
    }
    idle += cpu.times.idle;
  });

  return { idle, total };
}

export async function GET() {
  const startMeasure = calculateCPUUsage();

  return new Promise((resolve) => {
    setTimeout(() => {
      const endMeasure = calculateCPUUsage();

      const idleDifference = endMeasure.idle - startMeasure.idle;
      const totalDifference = endMeasure.total - startMeasure.total;

      const cpuUsagePercentage =
        100 - Math.round((100 * idleDifference) / totalDifference);

      resolve(
        NextResponse.json({
          cpuUsagePercentage,
        })
      );
    }, 1000);
  });
}
