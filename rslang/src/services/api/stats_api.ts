import { apiInstance } from "../axios_service";
import { StatsModel } from "../../models/StatsModels";

export class StatsApi {
  static async getUserStats() {
    const response = await apiInstance.get(`/users/${localStorage.getItem("userId")}/statistics`)
    return {
      status: response.status,
      body: response.data,
    }
  }

  static async updateUserStats(data: StatsModel, id?: number | string) {
    const response = await apiInstance.put(`/users/${id || localStorage.getItem("userId")}/statistics`, data)
    return {
      status: response.status,
      body: response.data,
    };
  }
}