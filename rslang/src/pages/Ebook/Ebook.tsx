import React, { useEffect } from "react"
import SectionItem from "./components/SectionItem/SectionItem"
import styles from "./Ebook.module.scss"
import gameImage from "../../assets/img/mainGames.png"
import { Link, useNavigate } from "react-router-dom"
import WordItem from "./components/WordItem/WordItem"
import Paginatinon from "./components/Pagination/Pagination"
import { WordsApi } from "../../services/api"
import { IWord } from "../../services/api_types"
import {
  useAudiocallActionsCreators,
  useSprintActionsCreators,
  useUserWordsActionsCreators,
} from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { ServerUserWord } from "../../models/UserWordsModels"
import { IUserAggregatedWordsResponce, UserAggregatedWordsApi } from "../../services/api/AggregatedWords"
import LinearProgress from "@mui/material/LinearProgress/LinearProgress"
import HardWords from "./components/HardWords"

const SECTIONS = [0, 1, 2, 3, 4, 5, 6]
const BACKGROUNDS = ["#abcdef", "#ccccff", "#ffedae", "#e7a083", "#d0d7c0", "#ffd1dc", "#7ba05b"]

export interface IUserWordsWithCurrentWords extends IWord {
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
  const [curChapter, setCurChapter] = React.useState(0)
  const [curPage, setCurPage] = React.useState(0)
  const [wordsToShow, setWordsToShow] = React.useState<
    Array<IWord | IUserWordsWithCurrentWords> | IUserAggregatedWordsResponce | null
  >(null)
  const [loading, setLoading] = React.useState(false)
  const mergeUserWordsWithCurWords = (currentWords: IWord[], userWords: ServerUserWord[]) => {
    return currentWords.map((word) => {
      const foundedWord = userWords.find(({ wordId }) => wordId === word.id)
      if (foundedWord) {
        return { ...word, optional: foundedWord.optional, difficulty: foundedWord.difficulty }
      }
      return word
    })
  }
  const { sprintSetStart } = useSprintActionsCreators()
  function handleSprintStart(group: number, page: number) {
    sprintSetStart(group, [page])
  }

  const { audiocallStart } = useAudiocallActionsCreators()
  const handleAudiocallStart = (group: number, page: number) => {
    audiocallStart(group, page)
  }

  const { userWords } = useTypedSelector((state) => state.userWords)
  useEffect(() => {
    if (curChapter < 6) {
      const mergedWords: Array<IWord | IUserWordsWithCurrentWords> = mergeUserWordsWithCurWords(
        dataWords as IWord[],
        userWords
      )
      setWordsToShow(mergedWords)
    }
  }, [userWords, dataWords])

  const navigate = useNavigate()
  async function clickHandler(page: number, group: number) {
    setCurChapter(group)
    setCurPage(page)
    if (group < 6) {
      setLoading((prev) => true)
      const { status, data } = await WordsApi.getWords(page, group)
      setLoading((prev) => false)
      setDataWords(data)
    }

    if (group === 6) {
      if (!localStorage.getItem("user")) {
        navigate("/signin")
        return
      }
      setLoading((prev) => true)
      const { status, body } = await UserAggregatedWordsApi.getHardUserAggregatedWords()
      setLoading((prev) => false)
      setWordsToShow(body)
    }
  }

  const { getUserWords } = useUserWordsActionsCreators()
  React.useLayoutEffect(() => {
    if (localStorage.getItem("user")) getUserWords()
  }, [])

  return (
    <div className={styles.ebookContainer} style={{ background: `${BACKGROUNDS[curChapter]}` }}>
      <div className={styles.container}>
        <div className={styles.ebookMenu}>
          <div className={styles.itemsContainer}>
            {SECTIONS.map((elem) => {
              return <SectionItem key={elem.toString()} group={elem} clickHandler={clickHandler} />
            })}
          </div>
          {!(wordsToShow as IUserAggregatedWordsResponce)?.[0]?.paginatedResults && (
            <div className={styles.gamesContainer}>
              <Link to="/games/audiocall" onClick={() => handleAudiocallStart(curChapter, curPage)}>
                <div className={styles.gamesItem}>
                  <img src={gameImage} className={styles.gamesImage}></img>
                  <p>AudioCall</p>
                </div>
              </Link>
              <Link to="/games/sprint/round" onClick={() => handleSprintStart(curChapter, curPage)}>
                <div className={styles.gamesItem}>
                  <img src={gameImage} className={styles.gamesImage}></img>
                  <p>Sprint</p>
                </div>
              </Link>
            </div>
          )}
        </div>
        {loading && <LinearProgress />}
        <div className={styles.ebookWords}>
          {(wordsToShow as IUserAggregatedWordsResponce)?.[0]?.paginatedResults && (
            <HardWords wordsToShow={wordsToShow as IUserAggregatedWordsResponce} />
          )}

          {!(wordsToShow as IUserAggregatedWordsResponce)?.[0]?.paginatedResults &&
            (wordsToShow as IUserWordsWithCurrentWords[])?.map((elem) => {
              return <WordItem key={elem.id} dataWord={elem} currentChapter={curChapter} />
            })}
        </div>
        {!(wordsToShow as IUserAggregatedWordsResponce)?.[0]?.paginatedResults && (
          <Paginatinon chapter={curChapter} curPage={curPage} setCurPage={setCurPage} clickHandler={clickHandler} />
        )}
      </div>
    </div>
  )
}
export default Ebook
