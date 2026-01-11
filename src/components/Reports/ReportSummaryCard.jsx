import "./reports.css";

const ReportSummaryCard = ({ class11, class12 }) => {
  return (
    <div className="summary-card">
      <h3 className="summary-title">Overall Summary</h3>

      <div className="summary-classes">
        {/* Class 11 */}
        <div className="summary-box">
          <h4>Class 11</h4>
          <p>Total: <strong>{class11.totalStudents}</strong></p>
          <p>Passed: <strong>{class11.passed}</strong></p>
          <p>Failed: <strong>{class11.failed}</strong></p>
          <p>Avg Marks: <strong>{class11.averageMarks}</strong></p>
        </div>

        {/* Class 12 */}
        <div className="summary-box">
          <h4>Class 12</h4>
          <p>Total: <strong>{class12.totalStudents}</strong></p>
          <p>Passed: <strong>{class12.passed}</strong></p>
          <p>Failed: <strong>{class12.failed}</strong></p>
          <p>Avg Marks: <strong>{class12.averageMarks}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ReportSummaryCard;
