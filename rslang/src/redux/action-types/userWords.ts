import { ServerUserWord } from "../../models/UserWordsModels"
export enum userWordsActionTypes {
  SHOW = "show user words",
  PENDING = "user words are pending",
  ERROR = "set user words error",
  RESET = "reset user words state",
}

interface userWordsShowAction {
  type: userWordsActionTypes.SHOW
  payload: ServerUserWord[]
}

interface userWordsSetPendingAction {
  type: userWordsActionTypes.PENDING
  payload: boolean
}

interface userWordsSetErrorAction {
  type: userWordsActionTypes.ERROR
  payload: string | null
}

interface userWordsResetAction {
  type: userWordsActionTypes.RESET
}

export type userWordsAction =
  | userWordsShowAction
  | userWordsSetPendingAction
  | userWordsSetErrorAction
  | userWordsResetAction
