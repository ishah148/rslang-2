import React from "react"
import SectionItem from "./components/SectionItem/SectionItem"
import styles from "./Ebook.module.scss"
import gameImage from "../../assets/img/mainGames.png"
import { NavLink } from "react-router-dom"
import WordItem from "./components/WordItem/WordItem"
import Paginatinon from "./components/Pagination/Pagination"
import { WordsApi } from "../../services/api"
import { IWord } from "../../services/api_types"

const SECTIONS = [0, 1, 2, 3, 4, 5, 6]

function Ebook() {
  const [dataWords, setDataWords] = React.useState<IWord[]>([])
  const [curChapter, setCurChapter] = React.useState("0")

  React.useEffect(() => {
    clickHandler(0, curChapter)
  }, [])

  async function clickHandler(page: number, group: string) {
    const { status, data } = await WordsApi.getWords(page, Number(group))
    setCurChapter(group)
    setDataWords(data)
  }

  return (
    <div className={styles.ebookContainer}>
      <div className={styles.ebookMenu}>
        <div className={styles.itemsContainer}>
          {SECTIONS.map((elem) => {
            return <SectionItem key={elem.toString()} group={elem.toString()} clickHandler={clickHandler} />
          })}
        </div>
        <div className={styles.gamesContainer}>
          <NavLink to="/games/audiocall">
            <div className={styles.gamesItem}>
              <img src={gameImage} className={styles.gamesImage}></img>
              <p>AudioCall</p>
            </div>
          </NavLink>
          <NavLink to="/games/game2">
            <div className={styles.gamesItem}>
              <img src={gameImage} className={styles.gamesImage}></img>
              <p>Sprint</p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={styles.ebookWords}>
        {dataWords.map((elem) => {
          return <WordItem key={elem.id} dataWord={elem} />
        })}
      </div>
      <Paginatinon chapter={curChapter} clickHandler={clickHandler} />
    </div>
  )
}
export default Ebook
