import "./AddMarksModal.css";

import { useState } from "react";

const AddMarksModal = ({ student, onClose, onSave }) => {
 const [rows, setRows] = useState(
  student.marks && student.marks.length > 0
    ? student.marks
    : [{ subject: "", marks: "", grade: "" }]
);

  const addRow = () => {
    setRows([...rows, { subject: "", marks: "", grade: "" }]);
  };

  const updateCell = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleSave = () => {
    onSave(rows);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Marks – {student.name}</h3>

        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <input
                    value={row.subject}
                    onChange={(e) =>
                      updateCell(i, "subject", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.marks}
                    onChange={(e) =>
                      updateCell(i, "marks", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    value={row.grade}
                    onChange={(e) =>
                      updateCell(i, "grade", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addRow}>+ Add Subject</button>

        <div className="modal-actions">
          <button onClick={handleSave}>OK</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddMarksModal;
