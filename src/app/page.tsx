import Image from "next/image";

import prisma from "../../lib/prisma";

export default async function Home() {
  async function getRuns() {
    "use server";
    const leaderboard = await prisma.runs.findMany({
      orderBy: [
        {
          time: "asc",
        },
      ],
    });

    const leaderboardWithConvertedTimes = leaderboard.map((run) => {
      const time = secondsToTime(run.time);

      return { ...run, time };
    });

    return leaderboardWithConvertedTimes;
  }

  const runs = await getRuns();

  return (
    <main className="flex min-h-screen flex-col items-start p-4">
      {runs.map((run, index) => {
        const className = index === 0 ? "fire" : "";
        let emoji = "🥇";
        if (index === 1) {
          emoji = "🥈";
        } else if (index === 2) {
          emoji = "🥉";
        }
        return (
          <div className={`entry ${className} flex`} key={index}>
            <div className="flex emoji mr-4 text-left">{emoji}</div>
            <span className="flex mr-4">{run.time}</span>
            <span className="flex">{run.name}</span>
          </div>
        );
      })}
    </main>
  );
}

function secondsToTime(seconds: number): String {
  const time = new Date(seconds * 1000).toISOString().slice(11, 19);
  return time;
}
