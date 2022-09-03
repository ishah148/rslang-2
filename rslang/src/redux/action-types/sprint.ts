import { SprintWord } from "../../games/Sprint/controller/utils"
import { IWord } from "../../services/api_types"

export enum SprintActionTypes {
  START = "START",
  PENDING = "PENDING",
  ERROR = "ERROR",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
  CHOSEN = "CHOSEN",
  SCORE = "SCORE",
  COMBO = "COMBO",
  PUSH_WORDS = "PUSH_WORDS",
  UPDATE_DIFFICULT = "UPDATE_DIFFICULT",
  RESET = "RESET",
  UPDATE_LEVEL = "UPDATE_LEVEL",
}

type sprintSetStartAction = {
  type: SprintActionTypes.START
  payload:null
}
type sprintSetComboAction = {
  type: SprintActionTypes.COMBO
  payload:number;
}
type SprintErrorAction = {
  type: SprintActionTypes.ERROR
  payload: string
}
type SprintSCOREAction = {
  type: SprintActionTypes.SCORE
  payload: number
}
type SprintPendingAction = {
  type: SprintActionTypes.PENDING
  payload: boolean
}
type SprintUpdateDiffAction = {
  type: SprintActionTypes.UPDATE_DIFFICULT
  payload: number
}

type SprintPushWordsAction = {
  type: SprintActionTypes.PUSH_WORDS
  payload: { words: IWord[]; sprintWords: SprintWord[] }
}

type sprintSetResetAction = {
  type: SprintActionTypes.RESET
  payload:null
}
type SprintUpdateLevelAction = {
  type: SprintActionTypes.UPDATE_LEVEL
  payload: number
}
export type SprintAction =
  | sprintSetStartAction
  | SprintErrorAction
  | SprintSCOREAction
  | SprintPendingAction
  | SprintPushWordsAction
  | SprintUpdateDiffAction
  | sprintSetResetAction
  | SprintUpdateLevelAction
  | sprintSetComboAction

  // =============== RESULT must separete in other file ===============

  export enum SprintActionResultTypes {
    WORD_ID = "WORD_ID",
    NEW_WORDS = "NEW_WORDS",
    ACCURACY = "ACCURACY",
    BEST_STREAK = "BEST_STREAK",
    CORRECTNESS = "CORRECTNESS",
  }
  
  type SprintActionResultWordIDAction = {
    type: SprintActionResultTypes.WORD_ID
    payload: string
  }
  type SprintActionResultNewWordsAction = {
    type: SprintActionResultTypes.NEW_WORDS
    payload: number
  }
  type SprintActionResultAccuracyAction = {
    type: SprintActionResultTypes.ACCURACY
    payload: number
  }
  type SprintActionResultBestStreakction = {
    type: SprintActionResultTypes.BEST_STREAK
    payload: number
  }
  type SprintActionResultCorrectnesAction = {
    type: SprintActionResultTypes.CORRECTNESS
    payload: {
      [wordID: string]: boolean
    }
  }
  
  export type SprintResultAction =
    | SprintActionResultWordIDAction
    | SprintActionResultNewWordsAction
    | SprintActionResultAccuracyAction
    | SprintActionResultBestStreakction
    | SprintActionResultCorrectnesAction
  