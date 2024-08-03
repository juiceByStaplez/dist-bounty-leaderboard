"use server";
import prisma from "@/app/lib/prisma";

export async function getRuns(limit: number) {
  const leaderboard = await prisma.runs.findMany({
    take: limit,
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
