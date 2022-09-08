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
  labels:['9/7/2022', '9/8/2022', '9/9/2022', '9/10/2022', '9/11/2022', '9/12/2022', '9/13/2022'],
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
  
}

