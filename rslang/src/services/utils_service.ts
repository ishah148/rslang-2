import { FullStatsData, ServerStatsModel } from "../models/StatsModels";

export class UtilsService {

  static getCurrentDate() {
    //Возвращает дату в формате `6/9/2022` которая служит ключом объекта
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  static calcAverageAccuracy(arr1: number[] = [], arr2: number[] = []): number {
    if(!arr1.length && !arr2.length) {return 0}
    const merge = arr1.concat(arr2);
    const result =  merge.reduce((sum, item) => sum + item, 0) / (arr1.length + arr2.length);
    return +result.toFixed(1);
  }

  static getLastDateInStatistics(stats: ServerStatsModel): string {
    const listOfDates: string[] = Object.keys(stats.optional);
    const result = listOfDates.pop()
    if(!result) {
      console.log('ERROR WITH getLastDateInStatistics; listOfDates:  ', listOfDates);
      return '7/10/2022';
    }
    return result;
  }

  static generateMockFullStatsDataObjects(fullStatsData: FullStatsData, amount: number) {
    const dates = UtilsService.GetMockDates(amount);
    for(const date of dates) {
      fullStatsData[date] = {
        newWords: 0,
        totalLearnedWords: 0,
      }
    }
  }

  static GetMockDates(amount: number) {
    const startDate = new Date();
    const aryDates = [];
    for (let i = 0; i <= amount; i++) {
      const currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      aryDates.push(currentDate.getDate() + "/" + UtilsService.MonthAsString(currentDate.getMonth()) + "/" + currentDate.getFullYear());
    }
    return aryDates;
  }

  static MonthAsString(monthIndex: number) {
    const month = [];
    month[0] = "1";
    month[1] = "2";
    month[2] = "3";
    month[3] = "4";
    month[4] = "5";
    month[5] = "6";
    month[6] = "7";
    month[7] = "8";
    month[8] = "9";
    month[9] = "10";
    month[10] = "11";
    month[11] = "12";
    return month[monthIndex];
  }
}

