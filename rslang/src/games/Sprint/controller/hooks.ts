import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSprintActionsCreators } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { SprintResultActionCreator } from "../../../redux/action-creators/sprintResult"
import { SprintActionResultTypes, SprintActionTypes } from "../../../redux/action-types/sprint"
import { calcAccuracy, generateRandNumbers, SprintWord } from "./utils"
export type answerType = "right" | "incorrect"

export function useResult() {
  const dispatch = useDispatch()
  const { combo, result } = useTypedSelector((state) => state.sprint)

  const [results, setResults] = useState<boolean[]>([])
  // const [maxCombo, setMaxCombo] = useState<number>(0)

  function addAnswer(word: SprintWord, answer: answerType) {
    calcCombo(answer)
    if (answer === "right") {
      word.result = true
    } else word.result = false
    setResults((state) => [...state, answer === "right" ? true : false])
    dispatch(SprintResultActionCreator.pushWordID(word.word.id))
    dispatch(SprintResultActionCreator.corectness(word.word.id, word.result))
  }

  function calcCombo(answer: answerType) {
    if (answer === "right") {
      dispatch({ type: SprintActionTypes.COMBO, payload: combo + 1 })
      if (combo >= (result.bestStreak || 0)) {
        dispatch(SprintResultActionCreator.bestStreak(combo + 1))
      }
    } else {
      dispatch({ type: SprintActionTypes.COMBO, payload: 0 })
    }
  }

  useEffect(() => {
    const accur = +calcAccuracy(results)
    dispatch(SprintResultActionCreator.accuracy(accur))
  }, [results])

  return { combo, addAnswer }
}

export function useGame(difficultLevel: number | null) {
  const { timer, setTimer } = useTimer()

  const { sprintWords } = useTypedSelector((state) => state.sprint)
  const [index, setIndex] = useState<number>(1)
  const [score, setScore] = useState<number>(0)

  const { sprintSetStart } = useSprintActionsCreators()

  useEffect(() => {
    if (difficultLevel) sprintSetStart(difficultLevel, generateRandNumbers(5))
  }, [])

  controlIndex(index, sprintWords, setIndex)

  const currentWord = sprintWords[index > 1 ? index - 1 : index] || null
  const currentWorldEn =
    sprintWords?.length && index && sprintWords ? sprintWords[index > 1 ? index - 1 : index].en : null
  const currentWorldRu =
    sprintWords?.length && index && sprintWords ? sprintWords[index > 1 ? index - 1 : index].ru : null

  return {
    setScore,
    score,
    setIndex,
    index,
    currentWorldEn,
    currentWorldRu,
    currentWord,
    timer,
    setTimer,
  }
}

function useTimer() {
  const { sprintSetReset } = useSprintActionsCreators()
  const { result } = useTypedSelector((state) => state.sprint)
  const [timer, setTimer] = useState(0)

  const decrement = () => {
    if (timer > 0) setTimer(timer - 1)
    if (timer < 1) {
      console.log("", result)
      sprintSetReset()
    }
  }
  useEffect(() => {
    const interval = setTimeout(decrement, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timer])
  return { timer, setTimer }
}

// =============== utils? ===============
function controlIndex(
  index: number,
  sprintWords: SprintWord[],
  setIndex: React.Dispatch<React.SetStateAction<number>>
) {
  const { sprintSetStart } = useSprintActionsCreators()
  const { difficult } = useTypedSelector((state) => state.sprint)
  if (index === sprintWords.length - 15) {
    sprintSetStart(difficult || 2, generateRandNumbers(4))
  }
}
// =============== ===============
