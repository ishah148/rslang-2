import { apiInstance } from "../axios_service";
import { UserWord } from "../../models/UserWordsModels";

export class UserWordsApi {
  static async getUserWords() {
    const response = await apiInstance.get(`/users/${localStorage.getItem("userId")}/words`)
    return {
      status: response.status,
      body: response.data,
    };
  }

  static async createUserWord(wordID: string, wordData: UserWord) {
    const response = await apiInstance.post(`/users/${localStorage.getItem("userId")}/words/${wordID}`, wordData);
    return {
      status: response.status,
      body: response.data,
    }; //! надо ли?
  }

  static async getUserWord(wordID: string) {
    const response = await apiInstance.get(`/users/${localStorage.getItem("userId")}/words/${wordID}`)
    return {
      status: response.status,
      body: response.data,
    };
  }

  static async updateUserWord(wordID: string, wordData: UserWord) {
    const response = await apiInstance.put(`/users/${localStorage.getItem("userId")}/words/${wordID}`, wordData);
    return {
      status: response.status,
      body: response.data,
    }; //! надо ли?
  }

  static async deleteUserWord(wordID: string) {
    const response = await apiInstance.delete(`/users/${localStorage.getItem("userId")}/words/${wordID}`);
    return {
      status: response.status,
      body: response.data,
    }; //! надо ли?
  }
}
