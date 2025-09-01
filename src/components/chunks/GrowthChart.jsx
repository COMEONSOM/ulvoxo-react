// ============================================================
// GROWTHCHART COMPONENT (EXTRACTED FOR BUNDLE OPTIMIZATION)
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// STATIC DATA
const growthData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    {
      label: "Users",
      data: [100, 500, 2000],
      backgroundColor: "#10b981",
    },
  ],
};

export default function GrowthChart() {
  return (
    <motion.div
      className="growth-chart"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Our Growth</h3>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Bar data={growthData} />
      </div>
    </motion.div>
  );
}
