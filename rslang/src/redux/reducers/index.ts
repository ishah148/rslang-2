import { combineReducers } from "redux"
import { audiocallReducer } from "./audiocallReducer"
import { sprintReducer } from "./sprintReducer"
import { userReducer } from "./userReducer"

const rootReducer = combineReducers({
  user: userReducer,
  audiocall: audiocallReducer,
  sprint: sprintReducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
