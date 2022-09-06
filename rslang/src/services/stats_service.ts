import { DailyStatsData, FullStatsData, StatsModel, StatsUpdateObject } from "../models/StatsModels";
import { GameData } from "../models/UserWordsModels";
import { StatsApi } from "./api/stats_api";
import { UtilsService } from "./utils_service";

export class StatsService {
  static async updateStatisticWithGameData(gameData: GameData, gameName: string, statsUpdateObject: StatsUpdateObject) {
    console.log('GAMEDATA ---  ', gameData);
    console.log('GAMENAME ---  ', gameName);
    console.log('STATSUPDATEOBJ ---  ', statsUpdateObject);

    const date = UtilsService.getCurrentDate();

    const newStatistics: StatsModel = {
      learnedWords: null,
      optional: {
        [date]: {
          newWords: null,
          learnedWords: null,
          accuracy: null,
          totalLearnedWords: null,
          audioChallenge: {
            newWords: null,
            accuracy: [],
            bestStreak: null,
          },

          sprint: {
            newWords: null,
            accuracy: [],
            bestStreak: null,
          }
        }
      }
    }
    try {

      const response = await StatsApi.getUserStats();

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`updateStatisticWithGameData in StatsService response.status is --- ${response.status}`)
      }

      if (response.status === 404) {
        const statsForCurrentDate = newStatistics.optional[date];

        if (gameName === 'sprint') {
          statsForCurrentDate.sprint.accuracy.push(gameData.accuracy as number);
          statsForCurrentDate.sprint.newWords = gameData.newWords;
          statsForCurrentDate.sprint.bestStreak = gameData.bestStreak;
          statsForCurrentDate.audioChallenge.newWords = 0;
          statsForCurrentDate.audioChallenge.bestStreak = 0;
        }

        if (gameName === 'audioChallenge') {
          statsForCurrentDate.audioChallenge.accuracy.push(gameData.accuracy as number);
          statsForCurrentDate.audioChallenge.newWords = gameData.newWords;
          statsForCurrentDate.audioChallenge.bestStreak = gameData.bestStreak;
          statsForCurrentDate.sprint.newWords = 0;
          statsForCurrentDate.sprint.bestStreak = 0;
        }
        statsForCurrentDate.accuracy = UtilsService.calcAverageAccuracy(statsForCurrentDate.sprint.accuracy, statsForCurrentDate.audioChallenge.accuracy);
        statsForCurrentDate.newWords = (statsForCurrentDate.sprint.newWords as number) + (statsForCurrentDate.audioChallenge.newWords as number);
        statsForCurrentDate.learnedWords = statsUpdateObject.newLearnedWords;
        statsForCurrentDate.totalLearnedWords = statsUpdateObject.newLearnedWords;
        newStatistics.learnedWords = statsUpdateObject.newLearnedWords;
        if (statsUpdateObject.newLearnedWords < 0) {
          console.log('WTF BOOOYYY');
          newStatistics.learnedWords = 0;
        }
        console.log(newStatistics)
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }


  static async getDailyStatistics(): Promise<DailyStatsData> {
    return {
      newWords: 112,
      learnedWords: 100,
      totalAccuracy: 60,
      audioChallenge: {
        newWords: 67,
        accuracy: 100,
        bestStreak: 19,
      },
      sprint: {
        newWords: 45,
        accuracy: 40,
        bestStreak: 26,
      }
    }

  }

  static async getFullStatistics(): Promise<FullStatsData> {
    const d1 = '2022/9/6';
    const d2 = '2022/9/7';
    const d3 = '2022/9/8';
    const d4 = '2022/9/12';
    const d5 = '2022/9/15';
    const d6 = '2022/9/16';
    const d7 = '2022/9/20';
    const d8 = '2022/9/21';
    const d9 = '2022/9/22';
    const d10 = '2022/9/23';
    return {
      [d1]: {
        newWords: 30,
        totalLearnedWords: 123,
      },
      [d2]: {
        newWords: 40,
        totalLearnedWords: 167,
      },
      [d3]: {
        newWords: 50,
        totalLearnedWords: 223,
      },
      [d4]: {
        newWords: 50,
        totalLearnedWords: 223,
      },
      [d5]: {
        newWords: 69,
        totalLearnedWords: 300,
      },
      [d6]: {
        newWords: 78,
        totalLearnedWords: 467,
      },
      [d7]: {
        newWords: 79,
        totalLearnedWords: 468,
      },
      [d8]: {
        newWords: 120,
        totalLearnedWords: 500,
      },
      [d9]: {
        newWords: 160,
        totalLearnedWords: 589,
      },
      [d10]: {
        newWords: 201,
        totalLearnedWords: 601,
      },
    }
  }
}
