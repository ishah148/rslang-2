import React from "react"
import styles from "./SectionItem.module.scss"

interface SectionItemProps {
  group: string
  clickHandler: (page: number, group: string) => void
}

const defaultPage = 0

export default function SectionItem({ group, clickHandler }: SectionItemProps) {
  return (
    <div className={styles.itemcontainer} onClick={() => clickHandler(defaultPage, group)}>
      Chapter {Number(group) + 1}
    </div>
  )
}
