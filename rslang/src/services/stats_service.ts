import { StatsUpdateObject } from "../models/StatsModels";
import { GameData } from "../models/UserWordsModels";
import { StatsApi } from "./api/stats_api";

export class StatsService {
  static async updateStatisticWithGameData(gameData: GameData, gameName: string, statsUpdateObject: StatsUpdateObject) {
    console.log('GAMEDATA ---  ', gameData);
    console.log('GAMENAME ---  ', gameName);
    console.log('STATSUPDATEOBJ ---  ', statsUpdateObject);
  }
}


