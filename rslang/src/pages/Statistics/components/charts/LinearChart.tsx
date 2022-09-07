import React, { useEffect, useState } from "react"
import styles from "../Stats.module.scss"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { FullStatsData } from "../../../../models/StatsModels"
import { generatePropsObjTotalWords } from "./utils"
import { defaultGraphPropsData, graphPropsData } from "./models/types"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
type props = {
  data: FullStatsData | undefined
}

export function LinearChart(props: props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  }

  const [graphProps, setGraphProps] = useState<graphPropsData>(defaultGraphPropsData)

  useEffect(() => {
    const data = Object.entries(props.data || 0)
    const labels = data.map((i) => i[0]) as string[]
    const newWords = data.map((i) => i[1])

    if (data.length) setGraphProps({ ...graphProps, ...generatePropsObjTotalWords(labels, newWords) })
  }, [props])

  return <Line options={options} data={graphProps} />
}

// for debug!
// const [test, setTest] = useState(false)
// console.log("labels", labels)
// console.log("newwords", newWords)
// console.log("generatePropsObj(labels,newWords)", generatePropsObjNewWords(labels, newWords))
// console.log('defaultGraphPropsData',defaultGraphPropsData)
// console.log("graphProps", graphProps)


// <button
// onClick={() => {
//   console.log("graphProps", graphProps)
//   setTest(!test)
// }}
// ></button>