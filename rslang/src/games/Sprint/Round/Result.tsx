import React, { useEffect } from "react"
import { GameData } from "../../../models/UserWordsModels"
import { rand } from "../../../utils/math"
import { findWordByid, SprintWord } from "../controller/utils"
import "./styles.scss"
type ResultProps = {
  result: GameData
  words: SprintWord[]
  resetAction:()=>void
}

const Result = (props: ResultProps) => {
  // useEffect(()=>{console.log('',props)},[])
  const sortedArr = Object.entries(props.result.corectness).sort((a, b) => +a[1] - +b[1])
  const falsyWords = Object.entries(props.result.corectness).filter(i => i[1] === false)
  const truewords = Object.entries(props.result.corectness).filter(i => i[1] === true)
  useEffect(()=>{console.log('sorted',sortedArr)},[props])
  return (
    <div className="result-wrapper">
      <h1>Game Over</h1>
      <h2>Лучшее комбо:{props.result.bestStreak || 0}</h2>
      <h2>Точнось:{props.result.accuracy || 0} %</h2>
      {falsyWords.map((word) => {
        const findedWord = findWordByid(word[0], props.words)
        if (findedWord) {
          return (
            <p >
              {findedWord.en} -{findedWord.en} - {findedWord.isCorrect ? "верно" : "неверно"}
            </p>
          )
        }
      })}
      {truewords.map((word) => {
        const findedWord = findWordByid(word[0], props.words)
        if (findedWord) {
          return (
            <p >
              {findedWord.en} -{findedWord.ru} - {findedWord.isCorrect ? "верно" : "неверно"}
            </p>
          )
        }
      })}
    <button onClick={props.resetAction}>Close</button>
    </div>
  )
}

export default Result
