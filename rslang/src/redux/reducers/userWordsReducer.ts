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
      return { ...state, userWords: action.payload, isPending: false, error: null }
    case userWordsActionTypes.ERROR:
      return { ...state, error: action.payload, isPending: false }
    case userWordsActionTypes.RESET:
      return { ...initialState }
    default:
      return state
  }
}
