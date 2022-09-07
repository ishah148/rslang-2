import { graphPropsData } from "../models/types"

export const  generatePropsObj = (labels:Array<string>,data:number[]):graphPropsData =>{
    return {
      labels,
      datasets: [
        {
          label: "Dataset 222",
          data,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ]
    }
  }