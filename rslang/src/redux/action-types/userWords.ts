import { ServerUserWord } from "../../models/UserWordsModels"
export enum userWordsActionTypes {
  SHOW = "show",
  PENDING = "pending",
  ERROR = "error",
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

export type userWordsAction = userWordsShowAction | userWordsSetPendingAction | userWordsSetErrorAction
