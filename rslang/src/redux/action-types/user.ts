export interface IUser {
  email?: string
  password?: string
  message?: string
  token?: string
  refreshToken?: string
  userId?: string
  name?: string
  error?: any
}

export interface IUserState {
  user: IUser | null
  pending: boolean
  error: null | string
  succsess: boolean
}

export enum UserActionTypes {
  PENDING = "pending",
  ERROR = "error",
  SIGNUP = "signup",
  SIGNIN = "signin",
  LOGOUT = "logout",
  SUCCSESS = "succsess",
}

interface IUserSuccessAction {
  type: UserActionTypes.SUCCSESS
  payload: boolean
}

interface IUserSignupAction {
  type: UserActionTypes.SIGNUP
  payload: IUser
}

interface IUserSigninAction {
  type: UserActionTypes.SIGNIN
  payload: IUser
}

interface IUserPendingAction {
  type: UserActionTypes.PENDING
}

interface IUserLogoutAction {
  type: UserActionTypes.LOGOUT
}

interface IUserErrorAction {
  type: UserActionTypes.ERROR
  payload: string | null
}

export type UserAction =
  | IUserSigninAction
  | IUserLogoutAction
  | IUserErrorAction
  | IUserPendingAction
  | IUserSignupAction
  | IUserSuccessAction
