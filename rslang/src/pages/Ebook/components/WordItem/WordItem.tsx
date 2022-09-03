import React from "react"
import styles from "./WordItem.module.scss"
import { IWord } from "../../../../services/api_types"

import playBtn from "../../../../assets/img/playBtn.png"

interface IWordObject {
  dataWord: IWord
}

export default function WordItem({ dataWord }: IWordObject) {
  function playButton() {
    const audio = new Audio("https://rslang-rss.herokuapp.com/" + dataWord.audio)
    audio.play()
  }

  return (
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
  )
}
