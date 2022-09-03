import React from "react"
import styles from '../Stats.module.scss'
import { GameStats } from "./GameStats"

export function GamesStats() {
  return (
    <div className={styles.gamesStats}>
        <GameStats title={"Savannah"} newWords={0} accuracy={69} streak={5} img={"../assets/lion.png"}/>
        <GameStats title={"Savannah"} newWords={10} accuracy={29} streak={5} img={"../assets/headphones.png"}/>
        <GameStats title={"Savannah"} newWords={1000} accuracy={6} streak={5} img={"../assets/imaginarium.png"}/>
        <GameStats title={"Savannah"} newWords={89} accuracy={60} streak={5} img={"../assets/sprint.png"}/>
    </div>
  )
}