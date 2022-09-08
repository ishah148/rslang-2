import { Dispatch } from "redux"
import { createRounds, processAudiocallResult } from "../../games/Audiocall/controller"
import { ServerUserWord } from "../../models/UserWordsModels"
import { GamesService } from "../../services/games_services"
import { AudiocallAction, AudiocallActionTypes, ILearndRoundWord, IResult, IRoundWord } from "../action-types/audiocall"

export const audiocallStart = (group: number, page?: number, userWords?: ServerUserWord[]) => {
  return async (dispatch: Dispatch<AudiocallAction>) => {
    try {
      dispatch(audiocallSetPending())
      const roundsWords: IRoundWord[] | ILearndRoundWord[] = await createRounds(group, page, userWords)
      dispatch({ type: AudiocallActionTypes.START, payload: roundsWords })
    } catch (error) {
      if (error instanceof Error) dispatch(audiocallSetError(error.message))
    }
  }
}

export const audiocallSetCorrect = (roundWord: IResult): AudiocallAction => {
  return { type: AudiocallActionTypes.CORRECT, payload: roundWord }
}

export const audiocallSetIncorrect = (roundWord: IResult): AudiocallAction => {
  return { type: AudiocallActionTypes.INCORRECT, payload: roundWord }
}

export function audiocallSetPending(): AudiocallAction {
  return { type: AudiocallActionTypes.PENDING }
}

export function audiocallSetError(value: string): AudiocallAction {
  return { type: AudiocallActionTypes.ERROR, payload: value }
}

export function audiocallSetChosen(): AudiocallAction {
  return { type: AudiocallActionTypes.CHOSEN }
}

export function audiocallSetResult(
  value: boolean,
  correct?: IResult,
  incorrect?: IResult,
  allRaundResults?: boolean[]
) {
  return async (dispatch: Dispatch<AudiocallAction>) => {
    if (!value) {
      dispatch({ type: AudiocallActionTypes.RESULT, payload: value })
      return
    }
    dispatch(audiocallSetPending())
    try {
      if (correct && incorrect && allRaundResults) {
        const processedResult = await processAudiocallResult(correct, incorrect, allRaundResults)
        GamesService.updateGameData(processedResult, "audioChallenge")
        dispatch({ type: AudiocallActionTypes.RESULT, payload: value })
      }
    } catch (error) {
      dispatch({ type: AudiocallActionTypes.RESULT, payload: false })
    }
  }
}

export function audiocallSetReset(): AudiocallAction {
  return { type: AudiocallActionTypes.RESET }
}
