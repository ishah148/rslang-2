import React from "react"
import styles from "../Stats.module.scss"
import { GameStats } from "./GameStats"

import headphones from "../assets/headphones.png"
import sprint from "../assets/sprint.png"

export function GamesStats() {
  return (
    <div className={styles.gamesStats}>
      <GameStats title={"Audio challenge"} newWords={10} accuracy={29} streak={5} img={headphones} />
      <GameStats title={"Sprint"} newWords={89} accuracy={60} streak={5} img={sprint} />
    </div>
  )
}
