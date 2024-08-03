"use client";

import { Suspense } from "react";

import Leaderboard from "./components/Leaderboard";

export default function Home() {
  return (
    <Suspense>
      <Leaderboard />
    </Suspense>
  );
}
