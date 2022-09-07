import { graphPropsData } from "../models/types"

export const generatePropsObjNewWords = (
  labels: Array<string>,
  data: {
    newWords: number
    totalLearnedWords: number
  }[],
): graphPropsData => {
  console.log("data", data)
  const dataArr = data.map(i => i.newWords)
  return {
    labels,
    datasets: [
      {
        label: "Words per day",
        data:dataArr,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }
}

export const generatePropsObjTotalWords = (
  labels: Array<string>,
  data: {
    newWords: number
    totalLearnedWords: number
  }[],
): graphPropsData => {
  const dataArr = data.map(i => i.totalLearnedWords)
  return {
    labels,
    datasets: [
      {
        label: "Total Words",
        data:dataArr,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
}

//
