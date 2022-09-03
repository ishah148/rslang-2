import React from "react"
import styles from "./Pagintaion.module.scss"

interface SectionItemProps {
  chapter: string
  clickHandler: (page: number, group: string) => void
}

export default function Paginatinon({ chapter, clickHandler }: SectionItemProps) {
  const [curPage, setCurPage] = React.useState(1)

  React.useEffect(() => {
    setCurPage(1)
  }, [chapter])

  function nextPage() {
    if (curPage >= 30) {
      setCurPage(30)
    } else {
      setCurPage(curPage + 1)
      clickHandler(curPage, chapter)
      
    }
  }

  function prevPage() {
    if (curPage <= 1) {
      setCurPage(1)
    } else {
      setCurPage(curPage - 1)
      clickHandler(curPage, chapter)
      
    }
  }

  return (
    <div className={styles.pagintaion}>
      <div className={styles.pagintaionContainer}>
        <div className={styles.prevBtn} onClick={prevPage}>
          &#9668;
        </div>
        <div className={styles.curBtn}>{curPage} of 30</div>
        <div className={styles.nextBtn} onClick={nextPage}>
          &#9658;
        </div>
      </div>
    </div>
  )
}
