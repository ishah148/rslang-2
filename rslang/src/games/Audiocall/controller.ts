import { IChoice, IResult, IRoundWord } from "../../redux/action-types/audiocall"
import { WordsApi } from "../../services/api"
import { IWord } from "../../services/api_types"
import { generateRandom } from "../../utils/math"
import { shuffleArr } from "../../utils/shuffle"
import { GamesService } from "../../services/games_services"
import { GameData } from "../../models/UserWordsModels"

export const maxPages = 29

const createChoice = (word: string, allWords: string[]) => {
  const wordsForChoice = shuffleArr<string>(allWords)
  const mocks: IChoice[] = []
  for (let i = 0; mocks.length < 4; i++) {
    if (wordsForChoice[i] === word) continue
    mocks.push({ wordTranslated: wordsForChoice[i], isCorrect: false })
  }
  return shuffleArr<IChoice>([...mocks, { wordTranslated: word, isCorrect: true }])
}

export const createRounds = async (group: number, page?: number) => {
  if (page === undefined) {
    page = generateRandom(1, maxPages)
  }
  const { data, status } = await WordsApi.getWords(page, group)
  if (status !== 200) throw Error("Ooops!, Seems somthing went wrong :(")
  const shuffledData = shuffleArr<IWord>(data)
  const allWords = shuffledData.map((el) => el.wordTranslate)
  const roundsWords: IRoundWord[] = shuffledData.map((item) => {
    const choice = createChoice(item.wordTranslate, allWords)
    return { ...item, choice }
  })
  return roundsWords
}

export const processAudiocallResult = async (correct: IResult, incorrect: IResult, allRaundResults: boolean[]) => {
  const resultObj: GameData = {
    wordsID: [],
    newWords: null,
    accuracy: null,
    bestStreak: null,
    corectness: {},
  }

  resultObj.wordsID = getAllWordsIDs(correct, incorrect)
  resultObj.newWords = await GamesService.calcNewWords(resultObj.wordsID)
  resultObj.accuracy = GamesService.calcAccuracy(allRaundResults)
  resultObj.bestStreak = GamesService.calcBestStreak(allRaundResults)
  resultObj.corectness = calcCorrectness(correct, incorrect)

  return resultObj
}

const getAllWordsIDs = (correct: IResult, incorrect: IResult): string[] => {
  const correctIDs = correct.words.map((el) => el.id)
  const incorrectIDs = incorrect.words.map((el) => el.id)
  return [...correctIDs, ...incorrectIDs]
}

const calcCorrectness = (correct: IResult, incorrect: IResult) => {
  const correctness: {
    [wordID: string]: boolean
  } = {}

  for (const word of correct.words) {
    correctness[word.id] = true
  }

  for (const word of incorrect.words) {
    correctness[word.id] = false
  }
  return correctness
}
function calcNewWords(): number {
  throw new Error("Function not implemented.")
}
