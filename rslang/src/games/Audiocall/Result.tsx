import { Button, CircularProgress } from "@mui/material"
import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAudiocallActionsCreators } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { API_URL } from "../../services/axios_service"
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded"
import Fab from "@mui/material/Fab"
import BeenhereIcon from "@mui/icons-material/Beenhere"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import styles from "./Audiocall.module.scss"
import pink from "@mui/material/colors/pink"

function Result() {
  const { correct, incorrect, allRaundResults, result, pending } = useTypedSelector((state) => state.audiocall)
  const { audiocallSetReset } = useAudiocallActionsCreators()
  const navigate = useNavigate()

  useEffect(() => {
    if (allRaundResults.length === 0) {
      navigate("/games/audiocall")
    }
  }, [allRaundResults])

  const indicatorElement = result ? (
    <div className={styles.resultMessage}>
      <BeenhereIcon color="success" />
      Progress has been saved
    </div>
  ) : (
    <div className={styles.resultMessage}>
      <ErrorOutlineIcon fontSize="large" sx={{ color: pink[500] }} />
      Ops, it seems something went wrong and the progress hasn&apos;t been saved!
    </div>
  )

  return (
    <>
      <div className={styles.resultContainer}>
        <Link className={styles.resultAgain} to="/games/audiocall">
          Try again!
        </Link>
        <h1 className={styles.resultTitle}>SCORE:</h1>
        <div className={styles.resultCorrectContainer}>
          <h3 className={styles.resultCorrect}>CORRECT: {correct.amount}</h3>
          {correct.words.map((el) => (
            <li key={el.id}>
              <Fab variant="extended" onClick={() => new Audio(API_URL + "/" + el.audio).play()}>
                <VolumeUpRoundedIcon sx={{ mr: 1, fontSize: 60 }} color="success" />
                {el.word}
              </Fab>
              <span>{el.wordTranslate}</span>
            </li>
          ))}
        </div>
        <div className={styles.resultCorrectContainer}>
          <h3 className={styles.resultMistakes}>MISTAKES: {incorrect.amount}</h3>
          {incorrect.words.map((el) => (
            <li key={el.id}>
              <Fab variant="extended" onClick={() => new Audio(API_URL + "/" + el.audio).play()}>
                <VolumeUpRoundedIcon sx={{ mr: 1, fontSize: 60 }} color="warning" />
                {el.word}
              </Fab>
              <span>{el.wordTranslate}</span>
            </li>
          ))}
          <div className={styles.resultButtons}>
            <Button
              className={styles.resultButton}
              color="warning"
              variant="outlined"
              size="large"
              onClick={() => audiocallSetReset()}
            >
              Try again
            </Button>
            <Button
              className={styles.resultButton}
              color="warning"
              variant="outlined"
              size="large"
              onClick={() => audiocallSetReset()}
            >
              <Link to="/games" onClick={() => audiocallSetReset()}>
                Games page
              </Link>
            </Button>
          </div>

          {pending ? (
            <div className={styles.resultMessage}>
              <CircularProgress color="inherit" />
              Saving progress...
            </div>
          ) : (
            indicatorElement
          )}
        </div>
      </div>
    </>
  )
}
export default Result
