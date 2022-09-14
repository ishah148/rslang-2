import { combineReducers } from "redux"
import { audiocallReducer } from "./audiocallReducer"
import { sprintReducer } from "./sprintReducer"
import { userReducer } from "./userReducer"
import { userWordsReducer } from "./userWordsReducer"

const rootReducer = combineReducers({
  user: userReducer,
  audiocall: audiocallReducer,
  sprint: sprintReducer,
  userWords: userWordsReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
