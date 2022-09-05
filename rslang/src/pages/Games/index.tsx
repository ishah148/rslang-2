import Button from "@mui/material/Button"
import styles from "./Games.module.scss"
import React from "react"

import { Link, useNavigate } from "react-router-dom"
import { useAudiocallActionsCreators, useSprintActionsCreators } from "../../hooks/useActions"
import { BasicCard } from "./components/BasicCard"

const game1 = {
  name: "audiocall",
  article: "some audiocall",
}
const game2 = {
  name: "sprint",
  article: "some sptint",
}
function Games() {
  const { sprintSetLevel, sprintSetStart } = useSprintActionsCreators()
  const navigate = useNavigate()
  function playShahGame(level: number, pages: Array<number>) {
    // sprintSetLevel(5)
    sprintSetStart(level, [1, 2, 3])
    navigate("/games/sprint/round")
  }

  const { audiocallSetReset } = useAudiocallActionsCreators()
  return (
    <div className={styles.games__wrapper}>
      <BasicCard {...game1}>
        <Link to="/games/audiocall">
          <Button
            size="small"
            variant="contained"
            sx={{ justifyContent: "center" }}
            onClick={() => audiocallSetReset()}
          >
            Start!!!
          </Button>
        </Link>
      </BasicCard>

      <BasicCard {...game2}>
        <Link to="/games/sprint">
          <Button size="small" variant="contained" sx={{ justifyContent: "center" }}>
            Start!!!
          </Button>
        </Link>
      </BasicCard>
      <button onClick={() => playShahGame(0, [1, 2, 3])}></button>
    </div>
  )
}
export default Games
