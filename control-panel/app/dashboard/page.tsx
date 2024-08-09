"use client";

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

type MemoryDataType = {
  date: string,
  memoryInfo: MemoryInfo,
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
  console.log(parts);
  const datePart = `${parts[4].value}-${parts[2].value}-${parts[0].value}`;
  const timePart = `${parts[6].value}:${parts[8].value}:${parts[10].value}`;


  const dateAndHourCET = `${datePart} ${timePart}`;

  return dateAndHourCET;
};

export default function Dashboard() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [memoryData, setMemoryData] = useState<MemoryDataType[]>([]);
  const [storageData, setStorageData] = useState<StorageInfo[]>([]);

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
          console.log(data);
          
          setStorageData((prevStorageData) => [...prevStorageData, data]);
        } catch (error) {
          console.error('Error fetching storage info:', error);
        }
      };

      fetchMemoryInfo(); 
      fetchStorageInfo();

      const intervalId = setInterval(fetchMemoryInfo, 5000);

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
        <h1>Welcome to the dashboard!</h1>
        <p className="text-sm text-slate-700">Here you can administrate your server</p>
      </div>
      <div className="h-full flex gap-4 overflow-hidden">
        <div className="w-full gap-4 flex flex-col">
          <section className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted w-full h-full border p-4 rounded-md bg-zinc-200 dark:bg-zinc-900 flex flex-col gap-2">
            <h2>CPU Consumption</h2>
            {memoryData.length > 0 &&
              <ResponsiveContainer width="100%" height="90%">
                <BarChart barGap={1} data={memoryData}>
                  <CartesianGrid vertical={false} strokeOpacity={0.2} strokeDasharray="3 3" />
                  <XAxis />
                  <YAxis type="number" domain={[0, memoryData[0].memoryInfo.totalMemory]} />
                  <Tooltip contentStyle={{ borderRadius: '10px', backgroundColor: theme.theme === 'light' ? "white" : "black" }} />
                  <Bar radius={4} dataKey="memoryInfo.usedMemory" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            }
          </section>
          {/* <section className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted w-full h-full border p-4 rounded-md bg-zinc-200 dark:bg-zinc-900 flex flex-col gap-2">
            <h2>CPU Consumption</h2>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart barGap={1} data={data}>
                <CartesianGrid vertical={false} strokeOpacity={0.2} strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis type="number" domain={[0, 10000]} />
                <Tooltip contentStyle={{ borderRadius: '10px', backgroundColor: theme.theme === 'light' ? "white" : "black" }} />
                <Bar radius={4} dataKey="uv" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </section> */}
        </div>
        <section className="w-fit h-fit bg-zinc-200 border p-4 rounded-md dark:bg-zinc-900 flex flex-col gap-2">
          <h2>Storage Consumption</h2>
          <PieChart width={300} height={300}>
            <Tooltip contentStyle={{ borderRadius: '10px', backgroundColor: theme.theme === 'light' ? "white" : "black" }} />
            <Pie label data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#8884d8" />
          </PieChart>
        </section>
      </div>
    </main>
  );
}
