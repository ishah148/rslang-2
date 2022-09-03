import React, { useEffect, useState } from "react"
import { useAudiocallActionsCreators } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import Round from "./Round"
import { Link, useNavigate } from "react-router-dom"
import Settings from "./Settings"
import { Button, CircularProgress } from "@mui/material"

import { useSound } from "../../hooks/useSound"
import start from "./assets/adriantnt_u_click.mp3"

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
    audiocallStart(Number(group))
  }

  if (pending) {
    return (
      <div
        style={{
          padding: 30,
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1>AUDIOCALL</h1>

        <CircularProgress />
        <div>Loading...</div>
        <Button color="warning" variant="outlined" size="large">
          <Link to="/games">Back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: "white", padding: 30, height: "100vh", width: "100vw" }}>
      <h1>AUDIOCALL</h1>
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
