import "./reports.css";

import React, { useState } from "react";
import {
  getClassSummary,
  getMonthlyComparison,
  getPerformanceTrend,
} from "../../Utils/reports/reportCalculation";

import ClassPerformanceChart from "./ClassPerformanceChart";
import MonthlyComparisonBarChart from "./MonthlyComparisonBarChart";
import ReportSummaryCard from "./ReportSummaryCard";
import students from "../../Data/students";

const MONTH_CYCLES = {
  "Jan - Mar": ["Jan", "Feb", "Mar"],
  "Apr - Jun": ["Apr", "May", "Jun"],
  "Jul - Sep": ["Jul", "Aug", "Sep"],
  "Oct - Dec": ["Oct", "Nov", "Dec"],
};

const ReportsSection = () => {
  const class11Summary = getClassSummary(students, 11);
  const class12Summary = getClassSummary(students, 12);

  const [selectedClass, setSelectedClass] = useState(11);
  const performanceData = getPerformanceTrend(students, selectedClass);

  const [selectedCycle, setSelectedCycle] = useState("Jan - Mar");
  const monthlyComparison = getMonthlyComparison(
    students,
    MONTH_CYCLES[selectedCycle]
  );

  return (
    <div className="reports-container">
      <div className="reports-left">
        <ReportSummaryCard
          class11={class11Summary}
          class12={class12Summary}
        />

        <MonthlyComparisonBarChart
          data={monthlyComparison}
          selectedCycle={selectedCycle}
          onCycleChange={setSelectedCycle}
        />
      </div>

      <div className="reports-right">
        <ClassPerformanceChart
          data={performanceData}
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
        />
      </div>
    </div>
  );
};

export default ReportsSection;
