import { AudiocallActionTypes, IRoundWord, IResult, AudiocallAction, ILearndRoundWord } from "../action-types/audiocall"

interface IAudiocallState {
  rounds: IRoundWord[] | ILearndRoundWord[] | null
  correct: IResult
  incorrect: IResult
  pending: boolean
  error: string | null
  chosen: boolean
  result: boolean
  lastRaundResult: boolean | null
  allRaundResults: boolean[]
}

const initialState: IAudiocallState = {
  rounds: null,
  correct: {
    amount: 0,
    words: [],
  },
  incorrect: {
    amount: 0,
    words: [],
  },
  chosen: false,
  pending: false,
  error: null,
  result: false,
  lastRaundResult: null,
  allRaundResults: [],
}

export const audiocallReducer = (state = initialState, action: AudiocallAction) => {
  switch (action.type) {
    case AudiocallActionTypes.PENDING:
      return { ...state, pending: true }
    case AudiocallActionTypes.ERROR:
      return { ...state, error: action.payload, pending: false }
    case AudiocallActionTypes.RESET:
      return {
        ...initialState,
      }
    case AudiocallActionTypes.START:
      return {
        ...state,
        ...initialState,
        incorrect: { amount: 0, words: [] },
        correct: {
          amount: 0,
          words: [],
        },
        rounds: action.payload,
      }
    case AudiocallActionTypes.CORRECT:
      return {
        ...state,
        correct: action.payload,
        pending: false,
        error: null,
        chosen: true,
        lastRaundResult: true,
        allRaundResults: [...state.allRaundResults, true],
      }
    case AudiocallActionTypes.INCORRECT:
      return {
        ...state,
        incorrect: action.payload,
        pending: false,
        error: null,
        chosen: true,
        lastRaundResult: false,
        allRaundResults: [...state.allRaundResults, false],
      }
    case AudiocallActionTypes.CHOSEN:
      return { ...state, pending: false, error: null, chosen: false }
    case AudiocallActionTypes.RESULT:
      return { ...state, result: action.payload, pending: false, error: null, rounds: null }
    default:
      return state
  }
}
