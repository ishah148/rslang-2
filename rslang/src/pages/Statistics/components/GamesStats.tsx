import React, { useEffect, useState } from "react"
import styles from "../Stats.module.scss"
import { GameStats } from "./GameStats"

import headphones from "../assets/headphones.png"
import sprint from "../assets/sprint.png"
import { DailyStatsData } from "../../../models/StatsModels"
import { StatsService } from "../../../services/stats_service"
import { DailyStatsDataDefault } from "./charts/models/defaultData"

export function GamesStats() {
  const [data, setData] = useState<DailyStatsData>(DailyStatsDataDefault)
  useEffect(() => {
    (async function () {
      const res = await StatsService.getDailyStatistics()
      setData(() => res)
    })()
  }, [])

  return (
    <div className={styles.gamesStats}>
      <GameStats
        title={"Audio challenge"}
        newWords={data.audioChallenge.newWords || 0}
        accuracy={data.audioChallenge.accuracy || 0}
        streak={data.audioChallenge.bestStreak || 0}
        img={headphones}
      />
      <GameStats title={"Sprint"} newWords={data.sprint.newWords || 0} accuracy={data.sprint.accuracy || 0} streak={data.sprint.bestStreak || 0} img={sprint} />
    </div>
  )
}
