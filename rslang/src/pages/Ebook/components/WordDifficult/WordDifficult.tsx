import React, { useEffect, useState } from "react"
import styles from "./WordDifficult.module.scss"

import playBtn from "../../../../assets/img/playBtn.png"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { useUserWordsActionsCreators } from "../../../../hooks/useActions"
import { CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import { IUserAggregatedWord } from "../../../../services/api/AggregatedWords"

export default function WordDifficult({ dataWord }: { dataWord: IUserAggregatedWord }) {
  const { userWords } = useTypedSelector((state) => state.userWords)
  const { setDificultyUserWord, setLearndUserWord } = useUserWordsActionsCreators()

  function playButton() {
    const audio = new Audio("https://rslang-rss.herokuapp.com/" + dataWord.audio)
    audio.play()
  }
  console.log(dataWord)
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

      {/* <div
        style={{
          display: "flex",
          marginTop: -20,
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        {localStorage.getItem("user") ? (
          <>
            <button
              style={{ width: 200, backgroundColor: dataWord?.userWords?.difficulty === "hard" ? "green" : "" }}
              onClick={() => setDificultyUserWord(dataWord._id, userWords)}
            >
              <p>Hard</p>
            </button>
            <button
              style={{ width: 200, backgroundColor: dataWord?.userWords?.optional?.isLearned === true ? "green" : "" }}
              onClick={() => setLearndUserWord(dataWord._id, userWords)}
            >
              <p>Learnd</p>
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button
                style={{ width: 200, backgroundColor: dataWord?.userWords?.difficulty === "hard" ? "green" : "" }}
              >
                <p>Hard</p>
              </button>
            </Link>
            <Link to="/signin">
              <button
                style={{
                  width: 200,
                  backgroundColor: dataWord?.userWords?.optional?.isLearned === true ? "green" : "",
                }}
              >
                <p>Learnd</p>
              </button>
            </Link>
          </>
        )}
      </div>
      {dataWord?.userWords?.optional ? (
        <ul
          style={{
            display: "flex",
            marginTop: -20,
            justifyContent: "space-between",
            flexWrap: "wrap",
            listStyle: "none",
          }}
        >
          <li>difficulty: {dataWord.userWords?.difficulty}</li>
          <li>Is learnd: {dataWord.userWords?.optional?.isLearned ? "yes" : "no"}</li>
          <li>
            Progress bar: {dataWord.userWords?.optional?.progressBar} / {dataWord.userWords?.optional?.progressBarSize}
          </li>
          <li>is New: {dataWord.userWords?.optional?.isNew ? "yes" : "no"}</li>
          <li>meetingCounter: {dataWord.userWords?.optional?.meetingCounter}</li>
        </ul>
      ) : (
        <ul
          style={{
            display: "flex",
            marginTop: -20,
            justifyContent: "space-between",
            flexWrap: "wrap",
            listStyle: "none",
          }}
        >
          <li>difficulty: null</li>
          <li>Is learnd: null</li>
          <li>Progress bar: null</li>
          <li>is New: null</li>
          <li>meetingCounter: null</li>
        </ul>
      )} */}
    </>
  )
}
