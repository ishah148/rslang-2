import React from "react"
import styles from "../Stats.module.scss"
import { GameStatsProps } from "../../../models/StatsModels"

export function GameStats({ title, newWords, accuracy, streak, img }: GameStatsProps) {
  return (
    <div className={styles.gameStats}>
      <img className={styles.gameStatsImg} src={img} alt={img} />
      <div>
        <h2 className={styles.statsTitle}>{title}</h2>
        <p>{newWords} new words</p>
        <p>{accuracy}% accuracy</p>
        <p>{streak} streak</p>
      </div>
    </div>
  )
}
