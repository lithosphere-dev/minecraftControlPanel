"use client";

import { StorageTooltip } from "@/components/layout/storage-tooltip";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Pie,
  PieChart,
  AreaChart,
  Area,
} from "recharts";

interface MemoryInfo {
  totalMemory: number;
  freeMemory: number;
  usedMemory: number;
}

type StorageInfo = {
  filesystem: string,
  size: number,
  used: number,
  available: number,
  usePercent: string,
  mountedOn: string
}

type CpuInfo = {
  cpuUsagePercentage: number,
}

type StorageData = {
  name: string,
  value: number,
}

type MemoryDataType = {
  date: string,
  memoryInfo: MemoryInfo,
}

type CpuDataType = {
  date: string,
  cpuInfo: CpuInfo,
}


const getCurrentDateAndHourCET = () => {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const datePart = `${parts[4].value}-${parts[2].value}-${parts[0].value}`;
  const timePart = `${parts[6].value}:${parts[8].value}:${parts[10].value}`;


  const dateAndHourCET = `${datePart} ${timePart}`;

  return dateAndHourCET;
};

export default function Dashboard() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [memoryData, setMemoryData] = useState<MemoryDataType[]>([]);
  const [storageInfo, setStorageInfo] = useState<StorageData[]>([]);
  const [cpuData, setCpuData] = useState<CpuDataType[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const fetchMemoryInfo = async () => {
        try {
          const response = await fetch('/api/memory');
          const data: MemoryInfo = await response.json();

          const newData: MemoryDataType = {
            date: getCurrentDateAndHourCET(),
            memoryInfo: data
          };

          setMemoryData((prevMemoryData) => [...prevMemoryData, newData]);
        } catch (error) {
          console.error('Error fetching memory info:', error);
        }
      };

      const fetchStorageInfo = async () => {
        try {
          const response = await fetch('/api/storage');
          const data: StorageInfo = await response.json();

          const newData: StorageData[] = [
            {
              name: "used",
              value: Math.round(data.used / data.size * 100) / 100 * 100
            },
            {
              name: "unused",
              value: Math.round(data.available / data.size * 100) / 100 * 100
            }
          ]

          setStorageInfo(newData);
        } catch (error) {
          console.error('Error fetching storage info:', error);
        }
      };

      const fetchCpuInfo = async () => {
        try {
          const response = await fetch('/api/cpu');
          const data: CpuInfo = await response.json();

          const newData: CpuDataType = {
            date: getCurrentDateAndHourCET(),
            cpuInfo: data,
          };

          setCpuData((prevCpuData) => [...prevCpuData, newData]);

        } catch (error) {
          console.error('Error fetching storage info:', error);
        }
      };

      fetchCpuInfo();
      fetchMemoryInfo();
      fetchStorageInfo();

      const intervalId = setInterval(() => {
        fetchCpuInfo();
        fetchMemoryInfo();
        fetchStorageInfo();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [mounted]);

  if (!mounted) return null;

  const data02 = [
    { name: 'Used', value: 100 },
    { name: 'Unused', value: 300 },
  ];

  return (
    <main className="h-screen w-full flex flex-col gap-4 p-4">
      <div>
        <h1 className="font-bold text-xl">Welcome to the dashboard!</h1>
        <p className="text-sm text-slate-700 dark:text-zinc-500">Here you can administrate your server</p>
      </div>
      <div className="h-full flex gap-4 overflow-hidden">
        <div className="w-full gap-4 flex flex-col">
          <section className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted w-full h-full border border-black/15 dark:border-white/15 p-4 rounded-md bg-zinc-100 dark:bg-zinc-900 flex flex-col gap-2">
            <h2 className="font-semibold">RAM Consumption</h2>
            {memoryData.length > 0 &&
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart
                  width={500}
                  height={400}
                  data={memoryData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} strokeOpacity={0.2} strokeDasharray="3 3" />
                  <XAxis />
                  <YAxis type="number" domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '10px', backgroundColor: theme.theme === 'light' ? "white" : "black" }} />
                  <Area type="monotone" dataKey="memoryInfo.usedMemory" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            }
          </section>
          <section className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted w-full h-full border border-black/15 dark:border-white/15 p-4 rounded-md bg-zinc-100 dark:bg-zinc-900 flex flex-col gap-2">
            <h2 className="font-semibold">CPU Consumption</h2>
            {memoryData.length > 0 &&
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart
                  width={500}
                  height={400}
                  data={cpuData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} strokeOpacity={0.2} strokeDasharray="3 3" />
                  <XAxis />
                  <YAxis type="number" domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '10px', backgroundColor: theme.theme === 'light' ? "white" : "black" }} />
                  <Area type="monotone" dataKey="cpuInfo.cpuUsagePercentage" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            }
          </section>
        </div>
        <section className="w-fit h-fit bg-zinc-100 border border-black/15 dark:border-white/15 p-4 rounded-md dark:bg-zinc-900 flex flex-col gap-2">
          <h2 className="font-semibold">Storage Consumption</h2>
          <PieChart width={300} height={300}>
            <Tooltip content={<StorageTooltip />} />
            <Pie label data={storageInfo} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" />
          </PieChart>
        </section>
      </div>
    </main>
  );
}
