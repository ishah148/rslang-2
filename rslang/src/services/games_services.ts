import { UserWordsApi } from "./api/UserWords_api";
import { GameData } from "../models/UserWordsModels"

export class GamesService {
  static updateGameData(data: GameData, gameName: string) {
    //! gameName либо "audioChallenge" либо "sprint"
    //отсюда нужно в статистику отправлять новые слова
    // StatsApi.updateUserStats(data);
  }

  static async calcNewWords(idArray: string[]): Promise<number> {
    let newWordsCounter = 0;
    try {
      for (const id of idArray) {
        const response = await UserWordsApi.getUserWord(id);
        if (response.status === 404) {
          newWordsCounter++;
          continue;
        }
        if (response.status !== 200) {
          throw new Error(`calcNewWords response.status is --- ${response.status}`);
        }
        const userWord = response.body;
        if (
          !userWord ||
          userWord.optional?.isNew ||
          (!userWord.optional?.isNew && userWord?.optional?.meetingCounter > 0)
        ) {
          continue;
        }
        newWordsCounter++;

      }
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message);
    }
    return newWordsCounter;
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
