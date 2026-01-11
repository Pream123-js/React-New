import "./Studentlist.css";

import { useState } from "react";

function StudentList() {
  // Dummy student data (temporary)
  const students = [
    { rollNo: 1, name: "Arun", dob: "2007-05-12", group: "ComputerScience", class: 11 },
    { rollNo: 2, name: "Meena", dob: "2007-08-20", group: "Biology", class: 11 },
    { rollNo: 3, name: "Karthik", dob: "2006-11-03", group: "Commerce", class: 12 },
    { rollNo: 4, name: "Divya", dob: "2006-02-14", group: "Automobile", class: 12 },
    { rollNo: 5, name: "Ravi", dob: "2007-01-10", group: "Commerce", class: 11 }
  ];

  // States
  const [activeClass, setActiveClass] = useState(11);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  /* ---------------- LOGIC ---------------- */

  // 1. Filter by class (11 / 12)
  const classFiltered = students.filter(
    (s) => s.class === activeClass
  );

  // 2. Search by name or roll no
  const searched = classFiltered.filter(
    (s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase()) ||
      s.rollNo.toString().includes(searchText)
  );

  // 3. Filter by group
  const groupFiltered = groupFilter
    ? searched.filter((s) => s.group === groupFilter)
    : searched;

  // 4. Sort
  const sortedStudents = [...groupFiltered];

  if (sortType === "name-asc") {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortType === "name-desc") {
    sortedStudents.sort((a, b) => b.name.localeCompare(a.name));
  }

  /* --------------------------------------- */

  return (
  <div className="student-list">
    {/* HEADER */}
    <div className="student-header">
      <h2>Student List</h2>

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
    </div>

    {/* CONTROLS */}
    <div className="student-controls">
      <input
        type="text"
        placeholder="Search by Roll No or Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="right-controls">
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

    {/* TABLE */}
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Group</th>
          </tr>
        </thead>

        <tbody>
          {sortedStudents.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No students found
              </td>
            </tr>
          ) : (
            sortedStudents.map((s) => (
              <tr key={s.rollNo}>
                <td>{s.rollNo}</td>
                <td>{s.name}</td>
                <td>{s.dob}</td>
                <td>{s.group}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}


export default StudentList;
