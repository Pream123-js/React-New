import "./AddInfo.css"; // can be empty, studentlist.css does styling

import { Fragment, useState } from "react";

import AddMarksModal from "./Addmarksmodal";

function AddInfo() {
  /* ---------------- SOURCE DATA ---------------- */
  const [students, setStudents] = useState([
    { id: 1, rollNo: 1, name: "Arun", group: "ComputerScience", class: 11 , marks:[]},
    { id: 2, rollNo: 2, name: "Meena", group: "Biology", class: 11 , marks:[]},
    { id: 3, rollNo: 3, name: "Karthik", group: "Commerce", class: 12 , marks:[]},
    { id: 4, rollNo: 4, name: "Divya", group: "Automobile", class: 12 , marks:[]},
  ]);

  /* ---------------- CONTROLS ---------------- */
  const [activeClass, setActiveClass] = useState(11);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  /* ---------------- ADD / EDIT ---------------- */
  const [editingId, setEditingId] = useState(null);
  const [editedStudent, setEditedStudent] = useState(null);

    const [showMarksModal, setShowMarksModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

const openMarksModal = (student) => {
  setSelectedStudent(student);
  setShowMarksModal(true);
};


  const [adding, setAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    rollNo: "",
    name: "",
    group: "",
  });

  /* ---------------- FILTER + SORT (CRITICAL) ---------------- */
  let visibleStudents = students.filter(
    (s) => s.class === activeClass
  );

  if (searchText) {
    visibleStudents = visibleStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.rollNo.toString().includes(searchText)
    );
  }

  if (groupFilter) {
    visibleStudents = visibleStudents.filter(
      (s) => s.group === groupFilter
    );
  }

  if (sortType === "name-asc") {
    visibleStudents = [...visibleStudents].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortType === "name-desc") {
    visibleStudents = [...visibleStudents].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  /* ---------------- HANDLERS ---------------- */

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditedStudent({ ...student });
    setAdding(false);
  };

  const saveEdit = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editingId ? editedStudent : s
      )
    );
    setEditingId(null);
    setEditedStudent(null);
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const startAdd = () => {
    setAdding(true);
    setEditingId(null);
    setNewStudent({ rollNo: "", name: "", group: "" });
  };

  const saveAdd = () => {
    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newStudent,
        class: activeClass,
      },
    ]);
    setAdding(false);
  };

  /* ---------------- JSX ---------------- */

  return (
    <div>
      <h2>Add / Edit Students</h2>

      {/* TOP CONTROLS (same as StudentList) */}
      <div className="student-controls">
        <input
          placeholder="Search by Roll No or Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="right-controls">
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

          <button onClick={startAdd}>Add Student</button>
        </div>
      </div>

      {/* TABLE */}
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {visibleStudents.map((student) => (
            <Fragment key={student.id}>
              <tr>
                {editingId === student.id ? (
                  <>
                    <td>
                      <input
                        value={editedStudent.rollNo}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent,
                            rollNo: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editedStudent.name}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editedStudent.group}
                        onChange={(e) =>
                          setEditedStudent({
                            ...editedStudent,
                            group: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={saveEdit}>OK</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>{student.group}</td>
                    <td>
                      <button onClick={() => startEdit(student)}>
                        Edit
                      </button>
                      <button onClick={() => deleteStudent(student.id)}>
                        Delete
                      </button>

                      <button onClick={() => openMarksModal(student)}>
                        Add Marks
                       </button>

                    </td>
                  </>
                )}
              </tr>
            </Fragment>
          ))}

          {adding && (
            <tr>
              <td>
                <input
                  value={newStudent.rollNo}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      rollNo: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      name: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  value={newStudent.group}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      group: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <button onClick={saveAdd}>OK</button>
              </td>
            </tr>
          )}


          {showMarksModal && (
           <AddMarksModal
             student={selectedStudent}
             onClose={() => setShowMarksModal(false)}
             onSave={(marks) => {
             setStudents((prev) =>
             prev.map((s) =>
             s.id === selectedStudent.id
              ? { ...s, marks }
             : s
    )
  );
}}

                />
              )}

        </tbody>
      </table>
    </div>
  );
}

export default AddInfo;
