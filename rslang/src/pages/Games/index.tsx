import Button from "@mui/material/Button"
import styles from "./Games.module.scss"
import React from "react"

import { Link, useNavigate } from "react-router-dom"
import { useAudiocallActionsCreators, useSprintActionsCreators } from "../../hooks/useActions"
import { BasicCard } from "./components/BasicCard"
import image from "../../../assets/img/audiobook.jpg"
import imageOne from "../../assets/img/audiobook.jpg"
import imageTwo from "../../assets/img/audiobook.jpg"

const game1 = {
  name: "audiocall",
  article: "some audiocall",
  image:imageOne,
}
const game2 = {
  name: "sprint",
  article: "some sptint",
  image:imageTwo,
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
        <Link to="/rslang-2/games/audiocall">
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
        <Link to="/rslang-2/games/sprint">
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
