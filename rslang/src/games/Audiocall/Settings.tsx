import React from "react"

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Level of difficulty</FormLabel>
          <RadioGroup
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
        <button
          style={{
            display: "block",
            padding: 20,
            width: 200,
            height: 200,
            fontSize: "3rem",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
          }}
          disabled={pending}
          onClick={handleClick}
        >
          start
        </button>
        {error && <div>{error}</div>}
      </div>
    </>
  )
}
export default Settings
