import React, { useEffect, useState } from "react"
import { DailyStatsData } from "../../../models/StatsModels"
import { StatsService } from "../../../services/stats_service"
import styles from "../Stats.module.scss"
import { DailyStatsDataDefault } from "./charts/models/defaultData"

export function WordsStats() {
  const obj = {}
  const [test,setTest] = useState(false)
  const [data,setData] = useState<DailyStatsData>(DailyStatsDataDefault)
  useEffect(()=>{
      (async function(){
        const res = await StatsService.getDailyStatistics()
        setData(()=>res)
        console.log('data',data)
      })()
  },[test])

  return (
    <div className={styles.wordsStats}>

      <p>one</p>
      <p>two</p>
      <p>three</p>
      <button onClick={()=>{setTest(!test)}}>test</button>
    </div>
  )
}
