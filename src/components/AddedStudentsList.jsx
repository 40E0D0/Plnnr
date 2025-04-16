import React from "react";
import { supabase } from "../auth/client";
import { Trash2 } from "lucide-react";

const AddedStudentsList = ({ advisorId, students, onRemoveStudent }) => {
  const handleRemoveStudent = async (studentId) => {
    const { error } = await supabase
      .from("advisor_students")
      .delete()
      .eq("advisor_id", advisorId)
      .eq("student_id", studentId);

    if (!error) {
      onRemoveStudent(); // Fetch the latest list after removal
    } else {
      console.error("Error removing student:", error);
    }
  };

  return (
    <div className="added-students">
      <h2 className="font-bold text-lg">Your Students</h2>
      <ul className="added-list">
        {students.map((student) => (
          <li key={student.student_id} className="student-row">
            <span>
              {student.users?.full_name} ({student.users?.student_id})
            </span>
            <button
              onClick={() => handleRemoveStudent(student.student_id)}
              className="remove-btn"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddedStudentsList;
