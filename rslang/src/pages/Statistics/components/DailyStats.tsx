import React from "react"
import styles from '../Stats.module.scss'
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