import { ServerUserWord } from "../../models/UserWordsModels"
import { userWordsActionTypes, userWordsAction } from "../action-types/userWords"

interface IUserWordsState {
  userWords: ServerUserWord[]
  isPending: boolean
  error: string | null
}

const initialState: IUserWordsState = {
  userWords: [],
  isPending: false,
  error: null,
}

export const userWordsReducer = (state = initialState, action: userWordsAction) => {
  switch (action.type) {
    case userWordsActionTypes.PENDING:
      return { ...state, isPending: action.payload }
    case userWordsActionTypes.SHOW:
      return { ...state, userWords: action.payload }
    default:
      return state
  }
}
