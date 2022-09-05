import { IWord } from "../api_types"
import { apiInstance } from "../axios_service"

interface IUserServerWord {
  difficulty: "easy" | "hard"
  optional: {
    isLearned: boolean
    progressBar: number // 1-2-3 для easy и 1-2-3-4-5 для hard
    progressBarSize: number //3 or 5
    isNew: boolean
    meetingCounter: number
  }
}

export interface IUserAggregatedWord extends IWord {
  userWords: IUserServerWord
  _id: string
}

export type IUserAggregatedWordsResponce = [
  {
    paginatedResults: IUserAggregatedWord[]
    totalCount: [
      {
        count: number
      }
    ]
  }
]

export class UserAggregatedWordsApi {
  static async getHardUserAggregatedWords() {
    const response = await apiInstance.get<IUserAggregatedWordsResponce>(
      `/users/${localStorage.getItem("userId")}/aggregatedWords?filter={"$or":[{"userWord.difficulty":"hard"}]}`
    )
    return {
      status: response.status,
      body: response.data,
    }
  }
}
