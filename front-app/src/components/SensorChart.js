import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const SensorChart = (title, labels, chartData, dataLabel, borderColor, backgroundColor) =>{
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: dataLabel,
        data: chartData,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default SensorChart;