import { apiInstance } from "../axios_service";
import { StatsModel } from "../../models/StatsModels";

export class StatsApi {
  static async getUserStats() {
    const response = await apiInstance.get<StatsModel>(`/users/${localStorage.getItem("userId")}/statistics`)
    return {
      status: response.status,
      body: response.data,
    }
  }

  static async updateUserStats(data: StatsModel) {
    const response = await apiInstance.put<StatsModel>(`/users/${localStorage.getItem("userId")}/statistics`, data)
    return {
      status: response.status,
      body: response.data,
    };
  }
}