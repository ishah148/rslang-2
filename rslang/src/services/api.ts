import axios, { AxiosResponse } from "axios"
import { Auth, AuthError, IWord, newWord, responceAuth, user } from "./api_types"
import { apiInstance } from "./axios_service"
// const url = "https://rslang-rss.herokuapp.com"
// let token: string | null = null
// let refreshToken: string | null = null

export class WordsApi {
  static async getWords(page: number, group: number) {
    const res = await apiInstance.get<IWord[]>(`/words?page=${page}&group=${group}`)
    return {
      status: res.status,
      data: res.data,
    }
  }
  static async getWordById(id: number | string) {
    return apiInstance.get(`/words/${id}`)
  }
  static async createUserWord(word: newWord) {
    // with auth
    const responce = await apiInstance.post(`/users/${word.userId}/words/${word.wordId}`)
    return {
      status: responce.status,
      body: responce,
    }
  }
}

export class AuthApi {
  static async signUp(user: user) {
    const responce = await apiInstance.post<Auth | AuthError>("/users", user)
    return {
      status: responce.status,
      body: responce.data,
    }
  }
  static async login(user: user) {
    const responce = await apiInstance.post<Auth>("/signin", user)
    localStorage.setItem("token", responce.data.token)
    localStorage.setItem("userId", responce.data.userId)
    // return apiInstance.post<Auth>("/signin", user)
    return {
      status: responce.status,
      body: responce.data,
    }
  }
  static async logout() {
    localStorage.removeItem("token")
  }
  static async jwtLogin() {
    // not working
    return apiInstance.post<Auth>("/signin", localStorage.getItem("token"))
  }
}

export class UserApi {
  static async getUserById(id?: number | string) {
    const responce = await apiInstance.get(`/users/${localStorage.getItem("userId")}`)
    return {
      status: responce.status,
      body: responce,
    }
  }
  static async updateUser(newData: user, id?: number | string) {
    const responce = await apiInstance.put(`/users/${id || localStorage.getItem("userId")}`, newData)
    return {
      status: responce.status,
      body: responce,
    }
  }
  static async deleteUser(id?: number | string) {
    const responce = await apiInstance.put(`/users/${id || localStorage.getItem("userId")}`)
    return {
      status: responce.status,
      body: responce,
    }
  }
  static async updateTokens(id: number | string) {
    return apiInstance.get(`/users/${id}/tokens`)
  }
}



export const generateRandStr = () => Math.random().toString(36).substring(2)
export const generateRandMail = () => Math.random().toString(36).substring(2) + "@mail.ru"
