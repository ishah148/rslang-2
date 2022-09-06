import React, { useEffect, useState } from "react"
import styles from "./WordDifficult.module.scss"

import playBtn from "../../../../assets/img/playBtn.png"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { useUserWordsActionsCreators } from "../../../../hooks/useActions"
import { IUserAggregatedWord } from "../../../../services/api/AggregatedWords"

export default function WordDifficult({
  dataWord,
  setWordsCount,
}: {
  dataWord: IUserAggregatedWord
  setWordsCount: (prev: (prev: number) => number) => void
}) {
  const { userWords } = useTypedSelector((state) => state.userWords)
  const { setDificultyUserWord, setLearndUserWord } = useUserWordsActionsCreators()

  function playButton() {
    const audio = new Audio("https://rslang-rss.herokuapp.com/" + dataWord.audio)
    audio.play()
  }

  const [show, setShow] = useState(true)

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <div className={styles.wordcontainer}>
        <img className={styles.wordImage} src={"https://rslang-rss.herokuapp.com/" + dataWord.image}></img>
        <div className={styles.wordInfo}>
          <div className={styles.wordItem}>
            <p className={styles.word}>{dataWord.word}</p>
            <p className={styles.wordTranscription}>{dataWord.transcription}</p>
            <p className={styles.wordTranslate}>{dataWord.wordTranslate}</p>
          </div>
          <div className={styles.wordSubinfo}>
            <div className={styles.wordsExample}>
              <p className={styles.wordText} dangerouslySetInnerHTML={{ __html: dataWord.textExample }}></p>
              <p
                className={styles.wordTextTranslate}
                dangerouslySetInnerHTML={{ __html: dataWord.textExampleTranslate }}
              ></p>
            </div>
            <div className={styles.wordsExample}>
              <p className={styles.wordText} dangerouslySetInnerHTML={{ __html: dataWord.textMeaning }}></p>
              <p
                className={styles.wordTextTranslate}
                dangerouslySetInnerHTML={{ __html: dataWord.textMeaningTranslate }}
              ></p>
            </div>
          </div>
        </div>

        <div className={styles.btnContainer}>
          <img draggable="false" src={playBtn} className={styles.playBtn} onClick={playButton}></img>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 10,
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        <button
          style={{ width: 200, backgroundColor: dataWord.userWord.difficulty === "hard" ? "green" : "" }}
          onClick={() => {
            setShow(false)
            setWordsCount((prev) => prev - 1)
            setDificultyUserWord(dataWord._id, userWords)
          }}
        >
          <p>X</p>
        </button>
        {/* <button
          style={{ width: 200, backgroundColor: dataWord.userWord.optional.isLearned === true ? "green" : "" }}
          onClick={() => {
            setShow(false)
            setLearndUserWord(dataWord._id, userWords)
          }}
        >
          <p>Learnd</p>
        </button> */}
      </div>
      <ul
        style={{
          display: "flex",
          marginTop: 10,
          justifyContent: "space-between",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        <li>difficulty: {dataWord.userWord.difficulty}</li>
        <li>Is learnd: {dataWord.userWord.optional.isLearned ? "yes" : "no"}</li>
        <li>
          Progress bar: {dataWord.userWord.optional.progressBar} / {dataWord.userWord.optional.progressBarSize}
        </li>
        <li>is New: {dataWord.userWord.optional.isNew ? "yes" : "no"}</li>
        <li>meetingCounter: {dataWord.userWord.optional.meetingCounter}</li>
      </ul>
    </div>
  )
}
