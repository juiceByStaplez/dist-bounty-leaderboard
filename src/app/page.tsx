import Image from "next/image";

import prisma from "../../lib/prisma";

export default async function Home() {
  async function getRuns() {
    "use server";
    let leaderboard = await prisma.runs.findMany({
      orderBy: [
        {
          time: "asc",
        },
      ],
    });

    leaderboard = leaderboard.map((run) => {
      const time = secondsToTime(run.time);

      return { ...run, time };
    });

    return leaderboard;
  }

  const runs = await getRuns();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {runs.map((run, index) => {
        return (
          <div className="entry" key={index}>
            {run.name} - {run.time}
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
