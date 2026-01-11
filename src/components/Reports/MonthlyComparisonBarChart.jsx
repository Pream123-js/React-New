import "./reports.css";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MONTH_CYCLES = ["Jan - Mar", "Apr - Jun", "Jul - Sep", "Oct - Dec"];

const MonthlyComparisonBarChart = ({
  data,
  selectedCycle,
  onCycleChange,
}) => {
  // Flatten data for recharts
  const chartData = data.map((item) => ({
    month: item.month,
    class11Pass: item.class11.passed,
    class12Pass: item.class12.passed,
  }));

  return (
    <div className="monthly-card">
      <div className="monthly-header">
        <h4>Monthly Comparison</h4>

        <select
          value={selectedCycle}
          onChange={(e) => onCycleChange(e.target.value)}
        >
          {MONTH_CYCLES.map((cycle) => (
            <option key={cycle} value={cycle}>
              {cycle}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="#e5cfd9" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="class11Pass" fill="#c97ca1" />
          <Bar dataKey="class12Pass" fill="#8b3a62" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyComparisonBarChart;
