import React, { useEffect, useState } from "react"
import { DailyStatsData } from "../../../models/StatsModels"
import { StatsService } from "../../../services/stats_service"
import styles from "../Stats.module.scss"
import { DailyStatsDataDefault } from "./charts/models/defaultData"

export function WordsStats() {
  const obj = {}
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
      <p>Новых слов за сегодня : {data.newWords}</p>
      <p>Сегодня изучено слов : {data.learnedWords}</p>
      <p>Общая точность прохождения игр : {data.totalAccuracy}</p>
    </div>
  )
}
