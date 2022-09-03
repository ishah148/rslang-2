import { Dispatch } from "redux"
import { prepareWords, SprintWord } from "../../games/Sprint/controller/utils"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { WordsApi } from "../../services/api"
import { IWord } from "../../services/api_types"
import { SprintAction, SprintActionResultTypes, SprintActionTypes } from "../action-types/sprint"

export const sprintSetStart = (difficult: number, pages: number[]) => {
  return async (dispatch: Dispatch<SprintAction>) => {
    dispatch(sprintSetLevel(difficult))
    dispatch({ type: SprintActionTypes.PENDING, payload: true })
    const promisArr = pages.map(async (page) => {
      const res = await WordsApi.getWords(page, difficult)
      const sprintWords = prepareWords(res.data)
      dispatch(updateSprintWords(res.data, sprintWords))
      return res
    })
    dispatch({ type: SprintActionTypes.UPDATE_DIFFICULT, payload: difficult })
    Promise.allSettled(promisArr).then(() => {
      dispatch({ type: SprintActionTypes.PENDING, payload: false })
      dispatch({ type: SprintActionTypes.START, payload: null })
    })
  }
}

export const updateSprintWords = (words: IWord[], sprintWords: SprintWord[]): SprintAction => {
  return { type: SprintActionTypes.PUSH_WORDS, payload: { words, sprintWords } }
}

export const setPendingStatus = (status: boolean) => (dispatch: Dispatch<SprintAction>) =>
  dispatch({ type: SprintActionTypes.PENDING, payload: status })

export function sprintSetReset(): SprintAction {
  return { type: SprintActionTypes.RESET, payload: null }
}
export function sprintSetLevel(level: number): SprintAction {
  return { type: SprintActionTypes.UPDATE_LEVEL, payload: level }
}

