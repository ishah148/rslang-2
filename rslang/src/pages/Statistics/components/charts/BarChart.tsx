import React, { useCallback, useEffect, useState } from "react"
import styles from "../Stats.module.scss"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

import { Bar } from "react-chartjs-2"
import { FullStatsData } from "../../../../models/StatsModels"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
type props = {
  data: FullStatsData | undefined
}
type graphPropsData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
  }[]
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
  const [graphProps, setGraphProps] = useState<graphPropsData>()
  function propsObj(labels:Array<string>,data:number[]):graphPropsData{
    return {
      labels:labels,
      datasets: [
        {
          label: "Dataset 1",
          data: [1,23],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ]
    }
  }
  const a = () => 123
  useEffect(() => {
    const data = Object.entries(props.data || 0)
    const labels = data.map((i) => i[0]) as string[]
    if (labels.length) setLabels([...labels])
    console.log("", labels)
  }, [props])

  useEffect(() => {
    const data = Object.entries(props.data || 0)
    const newWords = data.map((i) => i[1])
    propsObj(['10'],[1])
    // if(newWords.length) setGraphProps(() => {})
    console.log("", labels)
  }, [props])

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; //динамически формировать массив дат



  return <Bar options={options} data={data} />
}
