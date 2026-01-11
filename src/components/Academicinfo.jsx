import "./Academicinfo.css";

import React, { useState } from "react";

function AcademicInfo() {
  // Dummy academic data (backend-ready structure)
  const students = [
    {
      id: 1,
      rollNo: 1,
      name: "Arun",
      class: 11,
      group: "ComputerScience",
      marks: {
        English: 78,
        Tamil: 82,
        Maths: 90,
      },
    },
    {
      id: 2,
      rollNo: 2,
      name: "Meena",
      class: 11,
      group: "Biology",
      marks: {
        English: 88,
        Tamil: 76,
        Maths: 72,
      },
    },
    {
      id: 3,
      rollNo: 3,
      name: "Karthik",
      class: 12,
      group: "Commerce",
      marks: {
        English: 69,
        Tamil: 71,
        Maths: 65,
      },
    },
    {
      id: 4,
      rollNo: 4,
      name: "Divya",
      class: 12,
      group: "Automobile",
      marks: {
        English: 92,
        Tamil: 88,
        Maths: 85,
      },
    },
  ];

  // States
  const [activeClass, setActiveClass] = useState(11);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  /* ---------------- LOGIC ---------------- */

  // Filter by class
  const classFiltered = students.filter(
    (s) => s.class === activeClass
  );

  // Search
  const searched = classFiltered.filter(
    (s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase()) ||
      s.rollNo.toString().includes(searchText)
  );

  // Group filter
  const groupFiltered = groupFilter
    ? searched.filter((s) => s.group === groupFilter)
    : searched;

  // Sort
  const sortedStudents = [...groupFiltered];

  if (sortType === "name-asc") {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortType === "name-desc") {
    sortedStudents.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Percentage calculation
  const calculatePercentage = (marks) => {
    const values = Object.values(marks);
    const total = values.reduce((sum, m) => sum + m, 0);
    return (total / values.length).toFixed(2);
  };

  // Pass / Fail
  const getResult = (marks) => {
    return Object.values(marks).every((m) => m >= 35)
      ? "Pass"
      : "Fail";
  };

  // Grade calculation
  const getGrade = (mark) => {
    if (mark >= 90) return "A+";
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 35) return "D";
    return "F";
  };

  /* -------------------------------------- */

  return (
  <div className="academic-info">

    {/* TITLE */}
    <h2>Academic Information</h2>

    {/* TOP BAR */}
    <div className="academic-topbar">

      {/* LEFT SIDE – SEARCH */}
      <div className="academic-left">
        <input
          type="text"
          placeholder="Search by Roll No or Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* RIGHT SIDE – CLASS + SORT + FILTER */}
      <div className="academic-right">

        <div className="class-buttons">
          <button
            className={activeClass === 11 ? "active" : ""}
            onClick={() => setActiveClass(11)}
          >
            Class 11
          </button>

          <button
            className={activeClass === 12 ? "active" : ""}
            onClick={() => setActiveClass(12)}
          >
            Class 12
          </button>
        </div>

        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort</option>
          <option value="name-asc">A → Z</option>
          <option value="name-desc">Z → A</option>
        </select>

        <select onChange={(e) => setGroupFilter(e.target.value)}>
          <option value="">All Groups</option>
          <option value="Commerce">Commerce</option>
          <option value="ComputerScience">Computer Science</option>
          <option value="Biology">Biology</option>
          <option value="Automobile">Automobile</option>
        </select>

      </div>
    </div>

    {/* MAIN TABLE */}
    <table className="student-table">
      <thead>
        <tr>
          <th>Roll No</th>
          <th>Name</th>
          <th>Group</th>
        </tr>
      </thead>

      <tbody>
        {sortedStudents.map((student) => (
          <React.Fragment key={student.id}>
            <tr
              onClick={() =>
                setExpandedId(
                  expandedId === student.id ? null : student.id
                )
              }
              style={{ cursor: "pointer" }}
            >
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.group}</td>
            </tr>

            {/* EXPANDED ROW */}
            {expandedId === student.id && (
              <tr>
                <td colSpan="3" className="academic-expanded">

                  <table width="100%">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Grade</th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.entries(student.marks).map(
                        ([subject, mark]) => (
                          <tr key={subject}>
                            <td>{subject}</td>
                            <td>{mark}</td>
                            <td>{getGrade(mark)}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>

                  <div className="academic-summary">
                    <p>
                      <strong>Result:</strong>{" "}
                      {getResult(student.marks)}
                    </p>
                    <p>
                      <strong>Overall Percentage:</strong>{" "}
                      {calculatePercentage(student.marks)}%
                    </p>
                  </div>

                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>

  </div>
);
}
export default AcademicInfo;