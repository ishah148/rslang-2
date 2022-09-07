
import React, { useState } from "react"
import { DailyStats } from "./components/DailyStats"
import { FullStats } from "./components/FullStats"
import styles from "./Stats.module.scss"

function Stats() {
  const [page, switchPage] = useState(true)

  return (
    <div className={styles.container}>
      <div className={styles.buttons__container}>
        <button className={styles.buttonStats} onClick={() => switchPage(true)}>
          Daily Statistic
        </button>
        <button className={styles.buttonStats} onClick={() => switchPage(false)}>
          Full Statistic
        </button>
      </div>

      <div className={styles.page}>
        {<h2 className={styles.pageTitle}>{page ? "DAILY STATISTIC" : "FULL STATISTIC"}</h2>}
        {page && <DailyStats />}
        {!page && <FullStats />}
      </div>
    </div>
  )
}
export default Stats
