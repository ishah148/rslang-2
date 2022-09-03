import React, { useCallback, useEffect, useRef, useState } from "react"
import { IRoundWord } from "../../redux/action-types/audiocall"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { useAudiocallActionsCreators } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { API_URL } from "../../services/axios_service"
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded"
import styles from "./Audiocall.module.scss"
import Fab from "@mui/material/Fab"
import { useSound } from "../../hooks/useSound"
import correctSoundUrl from "./assets/ding-sound-effect_1.mp3"
import resultSoundUrl from "./assets/status_w5zDGaI.mp3"
import { useNavigate } from "react-router-dom"

interface props {
  round: IRoundWord
  setRoundNumber: (prev: (prev: number) => number) => void
  lastRaund: number
  currentRaund: number
}

function Round({ round, setRoundNumber, lastRaund, currentRaund }: props) {
  //redux
  const { audiocallSetCorrect, audiocallSetIncorrect, audiocallSetChosen, audiocallSetResult, audiocallSetReset } =
    useAudiocallActionsCreators()
  const { correct, incorrect, chosen, lastRaundResult, allRaundResults } = useTypedSelector((state) => state.audiocall)
  //react
  const [currentChoice, setCurrentChoice] = useState<string | null>(null)
  const audioPlayerRef = useRef<HTMLAudioElement>(null)

  const [resultSound] = useSound(resultSoundUrl)
  const [correctSound] = useSound(correctSoundUrl)

  const handleChoice = useCallback(
    (isCorrect: boolean, chosenWord: IRoundWord, wordTranslated?: string) => {
      if (chosen) return
      if (wordTranslated) {
        wordTranslated && setCurrentChoice(wordTranslated)
      }
      if (isCorrect) {
        correctSound.play()
        const amount = correct.amount + 1
        const words = [...correct.words, chosenWord]
        audiocallSetCorrect({ amount, words })
        return
      }
      const amount = incorrect.amount + 1
      const words = [...incorrect.words, chosenWord]
      incorrect.amount += 1
      incorrect.words = [...correct.words, chosenWord]
      audiocallSetIncorrect({ amount, words })
    },
    [chosen]
  )

  const navigate = useNavigate()
  const handleClick = () => {
    if (chosen) {
      setRoundNumber((prev: number) => prev + 1)
      audiocallSetChosen()
      if (lastRaund === currentRaund) {
        resultSound.play()
        audiocallSetResult(true, correct, incorrect, allRaundResults)
        navigate("/games/audiocall/result")
      }
      return
    }
    handleChoice(false, round)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") e.preventDefault()
    switch (e.key) {
      case "1":
        handleChoice(round.choice[0].isCorrect, round, round.choice[0].wordTranslated)
        break
      case "2":
        handleChoice(round.choice[1].isCorrect, round, round.choice[1].wordTranslated)
        break
      case "3":
        handleChoice(round.choice[2].isCorrect, round, round.choice[2].wordTranslated)
        break
      case "4":
        handleChoice(round.choice[3].isCorrect, round, round.choice[3].wordTranslated)
        break
      case "5":
        handleChoice(round.choice[4].isCorrect, round, round.choice[4].wordTranslated)
        break
      case "Enter":
        handleClick()
        break
      case "Escape":
        audiocallSetReset()
        break
      case " ":
        audioPlayerRef.current?.play()
    }
  }

  useEffect(() => {
    if (chosen) {
      audioPlayerRef.current?.load()
      audioPlayerRef.current?.play()
    }
  }, [chosen])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })

  const hendleColor = (isCorrect: boolean, wordTranslated: string) => {
    if (isCorrect) return "green"
    if (wordTranslated === currentChoice) return "red"
    return "grey"
  }

  return (
    <div>
      <span style={{ backgroundColor: "grey", display: "inline-block" }}>
        <img
          style={{ visibility: chosen ? "visible" : "hidden", verticalAlign: "middle" }}
          src={API_URL + "/" + round.image}
          width={300}
          height={300}
          alt=""
        />
      </span>
      <h2
        style={{
          visibility: chosen ? "visible" : "hidden",
          fontSize: "8rem",
          color: lastRaundResult ? "green" : "red",
        }}
      >
        {round.word}
      </h2>
      <div className={styles["custom-player"]}>
        <Fab variant="extended" onClick={() => audioPlayerRef.current?.play()}>
          <VolumeUpRoundedIcon sx={{ mr: 1, fontSize: 60 }} color="primary" />
          {chosen ? round.transcription : "PLAY"}
        </Fab>
        <audio
          className={styles["audio-player"]}
          ref={audioPlayerRef}
          src={API_URL + "/" + round.audio}
          controls
          autoPlay
        ></audio>
      </div>
      <Stack spacing={2} direction="row">
        {round.choice.map(({ wordTranslated, isCorrect }, i) => (
          <Button
            disabled={chosen}
            style={{
              backgroundColor: chosen ? hendleColor(isCorrect, wordTranslated) : "",
              color: "white",
            }}
            key={wordTranslated}
            variant="contained"
            onClick={() => handleChoice(isCorrect, round, wordTranslated)}
          >
            {i + 1 + " " + wordTranslated}
          </Button>
        ))}
      </Stack>
      {chosen ? (
        <Button color="secondary" variant="contained" size="large" onClick={() => handleClick()}>
          {lastRaund === currentRaund ? "SHOW THE RESULT" : "CONTINUE"}
        </Button>
      ) : (
        <Button color="warning" variant="outlined" size="large" onClick={() => handleClick()}>
          I don`t know
        </Button>
      )}
      <Button color="warning" variant="outlined" size="large" onClick={() => audiocallSetReset()}>
        LEAVE
      </Button>
    </div>
  )
}
export default Round
