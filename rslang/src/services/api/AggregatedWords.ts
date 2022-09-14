import { IWord } from "../api_types"
import { apiInstance } from "../axios_service"

export interface IWordWithUserData extends IWord {
  difficulty: "easy" | "hard" | null
  isLearned: boolean
  progressBar: number
  progressBarSize: number
  isNew: boolean
  meetingCounter: number
}

interface IUserServerWord {
  difficulty: "easy" | "hard" | null;
  optional: {
    isLearned: boolean
    progressBar: number // 1-2-3 для easy и 1-2-3-4-5 для hard
    progressBarSize: number //3 or 5
    isNew: boolean
    meetingCounter: number
  }
}

export interface IUserAggregatedWord extends IWord {
  userWord: IUserServerWord
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


export type getAggregatedWordsResponse = {
  body: IUserAggregatedWordsResponce;
  status: number;
}

export class UserAggregatedWordsApi {
  static async getHardUserAggregatedWords(): Promise<getAggregatedWordsResponse>{
    const response = await apiInstance.get<IUserAggregatedWordsResponce>(
      `/users/${localStorage.getItem("userId")}/aggregatedWords?filter={"$or":[{"userWord.difficulty":"hard"}]}`
    )
    return {
      status: response.status,
      body: response.data,
    }
  }

  static async getLearndUserAggregatedWords() {
    const response = await apiInstance.get<IUserAggregatedWordsResponce>(
      `/users/${localStorage.getItem("userId")}/aggregatedWords?filter={"$or":[{"userWord.optional.isLearned":true}]}`
    )
    return {
      status: response.status,
      body: response.data,
    }
  }
}
