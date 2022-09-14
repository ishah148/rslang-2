import { UserAction, UserActionTypes, IUserState } from "../action-types/user"

const initialState: IUserState = {
  user: null,
  pending: false,
  error: null,
  succsess: false,
}

export const userReducer = (state = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case UserActionTypes.PENDING:
      return { ...state, pending: true }
    case UserActionTypes.ERROR:
      return { ...state, error: action.payload, pending: false }
    case UserActionTypes.SIGNUP:
      return { ...state, user: action.payload, pending: false, error: null }
    case UserActionTypes.SIGNIN:
      return { ...state, user: action.payload, pending: false, error: null }
    case UserActionTypes.LOGOUT:
      return { ...state, user: null, pending: false, error: null }
    case UserActionTypes.SUCCSESS:
      return { ...state, succsess: action.payload }
    default:
      return state
  }
}
