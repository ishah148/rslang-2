import { Dispatch } from "redux"
import { EBookService } from "../../services/ebook_service"
import { userWordsActionTypes, userWordsAction } from "../action-types/userWords"
import { ServerUserWord } from "../../models/UserWordsModels"
import { UserWordsApi } from "../../services/api/UserWords_api"

const updateDifficultyUserWords = (response: ServerUserWord, words: ServerUserWord[]) => {
  const founded = words.find(({ wordId }) => wordId === response.wordId)
  if (founded === undefined) return [...words, response]
  return words.map(({ wordId }, i, arr) => {
    if (wordId === response.wordId) {
      return { ...arr[i], difficulty: response.difficulty }
    }
    return arr[i]
  })
}

export const setDificultyUserWord = (wordID: string, words: ServerUserWord[]) => {
  return async (dispatch: Dispatch<userWordsAction>) => {
    dispatch(setPendingUserWords(true))
    try {
      const response = await EBookService.updateDifficultWords(wordID)
      const { difficulty } = response
      if (difficulty !== "easy" && difficulty !== "hard") {
        throw new Error("server send us wrong status (file/userWords/line:20)")
      }
      if (difficulty === "hard" || difficulty === "easy") {
        const updatedUserWords = updateDifficultyUserWords(response, words)

        dispatch(showUserWords(updatedUserWords))
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorUserWords(error.message))

        dispatch(setPendingUserWords(false))
      }
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

export const resetUserWords = (): userWordsAction => {
  return { type: userWordsActionTypes.RESET }
}
