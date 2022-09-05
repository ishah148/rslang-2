import React, { useEffect, useState } from "react"
import styles from "./WordItem.module.scss"
import { IWord } from "../../../../services/api_types"

import playBtn from "../../../../assets/img/playBtn.png"
import { ServerUserWord } from "../../../../models/UserWordsModels"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { useUserWordsActionsCreators } from "../../../../hooks/useActions"
import { CircularProgress } from "@mui/material"

// interface IWordObject {
//   dataWord: IWord
// }

export default function WordItem({ dataWord }: any) {
  const { userWords } = useTypedSelector((state) => state.userWords)
  const { setDificultyUserWord, setLearndUserWord } = useUserWordsActionsCreators()

  function playButton() {
    const audio = new Audio("https://rslang-rss.herokuapp.com/" + dataWord.audio)
    audio.play()
  }

  return (
    <>
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
          marginTop: -20,
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        <button
          style={{ width: 200, backgroundColor: dataWord.difficulty === "hard" ? "green" : "" }}
          onClick={() => setDificultyUserWord(dataWord.id, userWords)}
        >
          <p>Hard</p>
        </button>
        <button
          style={{ width: 200, backgroundColor: dataWord?.optional?.isLearned === true ? "green" : "" }}
          onClick={() => setLearndUserWord(dataWord.id, userWords)}
        >
          <p>Learnd</p>
        </button>
      </div>
      {dataWord.optional && (
        <ul
          style={{
            display: "flex",
            marginTop: -20,
            justifyContent: "space-between",
            flexWrap: "wrap",
            listStyle: "none",
          }}
        >
          <li>difficulty: {dataWord.difficulty}</li>
          <li>Is learnd: {dataWord.optional.isLearned ? "yes" : "no"}</li>
          <li>
            Progress bar: {dataWord.optional.progressBar} / {dataWord.difficulty === "hard" ? "5" : "3"}
          </li>
          <li>is New: {dataWord.optional.isNew ? "yes" : "no"}</li>
          <li>meetingCounter: {dataWord.optional.meetingCounter}</li>
        </ul>
      )}
    </>
  )
}
