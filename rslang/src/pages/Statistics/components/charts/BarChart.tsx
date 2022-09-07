import React, { useCallback, useEffect, useState } from "react"
import styles from "../Stats.module.scss"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

import { Bar } from "react-chartjs-2"
import { FullStatsData } from "../../../../models/StatsModels"
import { defaultGraphPropsData, graphPropsData } from "./models/types"
import { generatePropsObj } from "./utils"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
type props = {
  data: FullStatsData | undefined
}

export function BarChart(props: props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  const [labels, setLabels] = useState<Array<string>>([])
  const [graphProps, setGraphProps] = useState<graphPropsData>(defaultGraphPropsData)
  const [test, setTest] = useState(false)

  useEffect(() => {
    const data = Object.entries(props.data || 0)
    const labels = data.map((i) => i[0]) as string[]
    const newWords = data.map((i) => i[1])
    
    if (data.length) setGraphProps({ ...graphProps, ...generatePropsObj(labels, newWords,'newWords') })
    console.log("labels", labels)
    console.log("newwords", newWords)
    console.log("generatePropsObj(labels,newWords)", generatePropsObj(labels, newWords,'total'))
    console.log('defaultGraphPropsData',defaultGraphPropsData)
    console.log("graphProps", graphProps)
  }, [props, test])


  return (
    <>
      <Bar options={options} data={graphProps as graphPropsData} />
      <button
        onClick={() => {
          console.log("graphProps", graphProps)
          setTest(!test)
        }}
      ></button>
    </>
  )
}
