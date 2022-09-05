import React, { useEffect } from "react"
import { GameData } from "../../../models/UserWordsModels"
import { rand } from "../../../utils/math"
import { findWordByid, SprintWord } from "../controller/utils"
import "./styles.scss"
type ResultProps = {
  result: GameData
  words: SprintWord[]
  resetAction: () => void
}

const Result = (props: ResultProps) => {
  const falsyWords = Object.entries(props.result.corectness).filter((i) => i[1] === false)
  const truewords = Object.entries(props.result.corectness).filter((i) => i[1] === true)

  return (
    <div className="result-wrapper">
      {props.words.length ? (
        <>
          <h1>Game Over</h1>
          <h2>Лучшее комбо:{props.result.bestStreak || 0}</h2>
          <h2>Точнось:{props.result.accuracy || 0} %</h2>
        </>
      ) : (
        <>
          <h1>Управление</h1>
          <h2>←- Да</h2>
          <h2>-→ Нет</h2>
          <h2>Esc - Остановить игру</h2>
        </>
      )}
      {props.words.length ? <h2>Ошибки:</h2> : ""}
      <p></p>
      {falsyWords.map((word) => {
        const findedWord = findWordByid(word[0], props.words)
        if (findedWord) {
          return (
            <p>
              {findedWord.word.word} - {findedWord.word.wordTranslate}
            </p>
          )
        }
      })}

      {props.words.length ? <h2>Угадал:</h2> : ""}

      {truewords.map((word) => {
        const findedWord = findWordByid(word[0], props.words)
        if (findedWord) {
          return (
            <p>
              {findedWord.word.word} - {findedWord.word.wordTranslate}
            </p>
          )
        }
      })}
      <button onClick={props.resetAction}>Close</button>
    </div>
  )
}

export default Result
