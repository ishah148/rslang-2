import React, { useEffect, useState } from "react"
import styles from "./WordItem.module.scss"
import { IWord } from "../../../../services/api_types"

import playBtn from "../../../../assets/img/playBtn.png"
import { ServerUserWord } from "../../../../models/UserWordsModels"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"
import { useUserWordsActionsCreators } from "../../../../hooks/useActions"
import { CircularProgress } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import { IUserWordsWithCurrentWords } from "../../Ebook"

interface IWordObject {
  dataWord: IUserWordsWithCurrentWords
  currentChapter: number
}

const BACKGROUNDS = ["#4d5c6c", "#5c5c73", "#736b4e", "#68483b", "#5e6156", "#735e63", "#374829"]

export default function WordItem({ dataWord, currentChapter }: IWordObject) {
  console.log(BACKGROUNDS[currentChapter])
  const { userWords } = useTypedSelector((state) => state.userWords)
  const { setDificultyUserWord, setLearndUserWord } = useUserWordsActionsCreators()

  function playButton() {
    const audio = new Audio("https://rslang-rss.herokuapp.com/" + dataWord.audio)
    audio.play()
  }

  return (
    <>
      <div className={styles.wordcontainer} style={{ background: `${BACKGROUNDS[currentChapter]}` }}>
        <div className={styles.wordCard}>
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

        <div className={styles.optionalWrapper}>
          <div
            className={styles.buttonsHardness}
            style={
              {
                // display: "flex",
                // marginTop: -20,
                // gap: 10,
                // justifyContent: "center",
                // flexWrap: "wrap",
                // listStyle: "none",
              }
            }
          >
            {localStorage.getItem("user") ? (
              <>
                <button
                  className={dataWord?.difficulty === "hard" ? styles.btnHardActive : styles.btnHard}
                  onClick={() => setDificultyUserWord(dataWord.id, userWords)}
                >
                  <p>Hard</p>
                </button>
                <button
                  className={dataWord?.optional?.isLearned === true ? styles.btnLearnedActive : styles.btnLearned}
                  // style={{ width: 200, backgroundColor: dataWord?.optional?.isLearned === true ? "green" : "" }}
                  onClick={() => setLearndUserWord(dataWord.id, userWords)}
                >
                  <p>Learnd</p>
                </button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <button style={{ width: 200, backgroundColor: dataWord.difficulty === "hard" ? "green" : "" }}>
                    <p>Hard</p>
                  </button>
                </Link>
                <Link to="/signin">
                  <button
                    style={{ width: 200, backgroundColor: dataWord?.optional?.isLearned === true ? "green" : "" }}
                  >
                    <p>Learnd</p>
                  </button>
                </Link>
              </>
            )}
          </div>
          {dataWord.optional ? (
            <>
              <div className={styles.progressItem}>
                <p className={styles.progressTitle}>Learning progress:</p>
                {Array.from("1".repeat(dataWord.optional.progressBarSize)).map((elem, index) => {
                  return (
                    <div
                      style={{
                        height: `${20 + 2 * index}px`,
                        width: `${20 + 2 * index}px`,
                        background: `${index < dataWord.optional.progressBar ? "#00aeff" : "#a5a5a5"}`,
                      }}
                      className={styles.progress}
                      key={index}
                    ></div>
                  )
                })}
              </div>

              <div className={styles.progressItem}>
                <p className={styles.progressTitle}>Learned:</p>
                <p className={styles.progressTitle}>{dataWord.optional.isLearned ? "Yes" : "No"}</p>
              </div>

              {dataWord.optional.isNew && (
                <div className={styles.progressItem}>
                  <p className={styles.progressNew}>{"New"}</p>
                </div>
              )}
            </>
          ) : (
            <p className={styles.progressTitle}>No info</p>
            // <ul
            //   className={styles.optionalContainer}
            //   style={{
            //     display: "flex",
            //     marginTop: -20,
            //     justifyContent: "space-between",
            //     flexWrap: "wrap",
            //     listStyle: "none",
            //   }}
            // >
            //   <li>difficulty: {dataWord.difficulty}</li>
            //   <li>Is learnd: {dataWord.optional.isLearned ? "yes" : "no"}</li>
            //   <li>
            //     Progress bar: {dataWord.optional.progressBar} / {dataWord.optional.progressBarSize}
            //   </li>
            //   <li>is New: {dataWord.optional.isNew ? "yes" : "no"}</li>
            //   <li>meetingCounter: {dataWord.optional.meetingCounter}</li>
            // </ul>
            // <ul
            //   style={{
            //     display: "flex",
            //     marginTop: -20,
            //     justifyContent: "space-between",
            //     flexWrap: "wrap",
            //     listStyle: "none",
            //   }}
            // >
            //   <li>difficulty: null</li>
            //   <li>Is learnd: null</li>
            //   <li>Progress bar: null</li>
            //   <li>is New: null</li>
            //   <li>meetingCounter: null</li>
            // </ul>
          )}
        </div>
      </div>
    </>
  )
}
