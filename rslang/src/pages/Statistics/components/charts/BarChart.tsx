import React from "react"
import styles from '../Stats.module.scss'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart',
      // },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; //динамически формировать массив дат

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 5, 6, 7, 8],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: [0, 32, 3, 4, 32, 2],
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };
  return (
    <Bar options={options} data={data} />
  )
}