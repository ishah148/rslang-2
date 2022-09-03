import Button from "@mui/material/Button"
import styles from "./Games.module.scss"
import React from "react"

import { Link } from "react-router-dom"
import { useAudiocallActionsCreators } from "../../hooks/useActions"
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
    </div>
  )
}
export default Games
