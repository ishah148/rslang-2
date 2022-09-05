import axios, { AxiosError } from "axios"
import { Auth, AuthError } from "./api_types"
export const API_URL = "https://rslang-rss.herokuapp.com"

export const apiInstance = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
})
apiInstance.interceptors.request.use((config) => {
  if (config.headers) config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  else throw new Error("No Headers!")
  return config
})

apiInstance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error: AxiosError) => {
    const originalRequest = error.config
    if(error.response?.status === 401){
      try{
        const userId = localStorage.getItem('userId')
        const refreshToken = JSON.parse(localStorage.getItem('user') || '').refreshToken
        const res = await axios.get<Auth>(`${API_URL}/users/${userId}/tokens`,{
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,            
            'Authorization':`Bearer ${refreshToken}`
          }
        })
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        return apiInstance.request(originalRequest)
      }catch(e){
        console.log('error with 401',e)
      }
    }
    return error.response
  }
)

//
// const originalRequest = error.config
// if (
//     error.response.status == 401 &&
//     error.config &&
//     !error.config._isRetry
// ) {
//     originalRequest._isRetry = true
//     try {
//         const response = await axios.get<Auth>(`${API_URL}/refresh`, {
//             withCredentials: true,
//         })
//         localStorage.setItem("token", response.data.refreshToken)
//         return apiInstance.request(originalRequest)
//     } catch (e) {
//
//     }
//     throw error
// }
