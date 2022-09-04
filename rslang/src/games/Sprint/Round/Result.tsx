import React, { useEffect } from "react"
import { GameData } from "../../../models/UserWordsModels"
import { rand } from "../../../utils/math"
import { SprintWord } from "../controller/utils"
import "./styles.scss"
type ResultProps = {
  result: GameData
  words: SprintWord[]
}

const Result = (props: ResultProps) => {
  // useEffect(()=>{console.log('',props)},[])
  const sortedArr = Object.entries(props.result.corectness).sort((a, b) => +a[1] - +b[1])
  const falsyWords = Object.entries(props.result.corectness).filter(i => i[1] === false)
  const truewords = Object.entries(props.result.corectness).filter(i => i[1] === true)
  useEffect(()=>{console.log('sorted',sortedArr)},[props])
  return (
    <div className="result-wrapper">
      <h1>Лучшее комбо:{props.result.bestStreak}</h1>
      <h1>Точнось:{props.result.accuracy} %</h1>
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
              {findedWord.en} -{findedWord.en} - {findedWord.isCorrect ? "верно" : "неверно"}
            </p>
          )
        }
      })}
    <button>Close</button>
    </div>
  )
}

export default Result

function findWordByid(id: string, words: SprintWord[] | null) {
  if (!words) return
  return words.find((word) => word.word.id === id)
}
