import React from "react"

export const useSound = (url: string) => {
  const sound = new Audio(url)
  return [sound]
}
