import React from "react"
import styles from "./SectionItem.module.scss"

interface SectionItemProps {
  group: number
  clickHandler: (page: number, group: number) => void
}

const defaultPage = 0

export default function SectionItem({ group, clickHandler }: SectionItemProps) {
  return (
    <div className={styles.itemcontainer} onClick={() => clickHandler(defaultPage, group)}>
      Chapter {group + 1}
    </div>
  )
}
