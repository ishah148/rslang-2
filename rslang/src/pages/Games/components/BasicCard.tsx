import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardMedia from "@mui/material/CardMedia/CardMedia"

interface BasicCardProps {
  children: React.ReactNode
  name: string
  article: string
  image: string
}

export function BasicCard({ name, article, children,image }: BasicCardProps) {
  return (
    <Card sx={{ minWidth: 275, height: 320 }}>
      <CardMedia
        component="img"
        height="140px"
        width="140px"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* {props} */}
        </Typography>
        <Typography variant="body2">{article}</Typography>
      </CardContent>
      <CardActions>{children}</CardActions>
    </Card>
  )
}