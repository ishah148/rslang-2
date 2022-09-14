import { IChoice, ILearndRoundWord, IResult, IRoundWord } from "../../redux/action-types/audiocall"
import { WordsApi } from "../../services/api"
import { IWord } from "../../services/api_types"
import { generateRandom } from "../../utils/math"
import { shuffleArr } from "../../utils/shuffle"
import { GamesService } from "../../services/games_services"
import { GameData, ServerUserWord } from "../../models/UserWordsModels"
import {
  IUserAggregatedWordsResponce,
  IWordWithUserData,
  UserAggregatedWordsApi,
} from "../../services/api/AggregatedWords"

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

const extractLearnd = async (aggregated: IUserAggregatedWordsResponce, page: number, group: number, total = 10) => {
  let ectractedLearnd: IWord[] = []
  const usedPages: number[] = []

  for (let i = page; ectractedLearnd.length <= total; i = generateRandom(0, maxPages)) {
    if (i in usedPages) continue

    const { data: words, status } = await WordsApi.getWords(i, group)

    ectractedLearnd = [
      ...ectractedLearnd,
      ...words.filter((word) => {
        const faunded = aggregated[0].paginatedResults.find((aggregatedWord) => {
          return aggregatedWord._id === word.id
        })
        if (faunded) {
          return false
        }
        return true
      }),
    ]

    usedPages.push(i)
    if (usedPages.length > 5) stop
  }

  return ectractedLearnd.slice(0, total)
}

const getLearndWords = async (
  aggregated: IUserAggregatedWordsResponce,
  page: number,
  group: number,
  total = 10,
  userWords: ServerUserWord[]
) => {
  const extractedLearnd = await extractLearnd(aggregated, page, group, total)

  return extractedLearnd.map((word): IWordWithUserData => {
    const faunded = userWords.find((userWord) => {
      return userWord.wordId === word.id
    })

    if (faunded === undefined) {
      return {
        ...word,
        difficulty: "easy",
        isLearned: false,
        progressBar: 0,
        progressBarSize: 3,
        isNew: true,
        meetingCounter: 0,
      }
    }

    return { ...word, ...faunded.optional, difficulty: faunded.difficulty }
  })
}

export const createRounds = async (
  group: number,
  page?: number,
  userWords?: ServerUserWord[]
): Promise<ILearndRoundWord[] | IRoundWord[]> => {
  if (localStorage.getItem("user") && page !== undefined && Array.isArray(userWords)) {
    const { body: aggregatedWords, status: aggregatedWordsStatus } =
      await UserAggregatedWordsApi.getLearndUserAggregatedWords()
    const wordsToLearn: IWordWithUserData[] = await getLearndWords(aggregatedWords, page, group, 20, userWords)
    const shuffledData = shuffleArr<IWordWithUserData>(wordsToLearn)
    const allWords = shuffledData.map((el) => el.wordTranslate)
    const roundsWords: ILearndRoundWord[] = shuffledData.map((item) => {
      const choice = createChoice(item.wordTranslate, allWords)
      return { ...item, choice }
    })
    return roundsWords
  }

  if (page === undefined) page = generateRandom(1, maxPages)
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
