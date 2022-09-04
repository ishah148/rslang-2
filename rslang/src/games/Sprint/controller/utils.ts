import { GameData } from "../../../models/UserWordsModels"
import { IWord } from "../../../services/api_types"
import { rand } from "../../../utils/math"
import { shuffleArr } from "../../../utils/shuffle"

// generateRandom(0, 1)
export type SprintWord = {
  word: IWord
  en: string
  ru: string
  isCorrect: boolean
  result: boolean | null
}

export function prepareWords(words: IWord[]): SprintWord[] {
  return shuffleArr(words).map((word) => {
    const { en, ru, isCorrect } = createSprintWord(word, words)
    return { word, en, ru, isCorrect, result: null }
  })
}

function createSprintWord(word: IWord, words: IWord[]): { en: string; ru: string; isCorrect: boolean } {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const randBool = rand(0, 2)
  const en = word.word
  const ru = randBool ? word.wordTranslate : generateIncorectWord(word, words)

  return {
    en,
    ru,
    isCorrect: !!randBool,
  }
}

function generateIncorectWord(word: IWord, words: IWord[]): string {
  const randIndex = () => rand(0, words.length - 1)
  const inCorrectWords = words.filter((i) => i !== word)
  return inCorrectWords[randIndex()].wordTranslate
}

export function generateRandNumbers(count: number): number[] {
  const res = []
  for (let i = 0; i < count; i++) {
    res.push(rand(0, 20))
  }
  return res
}

export function calcAccuracy(arr: GameData) {
  const entries = Object.entries(arr.corectness)
  const length = entries.length
  return (
   ( entries.reduce((res, i) => {
      if (i[1] === true) res++
      return res
    }, 0) / length) * 100
  ).toFixed()
}
// export function calcAccuracy(arr: boolean[]) {
//   return ((arr.reduce((res, i) => {
//     if (i === true) res++
//     return res
//   }, 0) / arr.length) * 100).toFixed()
// }
