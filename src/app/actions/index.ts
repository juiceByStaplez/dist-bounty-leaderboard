"use server";
import prisma from "@/app/lib/prisma";

export async function getRuns() {
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

function secondsToTime(seconds: number): String {
  const time = new Date(seconds * 1000).toISOString().slice(11, 19);
  return time;
}
