import "./reports.css";

import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ClassPerformanceChart = ({ data, selectedClass, onClassChange }) => {
  return (
    <div className="performance-card">
      <div className="performance-header">
        <h3>Class Performance</h3>

        <div className="class-toggle">
          <button
            className={selectedClass === 11 ? "active" : ""}
            onClick={() => onClassChange(11)}
          >
            Class 11
          </button>
          <button
            className={selectedClass === 12 ? "active" : ""}
            onClick={() => onClassChange(12)}
          >
            Class 12
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e5cfd9" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="averageMarks"
            stroke="#c97ca1"
            fill="#f1d6e2"
            fillOpacity={0.6}
          />

          <Line
            type="monotone"
            dataKey="averageMarks"
            stroke="#8b3a62"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClassPerformanceChart;
