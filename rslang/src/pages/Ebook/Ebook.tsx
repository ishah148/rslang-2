import React, { useEffect } from "react"
import SectionItem from "./components/SectionItem/SectionItem"
import styles from "./Ebook.module.scss"
import gameImage from "../../assets/img/mainGames.png"
import { NavLink } from "react-router-dom"
import WordItem from "./components/WordItem/WordItem"
import Paginatinon from "./components/Pagination/Pagination"
import { WordsApi } from "../../services/api"
import { IWord } from "../../services/api_types"
import { useUserWordsActionsCreators } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { ServerUserWord } from "../../models/UserWordsModels"

const SECTIONS = [0, 1, 2, 3, 4, 5, 6]

interface IUserWordsWithCurrentWords extends IWord {
  difficulty: "easy" | "hard"
  optional: {
    isLearned: boolean
    progressBar: number // 1-2-3 для easy и 1-2-3-4-5 для hard
    progressBarSize: number //3 or 5
    isNew: boolean
    meetingCounter: number
  }
}

function Ebook() {
  const [dataWords, setDataWords] = React.useState<IWord[]>([])
  const [curChapter, setCurChapter] = React.useState("0")
  const [wordsToShow, setWordsToShow] = React.useState<Array<IWord | IUserWordsWithCurrentWords> | null>(null)

  const mergeUserWordsWithCurWords = (currentWords: IWord[], userWords: ServerUserWord[]) => {
    return currentWords.map((word) => {
      const foundedWord = userWords.find(({ wordId }) => wordId === word.id)
      if (foundedWord) {
        return { ...word, optional: foundedWord.optional, difficulty: foundedWord.difficulty }
      }
      return word
    })
  }

  const { isPending, userWords, error } = useTypedSelector((state) => state.userWords)
  const { getUserWords } = useUserWordsActionsCreators()

  React.useLayoutEffect(() => {
    getUserWords()
    clickHandler(0, curChapter)
  }, [])

  useEffect(() => {
    const mergedWords: Array<IWord | IUserWordsWithCurrentWords> = mergeUserWordsWithCurWords(dataWords, userWords)

    setWordsToShow(mergedWords)
  }, [userWords, dataWords])

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
        {wordsToShow?.map((elem) => {
          return <WordItem key={elem.id} dataWord={elem} />
        })}
      </div>
      <Paginatinon chapter={curChapter} clickHandler={clickHandler} />
    </div>
  )
}
export default Ebook
