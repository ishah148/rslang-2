import React from "react"
import styles from '../Stats.module.scss'

export function WordsStats() {
  const obj = {}
  return (
    <div className={styles.wordsStats}>
      <p>accurate</p>
      <p>newWords</p>
      <p>Some</p>
    </div>
  )
}