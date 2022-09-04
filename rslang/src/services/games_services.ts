
import { GameData, UserWord } from "../models/UserWordsModels";
import { UserWordsApi } from "./api/UserWords_api";

export class GamesService {
  static async updateGameData(gameData: GameData, gameName: string) {
    // gameName либо "audioChallenge" либо "sprint"
    // StatsApi.updateUserStats(gameData);
    // StatsService.updateUserStats(gameData)
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
      for (const id of idArray) {
        const response = await UserWordsApi.getUserWord(id)
        if (response.status === 404) {
          newWordsCounter++
          continue
        }
        if (response.status !== 200) {
          throw new Error(`calcNewWords response.status is --- ${response.status}`)
        }
        const userWord = response.body
        if (
          !userWord ||
          userWord.optional?.isNew ||
          (!userWord.optional?.isNew && userWord?.optional?.meetingCounter > 0)
        ) {
          continue
        }
        newWordsCounter++
      }
    } catch (error) {
      console.log(error)
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
