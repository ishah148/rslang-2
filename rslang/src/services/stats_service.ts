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
          console.log(`WTF BOY 2?  statsUpdateObject.newLearnedWords: ${statsUpdateObject.newLearnedWords}`);
          newStatistics.learnedWords = 0;
          newStatsForCurrentDate.learnedWords = 0;
          newStatsForCurrentDate.totalLearnedWords = 0;
        }
        console.log('updateStatisticWithGameData ----- ', newStatistics);
        await StatsApi.updateUserStats(newStatistics);
      }

      if (response.status === 200) {
        const statistics: ServerStatsModel = response.body;
        delete statistics.id;
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
          if ((statsForCurrentDate.learnedWords as number) < 0) {
            statsForCurrentDate.learnedWords = 0;
          }
        }
        (statistics.learnedWords as number) += statsUpdateObject.newLearnedWords;
        statsForCurrentDate.totalLearnedWords = statistics.learnedWords;
        if ((statistics.learnedWords as number) < 0) {
          console.log(`WTF BOY 2?  statsUpdateObject.newLearnedWords: ${statsUpdateObject.newLearnedWords} --- statistics.learnedWords: ${statistics.learnedWords}`, );
          statistics.learnedWords = 0;
          statsForCurrentDate.totalLearnedWords = 0;
        }
        console.log('updateStatisticWithGameData ----- ', statistics);
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
    const dailyStats: DailyStatsData = {
      newWords: 0,
      learnedWords: 0,
      totalAccuracy: 0,
      audioChallenge: {
        newWords: 0,
        accuracy: 0,
        bestStreak: 0,
      },
      sprint: {
        newWords: 0,
        accuracy: 0,
        bestStreak: 0,
      }
    }

    const date = UtilsService.getCurrentDate();

    try {
      const response = await StatsApi.getUserStats();

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`getDailyStatistics in StatsService response.status is --- ${response.status}`)
      }

      if (response.status === 200) {
        const statistics: ServerStatsModel = response.body;
        if (statistics.optional[date]) {
          dailyStats.newWords = statistics.optional[date].newWords;
          dailyStats.learnedWords = statistics.optional[date].learnedWords;
          dailyStats.totalAccuracy = statistics.optional[date].accuracy;

          dailyStats.audioChallenge.newWords = statistics.optional[date].audioChallenge.newWords;
          dailyStats.audioChallenge.accuracy = UtilsService.calcAverageAccuracy(statistics.optional[date].audioChallenge.accuracy);
          dailyStats.audioChallenge.bestStreak = statistics.optional[date].audioChallenge.bestStreak;

          dailyStats.sprint.newWords = statistics.optional[date].sprint.newWords;
          dailyStats.sprint.accuracy = UtilsService.calcAverageAccuracy(statistics.optional[date].sprint.accuracy);
          dailyStats.sprint.bestStreak = statistics.optional[date].sprint.bestStreak;
        }
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
    console.log('getDailyStatistics ----- ', dailyStats);
    return dailyStats;

  }

  static async getFullStatistics(): Promise<FullStatsData> {
    // const d1 = '6/9/2022';
    // const d2 = '7/9/2022';
    // const d3 = '8/9/2022';
    // const d4 = '12/9/2022';
    // const d5 = '15/9/2022';
    // const d6 = '16/9/2022';
    // const d7 = '20/9/2022';
    // const d8 = '21/9/2022';
    // const d9 = '22/9/2022';
    // const d10 = '23/9/2022';
    // const testObj: FullStatsData = {
    //   [d1]: {
    //     newWords: 30,
    //     totalLearnedWords: 123,
    //   },
    //   [d2]: {
    //     newWords: 40,
    //     totalLearnedWords: 167,
    //   },
    //   [d3]: {
    //     newWords: 50,
    //     totalLearnedWords: 223,
    //   },
    //   [d4]: {
    //     newWords: 50,
    //     totalLearnedWords: 223,
    //   },
    //   [d5]: {
    //     newWords: 69,
    //     totalLearnedWords: 300,
    //   },
    //   [d6]: {
    //     newWords: 78,
    //     totalLearnedWords: 467,
    //   },
    //   [d7]: {
    //     newWords: 79,
    //     totalLearnedWords: 468,
    //   }, [d8]: {
    //     newWords: 120,
    //     totalLearnedWords: 500,
    //   },
    //   [d9]: {
    //     newWords: 160,
    //     totalLearnedWords: 589,
    //   },
    //   [d10]: {
    //     newWords: 201,
    //     totalLearnedWords: 601,
    //   },
    // }

    const date = UtilsService.getCurrentDate();

    const fullStatsData: FullStatsData = {
      [date]: {
        newWords: 0,
        totalLearnedWords: 0,
      }
    }

    let result: FullStatsData = {};

    try {
      const response = await StatsApi.getUserStats();

      if (response.status !== 200 && response.status !== 404) {
        throw new Error(`getFullStatistics in StatsService response.status is --- ${response.status}`)
      }

      if (response.status === 200) {
        const statistics: ServerStatsModel = response.body;
        for (const day in statistics.optional) {
          fullStatsData[day] = {
            newWords: statistics.optional[day].newWords,
            totalLearnedWords: statistics.optional[day].totalLearnedWords,
          }
        }

        if (!statistics.optional[date]) {
          const lastDate: string = UtilsService.getLastDateInStatistics(statistics);
          fullStatsData[date] = {
            newWords: statistics.optional[lastDate].newWords,
            totalLearnedWords: statistics.optional[lastDate].totalLearnedWords,
          }
        }

        if(Object.keys(fullStatsData).length < 7) {
          UtilsService.generateMockFullStatsDataObjects(fullStatsData, 7 - Object.keys(fullStatsData).length);
        }

        result = UtilsService.sortFullDataObject(fullStatsData);
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }

    console.log('getFullStatistics ----- ', result);
    return result;
  }

  static async updateStatisticWithEBookData(statsUpdateObject: StatsUpdateObject): Promise<void> {
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
        throw new Error(`updateStatisticWithEBookData in StatsService response.status is --- ${response.status}`)
      }

      if (response.status === 404) {
        newStatistics.learnedWords = statsUpdateObject.newLearnedWords;
        newStatistics.optional[date].newWords = 0;
        newStatistics.optional[date].learnedWords = statsUpdateObject.newLearnedWords;
        newStatistics.optional[date].accuracy = 0;
        newStatistics.optional[date].totalLearnedWords = statsUpdateObject.newLearnedWords;

        newStatistics.optional[date].audioChallenge.newWords = 0;
        newStatistics.optional[date].audioChallenge.accuracy = []
        newStatistics.optional[date].audioChallenge.bestStreak = 0;

        newStatistics.optional[date].sprint.newWords = 0;
        newStatistics.optional[date].sprint.accuracy = [];
        newStatistics.optional[date].sprint.bestStreak = 0;

        console.log('updateStatisticWithEBookData ----- ', newStatistics);
        await StatsApi.updateUserStats(newStatistics);
      }

      if (response.status === 200) {
        const statistics: ServerStatsModel = response.body;
        delete statistics.id;
        if (!statistics.optional[date]) {
          (statistics.learnedWords as number) += statsUpdateObject.newLearnedWords;
          newStatistics.optional[date].newWords = 0;
          (statistics.optional[date].learnedWords as number) = statsUpdateObject.newLearnedWords;
          if ((statistics.optional[date].learnedWords as number) < 0) {
            statistics.optional[date].learnedWords = 0;
          }
          newStatistics.optional[date].accuracy = 0;
          newStatistics.optional[date].totalLearnedWords = statistics.learnedWords;

          newStatistics.optional[date].audioChallenge.newWords = 0;
          newStatistics.optional[date].audioChallenge.accuracy = []
          newStatistics.optional[date].audioChallenge.bestStreak = 0;

          newStatistics.optional[date].sprint.newWords = 0;
          newStatistics.optional[date].sprint.accuracy = [];
          newStatistics.optional[date].sprint.bestStreak = 0;
        } else {
          (statistics.learnedWords as number) += statsUpdateObject.newLearnedWords;
          (statistics.optional[date].learnedWords as number) += statsUpdateObject.newLearnedWords;
          if ((statistics.optional[date].learnedWords as number) < 0) {
            statistics.optional[date].learnedWords = 0;
          }
          statistics.optional[date].totalLearnedWords = statistics.learnedWords;
        }
        console.log('updateStatisticWithEBookData ----- ', statistics);
        await StatsApi.updateUserStats(statistics);
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
