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
    <p>
      <BeenhereIcon color="success" />
      Progress has been saved
    </p>
  ) : (
    <p>
      <ErrorOutlineIcon fontSize="large" sx={{ color: pink[500] }} />
      Ops!, it seems something went wrong and the progress hasn&apos;t been saved
    </p>
  )

  return (
    <>
      <Link to="/games/audiocall">Try agan!</Link>
      <h1>SCORE:</h1>
      <div>
        <h3>CORRECT</h3>
        <div>Number: {correct.amount}</div>
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
      <div>
        <h3>MISTAKES</h3>
        <div>Number: {incorrect.amount}</div>
        {incorrect.words.map((el) => (
          <li key={el.id}>
            <Fab variant="extended" onClick={() => new Audio(API_URL + "/" + el.audio).play()}>
              <VolumeUpRoundedIcon sx={{ mr: 1, fontSize: 60 }} color="warning" />
              {el.word}
            </Fab>
            <span>{el.wordTranslate}</span>
          </li>
        ))}
        <Button color="warning" variant="outlined" size="large" onClick={() => audiocallSetReset()}>
          Try agan
        </Button>
        <Button color="warning" variant="outlined" size="large" onClick={() => audiocallSetReset()}>
          <Link to="/games" onClick={() => audiocallSetReset()}>
            Games page
          </Link>
        </Button>

        {pending ? (
          <p>
            <CircularProgress color="inherit" />
            Saving progress...
          </p>
        ) : (
          indicatorElement
        )}
      </div>
    </>
  )
}
export default Result
