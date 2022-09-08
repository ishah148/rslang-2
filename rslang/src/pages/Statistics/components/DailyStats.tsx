import React from "react"
import { GamesStats } from "./GamesStats"
import { WordsStats } from "./WordsStats"

export function DailyStats() {
  return (
    <>
      <WordsStats/>
      <GamesStats/>
    </>
  )
}