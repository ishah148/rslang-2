import React, { useEffect } from "react"
import styles from "./Pagintaion.module.scss"

interface SectionItemProps {
  chapter: number
  clickHandler: (page: number, group: number) => void
  curPage: number
  setCurPage: (prev: (prev: number) => number) => void
}

export default function Paginatinon({ chapter, clickHandler, curPage, setCurPage }: SectionItemProps) {
  useEffect(() => {
    clickHandler(curPage, chapter)
  }, [curPage])

  function nextPage() {
    if (curPage >= 29) {
      setCurPage((_) => 29)
    } else {
      setCurPage((value) => value + 1)
    }
  }

  function prevPage() {
    if (curPage <= 0) {
      setCurPage((_) => 0)
    } else {
      setCurPage((value) => value - 1)
    }
  }

  return (
    <div className={styles.pagintaion}>
      <div className={styles.pagintaionContainer}>
        <div className={styles.prevBtn} onClick={prevPage}>
          &#9668;
        </div>
        <div className={styles.curBtn}>{curPage + 1} of 30</div>
        <div className={styles.nextBtn} onClick={nextPage}>
          &#9658;
        </div>
      </div>
    </div>
  )
}
