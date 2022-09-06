import React, { useEffect, useState } from "react"
import { FullStatsData } from "../../models/StatsModels"
import { StatsService } from "../../services/stats_service"
import { DailyStats } from "./components/DailyStats"
import { FullStats } from "./components/FullStats"
import styles from "./Stats.module.scss"

function Stats() {
  const [page, switchPage] = useState(true)
  const [dataGraph, setDataGraph] = useState<FullStatsData>()

  return (
    <div className={styles.container}>
      <div className={styles.buttons__container}>
        <button className={styles.button__dailyStats} onClick={() => switchPage(true)}>
          Daily Statistic
        </button>
        <button className={styles.button__fullStats} onClick={() => switchPage(false)}>
          Full Statistic
        </button>
      </div>

      <div className={styles.page}>
        {<h1>{page ? "DAILY STATISTIC" : "FULL STATISTIC"}</h1>}
        {page && <DailyStats />}
        {!page && <FullStats />}
      </div>
    </div>
  )
}
export default Stats
