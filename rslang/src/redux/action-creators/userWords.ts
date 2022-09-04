import { Dispatch } from "redux"
import { EBookService } from "../../services/ebook_service"
import { userWordsActionTypes, userWordsAction } from "../action-types/userWords"
import { ServerUserWord } from "../../models/UserWordsModels"
import { UserWordsApi } from "../../services/api/UserWords_api"

const updateDifficultyUserWords = (id: string, words: ServerUserWord[], status: "easy" | "hard") => {
  return words.map(({ wordId }, i, arr) => {
    if (wordId === id) {
      return { ...arr[i], difficulty: status }
    }
    return arr[i]
  })
}

export const setDificultyUserWord = (wordID: string, words: ServerUserWord[]) => {
  return async (dispatch: Dispatch<userWordsAction>) => {
    dispatch(setPendingUserWords(true))
    try {
      const { id, status } = await EBookService.updateDifficultWords(wordID)

      if (status !== "easy" && status !== "hard") {
        throw new Error("server send us wrong status (file/userWords/line:20)")
      }

      if (status === "easy") {
        const updatedUserWords = updateDifficultyUserWords(id, words, status)
        dispatch(showUserWords(updatedUserWords))
      }

      if (status === "hard") {
        const updatedUserWords = updateDifficultyUserWords(id, words, status)
        dispatch(showUserWords(updatedUserWords))
      }
    } catch (error) {
      if (error instanceof Error) {
        
        dispatch(setErrorUserWords(error.message))
      }
    } finally {
      dispatch(setPendingUserWords(false))
    }
  }
}

export const getUserWords = () => {
  return async (dispatch: Dispatch<userWordsAction>) => {
    dispatch(setPendingUserWords(true))
    try {
      const { status, body } = await UserWordsApi.getUserWords()
      if (status !== 200) throw new Error("Ops! something went wrong")
      dispatch(showUserWords(body))
    } catch (error) {
      if (error instanceof Error) {
        
        dispatch(setErrorUserWords(error.message))
      }
    } finally {
      dispatch(setPendingUserWords(false))
    }
  }
}

const showUserWords = (words: ServerUserWord[]): userWordsAction => {
  return { type: userWordsActionTypes.SHOW, payload: words }
}

const setPendingUserWords = (value: boolean): userWordsAction => {
  return { type: userWordsActionTypes.PENDING, payload: value }
}

const setErrorUserWords = (value: string | null): userWordsAction => {
  return { type: userWordsActionTypes.ERROR, payload: value }
}
