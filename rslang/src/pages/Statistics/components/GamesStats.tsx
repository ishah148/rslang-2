import React from "react"
import styles from "../Stats.module.scss"
import { GameStats } from "./GameStats"

import lion from "../assets/lion.png"
import headphones from "../assets/headphones.png"
import imaginarium from "../assets/imaginarium.png"
import sprint from "../assets/sprint.png"

export function GamesStats() {
  return (
    <div className={styles.gamesStats}>
      <GameStats title={"Savannah"} newWords={0} accuracy={69} streak={5} img={lion} />
      <GameStats title={"Savannah"} newWords={10} accuracy={29} streak={5} img={headphones} />
      <GameStats title={"Savannah"} newWords={1000} accuracy={6} streak={5} img={imaginarium} />
      <GameStats title={"Savannah"} newWords={89} accuracy={60} streak={5} img={sprint} />
    </div>
  )
}
