export type graphPropsData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor?:string
  }[]
}

export const defaultGraphPropsData = {
  labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7, 8],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
  
}

