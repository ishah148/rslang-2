import React, { useEffect, useState } from "react"
import { DailyStatsData } from "../../../models/StatsModels"
import { StatsService } from "../../../services/stats_service"
import styles from "../Stats.module.scss"
import { DailyStatsDataDefault } from "./charts/models/defaultData"

export function WordsStats() {
  const obj = {}
  const [data, setData] = useState<DailyStatsData>(DailyStatsDataDefault)
  useEffect(() => {
    (async function () {
      const res = await StatsService.getDailyStatistics()
      setData(() => res)
      console.log("data", data)
    })()
  }, [])

  return (
    <div className={styles.wordsStats}>
      <p>Новых слов за сегодня : {data.newWords}</p>
      <p>Сегодня изучено слов : {data.learnedWords}</p>
      <p>Общая точность прохождения игр : {data.totalAccuracy}</p>
    </div>
  )
}
