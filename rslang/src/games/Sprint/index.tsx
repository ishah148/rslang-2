import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSprintActionsCreators } from "../../hooks/useActions"
import styles from "./Sprint.module.scss"

const Sprint = () => {
  const levels = [1, 2, 3, 4, 5, 6]
  const { sprintSetLevel } = useSprintActionsCreators()
  const [currentLevel] = useState<number | null>(null)
  const navigate = useNavigate()

  function chooseLevel(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    const level = target.dataset.level || null
    if (level) {
      
      sprintSetLevel(+level)
      navigate("/games/sprint/round")
    }
  }
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sprintTitle}>Sprint</h2>
      {currentLevel ? (
        <p>Your level is {currentLevel} </p>
      ) : (
        <h2 className={styles.sprintSubTitle}>Choose your level</h2>
      )}
      <div className={styles.levels__container}>
        {levels.map((level) => (
          <button className={styles.buttonLevel} key={level} data-level={level - 1} onClick={chooseLevel}>
            {level}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sprint
