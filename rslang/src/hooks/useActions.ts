import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as UserActionCreators from "../redux/action-creators/user"
import * as AudiocallActionCreators from "../redux/action-creators/audiocall"
import * as SprintActionCreators from "../redux/action-creators/sprint"

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(UserActionCreators, dispatch)
}

export const useAudiocallActionsCreators = () => {
  const dispatch = useDispatch()
  return bindActionCreators(AudiocallActionCreators, dispatch)
}
export const useSprintActionsCreators = () => {
  const dispatch = useDispatch()
  return bindActionCreators(SprintActionCreators, dispatch)
}
