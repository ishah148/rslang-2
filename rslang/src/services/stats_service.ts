import { DailyStatsData, FullStatsData, ServerStatsModel, StatsForSpecificDate, StatsModel, StatsUpdateObject } from "../models/StatsModels";
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
    const newStatsForCurrentDate: StatsForSpecificDate = newStatistics.optional[date];

    try {

      const response = await StatsApi.getUserStats();

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`updateStatisticWithGameData in StatsService response.status is --- ${response.status}`)
      }

      if (response.status === 404) {

        StatsService.createStatsForCurrentDate(newStatsForCurrentDate, gameData, gameName, statsUpdateObject);
        newStatistics.learnedWords = statsUpdateObject.newLearnedWords;
        newStatsForCurrentDate.totalLearnedWords = statsUpdateObject.newLearnedWords;
        if (statsUpdateObject.newLearnedWords < 0) {
          console.log('WTFFFFFFFFFFFFFFFFFFF BOOOYYYYYYYYYYYYYYYYY');
          newStatistics.learnedWords = 0;
          newStatsForCurrentDate.learnedWords = 0;
          newStatsForCurrentDate.totalLearnedWords = 0;
        }
        console.log(newStatistics);
        await StatsApi.updateUserStats(newStatistics);
      }

      if (response.status === 200) {
        const statistics: ServerStatsModel = response.body;
        let statsForCurrentDate: StatsForSpecificDate = statistics.optional[date];
        if (!statsForCurrentDate) {
          statistics.optional[date] = {
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
          statsForCurrentDate = statistics.optional[date];
          StatsService.createStatsForCurrentDate(statsForCurrentDate, gameData, gameName, statsUpdateObject);
        } else {
          if (gameName === 'sprint') {
            statsForCurrentDate.sprint.accuracy = [...statsForCurrentDate.sprint.accuracy, (gameData.accuracy as number)];
            (statsForCurrentDate.sprint.newWords as number) += (gameData.newWords as number);
            statsForCurrentDate.sprint.bestStreak = (statsForCurrentDate.sprint.bestStreak as number) > (gameData.bestStreak as number) ? statsForCurrentDate.sprint.bestStreak : gameData.bestStreak;
          }
          if (gameName === 'audioChallenge') {
            statsForCurrentDate.audioChallenge.accuracy = [...statsForCurrentDate.audioChallenge.accuracy, (gameData.accuracy as number)];
            (statsForCurrentDate.audioChallenge.newWords as number) += (gameData.newWords as number);
            statsForCurrentDate.audioChallenge.bestStreak = (statsForCurrentDate.audioChallenge.bestStreak as number) > (gameData.bestStreak as number) ? statsForCurrentDate.audioChallenge.bestStreak : gameData.bestStreak;
          }
          statsForCurrentDate.accuracy = UtilsService.calcAverageAccuracy(statsForCurrentDate.sprint.accuracy, statsForCurrentDate.audioChallenge.accuracy);
          statsForCurrentDate.newWords = (statsForCurrentDate.sprint.newWords as number) + (statsForCurrentDate.audioChallenge.newWords as number);
          (statsForCurrentDate.learnedWords as number) += statsUpdateObject.newLearnedWords;
        }
        (statistics.learnedWords as number) += (statsForCurrentDate.learnedWords as number);
        statsForCurrentDate.totalLearnedWords = statistics.learnedWords;
        console.log(statistics);
        await StatsApi.updateUserStats(statistics);
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  static createStatsForCurrentDate(newStatsForCurrentDate: StatsForSpecificDate, gameData: GameData, gameName: string, statsUpdateObject: StatsUpdateObject) {
    if (gameName === 'sprint') {
      newStatsForCurrentDate.sprint.accuracy.push(gameData.accuracy as number);
      newStatsForCurrentDate.sprint.newWords = gameData.newWords;
      newStatsForCurrentDate.sprint.bestStreak = gameData.bestStreak;
      newStatsForCurrentDate.audioChallenge.newWords = 0;
      newStatsForCurrentDate.audioChallenge.bestStreak = 0;
    }

    if (gameName === 'audioChallenge') {
      newStatsForCurrentDate.audioChallenge.accuracy.push(gameData.accuracy as number);
      newStatsForCurrentDate.audioChallenge.newWords = gameData.newWords;
      newStatsForCurrentDate.audioChallenge.bestStreak = gameData.bestStreak;
      newStatsForCurrentDate.sprint.newWords = 0;
      newStatsForCurrentDate.sprint.bestStreak = 0;
    }
    newStatsForCurrentDate.accuracy = UtilsService.calcAverageAccuracy(newStatsForCurrentDate.sprint.accuracy, newStatsForCurrentDate.audioChallenge.accuracy);
    newStatsForCurrentDate.newWords = (newStatsForCurrentDate.sprint.newWords as number) + (newStatsForCurrentDate.audioChallenge.newWords as number);
    newStatsForCurrentDate.learnedWords = statsUpdateObject.newLearnedWords;
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
