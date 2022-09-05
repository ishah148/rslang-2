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
  const sortedArr = Object.entries(props.result.corectness).sort((a, b) => +a[1] - +b[1])
  const falsyWords = Object.entries(props.result.corectness).filter((i) => i[1] === false)
  const truewords = Object.entries(props.result.corectness).filter((i) => i[1] === true)

  return (
    <div className="result-wrapper">
      <h1>Game Over</h1>
      <h2>Лучшее комбо:{props.result.bestStreak || 0}</h2>
      <h2>Точнось:{props.result.accuracy || 0} %</h2>
      <h2>Ошибки</h2>
      {falsyWords.map((word) => {
        const findedWord = findWordByid(word[0], props.words)
        if (findedWord) {
          return (
            <p>
              {findedWord.en} -{findedWord.ru}
            </p>
          )
        }
      })}
      <h2>Угадал</h2>
      {truewords.map((word) => {
        const findedWord = findWordByid(word[0], props.words)
        if (findedWord) {
          return (
            <p>
              {findedWord.en} - {findedWord.ru}
            </p>
          )
        }
      })}
      <button onClick={props.resetAction}>Close</button>
    </div>
  )
}

export default Result
