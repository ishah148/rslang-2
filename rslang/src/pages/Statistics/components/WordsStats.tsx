import React, { useEffect, useState } from "react"
import { DailyStatsData } from "../../../models/StatsModels"
import { StatsService } from "../../../services/stats_service"
import styles from "../Stats.module.scss"
import { DailyStatsDataDefault } from "./charts/models/defaultData"

export function WordsStats() {
  const [pending,setPending] = useState(false)
  const [data, setData] = useState<DailyStatsData>(DailyStatsDataDefault)
  useEffect(() => {
    (async function () {
      setPending(true)
      const res = await StatsService.getDailyStatistics()
      setData(() => res)
      setPending(false)
    })()
  }, [])

  return (
    <div className={styles.wordsStats}>
      <h2>{pending?'Loading...':''}</h2>
      <p>New words for today :  {data.newWords}</p>
      <p>Words learned today :  {data.learnedWords}</p>
      <p>Overall games passing accuracy :  {data.totalAccuracy}</p>
    </div>
  )
}
