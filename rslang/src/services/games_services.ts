
import { GameData, ServerUserWord, UserWord } from "../models/UserWordsModels";
import { UserWordsApi } from "./api/UserWords_api";

export class GamesService {
  static async updateGameData(gameData: GameData, gameName: string) {
    // gameName либо "audioChallenge" либо "sprint"
    // переделать с "20 запросов в цикле" на "получить массив пользовательских слов и локально перебирать"
    // StatsApi.updateUserStats(gameData);
    // StatsService.updateUserStats(gameData)
    if(gameName === 'sprint') {
      console.log('OBJECT KEYS', gameData.wordsID);
      gameData.newWords = await GamesService.calcNewWords(gameData.wordsID);
    }
    console.log('GAMEDATA',gameData);
    for (const wordID of gameData.wordsID) {
      const response = await UserWordsApi.getUserWord(wordID)
      if (response.status === 404) {
        // вынести в UserWords_Service (метод createNewUserWord)
        const newUserWord: UserWord = {
          difficulty: "easy",
          optional: {
            isLearned: false,
            progressBar: gameData.corectness[wordID] ? 1 : 0,
            progressBarSize: 3,
            isNew: true,
            meetingCounter: 1,
          },
        }
        UserWordsApi.createUserWord(wordID, newUserWord)
      }

      if (response.status === 200) {
        // вынести в UserWords_Service (метод updateUserWord)
        const userWord = response.body
        const newUserWord: UserWord = {
          difficulty: null,
          optional: {
            isLearned: null,
            progressBar: null,
            progressBarSize: null,
            isNew: null,
            meetingCounter: null,
          },
        }
      }

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`updateGameData response.status is --- ${response.status}`)
      }
    }
  }

  static async calcNewWords(idArray: string[]): Promise<number> {
    let newWordsCounter = 0
    try {
      const response = await UserWordsApi.getUserWords();

      if (response.status !== 200) {
        throw new Error(`calcNewWords response.status is --- ${response.status}`)
      }

      const userWordsArray: ServerUserWord[] = response.body
      for (const ID of idArray) {
        const userWord: ServerUserWord | undefined = userWordsArray.find((userWord) => ID === userWord.wordId)
        if (
          userWord &&
          (
            userWord.optional?.isNew ||
            (!userWord.optional?.isNew && userWord.optional?.meetingCounter > 3)
          )
        ) {
          continue
        }
        newWordsCounter++
      }
    } catch (error) {
      
      throw new Error((error as Error).message)
    }
    return newWordsCounter
  }

  static calcBestStreak(data: boolean[]): number {
    let bestStreak = 0
    data.reduce((streak, item) => {
      if (item) {
        streak++
        bestStreak = streak > bestStreak ? streak : bestStreak
      } else {
        streak = 0
      }
      return streak
    }, 0)
    return bestStreak
  }

  static calcAccuracy(data: boolean[]): number {
    const totalCount = data.length
    if (totalCount === 0) {
      return totalCount
    }
    const correctCount = data.reduce((counter, item) => (item ? ++counter : counter), 0)
    return +((correctCount / totalCount) * 100).toFixed()
  }
}
