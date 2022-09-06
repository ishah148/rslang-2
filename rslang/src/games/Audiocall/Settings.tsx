import React from "react"

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

import styles from "./Audiocall.module.scss"

interface ISettingsProps {
  group: number
  pending: boolean
  error: string | null
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClick: () => void
}

function Settings(props: ISettingsProps) {
  const { group, handleChange, handleClick, error, pending } = props

  const levels = [1, 2, 3, 4, 5, 6, 7]

  return (
    <>
      <div className={styles.settingsContainer}>
        <FormControl id={styles.formControl}>
          <FormLabel className={styles.settingsControls} id="demo-controlled-radio-buttons-group">
            Level of difficulty
          </FormLabel>
          <RadioGroup
            id={styles.settingsRadio}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={group}
            onChange={handleChange}
          >
            {levels.map((level, index) => {
              return <FormControlLabel key={index} value={index} control={<Radio />} label={level} />
            })}
          </RadioGroup>
        </FormControl>
        <button className={styles.buttonStart} disabled={pending} onClick={handleClick}>
          start
        </button>
        {error && <div>{error}</div>}
      </div>
    </>
  )
}
export default Settings
