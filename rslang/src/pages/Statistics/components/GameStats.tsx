import React from "react"
import styles from '../Stats.module.scss'
import { GameStatsProps } from "../../../models/StatsModels"

export function GameStats({title, newWords, accuracy, streak, img}: GameStatsProps) {
  return (
    <div className={styles.gameStats}>
      <div>
        <img src={img} alt={img} />
        <h2>{title}</h2>
      </div>
      <p>{newWords} new words</p>
      <p>{accuracy}% accuracy</p>
      <p>{streak} streak</p>
    </div>
  )
}