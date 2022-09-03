import React, { useEffect } from "react"
import { useSprintActionsCreators } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useResult, useGame } from "../controller/hooks"
import { generateRandNumbers } from "../controller/utils"
import { useNavigate } from "react-router-dom"
import styles from "./Round.module.scss"
import { useDispatch } from "react-redux"
import { SprintActionTypes } from "../../../redux/action-types/sprint"

const Round = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pending, page, level, result, combo, score } = useTypedSelector((state) => state.sprint)
  const { sprintSetStart } = useSprintActionsCreators()
  const { timer, setTimer, setIndex, currentWorldEn, currentWorldRu, currentWord } = useGame(level)
  const { addAnswer } = useResult()

  function start() {
    dispatch({ type: SprintActionTypes.RESET, payload: null })
    sprintSetStart(level || 1, generateRandNumbers(1))
    setTimer(60)
  }
  function stop() {
    setTimer(0)
    setIndex(1)
    console.log("result ", result)
  }

  function changeLevel() {
    navigate("/games/sprint")
  }

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const tagret = e.target as HTMLButtonElement
    const answer = tagret.dataset.answer
    const rightAnswer = () => {
      dispatch({ type: SprintActionTypes.SCORE, payload: score + 10 })
      addAnswer(currentWord, "right")
    }
    const incorrectAnswer = () => {
      dispatch({ type: SprintActionTypes.SCORE, payload: score - 10 })
      addAnswer(currentWord, "incorrect")
    }
    if (answer === "yes" && currentWord.isCorrect) rightAnswer()
    else if (answer === "no" && !currentWord.isCorrect) rightAnswer()
    else incorrectAnswer()
    setIndex((i) => i + 1)
  }

  return (
    <div className={styles.game__container}>
      {pending === true ? "Loading..." : ""}
      <p className={styles.level}>
        level:&nbsp;<span>{(level || 0) + 1}</span>
      </p>
      <div className={styles.mainContainer}>
        <div className={styles.gameInfo}>
          <div className={styles.gameSubInfo}>
            <p className={styles.score}>
              score:&nbsp;<span>{score}</span>
            </p>
            <div className={styles.combo}>
              <p>
                combo:&nbsp;<span>{combo}</span>
              </p>
              <p>
                max combo:&nbsp;<span>{result.bestStreak || 0}</span>
              </p>
            </div>
          </div>

          <p className={styles.timer}>{timer}</p>
        </div>
        <div className={styles.wordsContainer}>
          <p>{timer > 0? currentWorldEn:''}</p>
          <span>-</span>
          <p>{timer > 0? currentWorldRu:''}</p>
        </div>
        {!pending ? (
          <div className={styles.buttonsContainer}>
            <button className={styles.btnGreenQa} data-answer="yes" onClick={handleAnswer} disabled={timer === 0}>
              Yes
            </button>
            <button className={styles.btnRedQa} data-answer="no" onClick={handleAnswer} disabled={timer === 0}>
              No
            </button>
          </div>
        ) : (
          <div className={styles.loader}></div>
        )}
        <div className={styles.roundSettings}>
          <button className={styles.btnChangeTimer} onClick={() => setTimer((i) => i - 5)}>
            Timer -5
          </button>
          <button className={styles.btnChangeTimer} onClick={() => setTimer((i) => i + 5)}>
            Timer +5
          </button>

          <button className={styles.btnStart} onClick={start} disabled={pending === true}>
            {" "}
            Start{" "}
          </button>
          <button className={styles.btnStop} onClick={stop}>
            Stop
          </button>
          <button className={styles.btnChangeLevel} onClick={changeLevel}>
            Change Level
          </button>
        </div>
      </div>
    </div>
  )
}

export default Round
