import React, { useEffect, useState } from "react"
import { FullStatsData } from "../../../models/StatsModels"
import { StatsService } from "../../../services/stats_service"
import styles from "../Stats.module.scss"
import { BarChart } from "./charts/BarChart"
import { LinearChart } from "./charts/LinearChart"

export function FullStats() {
  const [dataGraph, setDataGraph] = useState<FullStatsData>()
  const [pending,setPending] = useState(false)
  useEffect(() => {
    const abortController = new AbortController()
    ;(async function () {
      setPending(true)
      const res: FullStatsData = await StatsService.getFullStatistics()
      setPending(false)
      const data = Object.entries(res)
      if (data.length) setDataGraph({ ...dataGraph, ...res })
    })()
    return () => abortController.abort()
  }, [])

  return (
    <div className={styles.fullStats}>
      <h2 style={{textAlign:'center'}}>{pending?'Loading...':''}</h2>
      <BarChart data={dataGraph} />
      <LinearChart data={dataGraph}/>
    </div>
  )
}
