import { UserAction, UserActionTypes } from "../action-types/user"
import { Dispatch } from "redux"
import { AuthApi } from "../../services/api"
import { AuthError } from "../../services/api_types"

interface ISignupFormData {
  name: string
  email: string
  password: string
}

export const signup = (signupFormData: ISignupFormData) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.PENDING })
      const { status, body } = await AuthApi.signUp(signupFormData)
      //   if ((data as AuthError)?.error) {
      //     throw Error((data as AuthError).error.errors[0].message)
      //   }
      if (status === 200) {
        dispatch({ type: UserActionTypes.SIGNUP, payload: body })
        dispatch(setSuccess(true))
      } else if (status === 417) {
        throw Error(`${body}`)
      } else {
        throw Error((body as AuthError).error.errors[0].message)
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message))
      }
      
    }
  }
}

export function setSuccess(value: boolean): UserAction {
  return { type: UserActionTypes.SUCCSESS, payload: value }
}

export function setError(value: string | null): UserAction {
  return { type: UserActionTypes.ERROR, payload: value }
}

export function logOut(): UserAction {
  localStorage.removeItem("user")
  localStorage.clear();
  return { type: UserActionTypes.LOGOUT }
}

interface ISigninFormData {
  email: string
  password: string
}

export const signin = (signinFormData: ISigninFormData) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.PENDING })

      // const data = (await AuthApi.login(signinFormData)).body
      // const status = (await AuthApi.login(signinFormData)).status
      const { status, body } = await AuthApi.login(signinFormData)
      
      
      if (status === 200) {
        dispatch({ type: UserActionTypes.SIGNIN, payload: body })
        localStorage.setItem("user", JSON.stringify(body))
      }
      if (status !== 200) {
        dispatch({
          type: UserActionTypes.ERROR,
          payload: "incorrect login or password",
        })
      }
    } catch (error) {
      throw new Error("Some shah error")
    }
  }
}
