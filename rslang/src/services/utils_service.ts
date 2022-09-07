import { ServerStatsModel } from "../models/StatsModels";

export class UtilsService {
  static getCurrentDate() {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
      return '2022/9/7';
    }
    return result;
  }
}

//!Возвращает дату в формате `2022/9/6` которая служит ключом объекта