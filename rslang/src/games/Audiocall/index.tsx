import React, { useEffect, useState } from "react"
import { useAudiocallActionsCreators } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import Round from "./Round"
import { Link, useNavigate } from "react-router-dom"
import Settings from "./Settings"
import { Button, CircularProgress } from "@mui/material"

import { useSound } from "../../hooks/useSound"
import start from "./assets/adriantnt_u_click.mp3"

import styles from "./Audiocall.module.scss"

function Audiocall() {
  const { rounds, pending, result, error } = useTypedSelector((state) => state.audiocall)

  const { audiocallStart, audiocallSetPending, audiocallSetResult } = useAudiocallActionsCreators()

  const [group, setGroup] = useState(0)
  const [roundNumber, setRoundNumber] = useState(0)
  const [startSound] = useSound(start)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(Number((event.target as HTMLInputElement).value))
  }

  const handleClick = () => {
    startSound.play()
    audiocallSetPending()
    setRoundNumber(0)
    audiocallStart(group)
  }

  if (pending) {
    return (
      <div className={styles.audioContainer}>
        <h1 style={{ color: "white" }}>AUDIOCALL</h1>

        <CircularProgress style={{ color: "white" }} />
        <div style={{ color: "white" }}>Loading...</div>
        <Button color="warning" variant="outlined" size="large">
          <Link to="/games">Back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.audioContainer}>
      <h1 className={styles.title}>Audiocall</h1>
      {!rounds ? (
        <>
          <Settings {...{ handleClick, handleChange, error, group, pending }} />
        </>
      ) : (
        rounds.map((round, i) => (
          <Round
            key={round.id}
            round={round}
            setRoundNumber={setRoundNumber}
            lastRaund={rounds.length}
            currentRaund={i + 1}
          />
        ))[roundNumber]
      )}
    </div>
  )
}
export default Audiocall
