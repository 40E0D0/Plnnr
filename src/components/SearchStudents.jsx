import React, { useState, useEffect } from "react";
import { supabase } from "../auth/client";
import { useNavigate } from "react-router-dom";
import { UserPlus, User } from "lucide-react";
import Footer from '../components/Footer';

const SearchStudents = ({ advisorId, onStudentAdded }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchQuery.length < 1) {
            setStudents([]);
            return;
        }

        const fetchStudents = async () => {
            const { data, error } = await supabase
                .from("users")
                .select("id, full_name, student_id")
                .eq("role", "Student")
                .ilike("full_name", `%${searchQuery}%`);

            if (!error) {
                setStudents(data);
            }
        };

        fetchStudents();
    }, [searchQuery]);

    const addStudent = async (studentId) => {
        console.log("Adding student", studentId, "to advisor", advisorId);

        const { data, error } = await supabase
            .from("advisor_students")
            .insert([{ advisor_id: advisorId, student_id: studentId }]);

        if (!error) {
            console.log("Student added successfully!", data);

            // 💬 Add to chats table if it doesn't already exist
            const { data: existingChat, error: chatError } = await supabase
                .from("chats")
                .select("id")
                .eq("advisor_id", advisorId)
                .eq("student_id", studentId)
                .maybeSingle();

            if (!existingChat && !chatError) {
                const { error: insertChatError } = await supabase.from("chats").insert([
                    {
                        advisor_id: advisorId,
                        student_id: studentId,
                    },
                ]);

                if (insertChatError) {
                    console.error("Error inserting into chats table:", insertChatError);
                }
            }

            onStudentAdded();
            setSearchQuery(""); // Clear search
        } else {
            console.error("Error adding student:", error);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search students by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <ul className="search-results">
                {students.map((student) => (
                    <li key={student.id} className="search-item">
                        <span>{student.full_name} ({student.student_id})</span>
                        <div className="search-actions">
                            <button onClick={() => navigate(`/view-student/${student.id}`)}>
                                <User size={16} /> View Profile
                            </button>
                            <button onClick={() => addStudent(student.id)}>
                                <UserPlus size={16} /> Add
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchStudents;
