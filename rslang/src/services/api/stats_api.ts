import { apiInstance } from "../axios_service";
import { ServerStatsModel, StatsModel } from "../../models/StatsModels";

export class StatsApi {
  static async getUserStats() {
    const response = await apiInstance.get<ServerStatsModel>(`/users/${localStorage.getItem("userId")}/statistics`)
    return {
      status: response.status,
      body: response.data,
    }
  }

  static async updateUserStats(data: StatsModel) {
    const response = await apiInstance.put<ServerStatsModel>(`/users/${localStorage.getItem("userId")}/statistics`, data)
    return {
      status: response.status,
      body: response.data,
    };
  }
}