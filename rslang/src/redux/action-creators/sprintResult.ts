import { SprintActionResultTypes } from "../action-types/sprint"

export class SprintResultActionCreator {
  static pushWordID(word: string) {
    return { type: SprintActionResultTypes.WORD_ID, payload: word }
  }
  static newWords(count: number) {
    return { type: SprintActionResultTypes.NEW_WORDS, payload: count }
  }

  static accuracy(accur: number) {
    return { type: SprintActionResultTypes.ACCURACY, payload: accur }
  }

  static bestStreak(count: number) {
    return { type: SprintActionResultTypes.BEST_STREAK, payload: count }
  }

  static corectness(id: string, bool: boolean) {
    return { type: SprintActionResultTypes.CORRECTNESS, payload: { [id]: bool } }
  }
  static reset() {
    return { type: SprintActionResultTypes.RESET, payload:null }
  }
  // static
}
