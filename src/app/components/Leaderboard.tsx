"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getRuns } from "@/app/actions";

type Run = {
  name: string;
  time: String;
};

export default function Leaderboard() {
  const [runs, setRuns] = useState<Run[]>([]);

  const searchParams = useSearchParams();
  const limitParam = searchParams.get("limit");

  let limit = 3;

  if (limitParam) {
    limit = parseInt(limitParam);
    if (limit > 10) {
      limit = 10;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedRuns = await getRuns(limit);

        setRuns(fetchedRuns);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setTimeout(() => fetchData(), 300000);
      }
    }

    fetchData();
  }, [limit]);

  return (
    <main className="flex min-h-screen flex-col items-start rounded lg:p-4">
      {runs.map((run, index) => {
        let className = index === 0 ? "fire rounded-t pt-2" : "";
        if (index === runs.length - 1) {
          className = "rounded-b";
        }
        let emoji = "🥇";

        switch (index) {
          case 0:
            emoji = "🥇";
            break;
          case 1:
            emoji = "🥈";
            break;
          case 2:
            emoji = "🥉";
            break;
          case 3:
            emoji = "4️⃣";
            break;
          case 4:
            emoji = "5️⃣";
            break;
          case 5:
            emoji = "6️⃣";
            break;
          case 6:
            emoji = "7️⃣";
            break;
          case 7:
            emoji = "8️⃣";
            break;
          case 8:
            emoji = "9️⃣";
            break;
          case 9:
            emoji = "🔟";
            break;
          default:
            emoji = "🕙";
            break;
        }

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
