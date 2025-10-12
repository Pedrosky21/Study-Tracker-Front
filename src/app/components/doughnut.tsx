"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface Props {
  progress: number; // valor entre 0 y 100
  color?: string;   // opcional, por defecto verde
  size?: number;    // tamaño opcional (en píxeles)
}

export default function ProgressDoughnut({
  progress,
  color = "rgba(7, 79, 87, 1)", // verde tailwind: emerald-500
  size = 50,
}: Props) {

  const data = {
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [color, "rgba(229, 231, 235, 0.4)"], // gris claro de fondo
        borderWidth: 0,
        cutout: "85%", // grosor del anillo
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "75%",
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      <Doughnut data={data} options={options} />
      <span className="absolute text-sm font-semibold text-gray-700">
        {progress}%
      </span>
    </div>
  );
}
