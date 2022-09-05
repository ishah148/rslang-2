import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardMedia from "@mui/material/CardMedia/CardMedia"
import imageAudioBook from "../../../assets/img/audiobook.jpg"
import imageSprint from "../../../assets/img/wordsGame.jpg"

import styles from "./BasicCard.module.scss"

interface BasicCardProps {
  children: React.ReactNode
  name: string
  article: string
}

export function BasicCard({ name, article, children }: BasicCardProps) {
  return (
    <Card style={{ backgroundColor: "#624c9d" }} className={styles.cardContainer} sx={{ minWidth: 275, height: 320 }}>
      <CardMedia component="img" height="140px" width="140px" image={imageSprint} alt="green iguana" />
      <CardContent className={styles.name}>
        <Typography>{name}</Typography>
        <Typography className={styles.subname} sx={{ mb: 1.5 }} color="text.secondary">
          {/* {props} */}
        </Typography>
        <Typography className={styles.subtitle} variant="body2">
          {article}
        </Typography>
      </CardContent>
      <CardActions className={styles.buttonCard}>{children}</CardActions>
    </Card>
  )
}
