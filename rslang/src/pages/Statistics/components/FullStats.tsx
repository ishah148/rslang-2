import React from "react"
import styles from '../Stats.module.scss'
import { BarChart } from "./charts/BarChart";
import { LinearChart } from "./charts/LinearChart";

export function FullStats() {
  return (
    <div className={styles.fullStats}>
      <BarChart/>
      <LinearChart/>
    </div>
  )
}