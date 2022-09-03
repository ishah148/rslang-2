import { SprintWord } from "../../games/Sprint/controller/utils"
import { GameData } from "../../models/UserWordsModels"
import { IWord } from "../../services/api_types"
import { IRoundWord } from "../action-types/audiocall"
import { SprintAction, SprintActionResultTypes, SprintActionTypes, SprintResultAction } from "../action-types/sprint"

interface ISprintState {
  words: IWord[]
  sprintWords: SprintWord[]
  difficult: number | null
  pending: boolean
  error: string | null
  score: number
  page: number
  level: number | null
  combo: number
  result: GameData
}

const initialState: ISprintState = {
  words: [],
  sprintWords: [],
  difficult: null,
  pending: false,
  error: null,
  score: 0,
  page: 0,
  level: null,
  combo: 0,
  result: {
    wordsID: [],
    newWords: null,
    accuracy: null,
    bestStreak: null,
    corectness: {},
  },
}
export const sprintReducer = (state = initialState, action: SprintAction | SprintResultAction) => {
  // console.log('type',action.type,action.payload)
  if (action.type in SprintActionTypes) return handleSprintStateAction(state, action)
  if (action.type in SprintActionResultTypes) return handleSprintStateResultAction(state, action)
  return state
}

export function handleSprintStateResultAction(state: ISprintState, action: SprintAction | SprintResultAction) {
  switch (action.type) {
    case SprintActionResultTypes.WORD_ID:
      return { ...state, result: { ...state.result, wordsID: [...state.result.wordsID, action.payload] } }

    case SprintActionResultTypes.NEW_WORDS:
      return { ...state, result: { ...state.result, newWords: action.payload } }

    case SprintActionResultTypes.ACCURACY:
      return { ...state, result: { ...state.result, accuracy: action.payload } }

    case SprintActionResultTypes.BEST_STREAK:
      return { ...state, result: { ...state.result, bestStreak: action.payload } }

    case SprintActionResultTypes.CORRECTNESS:
      // console.log('payload',{...action.payload})
      return { ...state, result: { ...state.result, corectness: { ...state.result.corectness, ...action.payload } } }
  }
  return state
}

export function handleSprintStateAction(state: ISprintState, action: SprintAction | SprintResultAction): ISprintState {
  switch (action.type) {
    case SprintActionTypes.START:
      return { ...state }

    case SprintActionTypes.PENDING:
      return { ...state, pending: action.payload }

    case SprintActionTypes.PUSH_WORDS:
      return {
        ...state,
        words: [...state.words, ...action.payload.words],
        sprintWords: [...state.sprintWords, ...action.payload.sprintWords],
      }

    case SprintActionTypes.UPDATE_DIFFICULT:
      return { ...state, difficult: action.payload }

    case SprintActionTypes.COMBO:
      return { ...state, combo: action.payload }

    case SprintActionTypes.SCORE:{
      return {...state, score: action.payload}
    }

    case SprintActionTypes.RESET:
      // return { ...state, ...initialState, level: state.level }
      return { ...initialState, level: state.level,words:[],sprintWords:[] }

    case SprintActionTypes.UPDATE_LEVEL:
      return { ...state, level: action.payload }
  }
  return state
}
