import { graphPropsData } from "../models/types"

export const generatePropsObj = (
  labels: Array<string>,
  data: {
    newWords: number
    totalLearnedWords: number
  }[]
): graphPropsData => {
  console.log("data", data)
  const dataArr = data.map(i => i.newWords)
  return {
    labels,
    datasets: [
      {
        label: "Dataset 222",
        data:dataArr,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }
}

//
