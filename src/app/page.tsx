"use client";

import { useState, useEffect } from "react";

import { getRuns } from "@/app/actions";

type Run = {
  name: string;
  time: String;
};

export default function Home() {
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedRuns = await getRuns();

        setRuns(fetchedRuns);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setTimeout(() => fetchData(), 300000);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start rounded lg:p-4">
      {runs.map((run, index) => {
        let className = index === 0 ? "fire rounded-t pt-2" : "";
        if (index === 2) {
          className = "rounded-b";
        }
        let emoji = "🥇";
        if (index === 1) {
          emoji = "🥈";
        } else if (index === 2) {
          emoji = "🥉";
        }
        return (
          <div className={`entry ${className} w-full p-1`} key={index}>
            <div className="flex emoji ml-2 mr-4 text-left">{emoji}</div>
            <span className="flex mr-4">{run.time}</span>
            <span className="flex">{run.name}</span>
          </div>
        );
      })}
    </main>
  );
}
