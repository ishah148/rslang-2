import { IWordWithUserData } from "../../services/api/AggregatedWords"
import { IWord } from "../../services/api_types"

export interface IChoice {
  wordTranslated: string
  isCorrect: boolean
}

export interface IRoundWord extends IWord {
  choice: IChoice[]
}

export interface ILearndRoundWord extends IWordWithUserData {
  choice: IChoice[]
}

export interface IResult {
  amount: number
  words: IRoundWord[]
}

export enum AudiocallActionTypes {
  START = "start",
  PENDING = "pending",
  ERROR = "error",
  CORRECT = "correct",
  INCORRECT = "incorrect",
  CHOSEN = "chosen",
  RESULT = "result",
  RESET = "reset",
}

interface IAudiocallStartAction {
  type: AudiocallActionTypes.START
  payload: IRoundWord[] | ILearndRoundWord[]
}

interface IAudiocallPendingAction {
  type: AudiocallActionTypes.PENDING
}

interface IAudiocallErrorAction {
  type: AudiocallActionTypes.ERROR
  payload: string
}

interface IAudiocallCorrectAction {
  type: AudiocallActionTypes.CORRECT
  payload: IResult
}

interface IAudiocallIncorrectAction {
  type: AudiocallActionTypes.INCORRECT
  payload: IResult
}

interface IAudiocallChosenAction {
  type: AudiocallActionTypes.CHOSEN
}

interface IAudiocallResultAction {
  type: AudiocallActionTypes.RESULT
  payload: boolean
}

interface IAudiocallResetAction {
  type: AudiocallActionTypes.RESET
}

export type AudiocallAction =
  | IAudiocallStartAction
  | IAudiocallPendingAction
  | IAudiocallErrorAction
  | IAudiocallCorrectAction
  | IAudiocallIncorrectAction
  | IAudiocallChosenAction
  | IAudiocallResultAction
  | IAudiocallResetAction
